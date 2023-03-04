import React, { useState } from 'react'
import { Button, FormControl, FormLabel, FormText, Modal, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { uploadFile } from '../../../api/memberService';
import { TOAST_PROP } from '../../../App';
import { CustomContext } from '../../../context/AuthContext';

export default function Apply(props) {

    const [file, setFile] = useState(null);

    const context = CustomContext();

    const navigate = useNavigate();

    function handleDocChange(event) {
        setFile(event.target.files[0])
    }

    function handleSubmit() {
        const memberId = context?.user?.id;
        toast.promise(uploadFile(memberId, props.scheme.id, file), {
            pending: "Uploading..."
        }, TOAST_PROP)
            .then(res => {
                console.log(res);
                toast.success(`Applied for ${props?.scheme?.title}`, TOAST_PROP)
                props.toggle()
                setTimeout(() => {
                    alert("Your Application id : " + res.data.id)
                    navigate("/member/applications")
                }, 1200);
            }).catch(err => {
                console.log(err);
                toast.error(err.response.data ? err.response.data : `Failed to submit the application`, TOAST_PROP)
            })
    }

    console.log(props.scheme);
    return (
        <Modal
            show={props.show}
            onHide={props.toggle}
            backdrop="static"
            keyboard={false}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Apply for : {props?.scheme?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table className=''>
                    <thead>
                        <tr className='w-100'>
                            <th>Scheme Id</th>
                            <th>Required Documnets</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody className=''>
                        <tr className='w-100'>
                            <td className=''>{props.scheme.id}</td>
                            <td>{props.scheme.documents}</td>
                            <td>
                                <Button htmlFor="doc" className='btn-sm bg-color border-0' as={'label'}>Upload</Button>
                                <FormControl id="doc" type='file'
                                    style={{ display: 'none' }}
                                    onChange={handleDocChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <div className='w-100 d-flex justify-content-between'>
                    {file
                        ? <span>File : {file?.name}</span>
                        : <FormText>*Bundle all required files and upload as a zip file</FormText>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.toggle}>
                    Close
                </Button>
                <Button className='bg-color border-0' onClick={() => {
                    handleSubmit()
                    props.toggle()
                }}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
