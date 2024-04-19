import matamasheApi from "../matamasheApi";

const deleteImage = async (token, fileName) => {
  try {
    console.log({ fileName });
    const response = await matamasheApi.post(
      "/delete-uploaded-image",
      { filename: fileName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default deleteImage;
