import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../utils/ApiUrls/Hrm";
import request from "../../utils/request";



const initialState = {
  userdetails: [],
  inActiveUser:[],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get user

export const getUserDetails = createAsyncThunk(
  "userDetails/get",
  async () => {
    try {
      const User = 'User';
      const response = await request.get(`${APIURLS.GETUSER}`, {
        params: { User }
      })
      return response.data
    } catch (error) {
      // throw error;
      console.log(error, "USSSSSSS");
    }
  });

  // get in active user

export const getInActiveUser = createAsyncThunk(
  "InActiveUser/get",
  async () => {
    try {
      const User = 'false';
      const response = await request.get(`${APIURLS.GETINACTIVEUSER}`, {
        params: { User }
      })
      return response.data
    } catch (error) {
      // throw error;
      console.log(error, "InActiveUser");
    }
  });

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // User 

      .addCase(getUserDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userdetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

       // inactive User 

       .addCase(getInActiveUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInActiveUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inActiveUser = action.payload;
      })
      .addCase(getInActiveUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// User

export const selectAllUser = (state) => state.userdetails.userdetails;
export const getUserStatus = (state) => state.userdetails.status;
export const getUserError = (state) => state.userdetails.error;

// inactive User 

export const selectAllInActiveUser = (state) => state.userdetails.inActiveUser;

export const { reducer } = userDetailsSlice;
export const { addDepartment } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
