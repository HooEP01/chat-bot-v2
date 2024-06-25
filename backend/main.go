package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/HooEP01/chat-bot-v2/configs"
	"github.com/HooEP01/chat-bot-v2/database"
	"github.com/HooEP01/chat-bot-v2/handle"
	"github.com/HooEP01/chat-bot-v2/models"
	"github.com/HooEP01/chat-bot-v2/pkg/websocket"
	"github.com/go-chi/chi/v5"
	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {

	r := chi.NewRouter()

	// cors for local
	r.Use(cors.AllowAll().Handler)

	pool := websocket.NewPool()
	go pool.Start()

	// ws
	r.Get("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})

	// chat api
	r.Route("/chat", func(r chi.Router) {
		r.Use(Authenticate)
		r.Post("/", handle.Make(handle.HandleChatCreate))
	})

	// faq api
	r.Route("/faq", func(r chi.Router) {
		r.Use(Authenticate)
		r.Get("/", handle.Make(handle.HandleFaqList))
		r.Post("/", handle.Make(handle.HandleFaqCreate))

		// Subrouters:
		r.Route("/{id}", func(r chi.Router) {
			r.Get("/", handle.Make(handle.HandleFaqItem))
			r.Put("/", handle.Make(handle.HandleFaqUpdate))
			r.Delete("/", handle.Make(handle.HandleFaqDelete))
		})
	})

	// faq type api
	r.Route("/faq-type", func(r chi.Router) {
		r.Use(Authenticate)
		r.Get("/", handle.Make(handle.HandleFaqTypeList))
		r.Post("/", handle.Make(handle.HandleFaqTypeCreate))

		// Subrouters:
		r.Route("/{id}", func(r chi.Router) {
			r.Delete("/", handle.Make(handle.HandleFaqTypeDelete))
		})
	})

	r.Route("/auth", func(r chi.Router) {
		r.Post("/login", handle.Make(handle.HandleAuthLogin))
		r.Post("/register", handle.Make(handle.HandleAuthRegister))
		r.Post("/logout", handle.Make(handle.HandleAuthLogout))
	})

	defer func() {
		if err := database.CloseDatabase(); err != nil {
			log.Fatalf("Close database: %v", err)
		}
		log.Println("End Process")
	}()

	http.ListenAndServe(":8080", r)
}

func Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")

		// Parse the token
		token, err := jwt.ParseWithClaims(tokenString, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Method)
			}
			return []byte(configs.ReadConfigs().JWTConfigs.Secret), nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(*jwt.RegisteredClaims)
		if !ok || claims.Subject == "" { // Check if claims could be parsed and ID is not empty
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		subjectStr := claims.Subject
		subjectInt, err := strconv.Atoi(subjectStr)
		if err != nil {
			log.Printf("Error parsing subject to integer: %v", err)
			http.Error(w, "Bad Request", http.StatusBadRequest)
			return
		}

		// Retrieve user data from database
		userItem := models.User{}
		result := database.GetDB().First(&userItem, "id = ?", subjectInt)

		if result.Error != nil {
			log.Printf("Failed to get user data: %v", result.Error)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			return
		}

		// Proceed with the next handler if everything is fine
		ctx := context.WithValue(r.Context(), "user", userItem)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func main() {
	fmt.Println("Chat Bot App v0.1.0")

	// set up env
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Failed to get env file.")
	}

	// set up config
	configs.ReadConfigs()

	// set up database
	database.SetupDatabase()

	// set up routes
	setupRoutes()

}
