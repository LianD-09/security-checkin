import axios from 'axios';
const apiEndpoint = process.env.REACT_APP_API_URL + '/config'

export const getConfig = async () => {
    return await axios.get(`${apiEndpoint}`);
}

export const updateConfig= async (data) => {
    return await axios.post(`${apiEndpoint}`,  {
        distance: data
    });
}
