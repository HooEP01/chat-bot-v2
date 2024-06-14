package models

import (
	"time"

	"gorm.io/gorm"
)

type FaqType struct {
	// gorm.Model
	ID          uint           `json:"id" gorm:"primarykey"`
	Name        string         `json:"name"`
	Description string         `json:"description"`
	CreatedAt   time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt   gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}
