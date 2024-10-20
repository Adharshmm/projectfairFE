import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../services/baseUrl';
import { editUserProjectApi } from '../services/allApi';
import { editProjectResponseContext } from '../context/ContextShare';
function EditProject({ project }) {
    const [preview, setPreview] = useState("")
    const [show, setShow] = useState(false);
    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext);
    const [projectDetails, setProjectDetails] = useState({
        id: project._id,
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImage: ""
    })
    const handleUpdate = async (e) => {
        e.preventDefault()
        const { id,title, language, github, website, overview, projectImage } = projectDetails;
        if (title || language || github || website || overview || projectImage) {
            const reqId  = id
            const reqBody = new FormData();
            reqBody.append('title', title)
            reqBody.append('language', language)
            reqBody.append('github', github)
            reqBody.append('website', website)
            reqBody.append('overview', overview)
            preview ? reqBody.append('projectImage', projectImage) :
                reqBody.append('projectImage', project.projectImage)
            const token = sessionStorage.getItem('token')
            if (preview) {
                const reqHeader = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
                const result = await editUserProjectApi(reqId,reqBody,reqHeader);
                console.log('==============update project result ================')
                console.log(result)
                if(result.status === 200){
                    handleClose()
                    setEditProjectResponse(result)
                }
            }else{
                const reqHeader = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                const result = await editUserProjectApi(reqId,reqBody,reqHeader);
                console.log('==============update project result ================')
                console.log(result)
                if(result.status === 200){
                    handleClose()
                    setEditProjectResponse(result)

                }
            }
        } else {
            alert('please fill the form completely')
        }
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (projectDetails.projectImage) {
            setPreview(URL.createObjectURL(projectDetails.projectImage))
        }
    }, [projectDetails.projectImage])
    return (
        <>
            <i onClick={handleShow} class="fa-regular fa-pen-to-square me-2 fa-lg text-dark edit_icon" style={{cursor:'pointer'}}></i>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{projectDetails.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <label htmlFor="projectImg">
                                <input type="file" id='projectImg' style={{ display: "none" }} onChange={(e) => { setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] }) }} />
                                <img src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`} alt="" height={300} width={380} style={{ borderRadius: "18px" }} />
                            </label>
                        </Col>
                        <Col md={6}>
                            <div>
                                <input type="text" placeholder='Project title ' className='form-control mb-3' value={projectDetails.title} onChange={(e) => { setProjectDetails({ ...projectDetails, title: e.target.value }) }} />


                                <input type="text" placeholder='Language Used' className='form-control mb-3' value={projectDetails.language} onChange={(e) => { setProjectDetails({ ...projectDetails, language: e.target.value }) }} />


                                <input type="text" placeholder='GitHub Link' className='form-control mb-3' value={projectDetails.github} onChange={(e) => { setProjectDetails({ ...projectDetails, github: e.target.value }) }} />

                                <input type="text" placeholder='Website Link' className='form-control mb-3' value={projectDetails.website} onChange={(e) => { setProjectDetails({ ...projectDetails, website: e.target.value }) }} />
                                <textarea name="Project Overview" placeholder='Project Overview' rows={4} id="" className='form-control mb-3' value={projectDetails.overview} onChange={(e) => { setProjectDetails({ ...projectDetails, overview: e.target.value }) }} ></textarea>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProject