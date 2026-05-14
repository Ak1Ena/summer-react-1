import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../tests/utils'
import { http, HttpResponse } from 'msw'
import { server } from '../tests/server'
import AddStudentForm from './AddStudentForm'
import StudentTable from './StudentTable'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('AddStudentForm', () => {
  it('adds a new student', async () => {
    const user = userEvent.setup()
    
    server.use(
      http.post('https://68e9fdbaf1eeb3f856e5ae48.mockapi.io/students', () =>
        HttpResponse.json({
          id: 3,
          name: 'Charlie',
          studentId: 'S003',
          major: 'Testing',
          gpa: 4.0
        })
      ),
      http.get('https://68e9fdbaf1eeb3f856e5ae48.mockapi.io/students', () =>
        HttpResponse.json([
          { id: 1, name: 'Alice', studentId: 'S001', major: 'CS', gpa: 3.8 },
          { id: 2, name: 'Bob', studentId: 'S002', major: 'Math', gpa: 3.2 },
          { id: 3, name: 'Charlie', studentId: 'S003', major: 'Testing', gpa: 4.0 }
        ])
      )
    )

    renderWithProviders(
      <>
        <AddStudentForm />
        <StudentTable />
      </>
    )

    await user.type(screen.getByLabelText('Name'), 'Charlie')
    await user.type(screen.getByLabelText('Student ID'), 'S003')
    await user.type(screen.getByLabelText('Major'), 'Testing')
    await user.type(screen.getByLabelText('GPA'), '4.0')
    
    await user.click(screen.getByRole('button', { name: /add student/i }))

    // Wait for the button to be enabled again (mutation finished)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add student/i })).not.toBeDisabled()
    }, { timeout: 3000 })

    await waitFor(() => {
      expect(screen.getByText('Charlie')).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})
