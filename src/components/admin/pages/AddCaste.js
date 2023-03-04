import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, FormControl, Row, Table } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { addCaste, addUserType, deleteCaste, getAllCaste, getAllUserTypes } from '../../../api/adminService';
import { TOAST_PROP } from '../../../App';
import ConfirmModal from '../../../utilities/ConfirmModal';
import AdminActions from '../layout/AdminActions';

export default function AddUserType() {

    const [caste, setCaste] = useState('');

    const [casteArray, setCasteArray] = useState([]);

    const [changed, setChanged] = useState(null);

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    useEffect(() => {
        setChanged(false)
        getAllCaste().then(res => {
            setCasteArray(res.data);
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load caste!!")
        })
    }, [changed])

    function handleClick(event) {
        event.preventDefault();
        if (caste.length === 0) {
            toast.error("Field cannot be empty!!", TOAST_PROP);
            return;
        }
        const data = { caste: caste }
        toast.promise(addCaste(data), {
            pending: 'Adding caste...',
            success: 'caste added successfully!!',
            error: 'Failed to add caste'
        }, TOAST_PROP)
            .then(res => setChanged(true))
        setCaste("")
    }

    function handleDelete(id) {
        toast.promise(deleteCaste(id), {
            pending: 'Removing caste...',
            success: 'Caste removed successfully!!',
            error: 'Failed to remove caste'
        }, TOAST_PROP)
            .then(res => setChanged(true))
    }

    return (
        <Container className='my-3'>
            <div className='my-3'>
                <AdminActions />
            </div>
            <Row>
                <Col md={7} className="my-2">
                    <Card>
                        <Card.Title className='p-2'>Add Caste</Card.Title>
                        <Card.Body>
                            <FormControl
                                type='text'
                                placeholder='Enter caste name'
                                onChange={(e) => setCaste(e.target.value)}
                                value={caste}
                            />
                        </Card.Body>
                        <Card.Footer className='d-flex justify-content-end'>
                            <Button className='bg-color border-0' onClick={handleClick}>Add</Button>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={5} className="my-2">
                    <h5>Added Caste</h5>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Caste</th>
                            </tr>
                        </thead>
                        <tbody>
                            {casteArray?.map(caste => (
                                <tr key={caste.id}>
                                    <td>{caste.id}</td>
                                    <td className='text-capitalize'>{caste.caste}</td>
                                    <td>
                                        <AiFillDelete color='red' size={'1.1rem'} style={{ cursor: 'pointer' }} onClick={() => handleDelete(caste.id)} />
                                        <ConfirmModal
                                            show={show}
                                            toggle={toggle}
                                            title="Remove User Type"
                                            body="Are you sure want to remove user type ?"
                                            action={() => handleDelete(caste.id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}
