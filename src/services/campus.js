
import {apiUrl} from '../general/config';
//import  '../../node_modules/whatwg-fetch/fetch.js';
import axios from 'axios';
export const CampusService={
    getAllCampus:()=>(
        axios.get(`${apiUrl}/campus`,{
            headers: { 
                'Content-Type':'application/x-www-form-urlencoded'
            }
        })
        .then((response)=>{
                return response.data;
        })
    )
}

