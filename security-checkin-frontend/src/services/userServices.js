import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_URL + '/user'

export const getUserById = async (id) => {
    return await axios.get(`${apiEndpoint}/${id}`);
}

export const getAllUser = async () => {
    return await axios.get(`${apiEndpoint}`);
}

export const createUser = async (body) => {
    return await axios.post(`${apiEndpoint}`, {
        userName: body.userName,
        password: body.password,
        role: body.role,
        name: body.name,
        phone: body.phone,
        dob: body.dob
    });
}