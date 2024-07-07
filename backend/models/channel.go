package models

import (
	"github.com/HooEP01/chat-bot-v2/database"
)

type Channel struct {
	Model
	Name          string         `json:"name"`
	Description   string         `json:"description"`
	Subscriptions []subscription `json:"subscriptions" gorm:"foreignKey:ChannelID;references:ID"`
}

func (c *Channel) TableName() string {
	return "channels"
}

func (c *Channel) CreateChannel() error {
	channel := &Channel{}
	result := database.GetDB().Create(channel)
	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (c *Channel) GetChannel(channelID string) (*Channel, bool) {
	channel := &Channel{}
	result := database.GetDB().Where("id = ?", channelID).First(channel)
	if result.Error != nil {
		return nil, false
	}

	return channel, true
}
