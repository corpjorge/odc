
import { apiUrl } from '../general/config';
//import '../../node_modules/whatwg-fetch/fetch.js';
import axios from 'axios';
export const TermService = {
    getTerms: () => (
        axios.get(`${apiUrl}/terms`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                return response.data;
            })
    ),
    getPtrms: (term) => (
        axios.get(`${apiUrl}/ptrms?term=${term}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                return response.data;
            })
    )
}

