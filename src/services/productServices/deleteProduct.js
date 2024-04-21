import matamasheApi from "../matamasheApi";

const deleteProduct = async (id, token) => {
  try {
    const response = matamasheApi.post(
      "/delete-product",
      {
        product_id: id,
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
    console.log(err);
  }
};

export default deleteProduct;
