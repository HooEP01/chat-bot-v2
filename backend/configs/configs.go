package configs

import (
	"log"
	"os"
	"sync"

	"github.com/joho/godotenv"
)

var (
	configInstance *Configs
	configOnce     sync.Once
)

type Configs struct {
	OpenAiConfigs
	JWTConfigs
}

type OpenAiConfigs struct {
	ApiKey string
}

type JWTConfigs struct {
	Secret string
}

func ReadConfigs() *Configs {
	configOnce.Do(func() {
		if err := godotenv.Load(".env"); err != nil {
			log.Fatalf("Failed to read .env: %v", err)
		}

		openAiConfigs := OpenAiConfigs{
			ApiKey: os.Getenv("OPEN_AI_API_KEY"),
		}

		jwtConfigs := JWTConfigs{
			Secret: os.Getenv("JWT_SECRET"),
		}

		configInstance = &Configs{
			OpenAiConfigs: openAiConfigs,
			JWTConfigs:    jwtConfigs,
		}
	})

	return configInstance
}
