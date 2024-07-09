import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";

const initialState = {
  leave:[],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get leaves

export const getPLDashboardLeave = createAsyncThunk("leaves/get", async () => {
  try {
    const PL = "employeeleave";
    const response = await request.get(`${APIURLS.GETPLDASHLEAVE}`, {
      params: { PL },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "leave");
  }
});

const PLDashboard = createSlice({
  name: "PLDashboardDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

        // tl dashboard leaves
        .addCase(getPLDashboardLeave.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getPLDashboardLeave.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.leave = action.payload;
        })
        .addCase(getPLDashboardLeave.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
  },
});

//leaves
export const selectAllPLDashLeaves = (state) => state.plDash.leave;
export const getAllPLDashLeavesStatus = (state) => state.plDash.status;
export const getAllPLDashLeavesError = (state) => state.plDash.error;


export const { reducer } = PLDashboard;

export default PLDashboard.reducer