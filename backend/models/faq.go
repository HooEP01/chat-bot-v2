package models

type Faq struct {
	Model
	ID        uint    `json:"id" gorm:"primarykey"`
	ParentID  *uint   `json:"parent_id" gorm:"index; default:null"`
	FaqTypeID uint    `json:"faq_type_id"`
	FaqType   FaqType `json:"faq_type" gorm:"references:ID"`
	Faqs      []Faq   `json:"faqs" gorm:"foreignkey:ParentID;references:ID"`
	Answer    string  `json:"answer"`
	Question  string  `json:"question"`
}
