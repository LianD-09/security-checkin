import axios from "axios";
import {syncAllCheckins, useCheckinsIdsByQuery} from ".";
import getStore from "../getStore";
import {store} from "../index";

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
export const useCheckinByDateAndLocation = (date, locationId) => {
    const listID = useCheckinsIdsByQuery(date)
    const byId = store.getState().checkin.byKey
    return listID.map(item =>byId[item]).filter(checkin => checkin && checkin.locationId === locationId)
};
