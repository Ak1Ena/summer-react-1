import { http, HttpResponse } from 'msw'

const students = [
  { id: 1, name: 'Alice', studentId: 'S001', major: 'CS', gpa: 3.8 },
  { id: 2, name: 'Bob', studentId: 'S002', major: 'Math', gpa: 3.2 }
]

export const handlers = [
  http.get('https://68e9fdbaf1eeb3f856e5ae48.mockapi.io/students', () => {
    return HttpResponse.json(students)
  }),
  http.post('https://68e9fdbaf1eeb3f856e5ae48.mockapi.io/students', async ({ request }) => {
    const student = await request.json()
    const newStudent = { id: Math.max(0, ...students.map(s => s.id)) + 1, ...student }
    students.push(newStudent)
    return HttpResponse.json(newStudent, { status: 201 })
  })
]
