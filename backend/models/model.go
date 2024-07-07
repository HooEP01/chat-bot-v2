package models

import (
	"time"

	"gorm.io/gorm"
)

type Model struct {
	ID        uint           `json:"id" gorm:"primarykey"`
	IsActive  bool           `json:"is_active"`
	CreatedAt time.Time      `json:"created_at" gorm:"autoCreateTime"`
	CreateBy  uint           `json:"created_by"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
	UpdatedBy uint           `json:"updated_by"`
	DeletedAt gorm.DeletedAt `json:"deleted_at"`
	DeletedBy uint           `json:"deleted_by" gorm:"index"`
}
