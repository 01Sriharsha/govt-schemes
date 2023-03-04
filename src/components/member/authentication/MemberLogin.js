import React, { useState } from 'react'
import { Button, Container, Form, FormLabel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TOAST_PROP } from '../../../App';
import Lotus from '../../../assets/lotus.jpg'
import { CustomContext } from '../../../context/AuthContext';

export default function MemberLogin() {

    const [inputVal, setInputVal] = useState({
        id: '', password: ''
    })
    
    const context = CustomContext();

    function handleChange(event) {
        const { name, value } = event.target;
        setInputVal(prev => {
            return { ...prev, [name]: value }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const memberData = {
            id : inputVal.id,
            password : inputVal.password
        }
        if(inputVal.id.length===0 || inputVal.password.length===0){
            toast.error("Field cannot be empty" , TOAST_PROP);
            return;
        }
        context?.login(memberData)
    }

    return (
        <Container className='py-4'>
            <div className='d-flex justify-content-center align-items-center w-100 mx-auto h-100'>
                <Form className='mx-auto p-2' onSubmit={handleSubmit} style={{ width: '25rem' }}>
                    <div className='w-100 justify-content-center d-flex'>
                        <Image src={Lotus} width={170} />
                    </div>
                    <h4 className='my-4 text-s text-center'>Memeber Login</h4>
                    <Form.Group className='my-2'>
                        <FormLabel htmlFor='id'>Member ID</FormLabel>
                        <Form.Control type="text" placeholder="Enter member Id" name="id" id="id" onChange={handleChange} value={inputVal.id} />
                    </Form.Group>
                    <Form.Group className='my-2'>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Form.Control type="password" placeholder="Enter password" name="password" id="password" onChange={handleChange} value={inputVal.password} />
                    </Form.Group>
                    <Button type='submit' className='w-100 my-3 bg-color border-0'>Login</Button>
                    <div className='text-center my-2'>
                        <span>Not a Member? </span>
                        <Link to="/member/register" className='text-s'>Register Here</Link>
                    </div>
                </Form>
            </div>
        </Container>
    )
}
