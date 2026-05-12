// src/features/students/selectors.js
import { createSelector } from '@reduxjs/toolkit';
import { selectAllStudents } from './studentsSlice';

// ── Primitive selectors (return scalars — no memoization needed)
export const selectStudentsStatus = (state) => state.students.status;
export const selectStudentsError = (state) => state.students.error;

// ── Derived selectors (memoized — compute arrays or objects)
export const selectAverageGpa = createSelector(
  selectAllStudents,
  (students) => {
    if (!students.length) return '—';
    const total = students.reduce((acc, s) => acc + s.gpa, 0);
    return (total / students.length).toFixed(2);
  }
);

export const selectHighAchievers = createSelector(
  selectAllStudents,
  (students) => students.filter((s) => s.gpa >= 3.5)
);

export const selectGpaDistribution = createSelector(
  selectAllStudents,
  (students) => ({
    high: students.filter((s) => s.gpa >= 3.5).length,
    medium: students.filter((s) => s.gpa >= 2.5 && s.gpa < 3.5).length,
    low: students.filter((s) => s.gpa < 2.5).length,
  })
);
