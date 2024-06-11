package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Configs struct {
	OpenAiConfigs
}

type OpenAiConfigs struct {
	ApiKey string
}

func ReadConfigs() *Configs {
	if err := godotenv.Load(".env"); err != nil {
		log.Fatalf("Failed to read .env: %v", err)
	}

	openAiConfigs := OpenAiConfigs{
		ApiKey: os.Getenv("OPEN_AI_API_KEY"),
	}

	return &Configs{
		OpenAiConfigs: openAiConfigs,
	}
}
