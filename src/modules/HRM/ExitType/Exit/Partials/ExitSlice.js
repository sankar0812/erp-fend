import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import request from "../../../../../utils/request";


const initialState = {
    employee: [],
    exit:[],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// get  employee

export const getEmployee = createAsyncThunk(
    "employees",
    async () => {
        try {
            const employeeexit = 'assets';
            const response = await request.get(`${APIURLS.GETEMPLOYEEEXIT}`, {
                params: { employeeexit }
            })
            return [...response.data];
        } catch (error) {
            // throw error;
            console.log(error, "employee");
        }
    });

    // get  exit

export const getEmployeeExit = createAsyncThunk(
  "employeeExit",
  async () => {
      try {
          const viewParam = 'view';
          const response = await request.get(`${APIURLS.GETALLEMPLOYEEEXIT}`, {
              params: { viewParam }
          })
          return [...response.data];
      } catch (error) {
          // throw error;
          console.log(error, "employeeExit");
      }
  });


const exitSlice = createSlice({
    name: "employeeExit",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder

      // Employee

      .addCase(getEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

       // Exit

       .addCase(getEmployeeExit.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEmployeeExit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.exit = action.payload;
      })
      .addCase(getEmployeeExit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// employee

export const selectAllEmployee = (state) => state.employeesTrue.employee;
export const getEmployeeStatus = (state) => state.employeesTrue.status;
export const getEmployeeError = (state) => state.employeesTrue.error;

// exit

export const selectAllEmployeeExit = (state) => state.employeesTrue.exit;
export const getEmployeeExitStatus = (state) => state.employeesTrue.status;
export const getEmployeeExitError = (state) => state.employeesTrue.error;


export const { reducer } = exitSlice;
export const { employeeExit } = exitSlice.actions;

export default exitSlice.reducer;
