import React from 'react'
import { FormText, ListGroup } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export default function AdminActions() {
  const { pathname } = useLocation();

  return (
    <div className='d-flex gap-2 align-items-baseline text-decoration-none'>
      <h6>Quick Actions</h6> |
      <div className='admin-actions d-flex gap-3 align-items-baseline'>
        <Link to="/admin/dashboard/add-types">Add User Type</Link>
        <Link to="/admin/dashboard/add-caste">Add Caste</Link>
        <Link to="/admin/dashboard/add-scheme">Add Scheme</Link>
        {/* {
        !pathname.includes("/add-types") && <Link to="/admin/dashboard/add-types">Add User Type</Link>
      }
      {
        !pathname.includes("/add-caste") && <Link to="/admin/dashboard/add-caste">Add Caste</Link>
      }
      {
        !pathname.includes("/add-scheme") && <Link to="/admin/dashboard/add-scheme">Add Scheme</Link>
      } */}
      </div>
    </div>
  )
}
