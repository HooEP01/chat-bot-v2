package models

import (
	"fmt"
	"sync"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type GormDB struct {
	*gorm.DB
}

var (
	postgresInstance *GormDB
	postgresOnce     sync.Once
	postgresError    error
)

func GetDB() *GormDB {
	postgresOnce.Do(func() {
		postgresInstance, postgresError = SetupDatabase()
	})

	if postgresError != nil {
		return nil
	}

	return postgresInstance
}

func SetupDatabase() (*GormDB, error) {
	dsn := "host=localhost user=gorm password=gorm dbname=gorm port=5432 sslmode=disable TimeZone=Asia/Kuala_Lumpur"
	postgresDB, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	err = postgresDB.AutoMigrate(&FaqType{}, &Faq{}, &Chat{})
	if err != nil {
		return nil, fmt.Errorf("failed to perform migrations: %v", err.Error())
	}

	return &GormDB{postgresDB}, nil
}
