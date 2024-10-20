import axios from "axios";
//httpReqtypes GET POST PUT DELETE
export const commonApi = async (httpReqType,url,reqBody,reqHeader)=>{
    const reqConfig = {
        method:httpReqType,
        reqBody:'',
        url:url,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
        
    }
    if (httpReqType !== 'DELETE') {
        reqConfig.data = reqBody;
    }
    return await axios(reqConfig).then((result)=>{
        return result;
    }).catch((err)=>{
        return err
    })
}