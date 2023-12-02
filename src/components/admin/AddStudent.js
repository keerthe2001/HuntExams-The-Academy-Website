import React from 'react'
import StudentAddForm from './components/StudentAddForm'

export default function AddStudent() {
  return (
    <div className='container shadow bg-success rounded-bottom'>
      <h2 className='text-center bg-light fw-bold'>Student Add Form</h2>
      <StudentAddForm />
    </div>
  )
}
