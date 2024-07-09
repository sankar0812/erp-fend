import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import request from "../../../utils/request";

const initialState = {
  asset: [],
  payrollreport: [],
  traineeDepartment:[],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Payroll

export const getPayrollReports = createAsyncThunk(
  "payrollreports/get",
  async () => {
    try {
      const department = "CurrentMonth";
      const response = await request.get(`${APIURLS.GETPAYROLLREPORTS}`, {
        params: { department },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "reportsofpayrollerrorrr");
    }
  }
);

// get Assets reports

export const getAssetReports = createAsyncThunk(
  "Assetreports/get",
  async () => {
    try {
      const type = "report";
      const response = await request.get(`${APIURLS.GETREPORTASSET}`, {
        params: { type },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "reportsofpayrollerrorrr");
    }
  }
);

// get Trainee Department

export const getTraineeDepartment = createAsyncThunk(
  "TraineeDepartment/get",
  async () => {
    try {
      const trainee = "Department";
      const response = await request.get(`${APIURLS.GETTRAINEEDEPARTMENTROLE}`, {
        params: { trainee },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "Department");
    }
  }
);

const reportsSlice = createSlice({
  name: "allreports",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // Payroll Reports

      .addCase(getPayrollReports.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPayrollReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payrollreport = action.payload;
      })
      .addCase(getPayrollReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Assets View Reports

      .addCase(getAssetReports.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAssetReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.asset = action.payload;
      })
      .addCase(getAssetReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

        // trainee department

        .addCase(getTraineeDepartment.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getTraineeDepartment.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.traineeDepartment = action.payload;
        })
        .addCase(getTraineeDepartment.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
  },
});

// Payroll Reports

export const selectPayrollReports = (state) => state.reports.payrollreport;
export const getPayrollReportsStatus = (state) => state.reports.status;
export const getPayrollReportsError = (state) => state.reports.error;

// AssetView Reports
export const selectAssetsReports = (state) => state.reports.asset;
export const getStatusReports = (state) => state.reports.status;
export const getErrorReports = (state) => state.reports.error;

// trainee department
export const selectAllTraineeDepartment = (state) => state.reports.traineeDepartment;
export const getTraineeDepartmentStatus = (state) => state.reports.status;
export const getTraineeDepartmentError = (state) => state.reports.error;

export const { reducer } = reportsSlice;
export const { addDepartment } = reportsSlice.actions;

export default reportsSlice.reducer;
