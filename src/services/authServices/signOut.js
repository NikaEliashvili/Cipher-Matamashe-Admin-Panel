import { clearJWT } from "../../redux/authSlice";
import matamasheApi from "../matamasheApi";

const signOut = async (token, dispatch) => {
  try {
    const response = await matamasheApi.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Dispatch the action directly.
    if (response.status === 200) {
      dispatch(clearJWT());
    } else {
      console.error("Logout failed.");
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export default signOut;
