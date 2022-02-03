import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "characters",
  initialState: {
    loading: false,
    details: null,
    updated: null,
    lastFetch: null,
  },
  reducers: {
    charactersRequested: (characters) => {
      characters.loading = true;
    },
    gotCharacters: (characters, action) => {
      characters.loading = false;
      characters.details = action?.payload;
    },
    charactersRequestFailed: (characters) => {
      characters.loading = false;
    },
    charactersReset: (characters) => {
      characters.loading = false;
      characters.details = null;
      characters.updated = null;
      characters.lastFetch = null;
    },
  },
});

const { charactersRequested, charactersRequestFailed, gotCharacters } =
  slice.actions;

//Action Creators
export const getAllCharacters = () => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: "/character",
      method: "get",
      onStart: charactersRequested.type,
      onSuccess: gotCharacters.type,
      onError: charactersRequestFailed.type,
    })
  );
};

//Selectors
//Memoization
export const getCharacters = createSelector(
  (state) => state.entities.characters,
  (characters) => characters
);

export default slice.reducer;
