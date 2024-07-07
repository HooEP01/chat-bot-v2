package handle

import (
	"log"
	"net/http"

	"github.com/HooEP01/chat-bot-v2/models"
	"github.com/HooEP01/chat-bot-v2/utils/custom"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var channelManager = models.NewChannelManager()

func HandleConnections(w http.ResponseWriter, r *http.Request) *custom.Response {
	user, response := User(r, w)
	if response != nil {
		return response
	}

	channelID := r.URL.Query().Get("channel_id")
	if channelID == "" {
		return custom.Fail("channel_id is required")
	}

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return custom.Fail(err.Error())
	}
	defer conn.Close()

	channel, exist := channelManager.GetChannel(channelID)
	if !exist {
		channel = channelManager.CreateChannel(channelID)
	}

	channel.Subscribers[conn] = user

	for {
		_, messageBytes, err := conn.ReadMessage()
		if err != nil {
			log.Println("error: %v", err)
			delete(channel.Subscribers, conn)
			break
		}

		formattedMessage := models.Message{
			UserID:         user.ID,
			MessageContent: string(messageBytes),
		}

		channel.Broadcast(formattedMessage, false)
	}

	return nil
}
