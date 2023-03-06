import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteApplication, getAllApllicationsByMemberID, getAllApplications } from '../../../api/memberService'
import { TOAST_PROP } from '../../../App';
import { CustomContext } from '../../../context/AuthContext';

export default function MyApplications() {

    const context = CustomContext();

    const memberId = context?.user?.id

    const [applications, setApplications] = useState([]);

    useEffect(() => {
        getAllApllicationsByMemberID(memberId).then(res => {
            setApplications(res.data)
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load your applications!!")
        })
    }, [memberId])

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

    if (applications?.length === 0) {
        return (
            <div
                className='d-flex justify-content-center align-items-center flex-column'
                style={{ height: '80vh' }}
            >
                <h1>No Applications!!</h1>
                <h4 className='my-2'><Link to={"/member/matching-schemes"} className="text-s">Click Here to apply one!</Link></h4>
            </div>
        )
    }
    return (
        <Container>
            <div className='my-3'>
                <h1 className='text-center my-4 text-s'>Your Applications</h1>
                <Table responsive>
                    <thead>
                        <tr className='text-center'>
                            <th>Application Id</th>
                            <th>Scheme Title</th>
                            <th>Applicant Name</th>
                            <th>Applicant Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application, index) => (
                            <tr className='text-capitalize text-center' key={index}>
                                <td className='fw-semibold'>{application.id}</td>
                                <td>{application.scheme.title}</td>
                                <td>{application.member.name}</td>
                                <td>{application.status}</td>
                                <td>
                                    <Button
                                        variant='secondary'
                                        className='btn-sm d-flex gap-1 align-items-center'
                                        onClick={() => handleDelete(application.id)}
                                    >
                                        Delete
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
