import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const naviagte = useNavigate()
  const handleLogoout = () => {
    if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token")
      sessionStorage.removeItem("loggeduser")
      naviagte('/')
    }
  }
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <Link style={{ textDecoration: "none", color: "black" }} to={"/"}>
              <img
                alt=""
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/NuGet_project_logo.svg/2048px-NuGet_project_logo.svg.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Project <span style={{ color: 'grey', fontWeight: "600" }}>Fair</span>
            </Link>
          </Navbar.Brand>
          {
            sessionStorage.getItem("token") ?
              <button className='btn text-light' style={{ backgroundColor: '#004a90' }} onClick={handleLogoout}> <i className='fa-solid fa-power-off'></i> Logout</button>
              :
              <Link to={'/login'}>
                <button className='btn text-light' style={{ backgroundColor: '#004a90' }}> <i className='fa-solid fa-right-to-bracket me-1'></i>Login</button>
              </Link>
          }
        </Container>
      </Navbar>
    </>
  )
}

export default Header