package models

import (
	"encoding/json"
	"log"

	"github.com/HooEP01/chat-bot-v2/database"
	"github.com/gorilla/websocket"
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

type ChannelSub struct {
	ID          string
	Subscribers map[*websocket.Conn]*User
}

type ChannelManager struct {
	Channels map[string]*ChannelSub
}

func NewChannelManager() *ChannelManager {
	return &ChannelManager{
		Channels: make(map[string]*ChannelSub),
	}
}

func (cm *ChannelManager) CreateChannel(channelID string) *ChannelSub {
	channel := &ChannelSub{
		ID:          channelID,
		Subscribers: make(map[*websocket.Conn]*User),
	}
	cm.Channels[channelID] = channel
	return channel
}

func (cm *ChannelManager) GetChannel(channelID string) (*ChannelSub, bool) {
	channel, exist := cm.Channels[channelID]
	return channel, exist
}

func (cs *ChannelSub) Broadcast(message Message, excludeSender bool) {
	messageBytes, err := json.Marshal(message)
	if err != nil {
		log.Println("error: %v", err)
		return
	}

	for conn, user := range cs.Subscribers {

		if excludeSender && user.ID == message.UserID {
			continue
		}

		err := conn.WriteMessage(websocket.TextMessage, messageBytes)
		if err != nil {
			log.Println("error: %v", err)
			conn.Close()
			delete(cs.Subscribers, conn)
		}

	}
}
