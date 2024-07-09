import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";



const initialState = {
  viewterms: [],
  viewInvoice: [],
  viewMaintenance: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Holiday

export const getInvoice = createAsyncThunk(
  "invoice/get",
  async () => {
    try {
        const invoice = 'invoices';
      const response = await request.get(`${APIURLS.GETINVOICEVIEW}`, {
        params: { invoice }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "invoicesyyy");
    }
  });

  
// get maintenanceterms

export const getTerms = createAsyncThunk(
  "Maintenanceterms/get",
  async () => {
    try {
        const terms = 'Maintenance';
      const response = await request.get(`${APIURLS.GETTERMS}`, {
        params: { terms }
      })
      return [...response.data];
    } catch (error) {
    }
  });
  // get maintenanceinvoices

export const getMaintenance = createAsyncThunk(
  "maintenanceinvoices/get",
  async () => {
    try {
        const maintenance = 'maintenance';
      const response = await request.get(`${APIURLS.GETMAINTAIN}`, {
        params: {maintenance }
      })
      return [...response.data];
    } catch (error) {
      console.log(error,'jjjjjjjjj');
    }
  });



const InvoiceSlice = createSlice({
  name: "clientDetails",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // quotation

      .addCase(getInvoice.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.viewInvoice = action.payload;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
       // maintenanceinvoices

       .addCase(getMaintenance.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMaintenance.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.viewMaintenance = action.payload;
      })
      .addCase(getMaintenance.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // MaintainTerms
      .addCase(getTerms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.viewterms = action.payload;
      })
  },
});


export const getinvoiceView = (state) => state.invoice.viewInvoice;
export const getInvoiceStatus = (state) => state.invoice.status;
export const getInvoiceError = (state) => state.invoice.error;

// maintenance terms===============

export const getMaintianTerms = (state) => state.invoice.viewterms;
export const getMaintainStatus = (state) => state.invoice.status;
export const getMaintainError = (state) => state.invoice.error;

// maintenance invoces view ================
export const getMaintianInvoices = (state) => state.invoice.viewMaintenance;
export const getMaintainInvoicesStatus = (state) => state.invoice.status;
export const getMaintainInvoicesError = (state) => state.invoice.error;

export const { reducer } = InvoiceSlice;
export const { addDepartment } = InvoiceSlice.actions;

export default InvoiceSlice.reducer;
