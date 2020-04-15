
import { apiUrl } from '../general/config';
//import '../../node_modules/whatwg-fetch/fetch.js';
import axios from 'axios';

export const CourseService = {
    getCourses: (term, ptrm, prefix, offset, limit, currentAttr, attrsInput, campusInput, generalInput,timeIniInput) => (
        axios.get(`${apiUrl}/courses?term=${term || ''}&ptrm=${ptrm || ''}` +
            `&prefix=${prefix || ''}&attr=${currentAttr || ''}&nameInput=${generalInput || ''}` +
            `&campus=${campusInput || ''}&attrs=${attrsInput || ''}&timeStart=${timeIniInput || ''}`+
            `&offset=${offset || 0}&limit=${limit || ''}`,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                return response.data;
            })
    ),
    getCourseDetails: (term, ptrm, nrc) => (
        axios.get(`${apiUrl}/courseDetails?term=${term || ''}&ptrm=${ptrm || ''}` +
            `&nrc=${nrc || ''}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                return response.data;
            })
    ),
    getSeatsAvail: (term, ptrm, nrc) => (
        axios.get(`${apiUrl}/courseSeatsAvail?term=${term}&ptrm=${ptrm}&nrc=${nrc}`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                return response.data;
            })
    )
}

