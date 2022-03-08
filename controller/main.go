package main

import (
	"net/http"

	"github.com/gorilla/websocket"
	"go.uber.org/zap"
)

var (
	upgrader = websocket.Upgrader{}
	log      = zap.Sugar()
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Infow("asset request",
			"url", r.URL.String(),
			"ip", r.RemoteAddr,
		)
		// TODO: respond with assets here
		w.Write([]byte("Hello World"))
	})

	http.HandleFunc("/websocket", func(w http.ResponseWriter, r *http.Request) {
		l := log.With(
			"url", r.URL.String(),
			"ip", r.RemoteAddr,
		)
		l.Infow("websocket request")

		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			return
		}

		for {
			// Read message from browser
			msgType, msg, err := conn.ReadMessage()

			if err != nil {
				return
			}

			// Print the message to the console
			log.Infow("message received", "msg", msg, "type", msgType)

			// Write message back to browser
			if err = conn.WriteMessage(msgType, msg); err != nil {
				return
			}
		}
	})

	http.ListenAndServe(":8080", nil)
}
