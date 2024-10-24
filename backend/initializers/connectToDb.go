package initializers

import (
	"log"
	"os"

	"example.com/vuegojwt/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectToDB() {
	var err error
	dsn := os.Getenv("DB")
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database.")
	}
}

func MigrateDB() {

	err := DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Printf("Error migrating User Database: %v", err)
	}
}
