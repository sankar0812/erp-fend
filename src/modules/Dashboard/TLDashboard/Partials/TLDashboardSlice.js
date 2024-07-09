import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";

const initialState = {
  leave:[],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get leaves

export const getTLDashboardLeave = createAsyncThunk("leaves/get", async () => {
  try {
    const TL = "employeeleave";
    const response = await request.get(`${APIURLS.GETTLDASHLEAVE}`, {
      params: { TL },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "leave");
  }
});

const TLDashboard = createSlice({
  name: "TLDashboardDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

        // tl dashboard leaves
        .addCase(getTLDashboardLeave.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getTLDashboardLeave.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.leave = action.payload;
        })
        .addCase(getTLDashboardLeave.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
  },
});

//leaves
export const selectAllTLDashLeaves = (state) => state.tlDash.leave;
export const getAllTLDashLeavesStatus = (state) => state.tlDash.status;
export const getAllTLDashLeavesError = (state) => state.tlDash.error;


export const { reducer } = TLDashboard;

export default TLDashboard.reducer