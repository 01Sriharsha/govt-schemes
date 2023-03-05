import React, { useState } from 'react'
import { Button, FormControl, FormText, Modal, Table } from 'react-bootstrap'
import { HiOutlineUpload } from 'react-icons/hi';
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
        if (file === null) {
            toast.info("Please upload the required documents!!", TOAST_PROP)
            return;
        }
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
                console.clear();
            })
        setFile(null);
    }

    return (
        <Modal
            show={props.show}
            onHide={props.toggle}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Apply for : {props?.scheme?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr className='w-100 text-center'>
                            <th>Scheme Id</th>
                            <th>Required Documents</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody className='text-capitalize'>
                        <tr className='text-center'>
                            <td>
                                <div className='d-flex justify-content-center'>{props.scheme.id}</div>
                            </td>
                            <td className='px-3'>{props.scheme.documents}</td>
                            <td>
                                <div className='d-flex justify-content-center'>
                                    <Button as={'label'}
                                        htmlFor="doc"
                                        className='btn-sm bg-color border-0 d-flex align-items-center gap-1 justify-content-center w-100'
                                    >
                                        <span>Upload</span>
                                        <HiOutlineUpload size={'1.1rem'} />
                                    </Button>
                                    <FormControl id="doc" type='file'
                                        style={{ display: 'none' }}
                                        onChange={handleDocChange}
                                    />
                                </div>
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
