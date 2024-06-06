package database

import (
	"fmt"
	"sync"

	"github.com/HooEP01/chat-bot-v2/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var (
	postgresInstance *gorm.DB
	postgresOnce     sync.Once
	postgresError    error
	postgresClose    func() error
)

func GetDB() *gorm.DB {
	postgresOnce.Do(func() {
		postgresInstance, postgresError = SetupDatabase()

		dbInstance, err := postgresInstance.DB()
		if err != nil {
			fmt.Errorf("failed to get sql instance: %v", err)
			return
		}

		postgresClose = dbInstance.Close
	})

	if postgresError != nil {
		return nil
	}

	return postgresInstance
}

func SetupDatabase() (*gorm.DB, error) {
	dsn := "host=localhost user=gorm password=gorm dbname=gorm port=5432 sslmode=disable TimeZone=Asia/Kuala_Lumpur"
	postgresDB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	err = postgresDB.AutoMigrate(&models.FaqType{}, &models.Faq{}, &models.Chat{})
	if err != nil {
		return nil, fmt.Errorf("failed to perform migrations: %v", err.Error())
	}

	dbInstance, _ := postgresDB.DB()
	_ = dbInstance.Close()

	return postgresDB, nil
}

func CloseDatabase() error {
	if postgresClose != nil {
		if err := postgresClose(); err != nil {
			return fmt.Errorf("failed to close database: %v", err)
		}
		return nil
	}

	return fmt.Errorf("database not exist.")
}
