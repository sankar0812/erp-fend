// emailSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null, // Set an initial value of null or an empty string
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = emailSlice.actions;
export const selectEmail = (state) => state.email.email;
export default emailSlice.reducer;
