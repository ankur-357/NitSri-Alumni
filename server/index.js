const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const http = require("http");
const { Server } = require("socket.io");
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");

// Import custom modules
const readGSheet = require('./src/readGoogleSheet');
const connectDB = require('./src/config/db');
const addAlumni = require('./src/controller/alumni.controller');
const webPush = require('web-push');
const SubscriptionModel = require('./subscriptionModel');
const chatRoutes = require('./chat.js');
const Message = require("./src/models/Message.js");
const { databases } = require("./src/config/appwrite.js");

// Constants
const DATABASE_ID = "66d71087003555ba4896";
const COLLECTION_ID = "66d769cc0004f4437921";
const API_URL = process.env.API_URL;

const app = express();
const server = http.createServer(app);

// Enhanced CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL]
        : ["http://localhost:5173", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

// Enhanced rate limiting
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: 'Too many requests, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 60, // limit each IP to 60 messages per minute
    message: 'Too many messages, please slow down.',
});

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
app.use(express.json({ limit: '10mb' }));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(generalLimiter);

// DB Connection
connectDB();

// Socket.IO setup with enhanced configuration
const io = new Server(server, {
    cors: corsOptions,
    pingTimeout: 60000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e6, // 1MB
    allowEIO3: true
});

// Room management
const activeRooms = new Map();
const userSockets = new Map();

// Enhanced socket connection handling
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Join room with validation and user tracking
    socket.on("join_room", (data) => {
        try {
            const { room, username } = data;

            if (!room || !username) {
                socket.emit("error", { message: "Room and username are required" });
                return;
            }

            // Validate room name (alphanumeric and limited length)
            if (!/^[a-zA-Z0-9_-]{1,50}$/.test(room)) {
                socket.emit("error", { message: "Invalid room name" });
                return;
            }

            socket.join(room);
            socket.room = room;
            socket.username = username;

            // Track active rooms and users
            if (!activeRooms.has(room)) {
                activeRooms.set(room, new Set());
            }
            activeRooms.get(room).add(socket.id);
            userSockets.set(socket.id, { room, username });

            // Notify room about new user
            socket.to(room).emit("user_joined", {
                username,
                message: `${username} joined the room`,
                timestamp: Date.now(),
                type: 'system'
            });

            // Send room info to user
            socket.emit("room_joined", {
                room,
                activeUsers: activeRooms.get(room).size,
                message: `Welcome to room ${room}!`
            });

            console.log(`User ${username} (${socket.id}) joined room: ${room}`);
        } catch (error) {
            console.error("Error joining room:", error);
            socket.emit("error", { message: "Failed to join room" });
        }
    });

    // Enhanced message handling with validation and rate limiting
    socket.on("send_message", async (data) => {
        try {
            const { room, author, message, time } = data;

            // Validation
            if (!room || !author || !message || !time) {
                socket.emit("error", { message: "Invalid message data" });
                return;
            }

            // Message length validation
            if (message.length > 1000) {
                socket.emit("error", { message: "Message too long (max 1000 characters)" });
                return;
            }

            // Profanity filter (basic implementation)
            const forbiddenWords = ['spam', 'abuse']; // Add more as needed
            const containsProfanity = forbiddenWords.some(word =>
                message.toLowerCase().includes(word.toLowerCase())
            );

            if (containsProfanity) {
                socket.emit("error", { message: "Message contains inappropriate content" });
                return;
            }

            const messageData = {
                ...data,
                timestamp: Date.now(),
                id: `msg_${Date.now()}_${socket.id}`,
                socketId: socket.id
            };

            // Save to database with error handling
            try {
                const messageDoc = new Message(messageData);
                await messageDoc.save();
                console.log("Message saved:", messageData.id);
            } catch (dbError) {
                console.error("Database error:", dbError);
                // Don't block the message if DB fails, but log it
            }

            // Broadcast message to room
            socket.to(room).emit("receive_message", messageData);

            // Send confirmation to sender
            socket.emit("message_sent", { id: messageData.id, status: 'delivered' });

        } catch (error) {
            console.error("Error sending message:", error);
            socket.emit("error", { message: "Failed to send message" });
        }
    });

    // Enhanced disconnect handling
    socket.on("disconnect", () => {
        console.log("User Disconnected:", socket.id);

        const userData = userSockets.get(socket.id);
        if (userData) {
            const { room, username } = userData;

            // Remove from active rooms
            if (activeRooms.has(room)) {
                activeRooms.get(room).delete(socket.id);
                if (activeRooms.get(room).size === 0) {
                    activeRooms.delete(room);
                }
            }

            // Notify room about user leaving
            socket.to(room).emit("user_left", {
                username,
                message: `${username} left the room`,
                timestamp: Date.now(),
                type: 'system'
            });

            userSockets.delete(socket.id);
        }
    });

    // Handle connection errors
    socket.on("error", (error) => {
        console.error("Socket error:", error);
    });
});

