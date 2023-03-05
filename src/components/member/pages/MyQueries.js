import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteQuery, getAllQueries } from '../../../api/memberService';
import { TOAST_PROP } from '../../../App';

export default function MyQueries() {

    const [queries, setQueries] = useState([]);

    useEffect(() => {
        getAllQueries().then(res => {
            setQueries(res.data)
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load all queries!!", TOAST_PROP)
        })
    }, [])

    function handleDelete(id) {
        toast.promise(deleteQuery(id), {
            pending: "Removing the query...",
            success: "Query removed successfully!!"
        }, TOAST_PROP)
            .then(res => {
                const newArr = queries.filter(query => query.id !== id)
                setQueries(newArr)
            })
            .catch(err => {
                console.log(err);
                toast.error(err?.response?.data ? err?.response?.data : "Failed to remove the query", TOAST_PROP)
            })
    }

    return (
        <Container>
            <div className='my-3'>
                <h1 className='text-center my-3 text-s'>Your Queries</h1>
                <Table responsive>
                    <thead>
                        <tr className='text-center'>
                            <th>Query Id</th>
                            <th>Scheme Title</th>
                            <th>Member Name</th>
                            <th>Query</th>
                            <th>Reply</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.map((query, index) => (
                            <tr className='text-capitalize text-center' key={index}>
                                <td className='fw-semibold'>{query.id}</td>
                                <td>{query?.scheme?.title}</td>
                                <td>{query?.member?.name}</td>
                                <td className='w-25'>{query?.message}</td>
                                <td>
                                    {query.reply !== null
                                        ? <span>{query.reply}</span>
                                        : <span>No Reply</span>
                                    }
                                </td>
                                <td>
                                    <div className='d-flex justify-content-center'>
                                        <Button
                                            variant='secondary'
                                            className='btn-sm d-flex gap-1 align-items-center'
                                            onClick={() => handleDelete(query?.id)}
                                        >
                                            Delete
                                        </Button>
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
