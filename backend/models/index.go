package models

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func SetupDatabase() {
	dsn := "host=localhost user=gorm password=gorm dbname=gorm port=5432 sslmode=disable TimeZone=Asia/Kuala_Lumpur"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	err = db.AutoMigrate(&FaqType{}, &Faq{})
	if err != nil {
		fmt.Println("failed to perform migrations: " + err.Error())
	}
}
