import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminActions() {

  return (
    <div className='d-flex gap-2 align-items-baseline text-decoration-none'>
      <h6>Quick Actions</h6> |
      <div className='admin-actions d-flex gap-3 align-items-baseline'>
        <Link to="/admin/dashboard/add-types">Add User Type</Link>
        <Link to="/admin/dashboard/add-caste">Add Caste</Link>
        <Link to="/admin/dashboard/add-scheme">Add Scheme</Link>
        <Link to="/admin/dashboard/applications">Manage Applications</Link>
        <Link to="/admin/dashboard/queries">Manage Queries</Link>
      </div>
    </div>
  )
}
