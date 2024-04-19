import matamasheApi from "../matamasheApi";

const createProduct = async (data, token) => {
  try {
    let priceVersions = [];

    for (const version in data.priceInputs) {
      console.log(data.priceInputs[version], version);
      priceVersions = [
        ...priceVersions,
        {
          version: "secondaryPrice_" + version,
          price: data.priceInputs[version].secondaryPrice
            ? parseFloat(data.priceInputs[version].secondaryPrice)
            : null,
          income: data.priceInputs[version].secondaryPriceProfit
            ? parseFloat(
                data.priceInputs[version].secondaryPriceProfit
              )
            : null,
        },
        {
          version: "primaryPrice_" + version,
          price: data.priceInputs[version].primaryPrice
            ? parseFloat(data.priceInputs[version].primaryPrice)
            : null,
          income: data.priceInputs[version].primaryPriceProfit
            ? parseFloat(data.priceInputs[version].primaryPriceProfit)
            : null,
        },
      ];
    }

    // console.log({
    //   name: data.productName?.trim(),
    //   description: data.description?.trim(),
    //   developer_id: data.chooseDeveloper,
    //   images: data.chooseImages,
    //   versions: priceVersions,
    //   categories: data.chooseCategory,
    //   genres: data.chooseGenre,
    //   languages: data.voicingLangs,
    //   subtitles: data.subtitlesLangs,
    //   tags: data.tags,
    //   available: data.chooseAvailability?.toLowerCase(),
    //   discount: parseFloat(data.discount),
    //   quantity: parseInt(data.quantity),
    // });

    const response = await matamasheApi.post(
      "/create-product",
      {
        name: data.productName?.trim(),
        description: data.description?.trim(),
        developer_id: data.chooseDeveloper,
        images: data.chooseImages,
        versions: priceVersions,
        categories: data.chooseCategory,
        genres: data.chooseGenre,
        languages: data.voicingLangs,
        subtitles: data.subtitlesLangs,
        tags: data.tags,
        available: data.chooseAvailability?.toLowerCase(),
        discount: parseFloat(data.discount),
        quantity: parseInt(data.quantity),
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
    return undefined;
  }
};

export default createProduct;
