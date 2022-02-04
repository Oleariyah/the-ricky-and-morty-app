import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "characters",
  initialState: {
    loading: false,
    all: null,
    detail: null,
    updated: null,
    lastFetch: null,
  },
  reducers: {
    charactersRequested: (characters) => {
      characters.loading = true;
    },
    gotCharacters: (characters, action) => {
      characters.loading = false;
      characters.all = action?.payload;
    },
    gotSingleCharacter: (characters, action) => {
      characters.loading = false;
      characters.detail = action?.payload;
    },
    charactersRequestFailed: (characters) => {
      characters.loading = false;
    },
    charactersReset: (characters) => {
      characters.loading = false;
      characters.all = null;
      characters.detail = null;
      characters.updated = null;
      characters.lastFetch = null;
    },
  },
});

const {
  charactersRequested,
  charactersRequestFailed,
  gotCharacters,
  gotSingleCharacter,
} = slice.actions;

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

export const getSingleCharacter = (characteId) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/character/${characteId}`,
      method: "get",
      onStart: charactersRequested.type,
      onSuccess: gotSingleCharacter.type,
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
