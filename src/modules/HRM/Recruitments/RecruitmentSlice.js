import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../../utils/request";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";

const initialState = {
  candidate: [],
  candidateRole: [],
  IntSchedule: [],
  taskAssigning: [],
  department: [],
  groupDiscussion: [],
  offer: [],
  appointment: [],
  jobTitle: [],
  hiring: [],
  hrRound: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get candidate

export const getCandidate = createAsyncThunk("candidate/get", async () => {
  try {
    const candidate = "candidate";
    const response = await request.get(`${APIURLS.GETCANDIDATE}`, {
      params: { candidate },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "candidate");
  }
});

// get candidate role

export const getCandidateRole = createAsyncThunk("candidateRole/get", async () => {
  try {
    const application = "roleType";
    const response = await request.get(`${APIURLS.GETCANDIDATEROLE}`, {
      params: { application },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "candidate");
  }
});

// get Interview Schedule

export const getIntSchedule = createAsyncThunk("IntSchedule/get", async () => {
  try {
    const Candidate = "schedulingDetails";
    const response = await request.get(`${APIURLS.GETINTERVIEWSCHEDULE}`, {
      params: { Candidate },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "IntSchedule");
  }
});

// get Task Assigning

export const getTaskAssigning = createAsyncThunk(
  "TaskAssigning/get",
  async () => {
    try {
      const TaskAssigned = "findTaskAssignedDetails";
      const response = await request.get(`${APIURLS.GETTASKASSIGNING}`, {
        params: { TaskAssigned },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "TaskAssigning");
    }
  }
);

// get Department Role

export const getDepartmentRole = createAsyncThunk(
  "DepartmentRole/get",
  async () => {
    try {
      const department = "Department";
      const response = await request.get(`${APIURLS.GETDEPARTMENTROLE}`, {
        params: { department },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "DepartmentRole");
    }
  }
);

// get GD

export const getGroupDiscussion = createAsyncThunk(
  "GroupDiscussion/get",
  async () => {
    try {
      const groupDiscussion = "groupDiscussionDetail";
      const response = await request.get(`${APIURLS.GETGROUPDISCUSSION}`, {
        params: { groupDiscussion },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "GroupDiscussion");
    }
  }
);

// get jobrole

export const getJobTitle = createAsyncThunk("JobTitle/get", async () => {
  try {
    const Application = "application";
    const response = await request.get(`${APIURLS.GETJOBROLE}`, {
      params: { Application },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "Application");
  }
});

// get hiring

export const getHiring = createAsyncThunk("hiring/get", async () => {
  try {
    const view = "hiring";
    const response = await request.get(`${APIURLS.GETHIRING}`, {
      params: { view },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "hiring");
  }
});

//get HR Round

export const getHRRound = createAsyncThunk("hrRound/get", async () => {
  try {
    const hrInterview = "hrInterviewDetails";
    const response = await request.get(`${APIURLS.GETHRINTERVIEW}`, {
      params: { hrInterview },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "hrRound");
  }
});

//get Offer

export const getOffer = createAsyncThunk("offer/get", async () => {
  try {
    const offer = "FindOfferDetails";
    const response = await request.get(`${APIURLS.GETOFFERS}`, {
      params: { offer },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "offer");
  }
});

//get Appointment

export const getAppointment = createAsyncThunk("appointment/get", async () => {
  try {
    const appointment = "findAppointmentDetails";
    const response = await request.get(`${APIURLS.GETAPPOINTMENT}`, {
      params: { appointment },
    });
    return [...response.data];
  } catch (error) {
    // throw error;
    console.log(error, "appointment");
  }
});

const candidateSlice = createSlice({
  name: "candidatedetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // candidate

      .addCase(getCandidate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCandidate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidate = action.payload;
      })
      .addCase(getCandidate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

       // candidate role

       .addCase(getCandidateRole.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCandidateRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.candidateRole = action.payload;
      })
      .addCase(getCandidateRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // interview schedule

      .addCase(getIntSchedule.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getIntSchedule.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.IntSchedule = action.payload;
      })
      .addCase(getIntSchedule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // task assigning

      .addCase(getTaskAssigning.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTaskAssigning.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.taskAssigning = action.payload;
      })
      .addCase(getTaskAssigning.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // get Department Role

      .addCase(getDepartmentRole.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getDepartmentRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.department = action.payload;
      })
      .addCase(getDepartmentRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // get GD

      .addCase(getGroupDiscussion.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getGroupDiscussion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupDiscussion = action.payload;
      })
      .addCase(getGroupDiscussion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // get jobrole

      .addCase(getJobTitle.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getJobTitle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobTitle = action.payload;
      })
      .addCase(getJobTitle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // get hiring

      .addCase(getHiring.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getHiring.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hiring = action.payload;
      })
      .addCase(getHiring.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // get hr round

      .addCase(getHRRound.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getHRRound.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hrRound = action.payload;
      })
      .addCase(getHRRound.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // get offer

      .addCase(getOffer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOffer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offer = action.payload;
      })
      .addCase(getOffer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

       // get appointment

       .addCase(getAppointment.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAppointment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.appointment = action.payload;
      })
      .addCase(getAppointment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

// candidate

export const selectAllCandidate = (state) => state.candidatee.candidate;
export const getCandidateStatus = (state) => state.candidatee.status;
export const getCandidateError = (state) => state.candidatee.error;

// candidate role

export const selectAllCandidateRole = (state) => state.candidatee.candidateRole;
export const getCandidateRoleStatus = (state) => state.candidatee.status;
export const getCandidateRoleError = (state) => state.candidatee.error;

// interview schedule

export const selectAllIntSchedule = (state) => state.candidatee.IntSchedule;
export const getIntScheduleStatus = (state) => state.candidatee.status;
export const getIntScheduleError = (state) => state.candidatee.error;

// task assigning

export const selectAllTaskAssigning = (state) => state.candidatee.taskAssigning;
export const getTaskAssigningStatus = (state) => state.candidatee.status;
export const getTaskAssigningError = (state) => state.candidatee.error;

// Department Role

export const selectAllDepartmentRole = (state) => state.candidatee.department;
export const getDepartmentRoleStatus = (state) => state.candidatee.status;
export const getDepartmentRoleError = (state) => state.candidatee.error;

// GD

export const selectAllGroupDiscussion = (state) => state.candidatee.groupDiscussion;
export const getGroupDiscussionStatus = (state) => state.candidatee.status;
export const getGroupDiscussionError = (state) => state.candidatee.error;

// jobrole

export const selectAllJobRole = (state) => state.candidatee.jobTitle;
export const getJobRoleStatus = (state) => state.candidatee.status;
export const getJobRoleError = (state) => state.candidatee.error;

// hiring

export const selectAllHiring = (state) => state.candidatee.hiring;
export const getHiringStatus = (state) => state.candidatee.status;
export const getHiringError = (state) => state.candidatee.error;

// hr Round

export const selectAllHRRound = (state) => state.candidatee.hrRound;
export const getHRRoundStatus = (state) => state.candidatee.status;
export const getHRRoundError = (state) => state.candidatee.error;

// offer

export const selectAllOffer = (state) => state.candidatee.offer;
export const getOfferStatus = (state) => state.candidatee.status;
export const getOfferError = (state) => state.candidatee.error;

// appointment

export const selectAllAppointment = (state) => state.candidatee.appointment;
export const getAppointmentStatus = (state) => state.candidatee.status;
export const getAppointmentError = (state) => state.candidatee.error;

export const { reducer } = candidateSlice;
export const { addcandidate } = candidateSlice.actions;

export default candidateSlice.reducer;
