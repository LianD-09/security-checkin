import axios from 'axios';
const apiEndpoint = process.env.REACT_APP_API_URL + '/checkin/filter?status=ACCEPT'


export const getAllCheckins = async () => {
    return await axios.get(`${apiEndpoint}`);
}
