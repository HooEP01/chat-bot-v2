package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/HooEP01/chat-bot-v2/database"
	"github.com/HooEP01/chat-bot-v2/handle"
	"github.com/HooEP01/chat-bot-v2/pkg/websocket"
	"github.com/go-chi/chi/v5"
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
		r.Post("/", handle.Make(handle.HandleChatCreate))
	})

	// faq api
	r.Route("/faq", func(r chi.Router) {
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
		r.Get("/", handle.Make(handle.HandleFaqTypeList))
		r.Post("/", handle.Make(handle.HandleFaqTypeCreate))

		// Subrouters:
		r.Route("/{id}", func(r chi.Router) {
			r.Delete("/", handle.Make(handle.HandleFaqTypeDelete))
		})
	})

	defer func() {
		if err := database.CloseDatabase(); err != nil {
			log.Fatalf("Close database: %v", err)
		}
		log.Println("End Process")
	}()

	http.ListenAndServe(":8080", r)
}

func main() {
	fmt.Println("Chat Bot App v0.1.0")

	// set up env
	err := godotenv.Load(".env")
	if err != nil {
		fmt.Println("Failed to get env file.")
	}

	// set up database
	database.SetupDatabase()

	// set up routes
	setupRoutes()

}
