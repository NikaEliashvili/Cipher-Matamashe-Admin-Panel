import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    allCategories: [],
    chooseCategory: [],
    chooseGenre: [],
    chooseAvailability: null,
    priceInputs: {},
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
      /**New Version  */
      state.formData.priceInputs = {};
      /**OLD Version  */
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
      /**New Version */
      const category = action.payload;
      delete state.formData.priceInputs[category];
      /**OLD Version */
      const changePS = action.payload === 1 ? "PS5" : "PS4";
      state.formData["secondaryPrice" + changePS] = null;
      state.formData["secondaryPriceProfit" + changePS] = null;
      state.formData["primaryPrice" + changePS] = null;
      state.formData["primaryPriceProfit" + changePS] = null;
    },
    // New reducer to handle category selection and input field rendering
    updateSelectedCategories: (state, action) => {
      state.formData.selectedCategories = action.payload;
      // Reset price fields on category change
      state.formData.priceInputs = {};
      // Generate price inputs based on selected categories
      action.payload.forEach((category) => {
        state.formData.priceInputs[category] = {
          secondaryPrice: null,
          secondaryPriceProfit: null,
          primaryPrice: null,
          primaryPriceProfit: null,
        };
      });
    },
    // Reducer to update price inputs dynamically
    updatePriceInput: (state, action) => {
      const { category, field, value } = action.payload;
      state.formData.priceInputs = {
        ...state.formData.priceInputs,
        [category]: {
          ...state.formData.priceInputs[category],
          [field]: value,
        },
      };

      console.log({ category, field, value });
      console.log(state.formData.priceInputs);
    },
  },
});

export const {
  updateFormField,
  resetForm,
  resetPriceFields,
  resetPriceFieldsByCategory,
  updateSelectedCategories,
  updatePriceInput,
} = uploadFormSlice.actions;
export const selectFormData = (state) => state.uploadForm.formData;
export default uploadFormSlice.reducer;
