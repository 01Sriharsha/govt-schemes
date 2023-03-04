import React, { useState } from 'react'
import { Button, Container, Form, FormLabel, Image} from 'react-bootstrap'
import { CustomContext } from '../../../context/AuthContext'
import Lotus from '../../../assets/lotus.jpg'

export default function AdminLogin() {

    const context = CustomContext();

    const [inputVal, setInputVal] = useState({
        id: '', password: ''
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setInputVal(prev => {
            return { ...prev, [name]: value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const adminData = {
            id: inputVal.id,
            password: inputVal.password
        }
        context?.login(adminData);
    }
    return (
        <Container className=''>
            <div className='d-flex justify-content-center align-items-center w-100 mx-auto h-100'>
                <Form className='mx-auto p-2' onSubmit={handleSubmit} style={{ width: '25rem' }}>
                    <div className='w-100 justify-content-center d-flex'>
                        <Image src={Lotus} width={170} />
                    </div>
                    <h4 className='my-4 text-s text-center'>Please Login To Continue</h4>
                    <Form.Group className='my-2'>
                        <FormLabel htmlFor='id'>Admin ID</FormLabel>
                        <Form.Control type="text" placeholder="Enter admin Id" name="id" id="id" onChange={handleChange} value={inputVal.id} />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Form.Control type="password" placeholder="Enter password" name="password" id="password" onChange={handleChange} value={inputVal.password} />
                    </Form.Group>
                    <Button type='submit' className='w-100 my-3 bg-color border-0'>Log In</Button>
                </Form>
            </div>
        </Container>
    )
}
