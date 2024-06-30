import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  token: string | null;
  isAuthenticated: boolean;
  user: any; 
}

const initialState: UserState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token")
    },
  },
});

export const { setToken, setUser, logout } = userSlice.actions;

// Селектор для получения токена из состояния
export const selectToken = (state: { user: UserState }): string | null => state.user.token;

export default userSlice.reducer;
