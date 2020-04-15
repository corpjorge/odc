
import { apiUrl } from '../general/config';
//import '../../node_modules/whatwg-fetch/fetch.js';
import axios from 'axios';
export const ProgramService = {
    getPrograms: (term, ptrm) => (
        axios.get(`${apiUrl}/programs?term=${term}&ptrm=${ptrm}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                return response.data;
            })
    ),
}

