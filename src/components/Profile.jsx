import React from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='shadow p-4' style={{ backgroundColor: '#f9f9f9' }}>
        <div className='d-flex mb-3 '>
          <h5 className='pt-2'>Profile</h5>
          <button className='btn btn-light ms-auto'
            onClick={() => setOpen(!open)}>
            {
              open ?
                <i className='fa-solid fa-angle-up'></i>
                :
                <i className='fa-solid fa-angle-down'></i>
            }
          </button>
        </div>
        <Collapse in={open}>
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <label htmlFor="profileImg">
                <input type="file" id='profileImg' style={{display:'none'}} />
                <img width='100px' src="https://freesvg.org/img/abstract-user-flat-4.png" alt="" />
              </label>
            </div>
            <div className='text-center'>
              <input type="text" placeholder='GitHub Link' className='form-control mb-3' />
              <input type="text" placeholder='Linkedin Profile' className='form-control mb-3' />
              <button className='btn btn-outline-primary'>Update</button>
            </div>
          </div>
        </Collapse>
      </div>
    </>
  )
}

export default Profile