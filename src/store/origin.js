import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "origin",
  initialState: {
    loadingOrigin: false,
    all: null,
    updated: null,
    lastFetch: null,
  },
  reducers: {
    originRequested: (origin) => {
      origin.loadingOrigin = true;
    },
    gotOrigin: (origin, action) => {
      origin.loadingOrigin = false;
      origin.all = action?.payload;
    },
    originRequestFailed: (origin) => {
      origin.loadingOrigin = false;
    },
  },
});

const { originRequested, originRequestFailed, gotOrigin } = slice.actions;

//Action Creators

export const getCharacterOrigin = (characterId) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/location/${characterId}`,
      method: "get",
      onStart: originRequested.type,
      onSuccess: gotOrigin.type,
      onError: originRequestFailed.type,
    })
  );
};

//Selectors
//Memoization
export const getOrigin = createSelector(
  (state) => state.entities.origin,
  (origin) => origin
);

export default slice.reducer;
