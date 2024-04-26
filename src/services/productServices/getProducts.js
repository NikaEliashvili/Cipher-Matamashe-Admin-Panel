import matamasheApi from "../matamasheApi";

const getProducts = async (page = 1, limit = 5) => {
  try {
    const response = await matamasheApi.get(
      `/list-products?page=${page}&limit=${limit}`
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getProducts;
