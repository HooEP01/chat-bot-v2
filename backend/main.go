package main

import (
	"fmt"
	"net/http"

	"github.com/HooEP01/chat-bot-v2/handle"
	"github.com/HooEP01/chat-bot-v2/models"
	"github.com/HooEP01/chat-bot-v2/pkg/websocket"
	"github.com/go-chi/chi/v5"
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

	pool := websocket.NewPool()
	go pool.Start()

	// chat api
	r.Get("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
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
		r.Get("/", handle.Make(handle.HandleFaqList))
		r.Post("/", handle.Make(handle.HandleFaqCreate))

		// Subrouters:
		r.Route("/{id}", func(r chi.Router) {
			r.Delete("/", handle.Make(handle.HandleFaqDelete))
		})
	})

	http.ListenAndServe(":8080", r)
}

func main() {
	fmt.Println("Chat Bot App v0.01")

	// set up database
	models.SetupDatabase()

	// set up routes
	setupRoutes()
}
