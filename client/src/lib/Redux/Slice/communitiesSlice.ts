import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "@/utils/apiServices";

interface CommunitiesState {
  communities: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CommunitiesState = {
  communities: [],
  loading: false,
  error: null,
};

// Async thunk to fetch communities when "Fetch" is clicked
export const fetchCommunities = createAsyncThunk(
  "communities/fetchCommunities",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.getAllCommunities();
      return response.content;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const CommunitiesSlice = createSlice({
  name: "communities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.communities = action.payload;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default CommunitiesSlice.reducer;
