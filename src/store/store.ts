import { configureStore } from "@reduxjs/toolkit";
import rulesReducer from "./slices/rulesSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rulesPersistConfig = {
  key: "rules",
  storage,
};

const persistedRulesReducer = persistReducer(rulesPersistConfig, rulesReducer);

export const store = configureStore({
  reducer: {
    rules: persistedRulesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
