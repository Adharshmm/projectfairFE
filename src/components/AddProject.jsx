import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApi';
import {AddProjectResponseContext} from '../context/ContextShare'
function AddProject() {
    const [show, setShow] = useState(false);
    //usecontext hook is used to access the state created inside the contexdt
    const {addProjectResponse,setAddProjectResponse} = useContext(AddProjectResponseContext);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [token, setToken] = useState('')
    useEffect(() => {
        setToken(sessionStorage.getItem('token'))
    }, [])
    const [projectDetails, setProjectDetails] = useState({
        title: '',
        language: '',
        github: '',
        website: '',
        overview: '',
        projectImage: ''
    });
    //state for showing oreview image
    const [preview, setPreview] = useState('');
    useEffect(() => {
        console.log(projectDetails)
        if (projectDetails.projectImage) {
            //to create img url for preview URL.createObjectURL('Image value')
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])
    const addProject = async (e) => {
        e.preventDefault();
        const { title, language, github, website, overview, projectImage } = projectDetails;
        if (!title || !language || !github || !website || !overview || !projectImage) {
            alert('please fill the form completely')
        } else {
            //here we are also uploaded a file , so we should sent body in the form of FormData
            const reqBody = new FormData();
            reqBody.append('title', title)
            reqBody.append('language', language)
            reqBody.append('github', github)
            reqBody.append('website', website)
            reqBody.append('overview', overview)
            reqBody.append('projectImage', projectImage)
            //here content we are passing is multipart form data, so separate reqHeader is needed
            const reHeader = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
            const result = await addProjectApi(reqBody, reHeader)
            if (result.status === 200) {
                setAddProjectResponse(result)
                alert(`${title} uploaded successfully`)
                setProjectDetails({
                    title: '',
                    language: '',
                    github: '',
                    website: '',
                    overview: '',
                    projectImage: ''
                })
                setPreview("")
                handleClose()
            }
            else if (result.status === 409) {
                setProjectDetails({
                    title: '',
                    language: '',
                    github: '',
                    website: '',
                    overview: '',
                    projectImage: ''
                })
                alert(`${title} already exsist`)
            } else {
                alert(`${title} upload faild`)
            }
        }

    }
    const handleClose1 = () => {
        setProjectDetails({
            title: '',
            language: '',
            github: '',
            website: '',
            overview: '',
            projectImage: ''
        })
        setPreview("")
        handleClose()
    }
    return (
        <>
            <button onClick={handleShow} className='btn text-light' style={{ backgroundColor: "#004a90" }}>Add Project</button>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="projectImg">
                                <input type="file" id='projectImg' style={{ display: "none" }}
                                    onChange={(e) => {
                                        setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })
                                    }} />
                                <img style={{ borderRadius: "50px" }} src={preview ? preview : "https://cdn-icons-png.freepik.com/256/10254/10254379.png?semt=ais_hybrid"} width={370} height={300} alt="" />
                            </label>
                        </Col>
                        <Col md={6}>
                            <div>
                                <input type="text" placeholder='Project Title' className='form-control mb-3 ' value={projectDetails.title} onChange={(e) => {
                                    setProjectDetails({ ...projectDetails, title: e.target.value })
                                }} />


                                <input type="text" placeholder='Language Used' className='form-control mb-3' value={projectDetails.language} onChange={(e) => {
                                    setProjectDetails({ ...projectDetails, language: e.target.value })
                                }} />


                                <input type="text" placeholder='GitHub Link' className='form-control mb-3' value={projectDetails.github} onChange={(e) => {
                                    setProjectDetails({ ...projectDetails, github: e.target.value })
                                }} />


                                <input type="text" placeholder='Website link' className='form-control mb-3' value={projectDetails.website} onChange={(e) => {
                                    setProjectDetails({ ...projectDetails, website: e.target.value })
                                }} />
                                <textarea name="Project Overview" placeholder='Project Overview' rows={4} id="" className='form-control mb-3' value={projectDetails.overview} onChange={(e) => {
                                    setProjectDetails({ ...projectDetails, overview: e.target.value })
                                }}></textarea>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addProject}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddProject