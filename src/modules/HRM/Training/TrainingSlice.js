import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import request from "../../../utils/request";


const initialState = {
  training: [],
  traineebydept: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Training

export const getTraining = createAsyncThunk(
  "trainee/get",
  async () => {
    try {
      const training = 'Details';
      const response = await request.get(`${APIURLS.GETTRAINING}`, {
        params: { training }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "traineeDetails");
    }
  });

// get Training

export const getTrainingByDept = createAsyncThunk(
  "trainingbydept/get",
  async () => {
    try {
      const department = 'Department';
      const response = await request.get(`${APIURLS.GET_TRAINING_BY_DEPT}`, {
        params: { department }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "traineeDetails");
    }
  });

const trainingSlice = createSlice({
  name: "trainingdetails",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // Training

      .addCase(getTraining.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTraining.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.training = action.payload;
      })
      .addCase(getTraining.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Training By Dept

      .addCase(getTrainingByDept.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTrainingByDept.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.traineebydept = action.payload;
      })
      .addCase(getTrainingByDept.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// Training

export const selectAllTraining = (state) => state.trainingg.training;
export const getTrainingStatus = (state) => state.trainingg.status;
export const getTrainingError = (state) => state.trainingg.error;

// Training By Dept

export const selectAllTrainingByDept = (state) => state.trainingg.traineebydept;
export const getTrainingByDeptStatus = (state) => state.trainingg.status;
export const getTrainingByDeptError = (state) => state.trainingg.error;

export const { reducer } = trainingSlice;
export const { addtraining } = trainingSlice.actions;

export default trainingSlice.reducer;
