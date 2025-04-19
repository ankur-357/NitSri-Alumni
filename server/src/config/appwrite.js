const sdk = require('node-appwrite');

let client = new sdk.Client();
console.log(process.env.APPWRITE_API_KEY);
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('66d70fbd0023cf963702') // Your project ID
    .setKey(process.env.APPWRITE_API_KEY) // Your secret API key
    .setSelfSigned() // Use only on dev mode with a self-signed SSL cert
    ;

const users = new sdk.Users(client);
const databases = new sdk.Databases(client);

module.exports = { sdk, client, databases, users };