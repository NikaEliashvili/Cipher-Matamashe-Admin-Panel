import matamasheApi from "../matamasheApi";

const getListDevelopers = async () => {
  try {
    const response = await matamasheApi.get("/list-developers");
    console.log(response);
    return response.data.developers;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getListDevelopers;
