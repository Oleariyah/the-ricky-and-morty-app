import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "./middleware/logger";
import toastNotification from "./middleware/toast";
import storage from "redux-persist/lib/storage";
import api from "./middleware/api";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    logger("console"),
    toastNotification,
    api,
  ],
});

const persistor = persistStore(store);

export { store, persistor };
