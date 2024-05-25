package handle

import (
	"encoding/json"
	"net/http"

	"github.com/HooEP01/chat-bot-v2/models"
	"github.com/HooEP01/chat-bot-v2/utils/custom"
	"github.com/go-chi/chi/v5"
)

func HandleFaqTypeList(w http.ResponseWriter, r *http.Request) *custom.Response {
	faqTypeList := make([]models.FaqType, 0)
	models.GetDB().Scopes(Paginate(r)).Find(&faqTypeList)

	return custom.Success(faqTypeList, "FAQ Type List sync successfully!")
}

func HandleFaqTypeCreate(w http.ResponseWriter, r *http.Request) *custom.Response {
	var newFaqType models.FaqType
	if err := json.NewDecoder(r.Body).Decode(&newFaqType); err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	result := models.GetDB().Create(&newFaqType)
	if result.Error != nil {
		return custom.Fail(result.Error.Error(), http.StatusBadRequest)
	}

	return custom.Success(newFaqType, "FAQ Type created successfully!")
}

func HandleFaqTypeDelete(w http.ResponseWriter, r *http.Request) *custom.Response {
	idParam := chi.URLParam(r, "id")

	// TODO: soft delete
	result := models.GetDB().Delete(&models.FaqType{}, idParam)
	if result.Error != nil {
		return custom.Fail(result.Error.Error(), http.StatusBadRequest)
	}

	return custom.Success(idParam, "FAQ Type deleted successfully!")
}
