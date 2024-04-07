import matamasheApi from "../matamasheApi";

const getListGenres = async () => {
  try {
    const response = await matamasheApi.get("list-genres");
    return response.data.genres;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getListGenres;
