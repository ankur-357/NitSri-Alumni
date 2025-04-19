const { Query } = require("node-appwrite");
const { databases, sdk } = require("../config/appwrite");

const addAlumni = async (data, count) => {
    try {
        const { email } = data;
        console.log(data);
        const users = await databases.listDocuments("66d71087003555ba4896", "66d769cc0004f4437921", [
            Query.equal("email", [email]),
        ]);

        if (users.documents.length > 0) {
            console.log(count + 1, "Already exists : ", data.email);
            return;
        }

        const response = await databases.createDocument("66d71087003555ba4896", "66d769cc0004f4437921", sdk.ID.unique(), data);
        console.log(count + 1, "Added : ", data.email);
        return response;
    } catch (error) {
        console.log(count + 1, "Error for : ", data.email, error.message);
    }
}

module.exports = addAlumni;