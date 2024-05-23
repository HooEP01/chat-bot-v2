package models

import (
	"time"

	"gorm.io/gorm"
)

type Faq struct {
	gorm.Model
	ID        uint `json:"id" gorm:"AUTO_INCREMENT;not null;primaryKey"`
	ParentID  uint `json:"parent_id"`
	FaqTypeID uint `json:"faq_type_id"`
	FaqType   FaqType
	Answer    string    `json:"answer"`
	Question  string    `json:"question"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	UpdatedAt time.Time `gorm:"autoUpdateTime"`
	DeletedAt gorm.DeletedAt
}
