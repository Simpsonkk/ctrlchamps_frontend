import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type UserRole = 'Caregiver' | 'Seeker' | 'Admin' | 'SuperAdmin';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isVerified: boolean;
  isProfileFilled?: boolean;
};

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export default userSlice.reducer;
