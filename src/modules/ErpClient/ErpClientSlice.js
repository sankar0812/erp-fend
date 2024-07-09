import React from 'react'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from '../../utils/ApiUrls/Client';
import request from '../../utils/request';


const initialState = {
  clientform: [],
  ErpClientProfile: [],
  ErpClientQuotation: [],
  ErpClientInvoice: [],
  AllClientQuotation : [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
export const getClientForm = createAsyncThunk(
  "clientForm/get",
  async () => {
    try {
      const clientForm = 'clientFormDetails';
      const response = await request.get(`${APIURLS.GETCLIENTFORM}`, {
        params: { clientForm }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "clientprofile");
    }
  });


export const getClientProfile = createAsyncThunk(
  "client/get",
  async () => {
    try {
      const client = 'clientDetails';
      const response = await request.get(`${APIURLS.ERP_GETCLIENTPROFILE}`, {
        params: { client }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "clientForm");
    }
  });

export const getClientQuotation = createAsyncThunk(
  "quotation/get",
  async () => {
    try {
      const quotation = 'details';
      const response = await request.get(`${APIURLS.ERP_GETCLIENTQUOTATION}`, {
        params: { quotation }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "clientQuotation");
    }
  });

export const getClientInvoice = createAsyncThunk(
  "invoice/get",
  async () => {
    try {
      const invoice = 'invoices';
      const response = await request.get(`${APIURLS.ERP_GETCLIENTINVOICE}`, {
        params: { invoice }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "clientinvoice");
    }
  });

export const getAllClientQuotationView = createAsyncThunk(
  "quotationAdmin/get",
  async () => {
    try {
      const view = 'quotation';
      const response = await request.get(`${APIURLS.GET_ALL_CLIENT_QUOTATION}`, {
        params: { view }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "clientQuotation");
    }
  });

const ErpClient = createSlice({
  name: "ErpClientDetails",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // clientForm
      .addCase(getClientForm.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientForm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientform = action.payload;
      })
      .addCase(getClientForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // clientprofile
      .addCase(getClientProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ErpClientProfile = action.payload;
      })
      .addCase(getClientProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // client quotation
      .addCase(getClientQuotation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientQuotation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ErpClientQuotation = action.payload;
      })
      .addCase(getClientQuotation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // client invoice
      .addCase(getClientInvoice.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientInvoice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ErpClientInvoice = action.payload;
      })
      .addCase(getClientInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // client quotation Admin view and approval

      .addCase(getAllClientQuotationView.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllClientQuotationView.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.AllClientQuotation = action.payload;
      })
      .addCase(getAllClientQuotationView.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

  },
});

export const viewClientForm = (state) => state.erpClient.clientform;
export const getlientFormStatus = (state) => state.erpClient.status;
export const getlientFormError = (state) => state.erpClient.error;

export const viewErpClientprofile = (state) => state.erpClient.ErpClientProfile;
export const viewErpClientQuotation = (state) => state.erpClient.ErpClientQuotation;
export const viewErpClientInvoice = (state) => state.erpClient.ErpClientInvoice;
export const getClientStatus = (state) => state.erpClient.status;
export const getClientError = (state) => state.erpClient.error;

export const selectAllClientQuotation = (state) => state.erpClient.AllClientQuotation;
export const allClientQuotationStatus = (state) => state.erpClient.status;
export const allClientQuotationError = (state) => state.erpClient.error;

export const { reducer } = ErpClient;

export default ErpClient.reducer