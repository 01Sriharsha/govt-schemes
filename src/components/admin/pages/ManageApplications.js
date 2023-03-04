import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteApplication, getAllApplications } from '../../../api/memberService';
import { TOAST_PROP } from '../../../App';
import { HiOutlineDownload } from 'react-icons/hi'

export default function ManageApplications() {

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
                <h1 className='text-center my-3'>All Applications</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Application Id</th>
                            <th>Scheme Title</th>
                            <th>Applicant Name</th>
                            <th>Application Documents</th>
                            <th>Applicant Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(application => (
                            <tr className='text-capitalize'>
                                <td>{application.id}</td>
                                <td>{application.scheme.title}</td>
                                <td>{application.member.name}</td>
                                <td>
                                    <div className='w-75 d-flex justify-content-center'>
                                        <Button className='btn-sm d-flex gap-1 align-items-center'>
                                            <span>Download</span>
                                            <HiOutlineDownload />
                                        </Button>
                                    </div>
                                </td>
                                <td className='d-flex gap-3'>
                                    <Button className='btn-sm bg-color border-0'
                                        onClick={() => handleDelete(application.id)}
                                    >
                                        Approve</Button>
                                    <Button className='btn-sm' variant='secondary'
                                        onClick={() => handleDelete(application.id)}
                                    >
                                        Reject</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}
