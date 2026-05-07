import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCourses,
  addCourseAsync,
  updateCourseAsync,
  deleteCourseAsync,
} from './coursesThunks';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addCourseAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCourseAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      });
  },
});

export default coursesSlice.reducer;
