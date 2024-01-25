import axios from "axios";

const instance = axios.create({
  baseURL: "https://thepowerprogress.com/backend/api",
});


export default instance;