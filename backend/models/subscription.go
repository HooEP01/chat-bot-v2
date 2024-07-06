package models

type subscription struct {
	Model
	ChannelID uint    `json:"channel_id"`
	Channel   FaqType `json:"channel" gorm:"references:ID"`
	UserID    uint    `json:"user_id"`
	User      User    `json:"user" gorm:"references:ID"`
}
