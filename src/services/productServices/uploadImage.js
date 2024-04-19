import matamasheApi from "../matamasheApi";

const uploadImage = async (token, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);
    const response = await matamasheApi.post(
      "/upload-image",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return typeof response.data.url === "string"
      ? response.data.url
      : null;
  } catch (err) {
    console.log(err);

    return null;
  }
};

export default uploadImage;
