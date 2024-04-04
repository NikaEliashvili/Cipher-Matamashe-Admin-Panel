import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    chooseCategory: [],
    chooseGenre: [],
    chooseAvailability: null,
    secondaryPricePS4: null,
    secondaryPricePS5: null,
    secondaryPriceProfitPS4: null,
    secondaryPriceProfitPS5: null,
    primaryPricePS4: null,
    primaryPricePS5: null,
    primaryPriceProfitPS4: null,
    primaryPriceProfitPS5: null,
    chooseImages: [],
    isImagesVisible: false,
    chooseDeveloper: null,
    discount: 0,
    quantity: 0,
    productName: null,
    voicingLangs: [],
    subtitlesLangs: [],
    description: null,
    tags: [],
  },
};

const uploadFormSlice = createSlice({
  name: "uploadForm",
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { fieldName, value } = action.payload;
      state.formData[fieldName] = value;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    },
    resetPriceFields: (state) => {
      state.formData.secondaryPricePS4 = null;
      state.formData.secondaryPricePS5 = null;
      state.formData.secondaryPriceProfitPS4 = null;
      state.formData.secondaryPriceProfitPS5 = null;
      state.formData.primaryPricePS4 = null;
      state.formData.primaryPricePS5 = null;
      state.formData.primaryPriceProfitPS4 = null;
      state.formData.primaryPriceProfitPS5 = null;
    },
    resetPriceFieldsByCategory: (state, action) => {
      const changePS = action.payload === 1 ? "PS5" : "PS4";
      state.formData["secondaryPrice" + changePS] = null;
      state.formData["secondaryPriceProfit" + changePS] = null;
      state.formData["primaryPrice" + changePS] = null;
      state.formData["primaryPriceProfit" + changePS] = null;
    },
  },
});

export const {
  updateFormField,
  resetForm,
  resetPriceFields,
  resetPriceFieldsByCategory,
} = uploadFormSlice.actions;
export const selectFormData = (state) => state.uploadForm.formData;
export default uploadFormSlice.reducer;
