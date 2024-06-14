package handle

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/HooEP01/chat-bot-v2/database"
	"github.com/HooEP01/chat-bot-v2/models"
	"github.com/HooEP01/chat-bot-v2/utils/custom"
	"github.com/go-chi/chi/v5"
)

func HandleFaqList(w http.ResponseWriter, r *http.Request) *custom.Response {
	db := database.GetDB().Scopes(Paginate(r))
	faqList := make([]models.Faq, 0)

	typeParam := r.URL.Query().Get("type")
	if typeParam != "" {
		db = db.Where("faq_type_id = ?", typeParam)
	}

	if err := db.Preload("Faqs").Where("parent_id IS NULL").Joins("FaqType").Find(&faqList).Error; err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	return custom.Success(faqList, "FAQ List sync successfully!")
}

func HandleFaqItem(w http.ResponseWriter, r *http.Request) *custom.Response {
	idParam := chi.URLParam(r, "id")
	faqItem := models.Faq{}
	database.GetDB().Joins("FaqType").First(faqItem, idParam)

	return custom.Success(faqItem, "FAQ Item sync successfully!")
}

func HandleFaqCreate(w http.ResponseWriter, r *http.Request) *custom.Response {
	var newFaq models.Faq
	if err := json.NewDecoder(r.Body).Decode(&newFaq); err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	result := database.GetDB().Create(&newFaq)
	if result.Error != nil {
		return custom.Fail(result.Error.Error(), http.StatusBadRequest)
	}

	return custom.Success(FindModel(int(newFaq.ID)), "FAQ created successfully!")
}

func HandleFaqUpdate(w http.ResponseWriter, r *http.Request) *custom.Response {
	idParam := chi.URLParam(r, "id")

	id, err := strconv.Atoi(idParam)

	if err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	faq := models.Faq{ID: uint(id)}
	if err := json.NewDecoder(r.Body).Decode(&faq); err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	result := database.GetDB().Save(faq)
	if result.Error != nil {
		return custom.Fail(result.Error.Error(), http.StatusBadRequest)
	}

	return custom.Success(FindModel(int(faq.ID)), "FAQ updated successfully!")
}

func HandleFaqDelete(w http.ResponseWriter, r *http.Request) *custom.Response {
	idParam := chi.URLParam(r, "id")

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	model := FindModel(id)

	// TODO: soft delete
	result := database.GetDB().Delete(&models.Faq{}, idParam)
	if result.Error != nil {
		return custom.Fail(result.Error.Error(), http.StatusBadRequest)
	}

	return custom.Success(model, "FAQ deleted successfully!")
}

func FindModel(id int) models.Faq {
	faqItem := models.Faq{}
	database.GetDB().Joins("FaqType").First(&faqItem, id)

	return faqItem
}
