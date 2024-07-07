package models

import (
	"encoding/json"
	"log"

	"github.com/gorilla/websocket"
)

type ChannelSubscriptionConnection struct {
	ID          string
	Subscribers map[*websocket.Conn]*User
}

type ChannelManager struct {
	Channels map[string]*ChannelSubscriptionConnection
}

func NewChannelManager() *ChannelManager {
	return &ChannelManager{
		Channels: make(map[string]*ChannelSubscriptionConnection),
	}
}

func (cm *ChannelManager) CreateChannel(channelID string) *ChannelSubscriptionConnection {
	channel := &ChannelSubscriptionConnection{
		ID:          channelID,
		Subscribers: make(map[*websocket.Conn]*User),
	}
	cm.Channels[channelID] = channel
	return channel
}

func (cm *ChannelManager) GetChannel(channelID string) (*ChannelSubscriptionConnection, bool) {
	channel, exist := cm.Channels[channelID]
	return channel, exist
}

func (cs *ChannelSubscriptionConnection) Broadcast(message Message, excludeSender bool) {
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
