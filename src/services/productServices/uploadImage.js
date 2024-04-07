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
    return response.data.url;
  } catch (err) {
    console.log(err);
  }
};

export default uploadImage;
