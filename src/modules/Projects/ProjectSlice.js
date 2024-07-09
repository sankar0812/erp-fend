import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../utils/ApiUrls/Hrm";
import request from "../../utils/request";
import { RANDDURLS } from "../../utils/ApiUrls/RandD";

const initialState = {
  projectDetails: [],
  empUnderDepartment: [],
  projecthead: [],
  researchdoc: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get project details

export const getProjectDetails = createAsyncThunk(
  "projectDetails/get",
  async () => {
    try {
      // const client = 'clientDetails';
      const response = await request.get(`${APIURLS.TASKASSIGNGET}`)
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get Emp Under Department

export const getEmpUnderDepartmentDetails = createAsyncThunk(
  "EmpUnderDept/get",
  async () => {
    try {
      const department = 'Department';
      const response = await request.get(`${APIURLS.GETDEPARTMENTROLE}`, { params: { department } })
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get Project Head Details

export const getProjectHeadDetails = createAsyncThunk(
  "ProjectHeadD/get",
  async () => {
    try {
      const response = await request.get(APIURLS.GET_PROJECT_HEAD)
      console.log(response, 'responseresponse');
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

// get Research Document

export const getResearchDocument = createAsyncThunk(
  "ResearchDoc/get",
  async () => {
    try {
      const view = 'researchQuotation';
      const response = await request.get(`${RANDDURLS.GET_RESEARCHED_DOC}`, { params: { view } })
      console.log(response, 'RESEARCHHHHH');
      return [...response.data];

    } catch (error) {
      // throw error;
      console.log(error, "errorProject");
    }
  });

const Project = createSlice({
  name: "project",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // clientprofile

      .addCase(getProjectDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectDetails = action.payload;
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // emp under dept

      .addCase(getEmpUnderDepartmentDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEmpUnderDepartmentDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.empUnderDepartment = action.payload;
      })
      .addCase(getEmpUnderDepartmentDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // project head

      .addCase(getProjectHeadDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProjectHeadDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projecthead = action.payload;
      })
      .addCase(getProjectHeadDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Research Doc

      .addCase(getResearchDocument.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getResearchDocument.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.researchdoc = action.payload;
      })
      .addCase(getResearchDocument.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export const allProjectDetails = (state) => state.Project.projectDetails;
export const projectDetailsStatus = (state) => state.Project.status;
export const projectDetailsError = (state) => state.Project.error;

export const allEmpUnderDeptDetails = (state) => state.Project.empUnderDepartment;
export const empUnderDeptStatus = (state) => state.Project.status;
export const empUnderDeptError = (state) => state.Project.error;

export const allprojectHeadDetails = (state) => state.Project.projecthead;
export const projectheadStatus = (state) => state.Project.status;
export const projectHeadError = (state) => state.Project.error;

export const allresearchDocDetails = (state) => state.Project.researchdoc;
export const researchDocStatus = (state) => state.Project.status;
export const researchDocError = (state) => state.Project.error;

export const { reducer } = Project;

export default Project.reducer;