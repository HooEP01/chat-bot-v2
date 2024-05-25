package models

import (
	"net/http"
	"time"

	"github.com/HooEP01/chat-bot-v2/utils/custom"
	"gorm.io/gorm"
)

type Chat struct {
	gorm.Model
	ID        uint           `json:"id" gorm:"primarykey"`
	UserID    string         `json:"user_id"`
	Question  string         `json:"question"`
	CreatedAt time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
	DeletedAt gorm.DeletedAt `json:"deleted_at" gorm:"index"`
}

func (c Chat) AutoResponse() *custom.Response {
	result := GetDB().Create(&c)
	if result.Error != nil {
		return custom.Fail(result.Error.Error(), http.StatusBadRequest)
	}
	return custom.Success(result, "Chat reply successfully!")
}
