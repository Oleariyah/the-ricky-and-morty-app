import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "locations",
  initialState: {
    loadingLocations: false,
    all: null,
    updated: null,
    lastFetch: null,
  },
  reducers: {
    locationsRequested: (locations) => {
      locations.loadingLocations = true;
    },
    gotLocations: (locations, action) => {
      locations.loadingLocations = false;
      locations.all = action?.payload;
    },
    locationsRequestFailed: (locations) => {
      locations.loadingLocations = false;
    },
    locationsReset: (locations) => {
      locations.loadingLocations = false;
      locations.all = null;
      locations.updated = null;
      locations.lastFetch = null;
    },
  },
});

const {
  locationsRequested,
  locationsRequestFailed,
  gotLocations,
  locationsReset,
} = slice.actions;

//Action Creators
export const resetLocation = () => (dispatch, getState) => {
  dispatch({ type: locationsReset.type });
};

export const getCharacterLocations = (id) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/location/${id}`,
      method: "get",
      onStart: locationsRequested.type,
      onSuccess: gotLocations.type,
      onError: locationsRequestFailed.type,
    })
  );
};

//Selectors
//Memoization
export const getLocations = createSelector(
  (state) => state.entities.locations,
  (locations) => locations
);

export default slice.reducer;
