import axios from "axios"
axios.defaults.baseURL= "http://localhost:8080"
async function sendProfilePicture(request){
    try{
        response = await axios.put("/profilepicture",request.data,);
    }catch (error){
        console.log(error)
    }
}
