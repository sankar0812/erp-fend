import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../../utils/request";
import { RANDDURLS } from "../../../utils/ApiUrls/RandD";



const initialState = {
  approvedprojects: [],
  managementapprovedprojects: [],
  devcompleted : [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get All Approved Projects

export const getApprovedProjects = createAsyncThunk(
  "approvedProjects/get",
  async () => {
    try {
      const view = 'quotation';
      const response = await request.get(`${RANDDURLS.GET_APPROVED_PROJECT}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get Management Approved Projects

export const getManagementApprovedProjects = createAsyncThunk(
  "managementapprovedProjects/get",
  async () => {
    try {
      const view = 'researchDevelopment';
      const response = await request.get(`${RANDDURLS.GET_MANAGEMENT_APPROVED_PROJECTS}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

  // get Dev Completed Projects

export const getDevCompletedProjects = createAsyncThunk(
  "devCompletedProjects/get",
  async () => {
    try {
      const view = 'researchDevelopmentFile';
      const response = await request.get(`${RANDDURLS.GET_DEV_COMPLETED}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });


const DevelopmentSlice = createSlice({
  name: "developmentredux",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // allApprovedPrtojects

      .addCase(getApprovedProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getApprovedProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.approvedprojects = action.payload;
      })
      .addCase(getApprovedProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Management Approved Projects

      .addCase(getManagementApprovedProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getManagementApprovedProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.managementapprovedprojects = action.payload;
      })
      .addCase(getManagementApprovedProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      
      // Dev Completed Projects

      .addCase(getDevCompletedProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDevCompletedProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.devcompleted = action.payload;
      })
      .addCase(getDevCompletedProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

  },
});

// All Approved Projects

export const AllApprovedProjects = (state) => state.developmentDetails.approvedprojects;
export const approvedProjectStatus = (state) => state.developmentDetails.status;
export const approvedProjectError = (state) => state.developmentDetails.error;

// All Management Approved Projects

export const AllManagementApprovedProjects = (state) => state.developmentDetails.managementapprovedprojects;
export const approvedManagementProjectStatus = (state) => state.developmentDetails.status;
export const approvedManagementProjectError = (state) => state.developmentDetails.error;


// All Dev Completed Projects

export const AllDevCompletedProjects = (state) => state.developmentDetails.devcompleted;
export const devCompletedProjectStatus = (state) => state.developmentDetails.status;
export const devCompletedProjectError = (state) => state.developmentDetails.error;


export const { reducer } = DevelopmentSlice;

export default DevelopmentSlice.reducer;