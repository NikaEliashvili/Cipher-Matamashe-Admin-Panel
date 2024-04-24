import matamasheApi from "../matamasheApi";

const getProducts = async () => {
  try {
    const response = await matamasheApi.get("/list-products");
    console.log(response);
    const data = JSON.parse(JSON.stringify(response.data));
    console.log(data);
    return data.products;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getProducts;
