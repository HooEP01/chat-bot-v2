package models

import (
	"time"

	"gorm.io/gorm"
)

type Faq struct {
	gorm.Model
	ID        uint           `json:"id" gorm:"primarykey"`
	TopID     uint           `json:"top_id"`
	ParentID  uint           `json:"parent_id"`
	ParentIDs string         `json:"parent_ids"`
	FaqTypeID uint           `json:"faq_type_id"`
	FaqType   FaqType        `json:"faq_type" gorm:"references:ID"`
	Answer    string         `json:"answer"`
	Question  string         `json:"question"`
	CreatedAt time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}
