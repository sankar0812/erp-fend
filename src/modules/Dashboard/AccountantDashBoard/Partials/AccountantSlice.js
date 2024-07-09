import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";

const initialState = {
  clientCount: [],
  expense: [],
  expenseType: [],
  invoice: [],
  assets: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get clientCount

export const getClientCount = createAsyncThunk("clientCount/get", async () => {
  try {
    const client = "count";
    const response = await request.get(`${APIURLS.GETCLIENTCOUNTDASH}`, {
      params: { client },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "clientCount");
  }
});

// get expense

export const getExpenseIncome = createAsyncThunk("expense/get", async () => {
  try {
    const dashboard = "currentmonth";
    const response = await request.get(`${APIURLS.GETEXPENSEINCOME}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "currentmonth");
  }
});

// get expense type

export const getExpenseTypes = createAsyncThunk("expenseType/get", async () => {
  try {
    const dashboard = "type";
    const response = await request.get(`${APIURLS.GETEXPENSETYPES}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "expenseType");
  }
});

// get invoice

export const getInvoice = createAsyncThunk("invoiceDash/get", async () => {
  try {
    const dashboard = "previous";
    const response = await request.get(`${APIURLS.GETINVOICE}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "invoicxvce");
  }
});

// get assets

export const getAssetsBalance = createAsyncThunk("DasAssets/get", async () => {
  try {
    const balance = "balance";
    const response = await request.get(`${APIURLS.GETDASHASSETS}`, {
      params: { balance },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "assets");
  }
});

const AccountantDashboard = createSlice({
  name: "ManagerDashboardDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // accountant dashboard client count
      .addCase(getClientCount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientCount = action.payload;
      })
      .addCase(getClientCount.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // accountant dashboard expense income
      .addCase(getExpenseIncome.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getExpenseIncome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expense = action.payload;
      })
      .addCase(getExpenseIncome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // accountant dashboard expense Types
      .addCase(getExpenseTypes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getExpenseTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenseType = action.payload;
      })
      .addCase(getExpenseTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // accountant dashboard invoice
      .addCase(getInvoice.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoice = action.payload;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

       // accountant dashboard assets
       .addCase(getAssetsBalance.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAssetsBalance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assets = action.payload;
      })
      .addCase(getAssetsBalance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

//client count
export const selectAllClientCount = (state) => state.accountantDash.clientCount;
export const getAllClientCountStatus = (state) => state.accountantDash.status;
export const getAllClientCountError = (state) => state.accountantDash.error;

//expense income
export const selectAllExpenseIncome = (state) => state.accountantDash.expense;
export const getAllExpenseIncomeStatus = (state) => state.accountantDash.status;
export const getAllExpenseIncomeError = (state) => state.accountantDash.error;

//expense types
export const selectAllExpenseTypes = (state) => state.accountantDash.expenseType;
export const getAllExpenseTypesStatus = (state) => state.accountantDash.status;
export const getAllExpenseTypesError = (state) => state.accountantDash.error;

//invoice
export const selectAllInvoice = (state) => state.accountantDash.invoice;
export const getAllInvoiceStatus = (state) => state.accountantDash.status;
export const getAllInvoiceError = (state) => state.accountantDash.error;

//assets
export const selectAllAssetsBalance = (state) => state.accountantDash.assets;
export const getAllAssetsBalanceStatus = (state) => state.accountantDash.status;
export const getAllAssetsBalanceError = (state) => state.accountantDash.error;

export const { reducer } = AccountantDashboard;

export default AccountantDashboard.reducer;
