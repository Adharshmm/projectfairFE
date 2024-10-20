import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <>
      <Container xs={12} sm={6} md={4} lg={3}>
        <Row>
          <Col md={12}>

            <div className='d-flex justify-content-center a'>
              <div className="footer d-flex  justify-content-evenly ">
                <div style={{ width: "400px" }}>
                  <h5 className='colorImp'>
                    <img
                      alt=""
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/NuGet_project_logo.svg/2048px-NuGet_project_logo.svg.png"
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    />{' '}
                    Project <span style={{ color: 'grey', fontWeight: "600" }}>Fair</span>
                  </h5>
                  <p className='colorImp' style={{ textAlign: "justify" }}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur eius expedita officia ducimus fuga ipsum unde sed placeat beatae? Dolor nobis consectetur obcaecati earum iusto dolore eum nostrum laborum velit.</p>
                </div>
                <div className='d-flex flex-column ms-5'>
                  <h4 className='colorImp'>Links</h4>
                  <Link to="/" style={{ textDecoration: "none", color: 'black' }}>
                    Home Page
                  </Link>
                  <Link style={{ textDecoration: "none", color: 'black' }} to='/dashboad'>Dashboard</Link>
                  <Link style={{ textDecoration: "none", color: 'black' }} to='/project'>Project</Link>
                </div>
                <div className='d-flex flex-column ms-5'>
                  <h4 className='colorImp'>Guides</h4>
                  <Link to="https://react.dev/" target='_blank' style={{ textDecoration: "none", color: 'black' }}>
                    React
                  </Link>
                  <Link style={{ textDecoration: "none", color: 'black' }} to='https://react-bootstrap.netlify.app/' target='_blank'>React Boostrap</Link>
                  <Link style={{ textDecoration: "none", color: 'black' }} to='https://www.w3schools.com/js/js_json_server.asp' target='_blank'>Json server</Link>
                </div>
                <div className='ms-5'>
                  <h4 className='colorImp'>Contact Us</h4>
                  <div className='d-flex'>
                    <input type="text" className='form-control' placeholder='Enter your email' />
                    <button className='btn text-light ms-2 ' style={{ backgroundColor: "#004a90" }}>SUBSCRIBE</button>
                  </div>
                  <div className='d-flex align-items-center justify-content-evenly mt-3 '>
                    <Link style={{ textDecoration: 'none' }} className='socialmedia' to="https://www.instagram.com/?hl=en" target='_blank'><i class="fa-brands fa-instagram fa-2x"></i></Link>
                    <Link className='socialmedia' to='https://www.facebook.com/' target='_blank' ><i class="fa-brands fa-facebook fa-2x"></i></Link>
                    <Link className='socialmedia' to='https://twitter.com/?lang=en' target='_blank'><i class="fa-brands fa-square-x-twitter fa-2x"></i></Link>
                    <Link className='socialmedia' to='https://www.reddit.com/' target="_blank"><i class="fa-brands fa-reddit fa-2x"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default Footer