package models

type Message struct {
	Model
	ChannelID      uint    `json:"channel_id"`
	Channel        Channel `json:"channel" gorm:"references:ID"`
	UserID         uint    `json:"user_id"`
	User           User    `json:"user" gorm:"references:ID"`
	MessageContent string  `json:"message_content"`
}
