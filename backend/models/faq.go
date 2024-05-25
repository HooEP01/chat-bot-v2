package models

import (
	"time"

	"gorm.io/gorm"
)

type Faq struct {
	gorm.Model
	ID        uint           `gorm:"primarykey"`
	TopID     uint           `json:"top_id"`
	ParentID  uint           `json:"parent_id"`
	ParentIDs string         `json:"parent_ids"`
	FaqTypeID uint           `json:"faq_type_id"`
	FaqType   FaqType        `json:"faq_type" gorm:"references:ID"`
	Answer    string         `json:"answer"`
	Question  string         `json:"question"`
	CreatedAt time.Time      `gorm:"autoCreateTime"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime"`
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
