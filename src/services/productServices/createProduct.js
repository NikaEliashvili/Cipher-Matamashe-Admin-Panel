import { useSelector } from "react-redux";
import matamasheApi from "../matamasheApi";
import { authToken } from "../../redux/authSlice";

const createProduct = async (data, token) => {
  try {
    const response = await matamasheApi.post(
      "/create-product",
      {
        name: data.productName,
        description: data.description,
        developer_id: 1,
        categories: data.chooseCategory,
        genres: data.chooseGenre,
        languages: [1, 2],
        subtitles: [1],
        tags: [1, 5],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (err) {
  } finally {
  }
};

export default createProduct;
