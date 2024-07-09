import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../utils/ApiUrls/Hrm";
import request from "../../utils/request";

const initialState = {
  dashinvoice: [],
  dashReceipts: [],
  dashmaininvoice: [],
  employeeLeaveData: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Dash Invoice

export const getDashInvoice = createAsyncThunk("dashinvoice/get", async () => {
  try {
    const dashboard = "invoice";
    const response = await request.get(`${APIURLS.GETINVOICEDASH}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    console.log(error, "dasherrr");
  }
});
// get Dash Receipts

export const getDashReceipts = createAsyncThunk("receipt/get", async () => {
  try {
    const dashboard = "receipt";
    const response = await request.get(`${APIURLS.GETRECEIPTDASH}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    console.log(error, "receipterrr");
  }
});
// get Dash maintenance

export const getDashMaintaininvoices = createAsyncThunk(
  "maintenance/get",
  async () => {
    try {
      const dashboard = "maintenance";
      const response = await request.get(`${APIURLS.GETMAINTAININVOICEDASH}`, {
        params: { dashboard },
      });
      return [...response.data];
    } catch (error) {
      console.log(error, "maintenancerrrr");
    }
  }
);

const Dashboard = createSlice({
  name: "AccountantDashboard",
  initialState,
  reducers: {
    EmployeeLeaveData: (state,action) => {
      state.employeeLeaveData = action.payload
    },
  },

  extraReducers: (builder) => {
    builder
      // Dash Invoice Get
      .addCase(getDashInvoice.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDashInvoice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashinvoice = action.payload;
      })
      .addCase(getDashInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Dash Receipts Get
      .addCase(getDashReceipts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashReceipts = action.payload;
      })
      // Dash maintenance invoices
      .addCase(getDashMaintaininvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dashmaininvoice = action.payload;
      });
  },
});

//Invoice Dash List
export const selectAllDashinvoice = (state) => state.Dashboard.dashinvoice;
export const getAllDashinvoiceStatus = (state) => state.Dashboard.status;
export const getAllDashinvoiceError = (state) => state.Dashboard.error;

//employee card data
export const AllEmployeeLeaveData = (state) => state.Dashboard.employeeLeaveData;

//Receipts Dash List
export const selectAllDashReceipts = (state) => state.Dashboard.dashReceipts;

//Maintenenace Invoices Dash List
export const selectAllMaintainInvoices = (state) =>
  state.Dashboard.dashmaininvoice;

export const { EmployeeLeaveData } = Dashboard.actions;
export const { reducer } = Dashboard;

export default Dashboard.reducer;
