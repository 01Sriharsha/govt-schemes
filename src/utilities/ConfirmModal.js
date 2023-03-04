import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ConfirmModal(props) {
  return (
    <Modal show={props.show} onHide={props.toggle}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.toggle}>
          NO
        </Button>
        <Button className='bg-color border-0' onClick={() => {
          props?.toggle()
          props?.action()
        }}>
          YES
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
