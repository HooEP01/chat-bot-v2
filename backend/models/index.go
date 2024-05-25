package models

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var db *gorm.DB

func GetDB() *gorm.DB {
	return db
}

func SetupDatabase() {
	dsn := "host=localhost user=gorm password=gorm dbname=gorm port=5432 sslmode=disable TimeZone=Asia/Kuala_Lumpur"
	postgresDB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	err = postgresDB.AutoMigrate(&FaqType{}, &Faq{}, &Chat{})
	if err != nil {
		fmt.Println("failed to perform migrations: " + err.Error())
	}

	db = postgresDB
}
