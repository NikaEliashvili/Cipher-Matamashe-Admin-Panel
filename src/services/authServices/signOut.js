import { clearJWT } from "../../redux/authSlice";
import { resetForm } from "../../redux/uploadFormSlice";
import matamasheApi from "../matamasheApi";

const signOut = async (token, dispatch) => {
  try {
    const response = await matamasheApi.post("/logout", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Dispatch the action directly.
    dispatch(clearJWT());
    dispatch(resetForm());

    return response.data;
  } catch (error) {
    console.log(error);
    dispatch(clearJWT());
    dispatch(resetForm());
    throw error.response;
  }
};

export default signOut;
