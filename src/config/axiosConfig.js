import axios from "axios";
import {baseUrl} from "./baseUrl"; 
import cookie from "js-cookie";

export const API = axios.create({
    
    baseURL : baseUrl.information, 
    headers: {
        'Content-Type' : 'application/json', 
        Authorization: `Bearer ${cookie.get("token")}`,
    }
})

export const FAPI = axios.create({
    baseURL : baseUrl.file, 
    headers:{
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${cookie.get("token")}`,
    }
})