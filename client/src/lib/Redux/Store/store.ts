import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Slice/usersSlice";
import communities from "../Slice/communitiesSlice";
import roles from "../Slice/rolesSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    communities: communities,
    roles: roles,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
