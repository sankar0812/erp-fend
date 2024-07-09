import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import request from "../../../utils/request";



const initialState = {
  promotion: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Holiday

export const getPromotion = createAsyncThunk(
  "promotion/get",
  async () => {
    try {
      const promotions = 'promotions';
      const response = await request.get(`${APIURLS.GETPROMOTIONS}`, {
        params: { promotions }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "promotionsssss");
    }
  });

const promotionSlice = createSlice({
  name: "promoriondetails",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // Holidayy

      .addCase(getPromotion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPromotion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.promotion = action.payload;
      })
      .addCase(getPromotion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// Holiday

export const selectAllPromotions = (state) => state.promotions.promotion;
export const getPromotionStatus = (state) => state.promotions.status;
export const getPromotionError = (state) => state.promotions.error;

export const { reducer } = promotionSlice;
export const { addDepartment } = promotionSlice.actions;

export default promotionSlice.reducer;
