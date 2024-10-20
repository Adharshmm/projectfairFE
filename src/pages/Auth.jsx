import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import login_img from '../assets/user-profile-100 (1).svg'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Auth({ register }) {
  //useNavigate is router dom hook to naviagte the padge
  const navigate = useNavigate()
  const registerForm = register ? true : false
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  })


  //function for user registeration
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userData;
    if (!username || !email || !password) {
      toast.warning("please fill the form completely")
    } else {
      const result = await registerApi(userData)

      if (result.status === 201) {
        toast.success(`${username} registerd successfully`)
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        navigate("/login")
      } else if (result.response.status === 400) {
        toast.warning(result.response.data)
      } else {
        toast.error("Something went wrong")
      }
    }
  }

  //function for user login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      toast.warning("please fill the form completely")
    } else {
      const result = await loginApi(userData)
      console.log(result)
      if (result.status === 201) {
        sessionStorage.setItem("loggeduser", JSON.stringify(result.data.data))
        sessionStorage.setItem("token", result.data.token)
        setUserData({
          username: "",
          email: "",
          password: ""
        })
        navigate("/")
        toast.success("Logged in successfully");
      } else if (result.status === 401) {
        toast.warning("User doesnt not exsist")
      } else {
        toast.error('Something went wrong')
      }
    }
  }
  return (
    <>

      <div style={{ width: "100%", height: "90vh", justifyContent: "center", alignItems: "center" }} >
        <div className='container w-75 mt-5'>
          <h5>
            <Link to={'/'} style={{ color: 'grey', textDecoration: 'none' }}> <i className='fa-solid fa-arrow-left me3'></i> Back to Home</Link>
          </h5>
          <div className="bg-body-tertiary rounded-5  ">
            <Row>
              <Col md={6} className='p-4 d-flex justify-content-center align-items-center'>
                <img src={login_img} alt="" />
              </Col>
              <Col md={6} className='p-5 d-flex justify-content-center align-items-center'>
                <form className='w-100 text-center'>
                  <h5><img
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/NuGet_project_logo.svg/2048px-NuGet_project_logo.svg.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}Project <span style={{ color: 'grey', fontWeight: "600" }}>Fair</span></h5>
                  {registerForm ?
                    <>
                      <h6 className=' mt-3 mb-3'>Sign up to Create Your account</h6>
                      <input type="text" placeholder='Name' className='form-control w-100 mb-3'
                        value={userData.username}
                        onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                    </>
                    :
                    <h6 className='r mt-3 mb-3'>Sign In To Your Account</h6>
                  }

                  <div className='text-center'>
                    <input type="email" placeholder='Email id' className='form-control w-100 mb-3'
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                  </div>
                  <div>
                    <input type="password" placeholder='Password' className='form-control w-100 mb-3'
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                  </div>
                  {
                    registerForm ?
                      <div >
                        <button className='btn text-light' style={{ backgroundColor: '#004a90' }} onClick={handleRegister}>
                          Register
                        </button>
                        <p className='mt-2'>Already A User? Click Here To <Link to={"/login"} style={{ color: 'grey', textDecorationColor: 'grey' }}>Login</Link></p>
                      </div> :
                      <div>
                        <button className='btn text-light' style={{ backgroundColor: '#004a90' }} onClick={handleLogin}>
                          Login
                        </button>
                        <p className='mt-2'>Dont Have an Account? Click Here To <Link to={'/register'} style={{ color: 'grey', textDecorationColor: 'grey' }}>Register</Link></p>
                      </div>
                  }
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Auth