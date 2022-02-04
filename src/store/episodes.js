import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "episodes",
  initialState: {
    loadingEpisode: false,
    all: null,
    updated: null,
    lastFetch: null,
  },
  reducers: {
    episodeRequested: (episodes) => {
      episodes.loadingEpisode = true;
    },
    gotEpisodes: (episodes, action) => {
      episodes.loadingEpisode = false;
      episodes.all = action?.payload;
    },
    episodeRequestFailed: (episodes) => {
      episodes.loadingEpisode = false;
    },
  },
});

const { episodeRequested, episodeRequestFailed, gotEpisodes } = slice.actions;

//Action Creators

export const getCharacterEpisodes = (epIds) => (dispatch, getState) => {
  dispatch(
    apiCallBegan({
      url: `/episode/${epIds}`,
      method: "get",
      onStart: episodeRequested.type,
      onSuccess: gotEpisodes.type,
      onError: episodeRequestFailed.type,
    })
  );
};

//Selectors
//Memoization
export const getEpisodes = createSelector(
  (state) => state.entities.episodes,
  (episodes) => episodes
);

export default slice.reducer;
