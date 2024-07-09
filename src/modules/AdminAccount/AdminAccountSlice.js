import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../utils/request";
import { APIURLS } from "../../utils/ApiUrls/Hrm";


const initialState = {
  adminget: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Holiday

export const getAdminAccount = createAsyncThunk(
  "adminAccount/get",
  async () => {
    try {
      const viewType = 'AdminLogin';
      const response = await request.get(`${APIURLS.GETADMINACCOUNT}`, {
        params: { viewType }
      })
      return response.data
    } catch (error) {
      // throw error;
      console.log(error, "busineeees");
    }
  });

const adminProfileSlice = createSlice({
  name: "admingetreq",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // Admin Account

      .addCase(getAdminAccount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAdminAccount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.adminget = action.payload;
      })
      .addCase(getAdminAccount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// Admin Account

export const selectAllAdminAccount = (state) => state.adminaccget.adminget;
export const getAdminAccountStatus = (state) => state.adminaccget.status;
export const getAdminAccountError = (state) => state.adminaccget.error;

export const { reducer } = adminProfileSlice;
export const { addDepartment } = adminProfileSlice.actions;

export default adminProfileSlice.reducer;
