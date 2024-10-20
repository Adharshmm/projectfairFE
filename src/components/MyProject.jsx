import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { deleteProejctApi, getUserProjectApi } from '../services/allApi'
import { AddProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
function MyProject() {
    const { editProjectResponse } = useContext(editProjectResponseContext)
    const [userProjectItem, setUserProjectItem] = useState([])
    const { addProjectResponse,setAddProjectResponse} = useContext(AddProjectResponseContext);
    const getUserProjects = async () => {
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const result = await getUserProjectApi(reqHeader);
        setUserProjectItem(result.data)
        console.log(userProjectItem)
    }
    useEffect(() => {
        getUserProjects()
    }, [addProjectResponse, editProjectResponse])

    const handleDelete = async(id)=>{
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const result = await deleteProejctApi(id,reqHeader)
        if(result.status === 200){
            setAddProjectResponse(result)
        }
    }
    return (
        <>
            <div className='shadow p-5 mb-5' style={{ backgroundColor: '#f9f9f9' }}>
                <div className='d-flex mt-4'>
                    <h5 className='me-auto' >My projects</h5>
                    {/* Add project button component */}
                    <AddProject />
                </div>
                {
                    userProjectItem?.length > 0 ?
                        userProjectItem.map((items) => (

                            <>
                                <div className='p-3 mt-4 rounded-2 d-flex  ' style={{ backgroundColor: '#fff' }}  >
                                    <h5>{items.title}</h5>
                                    <div className=' ms-auto d-flex '>
                                        <div>
                                            <EditProject project={items} />
                                            <Link to={items.website} className='me-3 ' style={{ color: 'blue', textDecoration: 'none' }} >
                                                <i className='fa-solid fa-link fa-lg edit_icon'></i>
                                            </Link>
                                            <Link  to={items.github} className='me-3 ' style={{ color: 'black', textDecoration: 'none' }}>
                                                <i className='fa-brands fa-lg fa-github edit_icon'></i>
                                            </Link>
                                           
                                                <button style={{border:'none', color:'red'}} onClick={(e)=>{
                                                    e.preventDefault(); 
                                                    handleDelete(items._id)}}>
                                                    <i className='fa-solid fa-trash fa-lg edit_icon'></i>
                                                </button>
                                  
                                        </div>

                                    </div>
                                </div>
                            </>
                        )) :
                        <p>No projects found</p>
                }
            </div>
        </>
    )
}

export default MyProject