const express = require("express");
const bodyParser = require("body-parser");
const { databases } = require("./config/appwrite"); // Import the configured Appwrite client
const app = express();


// Middleware
app.use(bodyParser.json());

// Replace with your database and collection IDs
const DATABASE_ID = "66d71087003555ba4896";
const COLLECTION_ID = "66d769cc0004f4437921";

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
                batchEnd: record.batchEnd,
                batchStart: record.batchStart,
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