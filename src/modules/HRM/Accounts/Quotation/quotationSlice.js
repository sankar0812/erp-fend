import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";



const initialState = {
  addquotation: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Holiday

export const getquotation = createAsyncThunk(
  "quotationss/get",
  async () => {
    try {
        const view = 'quotation';
      const response = await request.get(`${APIURLS.GETQUOTATION}`, {
        params: { view }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "quotationyyy");
    }
  });

const QuatationSlice = createSlice({
  name: "clientDetails",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // quotation

      .addCase(getquotation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getquotation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addquotation = action.payload;
      })
      .addCase(getquotation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});


export const viewquotation = (state) => state.quotation.addquotation;
export const getquotationStatus = (state) => state.quotation.status;
export const getquotationError = (state) => state.quotation.error;

export const { reducer } = QuatationSlice;
export const { addDepartment } = QuatationSlice.actions;

export default QuatationSlice.reducer;
