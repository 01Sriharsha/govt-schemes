import React, { useState } from 'react'
import { Button, FormControl, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createNewQuery } from '../../api/memberService';
import { TOAST_PROP } from '../../App';
import { CustomContext } from '../../context/AuthContext';

export default function AskDoubt(props) {

    const [query, setQuery] = useState('');

    const context = CustomContext();

    const navigate = useNavigate();

    function handleSubmitQuery() {
        const memberId = context?.user?.id
        const queryData = { message: query }
        toast.promise(createNewQuery(memberId, props.scheme?.id, queryData), {
            pending: "Posting query...",
            success: "Query posted successfully!!"
        }, TOAST_PROP)
            .then(res => {
                console.log(res);
                navigate("/member/queries")
            }).catch(err => {
                console.log(err);
                toast.error("Failed to post query!!", TOAST_PROP)
            })
    }

    return (
        <Modal show={props.show} onHide={props.toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Ask Doubt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl
                    as={'textarea'}
                    placeholder="Enter your query"
                    rows="3"
                    onChange={(event) => setQuery(event.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggle}>
                    Close
                </Button>
                <Button className='bg-color border-0' onClick={() => {
                    handleSubmitQuery()
                    props.toggle()
                }}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
