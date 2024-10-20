import { BASE_URL } from "./baseUrl"
import { commonApi } from "./commonApi"

//Register api 
export const registerApi = async (userDetails)=>{
    return await commonApi ("POST", `${BASE_URL}/user/register`,userDetails,"")
}
//login api
export const loginApi  = async(userDetails) =>{
    return await commonApi("POST",`${BASE_URL}/user/login`,userDetails,"")
}
//Add project api
export const addProjectApi = async(projectDetails,headerDeatils)=>{
    return await commonApi('POST',`${BASE_URL}/project/addproject`,projectDetails,headerDeatils)
}
//get home projects 3 nos api
export const getHomeProject = async()=>{
    return await commonApi("GET",`${BASE_URL}/project/homeproject`,"","");
}
//get all projects
export const getAllProject = async(reqHeader,searchKey)=>{
    //QUERY PARAMS SYNTAX
    //path?key=value
    return await commonApi("GET",`${BASE_URL}/project/allprojects?search=${searchKey}`,"",reqHeader);
}
//get user projects
export const getUserProjectApi = async(reqHeader)=>{
    return await commonApi("GET",`${BASE_URL}/project/userproject`,"",reqHeader);
}
//update project
export const editUserProjectApi = async(projectId,reqBody,reqHeader)=>{
    return await commonApi('PUT',`${BASE_URL}/project/editproject/${projectId}`,reqBody,reqHeader)
}
//delete project api
export const deleteProejctApi = async(projectId,reqHeader)=>{
    return await commonApi('DELETE',`${BASE_URL}/project/delete/${projectId}`,{},reqHeader)
}