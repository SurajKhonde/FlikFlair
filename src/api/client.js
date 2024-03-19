import axios from "axios";

const client = axios.create({
  baseURL: "https://flickflair-serversideapi.vercel.app/api",
});

export default client;
