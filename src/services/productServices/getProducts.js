import matamasheApi from "../matamasheApi";

const getProducts = async () => {
  try {
    const response = await matamasheApi.get("/list-products");
    return response.data.products;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getProducts;
