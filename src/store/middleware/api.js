import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, method, data, onSuccess, onStart, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    try {
      const response = await axios.request({
        baseURL: process.env.REACT_APP_API_URL,
        url,
        method,
        data,
      });
      //General
      dispatch(actions.apiCallSuccess(response.data));
      //Specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response?.data });
    } catch (error) {
      //General
      dispatch(actions.apiCallFailed(error?.response?.data?.message));
      //Specific
      if (onError)
        dispatch({ type: onError, payload: error?.response?.data?.message });
    }
  };

export default api;
