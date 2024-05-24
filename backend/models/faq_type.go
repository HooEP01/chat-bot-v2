package models

import (
	"time"

	"gorm.io/gorm"
)

type FaqType struct {
	gorm.Model
	Name        string
	Description string
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime"`
	DeletedAt   gorm.DeletedAt
}
