import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addScheme, getAllCaste, getAllUserTypes, updateScheme } from '../../../api/adminService'
import { TOAST_PROP } from '../../../App'
import { MaritalStatus } from '../../../data/Data'
import { validateSchemeForm } from '../../../validation/validate'
import AdminActions from '../layout/AdminActions'

export default function AddScheme() {

    const { state } = useLocation();

    const navigate = useNavigate();

    const gender = ["male", "female", "trans-gender", "all"]

    const [casteArray, setCasteArray] = useState([]);

    const [userTypeArray, setUserTypeArray] = useState([]);

    const [schemeVal, setSchemeVal] = useState({
        userType: '', caste: '', maritalStatus: '', gender: '', startAge: '', endAge: '',
        title: '', description: '', documents: '', status: 'running'
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

    useEffect(() => {
        loadAllCaste()
        loadAllUserType()
    }, [])


    /* For updation of scheme data coming from schemeCard
     When page loads existing scheme data will be loaded */
    useEffect(() => {
        setSchemeVal({
            userType: state?.scheme?.userType,
            caste: state?.scheme?.caste,
            maritalStatus: state?.scheme?.maritalStatus,
            gender: state?.scheme?.gender,
            startAge: state?.scheme?.startAge,
            endAge: state?.scheme?.endAge,
            title: state?.scheme?.title,
            description: state?.scheme?.description,
            documents: state?.scheme?.documents,
            status: state?.scheme?.status
        })
    }, [state?.scheme])

    function handleChange(e) {
        const { name, value } = e.target;
        setSchemeVal(prev => {
            return { ...prev, [name]: value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        validateSchemeForm(schemeVal);

        const schemeData = {
            userType: schemeVal.userType,
            caste: schemeVal.caste,
            maritalStatus: schemeVal.maritalStatus,
            gender: schemeVal.gender,
            startAge: schemeVal.startAge,
            endAge: schemeVal.endAge,
            title: schemeVal.title,
            description: schemeVal.description,
            documents: schemeVal.documents,
            status: schemeVal.status
        }

        if (state?.scheme) {
            toast.promise(updateScheme(state?.scheme?.id, schemeData), {
                pending: 'Updating Scheme...',
                success: 'scheme updated successfully!!',
                error: "Something went wrong!! Failed to update scheme"
            }, TOAST_PROP)
                .then(res => {
                    console.log(res);
                    navigate("/all-schemes")
                })
                .catch(err => console.log(err))
        } else {
            toast.promise(addScheme(schemeData), {
                pending: 'Adding Scheme...',
                success: 'scheme added successfully!!',
                error: "Something went wrong!! Failed to add scheme"
            }, TOAST_PROP)
                .then(res => {
                    console.log(res);
                })
                .catch(err => console.log(err))
        }
    }

    console.clear();

    return (
        <Container className='my-3'>
            <div className='my-2 d-flex justify-content-between align-items-baseline'>
                <AdminActions />
                <Button size='sm' className='bg-color border-0'
                    as={Link} to="/all-schemes"
                >
                    View Added Schemes
                </Button>
            </div>
            <section className='my-3'>
                <h5 className='bg-color m-0 text-light p-2 rounded-top'>Add a Scheme</h5>
                <div>
                    <Form className='border px-4 py-2 m-0' onSubmit={handleSubmit}>
                        <Form.Group className='my-3'>
                            <Form.Label>Select User type</Form.Label>
                            <Form.Select name='userType' onChange={handleChange} defaultValue={0}>
                                <option value={0} disabled hidden>{schemeVal.userType || "--userType--"}</option>
                                {userTypeArray.map(userType => (
                                    <option value={userType.userType} key={userType.id}>{userType.userType}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Select Caste</Form.Label>
                            <Form.Select name='caste' onChange={handleChange} defaultValue={0}>
                                <option disabled value={0} hidden>{schemeVal.caste || "--caste--"}</option>
                                {casteArray.map(caste => (
                                    <option value={caste.caste} key={caste.id}>{caste.caste}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Select Marital Status</Form.Label>
                            <Form.Select name='maritalStatus' onChange={handleChange} defaultValue={0}>
                                <option disabled value={0} hidden>{schemeVal.maritalStatus || "--marital status--"}</option>
                                {MaritalStatus.map((element, index) => (
                                    <option value={element} key={index}>{element}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Select Gender</Form.Label>
                            <Form.Select name='gender' onChange={handleChange} defaultValue={0}>
                                <option disabled value={0} hidden>{schemeVal.gender || "--gender--"}</option>
                                {gender.map((element, index) => (
                                    <option className='text-capitalize' value={element} key={index}>{element}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Start Age</Form.Label>
                            <Form.Control name='startAge' type='number' placeholder='Enter start age' onChange={handleChange} value={schemeVal.startAge} />
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>End Age</Form.Label>
                            <Form.Control name='endAge' type='number' placeholder='Enter end age' onChange={handleChange} value={schemeVal.endAge} />
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Scheme Title</Form.Label>
                            <Form.Control name='title' type='text' placeholder='Enter scheme title' onChange={handleChange} value={schemeVal.title} />
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Scheme Description</Form.Label>
                            <Form.Control name='description' as="textarea" rows={2} type='text' placeholder='Enter scheme description' onChange={handleChange} value={schemeVal.description} />
                        </Form.Group>
                        <Form.Group className='my-3'>
                            <Form.Label>Required Documnets</Form.Label>
                            <Form.Control name='documents' as="textarea" rows={2} type='text' placeholder='Enter required documnets' onChange={handleChange} value={schemeVal.documents} />
                            <Form.Text>For multiple entrie use comma(,)</Form.Text>
                        </Form.Group>
                        {
                            state?.scheme &&
                            <Form.Group className='my-3'>
                                <Form.Label>Select Scheme Status</Form.Label>
                                <Form.Select name='status' onChange={handleChange}>
                                    <option value={"running"}>Running</option>
                                    <option value={"expired"}>Expired</option>
                                </Form.Select>
                            </Form.Group>
                        }

                        <div className='d-flex justify-content-end py-2'>
                            <Button className='bg-color border-0' type="submit">
                                {state?.scheme ? "Update Scheme" : "Add Scheme"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </section>
        </Container>
    )
}
