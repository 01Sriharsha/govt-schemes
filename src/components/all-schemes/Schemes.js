import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getAllSchemes } from '../../api/adminService';
import { TOAST_PROP } from '../../App';
import SchemeCard from './SchemeCard';

export default function Schemes() {

    const [schemes, setSchemes] = useState([]);

    useEffect(() => {
        getAllSchemes().then(res => {
            setSchemes(res.data)
        }).catch(err => {
            console.log(err);
            toast.error("Failed to load schemes!!", TOAST_PROP)
        })
    }, [])

    return (
        <Container className='p-3'>
            <div>
                <h1 className='text-center text-s'>All Schemes</h1>
                {schemes.map(scheme => (
                    <div className="shadow rounded my-3" key={scheme.id}>
                        <SchemeCard scheme={scheme} />
                    </div>

                ))}
            </div>
        </Container>
    )
}
