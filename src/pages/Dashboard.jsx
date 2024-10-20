import React from 'react'
import Header from '../components/Header'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  const userData = JSON.parse(sessionStorage.getItem("loggeduser"));
  console.log('=========================')
  console.log(userData)

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <h4 className='my-4 ms-4 text-dark'>Welcome <span style={{color:"grey"}}>{userData ?.username}</span></h4>
        <div className='row'>
          <div className='col-md-8'>
            <MyProject  />
          </div>
          <div className='col-md-4'>
            <Profile/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard