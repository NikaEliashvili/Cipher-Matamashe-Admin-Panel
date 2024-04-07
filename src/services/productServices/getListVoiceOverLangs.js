import matamasheApi from "../matamasheApi";

const getListVoiceOverLangs = async () => {
  try {
    const response = await matamasheApi.get("/list-languages");
    return response.data.languages;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getListVoiceOverLangs;
