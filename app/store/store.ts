// auth-microfrontend/src/store/authStore.ts
import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Definimos el estado inicial
interface AuthState {
  isAuthenticated: boolean;
  user: null | { username: string; email: string };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

// Creamos el slice de autenticación
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.isAuthenticated = true;
      state.user = {
        username: action.payload.name,
        email: action.payload.email,
      };
    },
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { login, logout, loginFailure } = authSlice.actions;

// Configuramos el store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
