import { createSlice } from "@reduxjs/toolkit";
import { Banner, loginUser, registerUser, Services, Topup, Transaction, TransactionHistory, UserBalance, UserProfile } from "./dispatchApi";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        status: "idle", // "idle" | "loading" | "succeeded" | "failed"
        error: null,
        profile: null,
        balance: null,
        banner: null,
        services: null,
        topup: null,
        transaction: null,
        transactionHistory: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.status = "idle";
            state.error = null;
            state.profile = null;
            state.balance = null;
            state.banner = null;
            state.services = null;
            state.topup = null;
            state.transaction = null;
            state.transactionHistory = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload.user;
                state.token = action.payload.data?.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(UserProfile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(UserProfile.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profile = action.payload;
            })
            .addCase(UserProfile.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(UserBalance.pending, (state) => {
                state.status = "loading";
            })
            .addCase(UserBalance.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.balance = action.payload?.data;
            })
            .addCase(UserBalance.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(Services.pending, (state) => {
                state.status = "loading";
            })
            .addCase(Services.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.services = action.payload?.data;
            })
            .addCase(Services.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(Banner.pending, (state) => {
                state.status = "loading";
            })
            .addCase(Banner.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.banner = action.payload?.data;
            })
            .addCase(Banner.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(Topup.pending, (state) => {
                state.status = "loading";
            })
            .addCase(Topup.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.transaction = action.payload?.data;
            })
            .addCase(Topup.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(Transaction.pending, (state) => {
                state.status = "loading";
            })
            .addCase(Transaction.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.transaction = action.payload?.data;
            })
            .addCase(Transaction.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(TransactionHistory.pending, (state) => {
                state.status = "loading";
            })
            .addCase(TransactionHistory.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.transactionHistory = action.payload?.data;
            })
            .addCase(TransactionHistory.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;