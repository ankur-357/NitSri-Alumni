import { API_URL } from "../../constant";

const sendNotification = async (uid, title, description) => {
    try {
        await fetch(`${API_URL}/sendNotification`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, title, description }),
        });
    } catch (error) {
        console.log(error);
    }
}

export default sendNotification;