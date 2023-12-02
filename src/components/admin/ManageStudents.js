import React from 'react'
import StudentTable from './components/StudentTable'

export default function ManageStudents() {
  return (
    <div className='mx-4 bg-success'>
      <h2 className='text-center p-1 bg-light fw-bold'>Manage Students</h2>
        <StudentTable/>
    </div>
  )
}
