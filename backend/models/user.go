package models

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"time"

	"gorm.io/gorm"
)

// User defines a user model for GORM to map with the database.
type User struct {
	gorm.Model
	Username  string    `gorm:"uniqueIndex;not null"`
	Email     string    `gorm:"uniqueIndex;not null"`
	Password  string    `gorm:"not null"`
	Salt      string    `gorm:"not null"`
	FirstName string    `gorm:"size:100;not null"`
	LastName  string    `gorm:"size:100;not null"`
	BirthDate time.Time `gorm:"type:date"`
	IsActive  bool      `gorm:"default:true"`
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
