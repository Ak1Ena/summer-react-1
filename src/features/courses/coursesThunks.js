import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://68e9fdbaf1eeb3f856e5ae48.mockapi.io/coruses';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch courses');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCourseAsync = createAsyncThunk(
  'courses/addCourseAsync',
  async (newCourse, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      });
      if (!response.ok) throw new Error('Failed to add course');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCourseAsync = createAsyncThunk(
  'courses/updateCourseAsync',
  async (updatedCourse, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${updatedCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCourse),
      });
      if (!response.ok) throw new Error('Failed to update course');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCourseAsync = createAsyncThunk(
  'courses/deleteCourseAsync',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete course');
      const data = await response.json();
      return data.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
