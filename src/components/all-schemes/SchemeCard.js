import React, { useState } from 'react'
import { Button, Card, Collapse } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TOAST_PROP } from '../../App';
import { CustomContext } from '../../context/AuthContext';
import Apply from '../member/ui/Apply';
import AskDoubt from './AskDoubt';

export default function SchemeCard({ scheme }) {

    const context = CustomContext();

    const { pathname } = useLocation();

    const [expand, setExpand] = useState(false);

    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show)


    return (
        <Card className='pt-2 h-100'>
            <Card.Title className='px-3 fs-3 text-capitalize'>
                {scheme.title}
            </Card.Title>
            <Card.Body>
                <Card.Text>{scheme.description}</Card.Text>
                <Collapse in={expand}>
                    <div>
                        <div className='d-flex flex-column gap-2 text-capitalize'>
                            <div className='fw-bold'>Eligiblity :</div>
                            <div className='d-flex gap-2'>
                                <div>Scheme For : </div>
                                <div>{scheme.userType}</div>
                            </div>
                            <div className='d-flex gap-2'>
                                <div>Age Criteria : </div>
                                <div>{scheme.startAge} - {scheme.endAge} years</div>
                            </div>
                            <div className='d-flex gap-2'>
                                <div>Caste : </div>
                                <div>{scheme.caste}</div>
                            </div>
                            <div className='d-flex gap-2'>
                                <div>Marital Status : </div>
                                <div>{scheme.maritalStatus}</div>
                            </div>
                            <div className='d-flex gap-2'>
                                <div>Required Documnets : </div>
                                <div>{scheme.documents}</div>
                            </div>
                        </div>
                    </div>
                </Collapse>
            </Card.Body>
            <Card.Footer className='d-flex gap-4'>
                <Button variant='secondary' className='btn btn-sm bg-color border-0'
                    onClick={() => setExpand(!expand)}>
                    {expand ? "Collapse" : "View More"}
                </Button>
                {pathname.includes("/member/matching-schemes")
                    ? (
                        <>
                            <Button variant='secondary' className='btn btn-sm' onClick={toggle}>
                                Apply
                            </Button>
                            <Apply show={show} toggle={toggle} scheme={scheme} />
                        </>
                    ) : (
                        <>
                            <Button variant='secondary' className='btn btn-sm'
                                onClick={() => {
                                    context?.isAuthenticated
                                        ? toggle()
                                        : toast.info("Login to ask doubt!!", TOAST_PROP)
                                }}>
                                Ask Doubt
                            </Button>
                            <AskDoubt show={show} toggle={toggle} />
                        </>
                    )}
            </Card.Footer>
        </Card>
    )
}
