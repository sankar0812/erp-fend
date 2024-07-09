import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../../utils/request";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";

const initialState = {
  dailyattend: [],
  countattendance: [],
  dailyEntry: [],
  traineeEntry: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

//GET ATTENDANCE
export const getAttendanceCount = createAsyncThunk("attendance", async () => {
  try {
    const attendance = "count";
    const response = await request.get(`${APIURLS.GETATTCOUNT}`, {
      params: { attendance },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
  }
});

//GET DAILY ATTENDANCE
export const getDailyAttendance = createAsyncThunk(
  "dailyattendance",
  async () => {
    try {
      const response = await request.get(`${APIURLS.GETDAILYATT}`);
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  }
);

//employee Daily Entry
export const getDailyEntry = createAsyncThunk(
    "DailyEntry/Get",
    async () => {
      try {
        const attendance = 'attendance';
        const response = await request.get(`${APIURLS.GETDAILYENTRY}`, {
          params: { attendance }
        })
        return [...response.data];
      } catch (error) {
        // throw error;
      }
    });

    //trainee Daily Entry
export const getTraineeDailyEntry = createAsyncThunk(
  "TraineeDailyEntry/Get",
  async () => {
    try {
      const trainee = 'attendance';
      const response = await request.get(`${APIURLS.GETTRAINEEDAILYENTRY}`, {
        params: { trainee }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
    }
  });

const Attendance = createSlice({
  name: "attendance",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Attendance

      .addCase(getAttendanceCount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAttendanceCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countattendance = action.payload;
      })
      .addCase(getAttendanceCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Daily Attendance

      .addCase(getDailyAttendance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dailyattend = action.payload;
      })

      // EMployee Daily Entry

      .addCase(getDailyEntry.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dailyEntry = action.payload;
      })

       // Trainee Daily Entry

       .addCase(getTraineeDailyEntry.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.traineeEntry = action.payload;
      });
  },
});

// Attendance

export const selectAllAttendance = (state) => state.attendance.countattendance;
export const getCountAttStatus = (state) => state.attendance.status;
export const getCountAttStatusError = (state) => state.attendance.error;

export const SelectDailyAttendance = (state) => state.attendance.dailyattend;

//employee daily entry
export const SelectDailyEntry = (state) => state.attendance.dailyEntry;

//trainee daily entry
export const SelectTraineeDailyEntry = (state) => state.attendance.traineeEntry;

export const { reducer } = Attendance;
export const { addDepartment } = Attendance.actions;

export default Attendance.reducer;
