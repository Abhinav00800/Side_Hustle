// src/components/ChatBox.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket"; // <- import the singleton

export default function ChatBox({ currentUserEmail }) {
  const { productId, sellerEmail } = useParams();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const roomId = `${productId}-${[currentUserEmail, sellerEmail].sort().join("-")}`;

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  useEffect(() => {
    // Ensure we're joined after socket connects.
    const joinRoom = () => socket.emit("joinRoom", { roomId });

    if (socket.connected) {
      joinRoom();
    } else {
      socket.once("connect", joinRoom);
    }

    // Load previous messages
    fetch(`${process.env.REACT_APP_BASE_URL || "http://localhost:5000"}/api/chat/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((msg) => ({
          text: msg.text,
          sender: msg.sender === currentUserEmail ? "me" : "other",
        }));
        setChat(formatted);
        setTimeout(scrollToBottom, 50);
      })
      .catch((err) => console.error("Error loading chat history", err));

    // Listener: new incoming messages
    const handleReceive = (data) => {
      setChat((prev) => [...prev, { sender: data.sender === currentUserEmail ? "me" : "other", text: data.text }]);
      setTimeout(scrollToBottom, 50);
    };

    socket.on("receiveMessage", handleReceive);

    // Clean up listeners when component unmounts or roomId changes
    return () => {
      socket.off("receiveMessage", handleReceive);
      socket.off("connect", joinRoom);
      // DO NOT disconnect the socket here — it's shared globally.
    };
  }, [roomId, currentUserEmail, scrollToBottom]);

  const sendMessage = () => {
    const trimmed = message.trim();
    if (trimmed === "") return;

    const msg = { text: trimmed, sender: currentUserEmail };
    socket.emit("sendMessage", { roomId, message: msg });

    setChat((prev) => [...prev, { sender: "me", text: trimmed }]);
    setMessage("");
    if (inputRef.current) inputRef.current.focus();
    setTimeout(scrollToBottom, 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const initials = (email) => {
    if (!email) return "S";
    const part = email.split("@")[0];
    return part.slice(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 h-[80vh] flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold">
          {initials(sellerEmail)}
        </div>
        <div className="flex-1">
          <div className="font-semibold">{sellerEmail || "Seller"}</div>
          <div className="text-[12px] opacity-90">Chat about product #{productId}</div>
        </div>
        <div className="text-xs opacity-90">Connected</div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto" aria-live="polite">
        <div className="space-y-3">
          {chat.map((msg, idx) => {
            const isMe = msg.sender === "me";
            return (
              <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[78%] px-4 py-2 rounded-2xl break-words text-sm relative
                    ${isMe ? "bg-amber-600 text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}
                    shadow-sm`}
                >
                  <div>{msg.text}</div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Composer */}
      <div className="border-t border-gray-200 px-4 py-3 bg-white">
        <div className="flex items-center gap-3">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message (Enter to send)..."
            className="resize-none h-12 md:h-14 flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm"
            aria-label="Type your message"
          />
          <button
            onClick={sendMessage}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-shadow shadow"
            aria-label="Send message"
            title="Send"
          >
            Send
          </button>
        </div>

        <div className="mt-2 text-xs text-gray-400">
          Tip: Press <span className="font-medium">Enter</span> to send, <span className="font-medium">Shift + Enter</span> for a newline.
        </div>
      </div>
    </div>
  );
}
