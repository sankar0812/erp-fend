import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../../utils/request";
import { APIURLS } from "../../../utils/ApiUrls/Hrm";

const initialState = {
  notification: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// get Notifications

export const getNotification = createAsyncThunk(
  "notification/get",
  async () => {
    try {
      const employees = "Notifications";
      const response = await request.get(`${APIURLS.GETNOTIFICATION}`, {
        params: { employees },
      });
      return [...response.data];
    } catch (error) {
      // throw error;
      console.log(error, "notification");
    }
  }
);

const notificationSlice = createSlice({
  name: "notificationdetails",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // notification

      .addCase(getNotification.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notification = action.payload;
      })
      .addCase(getNotification.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Notification

export const selectAllNotifications = (state) =>
  state.notifications.notification;
export const getNotificationsStatus = (state) => state.notifications.status;
export const getNotificationsError = (state) => state.notifications.error;

export const { reducer } = notificationSlice;
export const { addNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
