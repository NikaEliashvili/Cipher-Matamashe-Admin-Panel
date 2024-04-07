import matamasheApi from "../matamasheApi";

const getListSubtitlesLangs = async () => {
  try {
    const response = await matamasheApi.get("/list-subtitles");
    return response.data.subtitles;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getListSubtitlesLangs;
