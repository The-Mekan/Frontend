
import axios from "axios";
import Cookies from 'js-cookie';


// Add a request interceptor
axios.interceptors.request.use(function (config) {
  const {origin}=new URL(config.url);
  const allowedOrigin=[process.env.REACT_APP_BASE_ENDPOINT];
  const token=Cookies.get("jwtaccess");
//  const token=localStorage.getItem("access-token");
  if(allowedOrigin.includes(origin)){
    Cookies.set("jwtaccess",token);
   /// config.headers.authorization=token;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});






export const fecthRegister = async (input) => {
  const {data} =await  axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/v1/api/users`,input);
  return data;
};
export const fecthLogin=async(input)=>{
  const {data}=await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/v1/api/sessions`,input);
  return data;
}
export const fecthMe = async () => {
  const {data} =await  axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/v1/api/users/me`);
  return data;
};
export const fecthLogout = async () => {
  const {data} =await  axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/v1/api/sessions`,{
    refresh_token:Cookies.get("refresh-token"),
  });
  return data;
};
