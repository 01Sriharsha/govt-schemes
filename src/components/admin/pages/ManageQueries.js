import React, { useEffect, useState } from 'react'
import { Button, Container, FormControl, Modal, Table } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { upadteQuery } from '../../../api/adminService';
import { getAllQueries } from '../../../api/memberService';
import { TOAST_PROP } from '../../../App';
import AdminActions from '../layout/AdminActions'

export default function ManageQueries() {

    const [queries, setQueries] = useState([]);

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    useEffect(() => {
        getAllQueries().then(res => {
            // console.log(res.data);
            setQueries(res.data)
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load all queries!!")
        })
    }, [])


    return (
        <Container>
            <div className='my-3'>
                <AdminActions />
                <h1 className='text-center my-4 text-s'>All Queries</h1>
                <Table className='my-4'>
                    <thead>
                        <tr className='text-capitalize text-center'>
                            <th>Query Id</th>
                            <th className='ms-4'>Scheme Title</th>
                            <th>Member Name</th>
                            <th>Query</th>
                            <th>Reply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.map((query, index) => (
                            <tr className='text-capitalize text-center' key={index}>
                                <td className='fw-semibold'>{query.id}</td>
                                <td>{query.scheme.title}</td>
                                <td>{query.member.name}</td>
                                <td className='w-25'>{query.message}</td>
                                <td>
                                    <div className='d-flex justify-content-center'>
                                        {query.reply
                                            ? <span>{query.reply}</span>
                                            : (
                                                <>
                                                    <Button className='btn-sm bg-color border-0' onClick={toggle}>Reply</Button>
                                                    <ReplyModal show={show} toggle={toggle} query={query} />
                                                </>
                                            )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    )
}

function ReplyModal(props) {

    const [reply, setReply] = useState('');

    function handleSubmitReply() {
        const queryData = { message: props?.query?.message, reply: reply }
        toast.promise(upadteQuery(props?.query?.id, queryData), {
            pending: "Posting the reply...",
            success: "Reply posted sucvcessfully!!"
        }, TOAST_PROP)
            .then(res => {
                // console.log(res);
            }).catch(err => {
                console.log(err);
                toast.error("Failed to post the reply!!")
            })
        setReply('')
    }

    return (
        <Modal show={props.show} onHide={props.toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Reply for Query : {props.query.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    as={'textarea'}
                    cols={'10'} rows="4"
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Reply Here..."
                    value={reply}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggle}>
                    NO
                </Button>
                <Button className='bg-color border-0' onClick={() => {
                    props?.toggle()
                    handleSubmitReply()
                }}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
