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
    locatiionsRequested: (locations) => {
      locations.loadingLocations = true;
    },
    gotLocations: (locations, action) => {
      locations.loadingLocations = false;
      locations.all = action?.payload;
    },
    locatiionsRequestFailed: (locations) => {
      locations.loadingLocations = false;
    },
  },
});

const { locatiionsRequested, locatiionsRequestFailed, gotLocations } =
  slice.actions;

//Action Creators

export const getCharacterLocations = (id) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/location/${id}`,
      method: "get",
      onStart: locatiionsRequested.type,
      onSuccess: gotLocations.type,
      onError: locatiionsRequestFailed.type,
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
