import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getAllApplications } from '../../../api/memberService';
import { TOAST_PROP } from '../../../App';
import { HiOutlineDownload } from 'react-icons/hi'
import { AiOutlineCloseCircle, AiFillCheckCircle } from 'react-icons/ai'
import { BASE_URL, updateApplication } from '../../../api/adminService';
import AdminActions from '../layout/AdminActions';
import { Link } from 'react-router-dom';

export default function ManageApplications() {

    const [applications, setApplications] = useState([]);

    const [updated, setUpdated] = useState(null);

    const [viewApplications, setViewApplications] = useState(null);

    useEffect(() => {
        setUpdated(false);
        getAllApplications().then(res => {
            setApplications(res.data)
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load your applications!!", TOAST_PROP)
        })
    }, [updated])

    function handleStatus(id, status) {
        const applicationData = { status: status }
        toast.promise(updateApplication(id, applicationData), {
            pending: "Updating Application Status...",
            success: "Application status updated successfully!!"
        }, TOAST_PROP)
            .then(res => setUpdated(true))
            .catch(err => {
                toast.error(err.response.data ? err.response.data : "Failed to delete application", TOAST_PROP)
            })
    }

    return (
        <Container>
            <div className='my-3'>
                <AdminActions />
                <div className='d-flex justify-content-between align-items-center px-3 my-4'>
                    <h1 className='text-center text-s text-capitalize'>
                        {viewApplications === null ? "All" : viewApplications} Applications
                    </h1>
                    <div>
                        <h5 className='text-center'>View Applications</h5><hr />
                        <div className='d-flex gap-3 justify-content-center'>
                            <Button variant={'outline-primary'} className='btn-sm '
                                onClick={() => setViewApplications(null)}
                            >
                                All
                            </Button>
                            <Button variant={'outline-warning'} className='btn-sm'
                                onClick={() => setViewApplications("pending")}
                            >
                                Pending
                            </Button>
                            <Button variant={'outline-success'} className='btn-sm'
                                onClick={() => setViewApplications("approved")}
                            >
                                Approved
                            </Button>
                            <Button variant={'outline-secondary'} className='btn-sm'
                                onClick={() => setViewApplications("rejected")}
                            >
                                Rejected
                            </Button>
                        </div>
                    </div>
                </div>
                <Table className='my-4'>
                    <thead>
                        <tr className='text-capitalize text-center'>
                            <th>Application Id</th>
                            <th className='ms-4'>Scheme Title</th>
                            <th>Applicant Name</th>
                            <th>Application Documents</th>
                            <th>Applicantion Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.filter(application => viewApplications ? application.status === viewApplications : applications).map(application => (
                            <tr className='text-capitalize text-center' key={application.id}>
                                <td className='fw-semibold'>{application.id}</td>
                                <td>{application.scheme.title}</td>
                                <td className=''>{application.member.name}</td>
                                <td>
                                    <div className='w-100 d-flex justify-content-center'>
                                        <Button
                                            as={Link}
                                            to={BASE_URL + `/applications/${application?.id}/documents/download`}
                                            className='btn-sm btn-p d-flex gap-1 align-items-center'
                                        >
                                            <span>Download</span>
                                            <HiOutlineDownload />
                                        </Button>
                                    </div>
                                </td>
                                {application.status === "pending"
                                    ? (
                                        <td className='d-flex gap-3 justify-content-center'>
                                            <Button className='btn-sm bg-color border-0'
                                                onClick={() => handleStatus(application.id, "approved")}
                                            >
                                                Approve</Button>
                                            <Button className='btn-sm' variant='secondary'
                                                onClick={() => handleStatus(application.id, "rejected")}
                                            >
                                                Reject</Button>
                                        </td>
                                    ) : (
                                        <td className='text-muted'>
                                            <div className=''>
                                                {application?.status?.includes("approved")
                                                    ? (
                                                        <div className='text-success d-flex gap-1 align-items-center justify-content-center'>
                                                            <span>Approved</span>
                                                            <AiFillCheckCircle />
                                                        </div>
                                                    ) : (
                                                        <div className='text-danger d-flex gap-1 align-items-center justify-content-center'>
                                                            <span>Rejected</span>
                                                            <AiOutlineCloseCircle />
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </td>
                                    )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}
