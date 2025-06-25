import io from "socket.io-client";
import "./Chatroom.css";
import Chat from './Chat';
import { useState } from "react";

const socket = io.connect("/");

function Chatroom() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const joinRoom = async () => {
        if (username.trim() !== "" && room.trim() !== "") {
            setIsLoading(true);
            // Simulate loading for better UX
            setTimeout(() => {
                socket.emit("join_room", room);
                setShowChat(true);
                setIsLoading(false);
            }, 2000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            joinRoom();
        }
    };

    return (
        <div className="chatroom-container">
            {/* Animated Background */}
            <div className="background-animation">
                <div className="floating-bubble bubble-1"></div>
                <div className="floating-bubble bubble-2"></div>
                <div className="floating-bubble bubble-3"></div>
                <div className="floating-bubble bubble-4"></div>
                <div className="floating-bubble bubble-5"></div>
            </div>

            {!showChat && (
                <div className="join-chat-wrapper">
                    <div className="join-chat-container">
                        {/* Logo/Icon */}
                        <div className="logo-container">
                            <div className="chat-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 3C17.5 3 21 6.58 21 11C21 15.42 17.5 19 12 19C10.76 19 9.57 18.82 8.47 18.5C5.55 21 2 21 2 21C4.33 18.67 4.7 17.1 4.75 16.5C3.05 15.07 2 13.13 2 11C2 6.58 5.5 3 12 3Z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="welcome-section">
                            <h1 className="welcome-title">Welcome to ChatSpace</h1>
                            <p className="welcome-subtitle">Connect with Alumnis in real-time</p>
                        </div>

                        {/* Form */}
                        <div className="form-section">
                            <div className="input-group">
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="form-input"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V8L12 13L19 8V19ZM12 11L5 6H19L12 11Z" fill="currentColor" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Enter room code"
                                        value={room}
                                        onChange={(e) => setRoom(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        className="form-input"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={joinRoom}
                                disabled={!username.trim() || !room.trim() || isLoading}
                                className={`join-button ${isLoading ? 'loading' : ''}`}
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center ">
                                        <span>Joining...</span>
                                    </div>
                                ) : (
                                    <>
                                        <span>Join Room</span>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Features */}
                        <div className="features-section">
                            <div className="feature-item">
                                <div className="feature-icon">⚡</div>
                                <span>Real-time messaging</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🔒</div>
                                <span>Secure & private</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-icon">🌐</div>
                                <span>Multi-platform</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showChat && (
                <div className="chat-wrapper">
                    <Chat socket={socket} username={username} room={room} setShowChat={setShowChat} />
                </div>
            )}
        </div>
    );
}

export default Chatroom;