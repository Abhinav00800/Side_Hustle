import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const API_KEY = 'AIzaSyCj3YsagBV9o1CfpokKwxTvJyrgXrvmLgc';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const chatBoxRef = useRef(null);
  const initialMessageSent = useRef(false);

  useEffect(() => {
    if (!initialMessageSent.current) {
      sendInitialMessage();
      initialMessageSent.current = true;
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chatHistory]);

  const appendMessage = (sender, message) => {
    setChatHistory((prev) => [...prev, { sender, text: message }]);
  };

  const formatText = (text) => {
    return text
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Bold for headings
      .replace(/_(.*?)_/g, '<em>$1</em>') // Italics for subheadings
      .replace(/•/g, '<li>') // Bullet points
      .replace(/\n/g, '<br>'); // Line breaks
  };

  const getBotResponse = async (userMessage) => {
    const updatedHistory = [
      ...chatHistory,
      { sender: 'user', text: userMessage },
    ];
    const conversationHistory = updatedHistory
      .map((entry) => `${entry.sender}: ${entry.text}`)
      .join('\n');

    try {
      const result = await model.generateContent(conversationHistory);
      const response = await result.response;
      const text = await response.text();
      appendMessage('bot', formatText(text));
    } catch (error) {
      console.error('Error:', error);
      appendMessage('bot', 'Sorry, something went wrong.');
    }
  };

  const sendInitialMessage = async () => {
    const initialMessage = "Hello! Please start the conversation directly by greeting and saying thanks for choosing SideHustle(A online platform to enhance side business). Here you can tell me how to create new various products.";
    try {
      const result = await model.generateContent(initialMessage);
      const response = await result.response;
      const text = await response.text();
      appendMessage('bot', formatText(text));
      window.scrollTo(0, document.body.scrollHeight);
    } catch (error) {
      console.error('Error:', error);
      appendMessage('bot', 'Sorry, something went wrong.');
    }
  };

  const handleSend = () => {
    if (userMessage.trim()) {
      const additionalText = ". Give me the best answer for this question if it is created to sell in the market to earn profit.";
      const messageToSend = userMessage + additionalText;
      appendMessage('user', userMessage);
      setUserMessage('');
      getBotResponse(messageToSend);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div 
  className="d-flex align-items-start justify-content-center vh-100 bg-dark p-3" 
  style={{ 
    backgroundImage: "url('https://media.istockphoto.com/id/536507269/photo/night-sky-with-bright-stars-and-blue-nebula.jpg?s=612x612&w=0&k=20&c=GyiSGEZ-zAD7SHrhTrlpanoCVpIH2MhLjVHXJ8huWC4=')",
    backgroundSize: 'fill',
    backgroundPosition: 'center' 
  }}
>
<Link className="nav-link text-light fs-5 m-1" to="/">
                <i className="bi bi-house-fill me-1"></i>Home
              </Link>
      <div className="card w-100 max-w-3xl shadow m-5" style={{ maxHeight: '100vh',maxWidth: '100vh'}}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Ask Me!</h5>
        </div>
        <div className="card-body bg-light" ref={chatBoxRef} style={{  overflowY: 'auto' }}>
          {chatHistory.map((msg, index) => (
            <div key={index} className={`my-2 text-${msg.sender === 'bot' ? 'start' : 'end'}`}>
              <div className={`p-3 rounded ${msg.sender === 'bot' ? 'bg-secondary text-white' : 'bg-primary text-white'}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
            </div>
          ))}
        </div>
        <div className="card-footer bg-light d-flex align-items-center">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-control me-2"
            placeholder="Type a message..."
          />
          <button className="btn btn-primary" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;


