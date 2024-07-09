import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";

const initialState = {
  complaints: [],
  leave:[],
  cardData:[],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get complaints

// export const getDashboardComplaints = createAsyncThunk("complaints/get", async () => {
//   try {
//     const complaints = "complaints";
//     const response = await request.get(`${APIURLS.GETADMINCOMPLAINTS}`, {
//       params: { complaints },
//     });
//     return [...response.data];
//   } catch (error) {
//     // throw error;
//     console.log(error, "complaints");
//   }
// });

// get leaves

export const getDashboardLeave = createAsyncThunk("leaves/get", async () => {
  try {
    const Dashboad = "employeeleave";
    const response = await request.get(`${APIURLS.GETMANAGERDASHLEAVE}`, {
      params: { Dashboad },
    });
    return [...response?.data];
  } catch (error) {
    // throw error;
    console.log(error, "leaveerr");
  }
});

// get card data

export const getCardData = createAsyncThunk("card/get", async () => {
  try {
    const dashboard = "count";
    const response = await request.get(`${APIURLS.GETCARDDATA}`, {
      params: { dashboard },
    });
    return response?.data ;
  } catch (error) {
    // throw error;
    console.log(error, "card");
  }
});

const AdminDashboard = createSlice({
  name: "AdminDashboardDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // admin dashboard complaints
      // .addCase(getDashboardComplaints.pending, (state, action) => {
      //   state.status = "loading";
      // })
      // .addCase(getDashboardComplaints.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.complaints = action.payload;
      // })
      // .addCase(getDashboardComplaints.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })

        // admin dashboard leaves
        .addCase(getDashboardLeave.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getDashboardLeave.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.leave = action.payload;
        })
        .addCase(getDashboardLeave.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })

        // admin dashboard cardData
        .addCase(getCardData.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getCardData.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.cardData = action.payload;
        })
        .addCase(getCardData.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
  },
});

//complaints
// export const selectAllDashComplaints = (state) => state.adminDash.complaints;
// export const getAllDashComplaintsStatus = (state) => state.adminDash.status;
// export const getAllDashComplaintsError = (state) => state.adminDash.error;

//leaves
export const selectAllDashLeaves = (state) => state.adminDash.leave;
export const getAllDashLeavesStatus = (state) => state.adminDash.status;
export const getAllDashLeavesError = (state) => state.adminDash.error;

//card data
export const selectAllDashCardData = (state) => state.adminDash.cardData;
export const getAllDashCardDataStatus = (state) => state.adminDash.status;
export const getAllDashCardDataError = (state) => state.adminDash.error;

export const { reducer } = AdminDashboard;

export default AdminDashboard.reducer