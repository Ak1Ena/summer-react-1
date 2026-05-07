import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://68e9fdbaf1eeb3f856e5ae48.mockapi.io/students';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch students');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addStudentAsync = createAsyncThunk(
  'students/addStudentAsync',
  async (newStudent, { rejectWithValue }) => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStudent),
      });
      if (!response.ok) throw new Error('Failed to add student');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudentAsync = createAsyncThunk(
  'students/updateStudentAsync',
  async (updatedStudent, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${updatedStudent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedStudent),
      });
      if (!response.ok) throw new Error('Failed to update student');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStudentAsync = createAsyncThunk(
  'students/deleteStudentAsync',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete student');
      // MockAPI usually returns the deleted object, but we only need the ID to update state
      const data = await response.json();
      return data.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
