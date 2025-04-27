import { useState, useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from 'axios';

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const fetchMessages = async () => {
        try {
            const response = await axios.get(`https://nitsri-alumni-1.onrender.com/api/messages?room=${room}`);
            setMessageList(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };
    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: `${new Date(Date.now()).getHours()}:${new Date(
                    Date.now()
                ).getMinutes()}`,
            };
            console.log(messageData);
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            console.log(messageList);
            setCurrentMessage("");
        }
    };

    useEffect(() => {
        fetchMessages(); // Fetch previous messages when component mounts
        socket.off("receive_message").on("receive_message", (data) => {
            setMessageList((prev) => [...prev, data]);
        });
    }, [socket, room]);


    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messageList?.map((messageContent, index) => {
                        return (
                            <div
                                className="message"
                                id={username === messageContent.author ? "other" : "you"}
                                key={index}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>

                                    </div>
                                    <div className="message-meta">
                                        <p id="time" >{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Message..."
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyUp={(e) => {
                        e.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
}

export default Chat;
