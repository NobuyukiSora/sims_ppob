import { createAsyncThunk } from "@reduxjs/toolkit";

// Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log('res: ', data)
      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (body, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://take-home-test-api.nutech-integrasi.com/login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User Profile
export const UserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (token, { rejectWithValue }) => {

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch("https://take-home-test-api.nutech-integrasi.com/profile", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User Balance
export const UserBalance = createAsyncThunk(
  "auth/userBalance",
  async (token, { rejectWithValue }) => {

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch("https://take-home-test-api.nutech-integrasi.com/balance", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Services
export const Services = createAsyncThunk(
  "auth/services",
  async (token, { rejectWithValue }) => {

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch("https://take-home-test-api.nutech-integrasi.com/services", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Banner
export const Banner = createAsyncThunk(
  "auth/banner",
  async (token, { rejectWithValue }) => {

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch("https://take-home-test-api.nutech-integrasi.com/banner", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
