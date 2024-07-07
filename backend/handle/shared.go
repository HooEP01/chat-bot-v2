package handle

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/HooEP01/chat-bot-v2/models"
	"github.com/HooEP01/chat-bot-v2/utils/custom"
	"gorm.io/gorm"
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

func User(r *http.Request, w http.ResponseWriter) (*models.User, *custom.Response) {
	user, ok := r.Context().Value("user").(*models.User)
	if !ok {
		return nil, custom.Fail("Unauthorized", http.StatusUnauthorized)
	}

	return user, nil
}

func Paginate(r *http.Request) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		q := r.URL.Query()

		// page params
		page, _ := strconv.Atoi(q.Get("page"))
		if page <= 0 {
			page = 1
		}

		// page_size params
		pageSize, _ := strconv.Atoi(q.Get("page_size"))
		switch {
		case pageSize > 100:
			pageSize = 100
		case pageSize <= 0:
			pageSize = 10
		}

		offset := (page - 1) * pageSize
		return db.Offset(offset).Limit(pageSize)
	}
}
