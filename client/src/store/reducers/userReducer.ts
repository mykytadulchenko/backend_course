import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { signInUser } from "../thunks/userThunks"
import { resetStore } from "../../actions"

interface State {
  userName: string | null
  id: string | null
  error: string
}

const initialState: State = {
  userName: null,
  id: null,
  error: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<State>) => {
      const { id, userName } = action.payload
      state.id = id
      state.userName = userName
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<State>) => {
        const { id, userName } = action.payload
        state.id = id
        state.userName = userName
      })
      .addCase(signInUser.rejected, (state, action: PayloadAction<any, string>) => {
        state.error = action.payload
      })
      .addCase(resetStore, () => initialState)
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
