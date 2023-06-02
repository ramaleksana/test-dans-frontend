import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import JobService from "../service/JobSevice";
import { logout } from "./auth";
import axios from "axios";

export const getJobs = createAsyncThunk(
    "jobs/view",
    async (q = "", thunkApi) => {
        let userInfo = localStorage.getItem("userData") || null;
        userInfo = userInfo ? JSON.parse(userInfo) : null;
        let token = userInfo?.token;
        try {
            const data = axios.get(`job${q}`, {
                baseURL: "http://localhost:8080/",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (e) {
            thunkApi.dispatch(logout());
            throw new Error(e.message);
        }
    }
);

export const detailJobs = createAsyncThunk(
    "jobs/detail",
    async (id, thunkApi) => {
        try {
            let userInfo = localStorage.getItem("userData") || null;
            userInfo = userInfo ? JSON.parse(userInfo) : null;
            let token = userInfo?.token;
            const data = await axios.get(`job/${id}`, {
                baseURL: "http://localhost:8080/",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (e) {
            thunkApi.dispatch(logout());
            throw new Error(e.message);
        }
    }
);

const slice = createSlice({
    name: "jobs",
    initialState: {
        detail: { loading: false, data: null },
        view: { loading: false, data: [] },
    },
    reducers: {
        getUser: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getJobs.pending, (state, action) => {
            return {
                ...state,
                view: { data: [], loading: true },
            };
        });
        builder.addCase(getJobs.fulfilled, (state, action) => {
            return {
                ...state,
                view: { data: action.payload.data.payload, loading: false },
            };
        });
        builder.addCase(getJobs.rejected, (state, action) => {
            return {
                ...state,
                view: { data: [], loading: false },
            };
        });
        builder.addCase(detailJobs.pending, (state, action) => {
            return {
                ...state,
                detail: { data: [], loading: true },
            };
        });
        builder.addCase(detailJobs.fulfilled, (state, action) => {
            return {
                ...state,
                detail: { data: action.payload.data.payload, loading: false },
            };
        });
    },
});

export const { getUser } = slice.actions;

export default slice.reducer;
