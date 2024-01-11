import axios from "axios";
import { syncAllCheckins } from ".";

export const requestAllCheckins= async () => {
   
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://178.128.126.128:9000/checkin/filter?status=ACCEPT`,
        headers: { }
      };
      
    const res = await axios.request(config)
      .then((response) => {
        if(response.data){
            console.log("location", response.data)
            syncAllCheckins(response.data || [])
            return response.data
        }
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        return 0
      });
    return res
};
