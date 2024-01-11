import {baseUrl} from "../../utils/fetch";
import axios from "axios";
import {syncAllProducts} from "../products";


export const getUserById =async (id)=>{
    const data = JSON.stringify({
        "userId": id
    });

    const config = {
        method: 'post',
        url: baseUrl+'api/accounts/get-user',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    const res = await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return {
                code : 1,
                data :response.data.data
            };

        })
        .catch(function (error) {
            return {
                code : 0,
                data : error.response.data.data
            };

        });
    return res
}
