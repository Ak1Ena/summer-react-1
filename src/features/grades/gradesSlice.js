import { createSlice } from '@reduxjs/toolkit';

const gradesSlice = createSlice({
  name: 'grades',
  initialState: { 
    list: [
      { id: 1, studentId: 1, courseId: 1, grade: 'A' },
      { id: 2, studentId: 1, courseId: 2, grade: 'B+' },
      { id: 3, studentId: 2, courseId: 1, grade: 'A' },
    ] 
  },
  reducers: {
    addGrade: (state, action) => {
      state.list.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    updateGrade: (state, action) => {
      const i = state.list.findIndex(g => g.id === action.payload.id);
      if (i !== -1) state.list[i] = action.payload;
    },
    deleteGrade: (state, action) => {
      state.list = state.list.filter(g => g.id !== action.payload);
    },
  },
});

export const { addGrade, updateGrade, deleteGrade } = gradesSlice.actions;
export default gradesSlice.reducer;
