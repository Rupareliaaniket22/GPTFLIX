import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: null,
    displayName: null,
    email: null,
  },
  reducers: {
    addUser: (state, action) => {
      return {
        ...state,
        uid: action.payload.uid,
        displayName: action.payload.displayName,
        email: action.payload.email,
      };
    },
    removeUser: () => {
      return {
        uid: null,
        displayName: null,
        email: null,
      };
    },
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
