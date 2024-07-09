import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";

const initialState = {
  complaints: [],
  leave:[],
  resignation:[],
  attendance:[],
  expense:[],
  cardData:[],
  holidays:[],
  announce:[],
  department:[],
  hiring:[],
  traineeAttendance:[],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get complaints

export const getDashboardComplaints = createAsyncThunk("complaints/get", async () => {
  try {
    const complaints = "complaints";
    const response = await request.get(`${APIURLS.GETMANAGERCOMPLAINTS}`, {
      params: { complaints },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "complaints");
  }
});

// get leaves

export const getDashboardLeave = createAsyncThunk("leaves/get", async () => {
  try {
    const Dashboad = "employeeleave";
    const response = await request.get(`${APIURLS.GETMANAGERDASHLEAVE}`, {
      params: { Dashboad },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "leave");
  }
});

// get resignation

export const getDashboardResignation = createAsyncThunk("resignation/get", async () => {
  try {
    const resignations = "dashboard";
    const response = await request.get(`${APIURLS.GETMANAGERDASHRESIGNATION}`, {
      params: { resignations },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "resignation");
  }
});

// get attendance

export const getDashboardAttendance = createAsyncThunk("attendance/get", async () => {
  try {
    const percentage = "dashboard";
    const response = await request.get(`${APIURLS.GETMANAGERDASHATTENDANCE}`, {
      params: { percentage },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "attendance");
  }
});

// get expense

export const getDashboardExpense = createAsyncThunk("expense/get", async () => {
  try {
    const dashboard = "expense";
    const response = await request.get(`${APIURLS.GETMANAGERDASHEXPENSE}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "expense");
  }
});

// get card data

export const getManagerCardData = createAsyncThunk("card/get", async () => {
  try {
    const dashboard = "count";
    const response = await request.get(`${APIURLS.GETMANAGERDASHCARD}`, {
      params: { dashboard },
    });
    return response.data;
  } catch (error) {
    // throw error;
    console.log(error, "card");
  }
});

// get holidays

export const getHolidays = createAsyncThunk("holidays/get", async () => {
  try {
    const employees = "holidays";
    const response = await request.get(`${APIURLS.GETMANAGERDASHHOLIDAYS}`, {
      params: { employees },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "holidays");
  }
});

// get announcement

export const getAnnouncement = createAsyncThunk("announcement/get", async () => {
  try {
    const dashboard = "announcement";
    const response = await request.get(`${APIURLS.GETMANAGERANNOUNCE}`, {
      params: { dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "announcement");
  }
});

// get department

export const getDepartment = createAsyncThunk("departmentDashcard/get", async () => {
  try {
    const employees = "department";
    const response = await request.get(`${APIURLS.GETMANAGERDASHDEPARTMENT}`, {
      params: { employees },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "department");
  }
});

// get Trainee attendance

export const getTraineeAttendance = createAsyncThunk("TraineeAttendance/get", async () => {
  try {
    const trainee = "dashboard";
    const response = await request.get(`${APIURLS.GETTRAINEEATTENDANCE}`, {
      params: { trainee },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "TraineeAttendance");
  }
});

// get Hiring

export const getDashHiring = createAsyncThunk("Hiring/get", async () => {
  try {
    const Dashboard = "hiring";
    const response = await request.get(`${APIURLS.GETDASHHIRING}`, {
      params: { Dashboard },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "Hiring");
  }
});

const ManagerDashboard = createSlice({
  name: "ManagerDashboardDetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // manager dashboard complaints
      .addCase(getDashboardComplaints.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDashboardComplaints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.complaints = action.payload;
      })
      .addCase(getDashboardComplaints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

        // manager dashboard leaves
        .addCase(getDashboardLeave.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getDashboardLeave.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.leave = action.payload;
        })
        .addCase(getDashboardLeave.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })

         // manager dashboard resignation
         .addCase(getDashboardResignation.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getDashboardResignation.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.resignation = action.payload;
        })
        .addCase(getDashboardResignation.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })

         // manager dashboard attendance
         .addCase(getDashboardAttendance.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(getDashboardAttendance.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.attendance = action.payload;
        })
        .addCase(getDashboardAttendance.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })

          // manager dashboard expense
          .addCase(getDashboardExpense.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getDashboardExpense.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.expense = action.payload;
          })
          .addCase(getDashboardExpense.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })

           // manager dashboard cardData
           .addCase(getManagerCardData.pending, (state, action) => {
            state.status = "loading";
          })
          .addCase(getManagerCardData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.cardData = action.payload;
          })
          .addCase(getManagerCardData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          })

            // manager dashboard holidays
            .addCase(getHolidays.pending, (state, action) => {
              state.status = "loading";
            })
            .addCase(getHolidays.fulfilled, (state, action) => {
              state.status = "succeeded";
              state.holidays = action.payload;
            })
            .addCase(getHolidays.rejected, (state, action) => {
              state.status = "failed";
              state.error = action.error.message;
            })

                 // manager dashboard announcement
                 .addCase(getAnnouncement.pending, (state, action) => {
                  state.status = "loading";
                })
                .addCase(getAnnouncement.fulfilled, (state, action) => {
                  state.status = "succeeded";
                  state.announce = action.payload;
                })
                .addCase(getAnnouncement.rejected, (state, action) => {
                  state.status = "failed";
                  state.error = action.error.message;
                })

                  // manager dashboard department
                  .addCase(getDepartment.pending, (state, action) => {
                    state.status = "loading";
                  })
                  .addCase(getDepartment.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.department = action.payload;
                  })
                  .addCase(getDepartment.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                  })

                   // manager dashboard trainee attendance
                   .addCase(getTraineeAttendance.pending, (state, action) => {
                    state.status = "loading";
                  })
                  .addCase(getTraineeAttendance.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.traineeAttendance = action.payload;
                  })
                  .addCase(getTraineeAttendance.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                  })

                  // manager dashboard hiring
                  .addCase(getDashHiring.pending, (state, action) => {
                    state.status = "loading";
                  })
                  .addCase(getDashHiring.fulfilled, (state, action) => {
                    state.status = "succeeded";
                    state.hiring = action.payload;
                  })
                  .addCase(getDashHiring.rejected, (state, action) => {
                    state.status = "failed";
                    state.error = action.error.message;
                  })
  },
});

//complaints
export const selectAllDashComplaints = (state) => state.managerDash.complaints;
export const getAllDashComplaintsStatus = (state) => state.managerDash.status;
export const getAllDashComplaintsError = (state) => state.managerDash.error;

//leaves
export const selectAllDashLeaves = (state) => state.managerDash.leave;
export const getAllDashLeavesStatus = (state) => state.managerDash.status;
export const getAllDashLeavesError = (state) => state.managerDash.error;

//resignation
export const selectAllDashResignation = (state) => state.managerDash.resignation;
export const getAllDashResignationStatus = (state) => state.managerDash.status;
export const getAllDashResignationError = (state) => state.managerDash.error;

//attendance
export const selectAllDashAttendance = (state) => state.managerDash.attendance;
export const getAllDashAttendanceStatus = (state) => state.managerDash.status;
export const getAllDashAttendanceError = (state) => state.managerDash.error;

//expense
export const selectAllDashExpense = (state) => state.managerDash.expense;
export const getAllDashExpenseStatus = (state) => state.managerDash.status;
export const getAllDashExpenseError = (state) => state.managerDash.error;

//cardData
export const selectAllDashCardData = (state) => state.managerDash.cardData;
export const getAllDashCardDataStatus = (state) => state.managerDash.status;
export const getAllDashCardDataError = (state) => state.managerDash.error;

//holidays
export const selectAllDashHolidays = (state) => state.managerDash.holidays;
export const getAllDashHolidaysStatus = (state) => state.managerDash.status;
export const getAllDashHolidaysError = (state) => state.managerDash.error;

//announcement
export const selectAllAnnouncement = (state) => state.managerDash.announce;
export const getAllAnnouncementStatus = (state) => state.managerDash.status;
export const getAllAnnouncementError = (state) => state.managerDash.error;

//department
export const selectAllDepartment = (state) => state.managerDash.department;
export const getAllDepartmentStatus = (state) => state.managerDash.status;
export const getAllDepartmentError = (state) => state.managerDash.error;

//trainee attendance
export const selectAllTraineeAttendance = (state) => state.managerDash.traineeAttendance;
export const getAllTraineeAttendanceStatus = (state) => state.managerDash.status;
export const getAllTraineeAttendanceError = (state) => state.managerDash.error;

//hiring
export const selectAllDashHiring = (state) => state.managerDash.hiring;
export const getAllDashHiringStatus = (state) => state.managerDash.status;
export const getAllDashHiringError = (state) => state.managerDash.error;

export const { reducer } = ManagerDashboard;

export default ManagerDashboard.reducer