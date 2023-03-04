import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, FormControl, FormGroup, FormLabel, FormSelect, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { getAllCaste, getAllUserTypes } from '../../../api/adminService';
import { createNewMember } from '../../../api/memberService';
import { TOAST_PROP } from '../../../App';
import { Gender, MaritalStatus } from '../../../data/Data';

export default function MemberRegister() {

    const [inputVal, setInputVal] = useState({
        name: '',
        age: '',
        address: '',
        aadharNo: '',
        phone: '',
        gender : '',
        caste: '',
        maritalStatus: '',
        userType: ''
    });

    const [casteArray, setCasteArray] = useState([]);

    const [userTypeArray, setUserTypeAray] = useState([]);

    const [response, setResponse] = useState({
        id: '', password: ''
    })

    useEffect(() => {
        getAllCaste().then(res => {
            setCasteArray(res.data)
        }).catch(err => {
            console.log(err);
        })

        getAllUserTypes().then(res => {
            setUserTypeAray(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    function handleChange(event) {
        const { name, value } = event.target;
        setInputVal(prev => {
            return { ...prev, [name]: value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const memberData = {
            name: inputVal.name,
            age: inputVal.age,
            address: inputVal.address,
            aadharNo: inputVal.aadharNo,
            phone: inputVal.phone,
            gender : inputVal.gender,
            caste: inputVal.caste,
            maritalStatus: inputVal.maritalStatus,
            userType: inputVal.userType
        }
        toast.promise(createNewMember(memberData), {
            pending: 'Registering....',
            success: 'Member registered successfully!!'
        }, TOAST_PROP)
            .then(res => {
                console.log(res.data);
                setResponse({ id: res.data?.id, password: res.data?.password })
            }).catch(err => {
                console.log(err);
                toast.error(err?.response?.data, TOAST_PROP)
            })
    }


    return (
        <Container className='py-3'>
            <Form className='p-3 shadow-sm rounded' onSubmit={handleSubmit}>
                <h2 className='text-center text-s'>Register</h2>
                <Row md={2} sm={1} xs={1}>
                    <Col className='my-2'>
                        <FormLabel>Name</FormLabel>
                        <FormControl name="name" id="name" type='text' placeholder="Enter name" onChange={handleChange} value={inputVal.name} />
                    </Col>
                    <Col className='my-2'>
                        <FormLabel>Age</FormLabel>
                        <FormControl name="age" id="age" type='number' placeholder="Enter age" onChange={handleChange} value={inputVal.age} />
                    </Col>
                    <Col className='my-2'>
                        <FormLabel>Address</FormLabel>
                        <FormControl name="address" id="address" type='text' placeholder="Enter address" onChange={handleChange} value={inputVal.address} />
                    </Col>
                    <Col className='my-2'>
                        <FormLabel>Aadhar Number</FormLabel>
                        <FormControl name="aadharNo" id="aadharNo" type='text' placeholder="Enter aadhar number" onChange={handleChange} value={inputVal.aadharNo} />
                    </Col>
                    <Col className='my-2'>
                        <FormLabel>Phone.No</FormLabel>
                        <FormControl name="phone" id="phone" type='text' placeholder="Enter phone" onChange={handleChange} value={inputVal.phone} />
                    </Col>
                    <Col className='my-2'>
                        <FormLabel>Select Gender</FormLabel>
                        <FormSelect name="gender" id="gender" type='text' onChange={handleChange} defaultValue={0}>
                            <option value={0} disabled hidden>---Gender---</option>
                            {Gender.map((gender, index) => (
                                <option value={gender} key={index} className="text-capitalize">{gender}</option>
                            ))}
                        </FormSelect>
                    </Col>
                    <Col className='my-2'>
                        <FormLabel>Select Caste</FormLabel>
                        <FormSelect name="caste" id="caste" type='text' onChange={handleChange} defaultValue={0}>
                            <option value={0} disabled hidden>---caste---</option>
                            {casteArray.map(caste => (
                                <option value={caste.caste} key={caste.id} className="text-capitalize">{caste.caste}</option>
                            ))}
                        </FormSelect>
                    </Col>
                    <Col className='my-2'>
                        <FormLabel>Select Marital Status</FormLabel>
                        <FormSelect name="maritalStatus" id="maritalStatus" type='text' onChange={handleChange} defaultValue={0}>
                            <option value={0} disabled hidden>---Marital Status---</option>
                            {MaritalStatus.map((maritalStatus, index) => (
                                <option value={maritalStatus} key={index} className="text-capitalize">{maritalStatus}</option>
                            ))}
                        </FormSelect>
                    </Col>
                    <Col className='my-2'>
                        <FormLabel>Select user Type</FormLabel>
                        <FormSelect name="userType" id="userType" type='text' onChange={handleChange} defaultValue={0}>
                            <option value={0} disabled hidden>---User Type---</option>
                            {userTypeArray.map(userType => (
                                <option value={userType.userType} key={userType.id} className="text-capitalize">{userType.userType}</option>
                            ))}
                        </FormSelect>
                    </Col>
                </Row>
                <div className='w-100 d-flex justify-content-center align-items-center mt-3 flex-column'>
                    {(response.id === "")
                        ? <Button className='bg-color border-0 w-25' type='submit'>Register</Button>
                        : (
                            <Form.Text className='fs-5'>
                                <strong>Your Credentials -  </strong>
                                <span>ID : {response.id}</span>&nbsp;
                                <span>PASSWORD : {response.password}</span>
                            </Form.Text>
                        )
                    }
                </div>
            </Form>
        </Container>
    )
}
