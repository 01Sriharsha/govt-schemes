import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap';
import { HiOutlineUpload } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { deleteApplication, getAllApplications } from '../../../api/memberService'
import { TOAST_PROP } from '../../../App';

export default function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        getAllApplications().then(res => {
            setApplications(res.data)
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load your applications!!")
        })
    }, [])

    function handleDelete(id) {
        toast.promise(deleteApplication(id), {
            pending: "Deleting Application...",
            success: "Application deleted successfully!!"
        }, TOAST_PROP)
            .then(res => {
                const newArr = applications.filter(application => application.id !== id)
                setApplications(newArr)
            })
            .catch(err => {
                toast.error(err.response.data ? err.response.data : "Failed to delete application", TOAST_PROP)
            })
    }

    return (
        <Container>
            <div className='my-3'>
                <h1 className='text-center my-3'>Your Applications</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Application Id</th>
                            <th>Scheme Title</th>
                            <th>Applicant Name</th>
                            <th>Applicant Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(application => (
                            <tr className='text-capitalize'>
                                <td>{application.id}</td>
                                <td>{application.scheme.title}</td>
                                <td>{application.member.name}</td>
                                <td>{application.status}</td>
                                <td>
                                    <Button className='btn-sm d-flex gap-1 align-items-center' onClick={() => handleDelete(application.id)}>
                                        <span>Download</span>
                                        <HiOutlineUpload />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}
