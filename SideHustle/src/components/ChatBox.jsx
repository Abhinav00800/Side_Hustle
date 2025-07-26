import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

// Connect once globally
const socket = io("ws://localhost:5000");
// const socket = io();

export default function ChatBox({ currentUserEmail }) {
  const { productId, sellerEmail } = useParams();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const roomId = `${productId}-${[currentUserEmail, sellerEmail].sort().join("-")}`;

  useEffect(() => {
  // Join room
  socket.emit("joinRoom", { roomId });

  // Load previous messages
  fetch(`http://localhost:5000/api/chat/${roomId}`)
    .then((res) => res.json())
    .then((data) => {
      const formatted = data.map((msg) => ({
        text: msg.text,
        sender: msg.sender === currentUserEmail ? "me" : "other",
      }));
      setChat(formatted);
    })
    .catch((err) => console.error("Error loading chat history", err));

  // Listen for new messages
  socket.on("receiveMessage", (data) => {
    setChat((prev) => [...prev, { sender: "other", text: data.text }]);
  });

  return () => {
    socket.off("receiveMessage");
  };
}, [roomId, currentUserEmail]);


  const sendMessage = () => {
    if (message.trim() === "") return;

    const msg = { text: message, sender: currentUserEmail };
    socket.emit("sendMessage", { roomId, message: msg });

    setChat((prev) => [...prev, { sender: "me", text: message }]);
    setMessage("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h3>Chat with Seller ({sellerEmail})</h3>

      <div
        style={{
          border: "1px solid #ccc",
          height: "300px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "me" ? "right" : "left",
              marginBottom: "5px",
            }}
          >
            <span
              style={{
                background: msg.sender === "me" ? "#021a35ff" : "#021a35ff",
                padding: "8px 12px",
                borderRadius: "12px",
                display: "inline-block",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
}
