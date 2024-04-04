import axios from "axios";
const baseUrl = "https://api.matamashe.ge";

const matamasheApi = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export default matamasheApi;
