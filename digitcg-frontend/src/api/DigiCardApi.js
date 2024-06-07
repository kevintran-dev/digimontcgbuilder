import axios from "axios";

const CARD_URL = "https://digimoncard.io/api-public/search.php?";

class DigiCardApi {
    // the token for interactive with the API will be stored here.

    static async request(data = {}, method = "get") {
        console.debug("Card API Call:", data, method);

        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${CARD_URL}`;
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios.get({ url, params })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

}

export default DigiCardApi