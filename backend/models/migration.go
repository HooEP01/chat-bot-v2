package models

import (
	"fmt"

	"github.com/HooEP01/chat-bot-v2/database"
)

func AutoMigrate() error {
	err := database.GetDB().AutoMigrate(&FaqType{}, &Faq{}, &Chat{}, &User{}, &Channel{}, &Message{}, &subscription{})
	if err != nil {
		return fmt.Errorf("failed to perform migrations: %v", err.Error())
	}

	return nil
}
