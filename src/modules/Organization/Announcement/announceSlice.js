import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";
import request from "../../../utils/request";


const initialState = {
    announcement: [],
    status: 'idle',  // 'idle' | 'loading' | 'succeeded' | 'failed'  
    error: null
}

export const getAnnouncement = createAsyncThunk(
    "Announcement/Get",
    async () => {
        try {
            const announcementType = 'announcement'
            const response = await request.get(`${APIURLS.GETANNOUNCE}`,{
                params:{announcementType}
            });
            return [...response.data];
        }
        catch (error) {
            throw error;
        }
    }
);

const OrganizationReducer = createSlice({
    name: 'organization',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
   
            .addCase(getAnnouncement.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getAnnouncement.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.announcement = action.payload;
            })
            .addCase(getAnnouncement.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

    }
})

export const selectAllAnnouncement = (state) => state.organization.announcement
export const getAnnouncementStatus = (state) => state.organization.status
export const getAnnouncementError = (state) => state.organization.error

export const { reducer } = OrganizationReducer;

export default OrganizationReducer.reducer

