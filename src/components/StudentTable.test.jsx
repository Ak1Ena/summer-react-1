import { screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../tests/utils'
import { http, HttpResponse } from 'msw'
import { server } from '../tests/server'
import StudentTable from './StudentTable'
import { describe, it, expect } from 'vitest'
import React from 'react'

describe('StudentTable', () => {
  it('shows loading state', async () => {
    renderWithProviders(<StudentTable />)
    expect(screen.getByText(/loading students.../i)).toBeInTheDocument()
  })

  it('renders student rows', async () => {
    renderWithProviders(<StudentTable />)
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument()
      expect(screen.getByText('Bob')).toBeInTheDocument()
    })
  })

  it('shows error on 403', async () => {
    server.use(
      http.get('https://68e9fdbaf1eeb3f856e5ae48.mockapi.io/students', () =>
        HttpResponse.json({ error: 'Forbidden' }, { status: 403 })
      )
    )
    renderWithProviders(<StudentTable />)
    await waitFor(() => {
      expect(screen.getByText(/error: 403/i)).toBeInTheDocument()
    })
  })
})
