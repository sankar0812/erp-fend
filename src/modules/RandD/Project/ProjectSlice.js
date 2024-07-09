import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../../utils/request";
import { RANDDURLS } from "../../../utils/ApiUrls/RandD";

const initialState = {
  project: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};


// get project

export const getProject = createAsyncThunk("project/get", async () => {
    try {
      const name = "project";
      const response = await request.get(`${RANDDURLS.GETPROJECT}`, {
        params: { name },
      });
      console.log(response, "projectres");
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "project");
    }
  });

  const projectSlice = createSlice({
    name: "projectdetails",
    initialState,
    reducers: {},
  
    extraReducers: (builder) => {
      builder
  
        // project
  
        .addCase(getProject.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getProject.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.project = action.payload;
        })
        .addCase(getProject.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
    },
  });

  // project

export const selectAllProject = (state) => state.projects.project;
export const getProjectStatus = (state) => state.projects.status;
export const getProjectError = (state) => state.projects.error;

export const { reducer } = projectSlice;
export const { addproject } = projectSlice.actions;

export default projectSlice.reducer;