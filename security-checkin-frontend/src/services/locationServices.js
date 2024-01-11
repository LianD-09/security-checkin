import { ConnectedTvSharp } from '@mui/icons-material';
import axios from 'axios';
const apiEndpoint = process.env.REACT_APP_API_URL + '/location'

export const getLocationById = async (id) => {
    return await axios.get(`${apiEndpoint}/${id}`);
}

export const getAllLocation = async () => {
    return await axios.get(`${apiEndpoint}`);
}

export const createLocation = async (body) => {
    return await axios.post(`${apiEndpoint}`, {
        locationname: body.name,
        latitude: body.latitude,
        longtitude: body.longtitude
    });
}