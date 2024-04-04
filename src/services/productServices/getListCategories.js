import matamasheApi from "../matamasheApi";

const getListCategories = async () => {
  try {
    const response = await matamasheApi.get("list-categories");
    console.log(response.data.categories);
    return response.data.categories;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default getListCategories;
