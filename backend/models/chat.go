package models

import (
	"context"
	"net/http"
	"os"

	"github.com/HooEP01/chat-bot-v2/utils/custom"
	"github.com/sashabaranov/go-openai"
)

type Chat struct {
	Model
	UserID   string `json:"user_id"`
	Question string `json:"question"`
}

// func (c Chat) AutoResponse() *custom.Response {

// 	go func() {
// 		result := database.GetDB().Create(&c)
// 		if result.Error != nil {
// 			fmt.Println(result.Error.Error())
// 		}
// 	}()

// 	// Fuzzy search

// 	return c.SendChatGPT()
// }

func (c Chat) SendChatGPT() *custom.Response {
	apiKey := os.Getenv("OPEN_AI_API_KEY")

	client := openai.NewClient(apiKey)
	response, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT3Dot5Turbo,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: c.Question,
				},
			},
		},
	)

	if err != nil {
		return custom.Fail(err.Error(), http.StatusBadRequest)
	}

	return custom.Success(response.Choices[0].Message.Content, "Chat reply successfully!")
}
