import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import home_image from '../assets/undraw_programming_re_kg9v.svg'
import ProjectCard from '../components/ProjectCard'
import Header from '../components/Header'
import { getHomeProject } from '../services/allApi'
function Home() {
  const [isLoggin, setIsLoggin] = useState(false)
  const [homeProject, setHomeProject] = useState([])
  const getHomeProjectItems = async () => {
    const result = await getHomeProject();
    setHomeProject(result.data)
  }
  console.log(homeProject)

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLoggin(true)
    }
    getHomeProjectItems()
  },[])
  return (
    <>
      <Header />
      <div className='container-fluid p-4 mb-4 w-100 ' style={{ height: "100%" }}>
        <Row>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column '>
            <div>
              <h1 className='text-center'>Project <span style={{ color: 'grey', fontWeight: "600" }}>Fair</span></h1>
              <h6 className='text-center mt-3'>One stop destination for many software projects</h6>
            </div>
            {
              isLoggin ?

                <Link to={"/dashboad"}>
                  <button className=' btn text-light  mt-3' style={{ backgroundColor: "#004a90", padding: "9px" }}>MANAGE PROJECTS <i className='fa-solid fa-arrow-right'></i></button>
                </Link>
                :
                <Link to={"/register"}>
                  <button className=' btn text-light  mt-3' style={{ backgroundColor: "#004a90", padding: "9px" }}>GET STARTED <i className='fa-solid fa-arrow-right'></i></button>
                </Link>
            }
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column mt-5' >
            <img src={home_image} alt="" style={{ width: "85%" }} />

          </Col>
        </Row>
      </div>


      <div className='container-fluid'>
        <h2 className='text-center my-5'>Explore our projects</h2>
        <div>

          <marquee scrollamount={10}
            onMouseOver={(e) => e.currentTarget.stop()}
            onMouseOut={(e) => e.currentTarget.start()}>
            <div className="row">
              {homeProject.length> 0 ?
                homeProject.map((items) => {
                  return(

                  <div className="col-md-4 justify-content-center d-flex p-4" style={{ width: '400px' }}>
                    <ProjectCard project ={items}/>
                  </div>
                  )
                }) :
                <p style={{color:'black'}}>no project found</p>
              }
            </div>
          </marquee>
        </div>
        <Link style={{ color: 'grey', textDecorationColor: 'grey' }} to={'/project'}>
          <h5 className='text-center mb-5' >See More Projects</h5>
        </Link>
      </div >
    </>
  )
}

export default Home