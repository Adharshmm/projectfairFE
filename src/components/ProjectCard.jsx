import React from 'react'
import media_player_image from '../assets/Project.jpeg'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../services/baseUrl';
function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Card style={{ width: '18rem',cursor:'pointer' }} onClick={handleShow}>
                <Card.Img variant="top" style={{height:'10rem',objectFit:"fill"}} src={`${BASE_URL}/uploads/${project.projectImage}`} />
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Media Player</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={6}>
                            <img src={`${BASE_URL}/uploads/${project.projectImage}`} alt="" style={{width:'100%',height:'100%'}} />
                        </Col>
                        <Col md={6}>
                            <h4>Discription :</h4>
                            <p>{project.overview}</p>
                            <h4>Technologies</h4>
                            <p>Language:{project.language}</p>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <div className='d-flex mt-3'>
                        <Link style={{color:"#004a90"}} to={project.github} target='_blank'><i className='socialmedia fa-brands fa-github me-2 fa-2x'></i></Link>
                        <Link style={{color:"#004a90"}} to={project.website} target='_blank'><i className='socialmedia fa-solid fa-link fa-2x'></i></Link>
                    </div>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ProjectCard