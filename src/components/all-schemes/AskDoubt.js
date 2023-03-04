import React from 'react'
import { Button, FormControl, Modal } from 'react-bootstrap';

export default function AskDoubt(props) {
    return (
        <Modal show={props.show} onHide={props.toggle}>
            <Modal.Header closeButton>
                <Modal.Title>Ask Doubt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl as={'textarea'} placeholder="Enter your query" rows="3" />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggle}>
                    Close
                </Button>
                <Button className='bg-color border-0' onClick={props.toggle}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
