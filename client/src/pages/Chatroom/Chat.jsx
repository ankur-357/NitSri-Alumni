import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from 'axios';
import './Chat.css'; // Make sure to import the CSS file
import { useNavigate } from 'react-router-dom';

function Chat({ socket, username, room, setShowChat }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`https://nitsri-alumni-1.onrender.com/api/messages?room=${room}`);
            setMessageList(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = async () => {
        if (currentMessage.trim() !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                timestamp: Date.now()
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    useEffect(() => {
        fetchMessages();
        socket.off("receive_message").on("receive_message", (data) => {
            setMessageList((prev) => [...prev, data]);
        });
    }, [socket, room]);

    return (
        <div className="chat-container py-8" style={{ marginTop: "24px", marginBottom: "24px" }}>
            <div className="chat-header">
                <div className="header-content">
                    <button className="back-button" onClick={() => {
                        setShowChat(false);
                    }}>⬅ Back</button>
                    <div className="room-info">
                        <h3>Room: {room}</h3>
                        <span className="online-indicator">● Online</span>
                    </div>
                    <div className="header-actions">
                        <button className="header-btn">⚙️</button>
                        <button className="header-btn">ℹ️</button>
                    </div>
                </div>
            </div>

            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList?.map((messageContent, index) => {
                        const isOwnMessage = username === messageContent.author;
                        return (
                            <div
                                className={`message-wrapper ${isOwnMessage ? 'own-message' : 'other-message'}`}
                                key={index}
                            >
                                <div className="message-bubble">
                                    <div className="message-content">
                                        {messageContent.message}
                                    </div>
                                    <div className="message-meta">
                                        <span className="message-time">{messageContent.time}</span>
                                        {!isOwnMessage && (
                                            <span className="message-author text-white py-2 ml-1">{messageContent?.author}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>

            <div className="chat-footer">
                <div className="input-container">
                    <input
                        type="text"
                        value={currentMessage}
                        placeholder="Type your message..."
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="message-input"
                    />
                    <button
                        onClick={sendMessage}
                        className="send-button"
                        disabled={!currentMessage.trim()}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;