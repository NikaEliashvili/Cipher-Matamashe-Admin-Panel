import { useSelector } from "react-redux";
import matamasheApi from "../matamasheApi";
import { authToken } from "../../redux/authSlice";

const createProduct = async () => {
  const token = useSelector(authToken);
  try {
    const response = await matamasheApi.post("/create-product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
  } finally {
  }
};

export default createProduct;
