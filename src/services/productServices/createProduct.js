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
        developer_id: data.chooseDeveloper,
        images: data.chooseImages,
        categories: data.chooseCategory,
        genres: data.chooseGenre,
        languages: data.voicingLangs,
        subtitles: data.subtitlesLangs,
        tags: [1, 5],
        available: data.chooseAvailability,
        discount: parseFloat(data.discount),
        quantity: parseInt(data.quantity),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log({
      name: data.productName,
      description: data.description,
      developer_id: data.chooseDeveloper,
      images: data.chooseImages,
      categories: data.chooseCategory,
      genres: data.chooseGenre,
      languages: data.voicingLangs,
      subtitles: data.subtitlesLangs,
      tags: [1, 5],
      available: data.chooseAvailability,
      discount: parseFloat(data.discount),
      quantity: parseInt(data.quantity),
    });
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export default createProduct;
