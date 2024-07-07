package handle

import (
	"fmt"
	"net/http"

	"github.com/HooEP01/chat-bot-v2/pkg/websocket"
	"github.com/HooEP01/chat-bot-v2/utils/custom"
)

func HandleChatStart(w http.ResponseWriter, r *http.Request) *custom.Response {
	user, response := User(r, w)
	if response != nil {
		return response
	}

	pool := websocket.GetPool(user.ID)
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websocket.Client{
		ID:   user.ID,
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()

	return custom.Success(nil, "Chat started successfully!")
}

func HandleChatCreate(w http.ResponseWriter, r *http.Request) *custom.Response {
	user, response := User(r, w)
	if response != nil {
		return response
	}

	pool := websocket.GetPool(user.ID)
	client := pool.GetClient(user.ID)
	if client == nil {
		return custom.Fail("Client does not exist.", http.StatusInternalServerError)
	}

	return custom.Success(nil, "Chat created successfully!")
}
