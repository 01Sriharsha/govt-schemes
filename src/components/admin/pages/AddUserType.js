import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, FormControl, Row, Table } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { addUserType, deleteUserType, getAllUserTypes } from '../../../api/adminService';
import { TOAST_PROP } from '../../../App';
import AdminActions from '../layout/AdminActions';
import { AiFillDelete } from 'react-icons/ai'
import ConfirmModal from '../../../utilities/ConfirmModal';

export default function AddUserType() {

    const [userType, setUserType] = useState('');

    const [userTypesArray, setUserTypesArray] = useState([]);

    const [changed, setChanged] = useState(null);

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);

    useEffect(() => {
        setChanged(false)
        getAllUserTypes().then(res => {
            setUserTypesArray(res.data);
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load user types!!")
        })
    }, [changed])

    function handleClick(event) {
        event.preventDefault();
        if (userType.length === 0) {
            toast.error("Field cannot be empty!!", TOAST_PROP);
            return;
        }
        const data = { userType: userType }
        toast.promise(addUserType(data), {
            pending: 'Adding user type...',
            success: 'User type added successfully!!',
            error: 'Failed to add user type'
        }, TOAST_PROP)
            .then(res => setChanged(true))
        setUserType("")
    }

    function handleDelete(id) {
        toast.promise(deleteUserType(id), {
            pending: 'Removing user type...',
            success: 'User type removed successfully!!',
            error: 'Failed to remove user type'
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
                        <Card.Title className='p-2'>Add User Type</Card.Title>
                        <Card.Body>
                            <FormControl
                                type='text'
                                placeholder='Enter user type'
                                onChange={(e) => setUserType(e.target.value)}
                                value={userType}
                            />
                        </Card.Body>
                        <Card.Footer className='d-flex justify-content-end'>
                            <Button className='bg-color border-0' onClick={handleClick}>Add</Button>
                        </Card.Footer>
                    </Card>
                </Col>
                <Col md={5} className="my-2">
                    <h5>Added Types</h5>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>User Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userTypesArray?.map(userType => (
                                <tr key={userType.id}>
                                    <td>{userType.id}</td>
                                    <td className='text-capitalize'>{userType.userType}</td>
                                    <td>
                                        <AiFillDelete color='red' size={'1.1rem'} style={{ cursor: 'pointer' }} onClick={() => handleDelete(userType.id)} />
                                        <ConfirmModal
                                            show={show}
                                            toggle={toggle}
                                            title="Remove User Type"
                                            body="Are you sure want to remove user type ?"
                                            action={() => handleDelete(userType.id)}
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
