package handle

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/HooEP01/chat-bot-v2/models"
)

func HandleFaqList(w http.ResponseWriter, r *http.Request) {
	faqList := make([]models.Faq, 0)
	models.GetDB().Joins("FaqType").Find(&faqList)

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(faqList); err != nil {
		fmt.Fprintf(w, "Error: %v", err)
		return
	}
}

func HandleFaqCreate(w http.ResponseWriter, r *http.Request) {
	var newFaq models.Faq

	if err := json.NewDecoder(r.Body).Decode(&newFaq); err != nil {
		fmt.Fprintf(w, "Error decoding request body: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result := models.GetDB().Create(&newFaq)

	if result.Error != nil {
		fmt.Println("Error: ", result.Error)
		http.Error(w, result.Error.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusCreated)

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(newFaq); err != nil {
		fmt.Fprintf(w, "Error encoding response: %v", err)
		return
	}
}
