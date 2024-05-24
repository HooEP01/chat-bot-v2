package handle

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/HooEP01/chat-bot-v2/utils/custom"
)

type HTTPHandler func(w http.ResponseWriter, r *http.Request) *custom.Response

func Make(h HTTPHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// set json format
		w.Header().Set("Content-Type", "application/json")

		if response := h(w, r); response != nil {

			// set status code
			w.WriteHeader(response.StatusCode)

			if err := json.NewEncoder(w).Encode(response); err != nil {
				http.Error(w, fmt.Sprintf("Error encoding response: %v", err), http.StatusBadRequest)
			}

		}
	}
}
