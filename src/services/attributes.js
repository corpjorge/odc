import {apiUrl} from '../general/config';
//import  '../../node_modules/whatwg-fetch/fetch.js';
import axios from 'axios';
export const AttributeService={
    getAttributes:()=>(
        axios.get(`${apiUrl}/attributes`,{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.then((response)=>{
			return response.data;
		})
    )
}