import axios from "axios"

const instance = axios.create({
  baseURL: "https://hamburger-764ca-default-rtdb.firebaseio.com/",
});

export default instance;