import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
    return (
        <Container className='my-3'>
            <div className='d-flex justify-content-center flex-column align-items-center'>
                <h1>Quick Actions</h1>
                <div className='d-flex flex-column w-50 gap-3 my-3'>
                    <Button as={Link} to="/admin/dashboard/add-scheme" className='bg-color-s border-0'>Add Scheme</Button>
                    <Button as={Link} to="/admin/dashboard/add-types" className='bg-color-s border-0'>Add User Type</Button>
                    <Button as={Link} to="/admin/dashboard/add-caste" className='bg-color-s border-0'>Add Caste</Button>
                    <Button as={Link} to="/admin/dashboard/applications" className='bg-color-s border-0'>Manage Applications</Button>
                </div>
            </div>
        </Container>
    )
}
