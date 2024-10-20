import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { getAllProject } from '../services/allApi';
import Header from '../components/Header';

function Project() {
  const [allProjects, setAllProjects] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [isToken, setisToken] = useState(false)
  const getAllprojectItem = async () => {
    console.log("search key", searchKey)
    const token = sessionStorage.getItem("token")
    if (token.length > 0) {
      const reqHeader = {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
      const result = await getAllProject(reqHeader, searchKey);
      setAllProjects(result.data)
    }
  }
  useEffect(() => {
    getAllprojectItem();
  }, [searchKey])
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setisToken(true)
    }
  }, [])
  return (
    <>
      <Header />
      <div className='container-fluid'>
        <h3 className='text-center mt-5'>All Projects</h3>
      </div>
      {
        isToken ?
          <div>
            <div className='row my-4'>
              <div className="col-md-4"></div>
              <div className="col-md-4 d-flex align-items-center">
                <input className='form-control' type="text" placeholder='Search By Technology' onChange={(e) => { setSearchKey(e.target.value) }} />
                <i className='fa-solid fa-search fa-lg text-secondary' style={{ marginLeft: '-32px' }}></i>
              </div>
              <div className="col-md-4"></div>
            </div>

            <div className=" conatiner row my-5 ms-5">
              {allProjects.length > 0 ?
                allProjects.map((items) => {
                  return (
                    <>
                      <div className="col-md-3 mb-5 sm-6">
                        <ProjectCard project={items} />
                      </div>
                    </>

                  )
                }) :
                <p>No projects exsist</p>
              }
            </div>
          </div>
          :
          <div className='text-center'>
            <h1>Login</h1>
          </div>

      }

    </>

  )
}

export default Project