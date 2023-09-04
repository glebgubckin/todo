import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  darkTheme: boolean;
}

const initialState: InitialState = {
  darkTheme: JSON.parse(localStorage.getItem("theme") || "false") as boolean,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.darkTheme = !state.darkTheme;
      localStorage.setItem("theme", JSON.stringify(state.darkTheme));
    },
  },
});

export const { changeTheme } = appSlice.actions;

export default appSlice.reducer;
