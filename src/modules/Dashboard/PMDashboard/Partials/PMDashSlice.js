import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";
import { RANDDURLS } from "../../../../utils/ApiUrls/RandD";

const initialState = {
  leave: [],
  projectCount: [],
  projectStatus: [],
  task: [],
  newProject: [],
  projectEnd: [],
  projectHeadCardView: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get leaves
export const getPLDashboardLeave = createAsyncThunk("leaves/get", async () => {
  try {
    const PL = "employeeleave";
    const response = await request.get(`${APIURLS.GETPLDASHLEAVE}`, {
      params: { PL },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "leave");
  }
});

//project count
export const getProjectCount = createAsyncThunk("ProjectCount/get", async () => {
  try {
    const dashboard = "previous";
    const response = await request.get(`${APIURLS.GETPROJECTCOUNT}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "leave");
  }
});

//project status
export const getProjectStatus = createAsyncThunk("ProjectStatus/get", async () => {
  try {
    const dashboard = "projectmanager";
    const response = await request.get(`${APIURLS.GETPROJECTSTATUS}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "leave");
  }
});

//task
export const getProjectTask = createAsyncThunk("ProjectTask/get", async () => {
  try {
    const dashboard = "priority";
    const response = await request.get(`${APIURLS.GETPROJECTTASK}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "leave");
  }
});

//newProject
export const getNewProject = createAsyncThunk("NewProject/get", async () => {
  try {
    const dashboard = "newproject";
    const response = await request.get(`${APIURLS.GETNEWPROJECT}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "leave");
  }
});

//Project End
export const getProjectEnd = createAsyncThunk("ProjectEnd/get", async () => {
  try {
    const dashboard = "enddate";
    const response = await request.get(`${APIURLS.GETPROJECTEND}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "leave");
  }
});

//projectHeadCard

export const getAllProjectManagerCard = createAsyncThunk(
  "AllPMCard/get",
  async () => {
    try {
      const dashboard = 'projectmanager';
      const response = await request.get(`${APIURLS.GETALLPROJECTHEADCARD}`, { params: { dashboard } })
      return response.data ;

    } catch (error) {
      // throw error;
      console.log(error, "errordassssssssssss");
    }
  });

const PMDashboard = createSlice({
  name: "PLDashboardDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // tl dashboard leaves
      .addCase(getPLDashboardLeave.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPLDashboardLeave.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leave = action.payload;
      })
      .addCase(getPLDashboardLeave.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      //project count
      .addCase(getProjectCount.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectCount = action.payload;
      })

      //project status
      .addCase(getProjectStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectStatus = action.payload;
      })

      //project task
      .addCase(getProjectTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.task = action.payload;
      })

      //new project
      .addCase(getNewProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.newProject = action.payload;
      })

      //project end
      .addCase(getProjectEnd.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectEnd = action.payload;
      })

      //project Head Card

      .addCase(getAllProjectManagerCard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.projectHeadCardView = action.payload;
      })
  },
});

//leaves
export const selectAllPLDashLeaves = (state) => state.pmDash.leave;
export const getAllPLDashLeavesStatus = (state) => state.pmDash.status;
export const getAllPLDashLeavesError = (state) => state.pmDash.error;

//project count
export const selectAllProjectCount = (state) => state.pmDash.projectCount;

//project status
export const selectAllProjectStatus = (state) => state.pmDash.projectStatus;

//project task
export const selectAllProjectTask = (state) => state.pmDash.task;

//New Project
export const selectAllNewProject = (state) => state.pmDash.newProject;

//project end
export const selectAllProjectEnd = (state) => state.pmDash.projectEnd;

//project head card
export const selectAllProjectHeadCardView = (state) => state.pmDash.projectHeadCardView;

export const { reducer } = PMDashboard;

export default PMDashboard.reducer