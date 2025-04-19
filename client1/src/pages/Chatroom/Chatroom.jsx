import io from "socket.io-client";
import "./Chat.css"; // Assuming you have custom CSS for specific details
import Chat from './Chat';
import { useState } from "react";
const socket = io.connect("/");

function Chatroom() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
                {!showChat && (
                    <div className="joinChatContainer flex flex-col items-center bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-md">
                        <h3 className="text-2xl font-semibold text-sky-500 mb-6">Join a Chat Room</h3>
                        <input
                            type="text"
                            placeholder="Your Name"
                            onChange={(e) => setUsername(e.target.value)}
                            className="mb-4 p-3 w-full bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <input
                            type="text"
                            placeholder="Room ID"
                            onChange={(e) => setRoom(e.target.value)}
                            className="mb-6 p-3 w-full bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                        <button
                            onClick={joinRoom}
                            className="bg-[#4B164C] text-white px-6 py-3 rounded-lg w-full hover:bg-black transition duration-300"
                        >
                            Join Room
                        </button>
                    </div>
                )}
                {showChat && (
                    <Chat socket={socket} username={username} room={room} />
                )}
            </div>
        </>
    );
}

export default Chatroom;
