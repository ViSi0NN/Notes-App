import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true, // Start with loading true to check for existing token
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to handle successful login
    loginSuccess: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      const decoded: { userId: string; name: string; email: string } = jwtDecode(token);
      state.user = { id: decoded.userId, name: decoded.name, email: decoded.email };
      state.token = token;
      state.loading = false;
      localStorage.setItem('authToken', token);
    },
    // Action to handle logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem('authToken');
    },
    // Action to set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    // Action to initialize auth from localStorage
    initializeAuth: (state) => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const decoded: { exp: number; userId: string; name: string; email: string } = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            state.user = { id: decoded.userId, name: decoded.name, email: decoded.email };
            state.token = token;
          } else {
            // Token expired
            localStorage.removeItem('authToken');
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth from token", error);
        localStorage.removeItem('authToken');
      } finally {
        state.loading = false;
      }
    },
  },
});

export const { loginSuccess, logout, setLoading, initializeAuth } = authSlice.actions;

export default authSlice.reducer;