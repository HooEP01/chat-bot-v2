package models

import (
	"time"

	"gorm.io/gorm"
)

type Faq struct {
	gorm.Model
	ParentID  uint      `json:"parent_id"`
	FaqTypeID uint      `json:"faq_type_id"`
	FaqType   FaqType   `json:"faq_type" gorm:"references:ID"`
	Answer    string    `json:"answer"`
	Question  string    `json:"question"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
	DeletedAt gorm.DeletedAt
}
