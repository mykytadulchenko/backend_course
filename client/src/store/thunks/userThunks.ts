import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../utils/axios";
import { setTokens } from "../../utils/tokensHandler";

export const signInUser = createAsyncThunk<any, { username: string; password: string }>(
  "user/signInUser",
  async (data, api) => {
    try {
      const response = await client.post<{ accessToken: string; refreshToken: string }>("/auth/sign-in", data)
      setTokens(response.data)
      const user = JSON.parse(atob(response.data.accessToken.split(".")[1]))
      return { id: user.id, userName: user.username }
    } catch (err: any) {
      return api.rejectWithValue(err.message)
    }
  },
)
