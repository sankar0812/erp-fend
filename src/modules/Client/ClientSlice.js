import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../utils/ApiUrls/Hrm";
import request from "../../utils/request";
import { APIURLS as APIURL } from "../../utils/ApiUrls/Client";




const initialState = {
  clientprofile: [],
  projecttype: [],
  requirements: [],
  receipt: [],
  clientRequest: [],
  researchDevelopment:[],
  clientquotation : [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Holiday

export const getClientProfile = createAsyncThunk(
  "client/get",
  async () => {
    try {
      const client = 'True';
      const response = await request.get(`${APIURLS.GETCLIENTPROFILE}`, {
        params: { client }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "clientprofileyyy");
    }
  });
//======     from manager starts    =======
export const getClientRequest = createAsyncThunk(
  "clientRequest/get",
  async () => {
    try {
      const clientRequirement = 'clientRequirementDetails';
      const response = await request.get(`${APIURLS.CLIENTREQUESTGET}`, {
        params: { clientRequirement }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "vhgcy");
    }
  });
  export const getResearchAndDev = createAsyncThunk(
    "ResearchAndev/get",
    async () => {
      try {
        const view = 'research';
        const response = await request.get(`${APIURLS.RESEARCHGET}`, {
          params: { view }
        })
        return [...response.data];
      } catch (error) {
        // throw error;
        console.log(error, "vhgcy");
      }
    });
//======     from manager starts    =======


export const getProjecttype = createAsyncThunk(
  "ProjectType/get",
  async () => {
    try {
      const projectType = 'projectTypeDetails';
      const response = await request.get(`${APIURLS.GETPROJECTTYPE}`, {
        params: { projectType }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "clientprofileyyy");
    }
  });

export const getRequiremts = createAsyncThunk(
  "requirements/get",
  async () => {
    try {
      const clientRequirement = 'clientRequirementDetails';
      const response = await request.get(`${APIURLS.GETREQUIREMENTS}`, {
        params: { clientRequirement }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "requireeee");
    }
  });

export const getReceipts = createAsyncThunk(
  "receipts/get",
  async () => {
    try {
      const receipt = 'Receipts';
      const response = await request.get(`${APIURLS.GETRCEIPTS}`, {
        params: { receipt }
      })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "requireeee");
    }
  });

  // Client Quotation

  export const getClientQuotation = createAsyncThunk(
    "clientQuotation/get",
    async () => {
      try {
        const view = 'quotation';
        const response = await request.get(`${APIURL.GET_CLIENT_QUOTATION}`, {
          params: { view }
        })
        return [...response.data];
      } catch (error) {
        // throw error;
        console.log(error, "requireeee");
      }
    });

const client = createSlice({
  name: "clientDetails",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // clientprofile

      .addCase(getClientProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientprofile = action.payload;
      })
      .addCase(getClientProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //==================== Project Type===================

      .addCase(getProjecttype.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProjecttype.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projecttype = action.payload;
      })
      .addCase(getProjecttype.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //============== Requirements ====================

      .addCase(getRequiremts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getRequiremts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.requirements = action.payload;
      })
      .addCase(getRequiremts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //============== Receipts ====================

      .addCase(getReceipts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getReceipts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.receipt = action.payload;
      })
      .addCase(getReceipts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //============== Client Request ====================

      .addCase(getClientRequest.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientRequest = action.payload;
      })
      .addCase(getClientRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //============== Resesearch And Developement ====================

      .addCase(getResearchAndDev.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getResearchAndDev.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.researchDevelopment = action.payload;
      })
      .addCase(getResearchAndDev.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ============  Client Quotation =====================

      .addCase(getClientQuotation.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientQuotation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientquotation = action.payload;
      })
      .addCase(getClientQuotation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

  },
});


export const viewclientprofile = (state) => state.Client.clientprofile;
export const getClientProfileStatus = (state) => state.Client.status;
export const getClientProfileError = (state) => state.Client.error;

// Project Type
export const selectProjectType = (state) => state.Client.projecttype;
export const getProjectTypeStatus = (state) => state.Client.status;
export const getProjectTypeError = (state) => state.Client.error;
// requirements
export const viewrequirements = (state) => state.Client.requirements;
export const getrequirementsStatus = (state) => state.Client.status;
export const getrequirementsError = (state) => state.Client.error;

//RECEIPTS
export const viewreceipts = (state) => state.Client.receipt;
export const getreceiptsStatus = (state) => state.Client.status;
export const getreceiptsError = (state) => state.Client.error;

//Client Request

export const projectStatus = (state) => state.Client.status;
export const projectError = (state) => state.Client.error;
export const allClientRequest = (state) => state.Client.clientRequest;
export const allresearchDevelopment = (state) => state.Client.researchDevelopment;

//Client Quotation

export const clientQuotationStatus = (state) => state.Client.status;
export const clientQuotationError = (state) => state.Client.error;
export const allClientQuotation = (state) => state.Client.clientquotation;


export const { reducer } = client;
export const { addDepartment } = client.actions;

export default client.reducer;
