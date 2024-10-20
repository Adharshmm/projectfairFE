import React, { createContext, useState } from 'react'
export const AddProjectResponseContext = createContext();
export const editProjectResponseContext = createContext()
function ContextShare({ children }) {
    //children is the predefined props name used for sharing data between components
    //create a state that need to be shared
    const [addProjectResponse, setAddProjectResponse] = useState({})
    const [editProjectResponse, setEditProjectResponse] = useState({})
    return (
        <>
            <AddProjectResponseContext.Provider value={{ addProjectResponse, setAddProjectResponse }}>
                <editProjectResponseContext.Provider value={{ editProjectResponse, setEditProjectResponse }}>
                    {children}
                </editProjectResponseContext.Provider>
            </AddProjectResponseContext.Provider>
        </>
    )
}

export default ContextShare