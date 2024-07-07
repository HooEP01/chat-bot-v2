package models

type FaqType struct {
	Model
	Name        string `json:"name"`
	Description string `json:"description"`
}
