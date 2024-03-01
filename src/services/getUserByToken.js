import axios from "axios";

const API_URL_CHECK = "https://api.matamashe.ge/adminCheck.php";

export default async function getUserByToken(token) {
  const formDataForToken = new FormData();
  formDataForToken.append("token", JSON.stringify(token));
  try {
    const response = await axios.post(
      API_URL_CHECK,
      formDataForToken
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
