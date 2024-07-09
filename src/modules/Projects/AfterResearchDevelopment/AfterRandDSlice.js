import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../../utils/request";
import { RANDDURLS } from "../../../utils/ApiUrls/RandD";



const initialState = {
  approvedrandd: [],
  empandtraineeunderdept: [],
  projectsfortesting: [],
  approvedtesting: [],
  testingdoc: [],
  approvedtestingdoc: [],
  hosting: [],
  hostingdocuments: [],
  approvedhostingdocuments : [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get All Approved Projects

export const getApprovedRandDProjects = createAsyncThunk(
  "approvedranddProjects/get",
  async () => {
    try {
      const view = 'projectAssigning';
      const response = await request.get(`${RANDDURLS.GET_APPROVED_R_AND_D}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get All Employees And Trainee Under Dept

export const getAllEmpAndTraineeUnderDept = createAsyncThunk(
  "empandtraineeunderdept/get",
  async () => {
    try {
      const department = 'project';
      const response = await request.get(`${RANDDURLS.GET_ALL_EMP_AND_TRAINEE_UNDER_DEPT}`, { params: { department } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get All Projects For Testing

export const getAllProjectsForTesting = createAsyncThunk(
  "projectsForTesting/get",
  async () => {
    try {
      const view = 'projectDocumentation';
      const response = await request.get(`${RANDDURLS.GET_ALL_PROJECTS_FOR_TESTING}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get All Approved Projects For Testing

export const getApprovedTestingProjects = createAsyncThunk(
  "ApprovedprojectsForTesting/get",
  async () => {
    try {
      const view = 'testingDetail';
      const response = await request.get(`${RANDDURLS.GET_ALL_APPROVED_PROJECTS_FOR_TESTING}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get All Testing Documents

export const getAllTestingDocuments = createAsyncThunk(
  "AllTestingDoc/get",
  async () => {
    try {
      const view = 'testingDocumentation';
      const response = await request.get(`${RANDDURLS.GET_ALL_TESTING_DOCUMENTS}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get All Testing Documents

export const getAllApprovedTestingDocuments = createAsyncThunk(
  "AllApprovedTestingDoc/get",
  async () => {
    try {
      const view = 'accepted';
      const response = await request.get(`${RANDDURLS.GET_ALL_TESTED_APPROVED_DOCUMENTS}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get All Projects for Hosting

export const getAllProjectsForHosting = createAsyncThunk(
  "AllProjectsForHostingv/get",
  async () => {
    try {
      const view = 'hosting';
      const response = await request.get(`${RANDDURLS.GET_ALL_PROJECTS_FOR_HOSTING}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get All Projects for Hosting

export const getAllHostingDocuments = createAsyncThunk(
  "AllProjectsForHostingDocuments/get",
  async () => {
    try {
      const view = 'testingDocumentation';
      const response = await request.get(`${RANDDURLS.GET_ALL_HOSTING_DOC}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

export const getAllApprovedHostingDocuments = createAsyncThunk(
  "AllApprovedHostingDocuments/get",
  async () => {
    try {
      const view = 'accepted';
      const response = await request.get(`${RANDDURLS.GET_APPROVED_HOSTED_DOC}`, { params: { view } })
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

const AfterRandDSlice = createSlice({
  name: "afterranddredux",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // allApprovedR&D

      .addCase(getApprovedRandDProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getApprovedRandDProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.approvedrandd = action.payload;
      })
      .addCase(getApprovedRandDProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // allEmpandTraineeUnderDept

      .addCase(getAllEmpAndTraineeUnderDept.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllEmpAndTraineeUnderDept.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.empandtraineeunderdept = action.payload;
      })
      .addCase(getAllEmpAndTraineeUnderDept.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // all Projects For Testing

      .addCase(getAllProjectsForTesting.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllProjectsForTesting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectsfortesting = action.payload;
      })
      .addCase(getAllProjectsForTesting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // all Approved Projects For Testing

      .addCase(getApprovedTestingProjects.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getApprovedTestingProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.approvedtesting = action.payload;
      })
      .addCase(getApprovedTestingProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })


      // all Testing Documents

      .addCase(getAllTestingDocuments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllTestingDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.testingdoc = action.payload;
      })
      .addCase(getAllTestingDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })


      // all Approved Testing Documents

      .addCase(getAllApprovedTestingDocuments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllApprovedTestingDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.approvedtestingdoc = action.payload;
      })
      .addCase(getAllApprovedTestingDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // all Projects for Hosting

      .addCase(getAllProjectsForHosting.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllProjectsForHosting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hosting = action.payload;
      })
      .addCase(getAllProjectsForHosting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // all Projects for Hosting Documents

      .addCase(getAllHostingDocuments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllHostingDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hostingdocuments = action.payload;
      })
      .addCase(getAllHostingDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // all Approved Hosting Documents

      .addCase(getAllApprovedHostingDocuments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllApprovedHostingDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.approvedhostingdocuments = action.payload;
      })
      .addCase(getAllApprovedHostingDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

  },
});

// All Approved Projects

export const AllApprovedRandDProjects = (state) => state.afterRandDdetails.approvedrandd;
export const approvedRandDProjectStatus = (state) => state.afterRandDdetails.status;
export const approvedRandDProjectError = (state) => state.afterRandDdetails.error;

// All Employee And Trainee Under Department

export const AllEmpandTraineeUnderDept = (state) => state.afterRandDdetails.empandtraineeunderdept;
export const allEmpandTraineeUnderDeptStatus = (state) => state.afterRandDdetails.status;
export const allEmpAndTraineeUnderDeptError = (state) => state.afterRandDdetails.error;

// All Projects For Testing

export const AllProjectsForTesting = (state) => state.afterRandDdetails.projectsfortesting;
export const allProjectForTestingStatus = (state) => state.afterRandDdetails.status;
export const allProjectForTestingError = (state) => state.afterRandDdetails.error;

// All Approved Projects For Testing

export const AllApprovedProjectsForTesting = (state) => state.afterRandDdetails.approvedtesting;
export const allApprovedProjectForTestingStatus = (state) => state.afterRandDdetails.status;
export const allApprovedProjectForTestingError = (state) => state.afterRandDdetails.error;

// All Testing Documents

export const AllTestingDocuments = (state) => state.afterRandDdetails.testingdoc;
export const allTestingDocumentStatus = (state) => state.afterRandDdetails.status;
export const allTestingDocumentError = (state) => state.afterRandDdetails.error;

// All Approved Testing Documents

export const AllApprovedTestingDocuments = (state) => state.afterRandDdetails.approvedtestingdoc;
export const allApprovedTestingDocumentStatus = (state) => state.afterRandDdetails.status;
export const allApprovedTestingDocumentError = (state) => state.afterRandDdetails.error;

// All Hosting Projects

export const AllProjectsForHosting = (state) => state.afterRandDdetails.hosting;
export const allProjectsForHostingStatus = (state) => state.afterRandDdetails.status;
export const allProjectsForHostingError = (state) => state.afterRandDdetails.error;

// All Hosting Documents

export const AllHostingDocuments = (state) => state.afterRandDdetails.hostingdocuments;
export const allHostingDocumentsStatus = (state) => state.afterRandDdetails.status;
export const allHostingDocumentsError = (state) => state.afterRandDdetails.error;

// All Approved Hosting Documents

export const AllApprovedHostingDocuments = (state) => state.afterRandDdetails.approvedhostingdocuments;
export const allApprovedHostingDocumentsStatus = (state) => state.afterRandDdetails.status;
export const allApprovedHostingDocumentsError = (state) => state.afterRandDdetails.error;

export const { reducer } = AfterRandDSlice;

export default AfterRandDSlice.reducer;