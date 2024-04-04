import { useSelector } from "react-redux";
import { setNewJWT } from "../../redux/authSlice";
import matamasheApi from "../matamasheApi";

const refreshToken = async (token, dispatch) => {
  try {
    const response = await matamasheApi.post("/refresh-token", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log(response);
      const newToken = response.data.token;
      dispatch(setNewJWT(newToken));
      console.log("Token refreshed successfully.");
    } else {
      console.error("Token refresh failed.");
    }
  } catch (error) {
    console.error("Error during token refresh:", error);
  }
};

export default refreshToken;
