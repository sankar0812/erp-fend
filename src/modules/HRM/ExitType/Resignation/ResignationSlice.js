import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import request from "../../../../utils/request";


const initialState = {
    resignation: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

// get  resignations

export const getResignation = createAsyncThunk(
    "resignationview",
    async () => {
        try {
            const resignationsParam = 'resignationsview';
            const response = await request.get(`${APIURLS.RESIGNATIONVIEW}`, {
                params: { resignationsParam }
            })
            return [...response.data];
        } catch (error) {
            // throw error;
            console.log(error, "resignationerrr");
        }
    });


const resignationSlice = createSlice({
    name: "resignationdetails",
    initialState,
    reducers: {
        addResignation: (state, action) => {
            state.resignationdetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder

      // Resignation

            .addCase(getResignation.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getResignation.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.resignation = action.payload;
            })
            .addCase(getResignation.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

    },
});

// Resignation

export const selectAllResignation = (state) => state.resignations.resignation;
export const getResignationStatus = (state) => state.resignations.status;
export const getResignationError = (state) => state.resignations.error;


export const { reducer } = resignationSlice;
export const { addResignation } = resignationSlice.actions;

export default resignationSlice.reducer;
