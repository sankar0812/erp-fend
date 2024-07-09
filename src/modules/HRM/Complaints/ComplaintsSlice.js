import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import request from "../../../utils/request";


const initialState = {
    complaints: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// get complaints

export const getComplaints = createAsyncThunk(
    "complaints",
    async () => {
      try {
        const type = 'complaintstable';
        const response = await request.get(`${APIURLS.GETCOMPLAINT}`, {
          params: { type }
        })
        return [...response.data];
      } catch (error) {
        // throw error;
      }
    });


const complaintsSlice = createSlice({
    name: "complaintsdetails",
    initialState,
    reducers: {
        addComplaints: (state, action) => {
            state.complaintsdetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

      // Complaints

            .addCase(getComplaints.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getComplaints.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.complaints = action.payload;
            })
            .addCase(getComplaints.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

    },
});

// complaints

export const selectAllComplaints = (state) => state.complaint.complaints;
export const getComplaintsStatus = (state) => state.complaint.status;
export const getComplaintsError = (state) => state.complaint.error;

export const { reducer } = complaintsSlice;
export const { addComplaints } = complaintsSlice.actions;

export default complaintsSlice.reducer;