// API Routes
app.use('/api/chat', chatRoutes);

// Enhanced message fetching with pagination
app.get("/api/messages", async (req, res) => {
    try {
        const { room, page = 1, limit = 50 } = req.query;

        if (!room) {
            return res.status(400).json({ error: "Room parameter is required" });
        }

        const skip = (page - 1) * limit;
        const messages = await Message.find({ room })
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .lean(); // Use lean() for better performance

        // Reverse to show oldest first
        messages.reverse();

        res.json({
            messages,
            page: parseInt(page),
            hasMore: messages.length === parseInt(limit)
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

// Room statistics endpoint
app.get("/api/rooms/stats", (req, res) => {
    const stats = {
        activeRooms: Array.from(activeRooms.keys()).map(room => ({
            room,
            activeUsers: activeRooms.get(room).size
        })),
        totalActiveUsers: userSockets.size,
        totalActiveRooms: activeRooms.size
    };

    res.json(stats);
});

// Excel upload endpoint with enhanced error handling
app.post("/upload-excel", async (req, res) => {
    const data = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ error: "Invalid data format. Expected array." });
    }

    const results = {
        successful: 0,
        failed: 0,
        errors: []
    };

    try {
        for (const [index, record] of data.entries()) {
            // Enhanced validation
            const requiredFields = [
                'username', 'email', 'uid', 'gender', 'location',
                'name', 'title', 'degree', 'batchEnd', 'batchStart',
                'branch', 'phone', 'role'
            ];

            const missingFields = requiredFields.filter(field => !record[field]);

            if (missingFields.length > 0) {
                results.failed++;
                results.errors.push({
                    index,
                    error: `Missing required fields: ${missingFields.join(', ')}`
                });
                continue;
            }

            try {
                await databases.createDocument(DATABASE_ID, COLLECTION_ID, record.uid, {
                    username: record.username,
                    email: record.email,
                    uid: record.uid,
                    gender: record.gender,
                    location: record.location,
                    name: record.name,
                    title: record.title,
                    degree: record.degree,
                    batchEnd: String(record.batchEnd),
                    batchStart: String(record.batchStart),
                    branch: record.branch,
                    phone: record.phone,
                    role: record.role,
                });

                results.successful++;
            } catch (dbError) {
                results.failed++;
                results.errors.push({
                    index,
                    uid: record.uid,
                    error: dbError.message
                });
            }
        }

        res.status(200).json({
            message: "Upload completed",
            results
        });
    } catch (error) {
        console.error("Error processing upload:", error);
        res.status(500).json({ error: "Failed to process upload" });
    }
});

// Push notification endpoints (existing functionality preserved)
app.post('/subscribe', async (req, res) => {
    const { subscription, uid } = req.body;
    try {
        const newSubscription = await SubscriptionModel.create({ uid, ...subscription });
        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/unsubscribe', async (req, res) => {
    const { endpoint } = req.body;
    try {
        const deletedSubscription = await SubscriptionModel.findOneAndDelete({ endpoint });
        res.status(200).json(deletedSubscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/sendNotification', async (req, res) => {
    const subscriptions = await SubscriptionModel.find({ uid: req.body.uid });

    const options = {
        vapidDetails: {
            subject: 'mailto:myemail@example.com',
            publicKey: process.env.VAPID_PUBLIC_KEY,
            privateKey: process.env.VAPID_PRIVATE_KEY,
        },
    };

    try {
        const promises = subscriptions.map(subscription =>
            webPush.sendNotification(
                subscription,
                JSON.stringify({
                    title: req.body.title,
                    description: req.body.description,
                    image: `${API_URL}/apple-icon.png`,
                }),
                options
            )
        );

        await Promise.allSettled(promises);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

// Server listener
server.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
    console.log(`📊 Health check available at: http://localhost:${PORT}/health`);
});

module.exports = { app, server, io };