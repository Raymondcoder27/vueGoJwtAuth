package initializers

import "example.com/vuegojwt/models"

// "github.com/goJwt/models"

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}
