package handle

import (
	"encoding/json"
	"net/http"

	"github.com/HooEP01/chat-bot-v2/models"
	"github.com/HooEP01/chat-bot-v2/utils/custom"
)

func HandleChatCreate(w http.ResponseWriter, r *http.Request) *custom.Response {
	var newChat models.Chat
	if err := json.NewDecoder(r.Body).Decode(&newChat); err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	// return newChat.AutoResponse()
	return custom.Success("")
}
