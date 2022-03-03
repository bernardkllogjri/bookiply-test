import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getAll } from './reviewsAPI';
import { ReviewsState } from './types';

const initialState: ReviewsState = {
  data: [],
  status: 'idle',
  page: 1,
  totalCount: 0,
  limit: 10,
  query: '',
  filter: ''
};

export const reviewAsyncGet = createAsyncThunk(
  'reviews/fetchAll',
  async (options?: string) => {
    const response = await getAll(options);
    return response;
  }
);


export const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    resetFilters: (state) => {
      state.page = 1
      state.totalCount = 0
    },
    setFilters: (state, action: PayloadAction<{ filter?: string, query?: string }>) => {
      console.warn({ action });
      
      if(action.payload.filter) state.filter = action.payload.filter
      if(action.payload.query) state.query = action.payload.query
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(reviewAsyncGet.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reviewAsyncGet.fulfilled, (state, action) => {
        state.status = 'idle';
        if(state.page === 1){
          state.data = action.payload.data
        } else {
          state.data.push(...action.payload.data)
        }
        state.page += 1
        state.totalCount = action.payload.totalCount
      })
      .addCase(reviewAsyncGet.rejected, (state) => {
        state.status = 'idle';
        state.data = []
      })
  },
});

export const { resetFilters, setFilters } = reviewSlice.actions;
export const selectReviews = (state: RootState) => state.reviews;
export default reviewSlice.reducer;
