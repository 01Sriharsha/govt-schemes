import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { addScheme, getAllCaste, getAllSchemes, getAllUserTypes } from '../../../api/adminService'
import { TOAST_PROP } from '../../../App'
import { MaritalStatus } from '../../../data/Data'
import { validateSchemeForm } from '../../../validation/validate'
import AdminActions from '../layout/AdminActions'

export default function AddScheme() {

    const addedSchemeRef = useRef();

    const gender = ["male", "female", "trans-gender", "all"]

    const [casteArray, setCasteArray] = useState([]);

    const [userTypeArray, setUserTypeArray] = useState([]);

    const [schemeArray, setSchemeArray] = useState([]);

    const [change, setChange] = useState(null);

    const [schemeVal, setSchemeVal] = useState({
        schemeType: '', caste: '', maritalStatus: '', gender: '', startAge: '', endAge: '',
        title: '', description: '', documents: ''
    })

    async function loadAllCaste() {
        try {
            const { data } = await getAllCaste();
            setCasteArray(data)
        } catch (err) {
            console.log(err);
        }
    }

    async function loadAllUserType() {
        try {
            const { data } = await getAllUserTypes();
            setUserTypeArray(data)
        } catch (err) {
            console.log(err);
        }
    }

    async function loadAllSchemes() {
        try {
            const { data } = await getAllSchemes();
            setSchemeArray(data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadAllCaste()
        loadAllUserType()
        loadAllSchemes()
    }, [])

    useEffect(() => {
        setChange(false)
        loadAllSchemes()
    }, [change])

    function handleChange(e) {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setSchemeVal(prev => {
            return { ...prev, [name]: value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        validateSchemeForm(schemeVal);

        const schemeData = {
            userType: schemeVal.schemeType,
            caste: schemeVal.caste,
            maritalStatus: schemeVal.maritalStatus,
            gender: schemeVal.gender,
            startAge: schemeVal.startAge,
            endAge: schemeVal.endAge,
            title: schemeVal.title,
            description: schemeVal.description,
            documents: schemeVal.documents,
            status: 'running'
        }

        toast.promise(addScheme(schemeData), {
            pending: 'Adding Scheme...',
            success: 'scheme added successfully!!',
            error: "Something went wrong!! Failed to add scheme"
        }, TOAST_PROP)
            .then(res => {
                //scroll down to added schemes
                addedSchemeRef.current.scrollIntoView()
                setChange(true)
            })
            .catch(err => console.log(err))
    }
    return (
        <Container className='my-3'>
            <div className='my-2 d-flex justify-content-between align-items-baseline'>
                <AdminActions />
                <Button
                    size='sm' className='bg-color border-0'
                    onClick={() => addedSchemeRef.current.scrollIntoView()}>
                    View Added Schemes
                </Button>
            </div>
            <section className='my-3'>
                <h5 className='bg-color m-0 text-light p-2 rounded-top'>Add a Scheme</h5>
                <div>
                    <Form className='border px-4 py-2 m-0' onSubmit={handleSubmit}>
                        <Form.Group className='my-3'>
                            <Form.Label>Select Scheme type</Form.Label>
                            <Form.Select name='schemeType' onChange={handleChange} defaultValue={0}>
                                <option value={0} disabled hidden>--scheme--</option>
                                {userTypeArray.map(userType => (
                                    <option value={userType.userType} key={userType.id}>{userType.userType}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Select Caste</Form.Label>
                            <Form.Select name='caste' onChange={handleChange} defaultValue={0}>
                                <option disabled value={0} hidden>--caste--</option>
                                {casteArray.map(caste => (
                                    <option value={caste.caste} key={caste.id}>{caste.caste}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Select Marital Status</Form.Label>
                            <Form.Select name='maritalStatus' onChange={handleChange} defaultValue={0}>
                                <option disabled value={0} hidden>--marital status--</option>
                                {MaritalStatus.map((element, index) => (
                                    <option value={element} key={index}>{element}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Select Gender</Form.Label>
                            <Form.Select name='gender' onChange={handleChange} defaultValue={0}>
                                <option disabled value={0} hidden>--gender--</option>
                                {gender.map((element, index) => (
                                    <option className='text-capitalize' value={element} key={index}>{element}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Start Age</Form.Label>
                            <Form.Control name='startAge' type='number' placeholder='Enter start age' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>End Age</Form.Label>
                            <Form.Control name='endAge' type='number' placeholder='Enter end age' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Scheme Title</Form.Label>
                            <Form.Control name='title' type='text' placeholder='Enter scheme title' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Scheme Description</Form.Label>
                            <Form.Control name='description' as="textarea" rows={2} type='text' placeholder='Enter scheme description' onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Required Documnets</Form.Label>
                            <Form.Control name='documents' as="textarea" rows={2} type='text' placeholder='Enter required documnets' onChange={handleChange} />
                            <Form.Text>For multiple entrie use comma(,)</Form.Text>
                        </Form.Group>
                        <div className='d-flex justify-content-end py-2'>
                            <Button className='bg-color border-0' type="submit">Add Scheme</Button>
                        </div>
                    </Form>
                </div>
            </section>
            <section className='my-5' id="added-schemes" ref={addedSchemeRef}>
                <Card>
                    <Card.Title className='p-3'>Added Schemes</Card.Title>
                    <Card.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Scheme Id</th>
                                    <th>User Type</th>
                                    <th>Age</th>
                                    <th>caste</th>
                                    <th>Gender</th>
                                    <th>Marital Status</th>
                                    <th>Scheme Title</th>
                                    <th>Scheme Description</th>
                                    <th>Required Docs</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schemeArray.map(scheme => (
                                    <tr key={scheme?.id}>
                                        <td>{scheme?.id}</td>
                                        <td>{scheme?.userType}</td>
                                        <td>{scheme?.startAge + "-" + scheme?.endAge}</td>
                                        <td>{scheme?.caste}</td>
                                        <td>{scheme?.gender}</td>
                                        <td>{scheme?.maritalStatus}</td>
                                        <td>{scheme?.title}</td>
                                        <td className='w-25'>{scheme?.description?.substring(0, 75) + "..."}</td>
                                        <td>{scheme?.documents}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </section>
        </Container>
    )
}
