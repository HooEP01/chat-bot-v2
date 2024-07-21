package handle

import (
	"encoding/json"
	"net/http"
	"regexp"
	"strconv"
	"time"

	"github.com/HooEP01/chat-bot-v2/configs"
	"github.com/HooEP01/chat-bot-v2/database"
	"github.com/HooEP01/chat-bot-v2/models"
	"github.com/HooEP01/chat-bot-v2/utils/custom"
	"github.com/golang-jwt/jwt/v5"
)

// UserRegistrationDetails for register request
type UserRegistrationDetails struct {
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type UserLoginDetails struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func IsValidEmail(email string) bool {
	regex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)
	return regex.MatchString(email)
}

// HandleRegister handles new user registration requests
func HandleAuthRegister(w http.ResponseWriter, r *http.Request) *custom.Response {
	var userDetails models.User
	if err := json.NewDecoder(r.Body).Decode(&userDetails); err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	// Validate email
	if !IsValidEmail(userDetails.Email) {
		return custom.Fail("Invalid email", http.StatusBadRequest)
	}

	// Validate password
	if len(userDetails.Password) < 8 {
		return custom.Fail("Password must be at least 8 characters long", http.StatusBadRequest)
	}

	// Generate salt and hash the password
	salt, err := models.GenerateSalt(16) // Adjust the salt size as needed
	if err != nil {
		return custom.Fail(err.Error(), http.StatusInternalServerError)
	}
	hashedPassword := models.HashPassword(userDetails.Password, salt)

	// Create a new User instance
	newUser := models.User{
		Username:  userDetails.Username,
		Email:     userDetails.Email,
		Password:  hashedPassword,
		Salt:      salt,
		FirstName: userDetails.FirstName,
		LastName:  userDetails.LastName,
	}

	// Save the User to the database
	db := database.GetDB() // Ensure you have a function to get your *gorm.DB instance
	if result := db.Create(&newUser); result.Error != nil {
		return custom.Fail(result.Error.Error(), http.StatusInternalServerError)
	}

	// Generate an access token
	accessToken, err := GenerateAccessToken(&newUser)
	if err != nil {
		return custom.Fail(err.Error(), http.StatusInternalServerError)
	}

	// If registration is successful
	return custom.Success(accessToken, "Registration successful")
}

// HandleLogin handles user login requests
func HandleAuthLogin(w http.ResponseWriter, r *http.Request) *custom.Response {
	var loginDetails UserLoginDetails
	if err := json.NewDecoder(r.Body).Decode(&loginDetails); err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	// Retrieve the user from the database
	db := database.GetDB() // Ensure you have a function to get your *gorm.DB instance
	var user models.User
	if result := db.Where("email = ?", loginDetails.Email).First(&user); result.Error != nil {
		return custom.Fail("Invalid email or password", http.StatusUnauthorized)
	}

	// Validate the password
	if !user.CheckPassword(loginDetails.Password) {
		return custom.Fail("Invalid email or password", http.StatusUnauthorized)
	}

	// Generate an access token
	accessToken, err := GenerateAccessToken(&user)
	if err != nil {
		return custom.Fail("Failed to generate access token", http.StatusInternalServerError)
	}

	response := map[string]interface{}{
		"token": accessToken,
		"user":  user.Fields(),
	}

	// If login is successful
	return custom.Success(response, "Login successful")
}

func HandleAuthLogout(w http.ResponseWriter, r *http.Request) *custom.Response {
	// Clear the access token cookie

	return custom.Success(nil, "Logout successful")
}

func GenerateAccessToken(user *models.User) (string, error) {
	key := []byte(configs.ReadConfigs().JWTConfigs.Secret)
	claims := &jwt.RegisteredClaims{
		Subject:   strconv.Itoa(int(user.ID)),
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 24)),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	s, err := token.SignedString(key)
	if err != nil {
		return "", err
	}

	return s, nil
}
