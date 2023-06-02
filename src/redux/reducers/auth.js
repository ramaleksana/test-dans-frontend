import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../service/AuthService";

export const loginPost = createAsyncThunk(
    "auth/login",
    async ({ username, password }) => {
        try {
            const data = await AuthService.Login({
                username,
                password,
            });

            await localStorage.setItem(
                "userData",
                JSON.stringify(data.data.payload)
            );

            return data;
        } catch (e) {
            throw new Error(e);
        }
    }
);

export const registerPost = createAsyncThunk(
    "auth/register",
    async ({ username, password, email }) => {
        const data = await AuthService.Register({ username, password, email });
        return data;
    }
);

let userInfo = localStorage.getItem("userData") || null;

userInfo = userInfo ? JSON.parse(userInfo) : null;

const slice = createSlice({
    name: "auth",
    initialState: {
        login: {
            loading: false,
            data: userInfo
                ? {
                      username: userInfo.username,
                      email: userInfo.email,
                  }
                : null,
            success: false,
            error: false,
            userToken: userInfo ? userInfo.token : null,
        },
        register: {
            loading: false,
            success: false,
            error: false,
        },
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userData");
            return {
                ...state,
                login: {
                    loading: false,
                    data: null,
                    success: false,
                    error: false,
                    userToken: null,
                },
            };
        },
        resetErrorLogin: (state) => {
            return {
                ...state,
                login: {
                    loading: false,
                    data: null,
                    success: false,
                    error: false,
                    userToken: null,
                },
            };
        },
        resetErrorRegister: (state) => {
            return {
                ...state,
                register: {
                    loading: false,
                    success: false,
                    error: false,
                },
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginPost.pending, (state, action) => {
            return {
                ...state,
                login: {
                    loading: true,
                    data: null,
                    success: false,
                    error: false,
                    userToken: null,
                },
            };
        });
        builder.addCase(loginPost.fulfilled, (state, action) => {
            let data = {
                email: action.payload.data.payload.email,
                username: action.payload.data.payload.username,
            };

            localStorage.setItem(
                "userData",
                JSON.stringify(action.payload.data.payload)
            );

            return {
                ...state,
                login: {
                    data: data,
                    loading: false,
                    success: true,
                    error: false,
                    userToken: action.payload.data.payload.token,
                },
            };
        });
        builder.addCase(loginPost.rejected, (state, action) => {
            return {
                ...state,
                login: {
                    loading: false,
                    data: null,
                    success: false,
                    error: true,
                    userToken: null,
                },
            };
        });
        builder.addCase(registerPost.pending, (state, action) => {
            return {
                ...state,
                register: {
                    loading: true,
                    success: false,
                    error: false,
                },
            };
        });
        builder.addCase(registerPost.fulfilled, (state, action) => {
            return {
                ...state,
                register: {
                    loading: false,
                    success: true,
                    error: false,
                },
            };
        });
        builder.addCase(registerPost.rejected, (state, action) => {
            return {
                ...state,
                register: {
                    loading: false,
                    success: false,
                    error: true,
                },
            };
        });
    },
});

export const { logout, resetErrorLogin, resetErrorRegister } = slice.actions;

export default slice.reducer;
