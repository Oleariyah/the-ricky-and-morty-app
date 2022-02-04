import { combineReducers } from "redux";
import characters from "./characters";
import locations from "./location";
import episodes from "./episodes";
import origin from "./origin";

export default combineReducers({
  characters,
  locations,
  episodes,
  origin,
});
