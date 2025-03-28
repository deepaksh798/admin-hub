import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "@/utils/apiServices";

interface RolesState {
  roles: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RolesState = {
  roles: [],
  loading: false,
  error: null,
};

// Async thunk to fetch communities when "Fetch" is clicked
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getRoles();
      return response.content.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const RolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default RolesSlice.reducer;
