import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import request from "../../../utils/request";


const initialState = {
  holidayy: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Holiday

export const getHoliday = createAsyncThunk(
  "holiday/get",
  async () => {
    try {
      const LeaveType = 'leaveType';
      const response = await request.get(`${APIURLS.GETHOLIDAY}`, {
        params: { LeaveType }
      })
      return [...response.data];
    } catch (error) {
      console.log(error);
      // throw error;
    }
  });

const holidaySlice = createSlice({
  name: "holidaydetails",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // Holidayy

      .addCase(getHoliday.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getHoliday.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.holidayy = action.payload;
      })
      .addCase(getHoliday.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// Holiday

export const selectAllHoliday = (state) => state.holiday.holidayy;
export const getHolidayStatus = (state) => state.holiday.status;
export const getHolidayError = (state) => state.holiday.error;

export const { reducer } = holidaySlice;
export const { addDepartment } = holidaySlice.actions;

export default holidaySlice.reducer;
