import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class DigiBackendApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${DigiBackendApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  static async getAllDecks() {
    let res = await this.request("decks");
    return res.decks;
  }
  static async getDeck(id) {
    let res = await this.request(`decks/${id}`);
    return res.deck;
  }

  static async updateDeck(id, data) {
    let res = await this.request(`decks/${id}`, data, "patch");
    return res
  }

  static async deleteDeck(id, data) {
    let res = await this.request(`decks/${id}`, data, "delete");
    return res
  }

  static async createDeck(data) {
    let res = await this.request(`decks`, data, "post");
    return res
  }

  // return token after signing up
  static async signup(data) {
    let res = await this.request("auth/register", data, "post");
    return res.token;
  }

  // return token using username and password to log in
  static async login(data) {
    let res = await this.request("auth/token", data, "post");
    return res.token;
  }

  static async getUser(username) {
    console.log("inside getUser", username)
    let res = await this.request(`users/${username}`);
    console.log("inside getUser", res)
    return res.user
  }


}

// for now, put token ("testuser" / "password" on class)
// DigiBackendApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default DigiBackendApi;
