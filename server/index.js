const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const readGSheet = require('./src/readGoogleSheet');
const connectDB = require('./src/config/db');
const addAlumni = require('./src/controller/alumni.controller');
const webPush = require('web-push');
const SubscriptionModel = require('./subscriptionModel');
const http = require("http");
const app = express();
const chatRoutes = require('./chat.js');
const helmet = require('helmet');
const csurf = require('csurf');
const rateLimit = require("express-rate-limit");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(csurf());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// DB Connection
connectDB();
const Message = require("./src/models/Message.js");

const { databases } = require("./src/config/appwrite.js");
// Replace with your database and collection IDs
const DATABASE_ID = "66d71087003555ba4896";
const COLLECTION_ID = "66d769cc0004f4437921";

app.use('/api/chat', chatRoutes);
// Endpoint to handle Excel data upload
app.post("/upload-excel", async (req, res) => {
    const data = req.body;
    console.log("Received data:", data);
    if (!Array.isArray(data)) {
        return res.status(400).send("Invalid data format.");
    }

    try {
        for (const record of data) {
            // Ensure required fields are present
            if (
                !record.username ||
                !record.email ||
                !record.uid ||
                !record.gender ||
                !record.location ||
                !record.name ||
                !record.title ||
                !record.degree ||
                !record.batchEnd ||
                !record.batchStart ||
                !record.branch ||
                !record.phone ||
                !record.role
            ) {
                console.error("Missing required fields in record:", record);
                continue; // Skip invalid records
            }

            // Insert data into the Appwrite database
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
        }

        res.status(200).send("Data uploaded successfully!");
    } catch (error) {
        console.error("Error uploading data to Appwrite:", error.message);
        res.status(500).send("Error uploading data.");
    }
});

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
        for (const subscription of subscriptions) {
            await webPush.sendNotification(
                subscription,
                JSON.stringify({
                    title: req.body.title,
                    description: req.body.description,
                    image: `${API_URL}` + '/apple-icon.png',
                }),
                options
            );
        }
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/messages", async (req, res) => {
    try {
        const room = req.query.room;
        const messages = await Message.find({ room });
        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ error: "Failed to fetch messages" });
    }
});

const { Server } = require("socket.io");
const API_URL = process.env.API_URL;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log(`User Connected to Chat Namespace: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined chat room: ${data}`);
    });

    socket.on("send_message", async (data) => {
        try {
            const message = new Message(data);
            await message.save();
            console.log("Message saved to database:", data);
        } catch (error) {
            console.error("Error saving message to database:", error);
        }
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected from Chat Namespace", socket.id);
    });
});



// Server Listener
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
