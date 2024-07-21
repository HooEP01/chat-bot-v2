package models

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"time"
)

// User defines a user model for GORM to map with the database.
type User struct {
	Model
	Username  string    `json:"username" gorm:"uniqueIndex;not null"`
	Email     string    `json:"email" gorm:"uniqueIndex;not null"`
	Password  string    `json:"password" gorm:"not null"`
	Salt      string    `json:"salt" gorm:"not null"`
	FirstName string    `json:"first_name" gorm:"size:100;not null"`
	LastName  string    `json:"last_name" gorm:"size:100;not null"`
	BirthDate time.Time `json:"birth_date" gorm:"type:date"`
}

type UserResponse struct {
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	BirthDate time.Time `json:"birth_date"`
}

func (u *User) Fields() UserResponse {
	return UserResponse{
		Username:  u.Username,
		Email:     u.Email,
		FirstName: u.FirstName,
		LastName:  u.LastName,
		BirthDate: u.BirthDate,
	}
}

// GenerateSalt creates a new random salt.
func GenerateSalt(size int) (string, error) {
	salt := make([]byte, size)
	_, err := rand.Read(salt)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(salt), nil
}

// HashPassword hashes the password using SHA-256 with a salt.
func HashPassword(password, salt string) string {
	hash := sha256.New()
	hash.Write([]byte(password + salt))
	return base64.StdEncoding.EncodeToString(hash.Sum(nil))
}

// SetPassword sets the user's password, incorporating salting and hashing.
func (u *User) SetPassword(password string) error {
	salt, err := GenerateSalt(16) // You can adjust the salt size.
	if err != nil {
		return err
	}
	u.Salt = salt
	u.Password = HashPassword(password, salt)
	return nil
}

// CheckPassword checks if the provided password is correct.
func (u *User) CheckPassword(password string) bool {
	return u.Password == HashPassword(password, u.Salt)
}
