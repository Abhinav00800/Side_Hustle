import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_URL || "ws://localhost:5000";

// Create a single socket instance (singleton).
// It will connect immediately when imported.
// You can configure auth or transports here if needed.
const socket = io(URL, {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
