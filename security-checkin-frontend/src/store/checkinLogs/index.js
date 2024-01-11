import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { batch } from "react-redux";
import moment from "moment";
import {createDynamicReducer} from "../../utils/createDynamicReducers";
import getStore from "../getStore";





export const {
    reducer: checkinsReducer,
    setStore: setCheckinsStore,
    useByKey: useCheckin,
    sync: syncCheckins,
    setQueries: setCheckinsQueries,
    useKeysByQuery: useCheckinsIdsByQuery
} = createDynamicReducer('checkin', 'id');


export const syncAllCheckins = (accessories) => {
    let query = {};
    let ids = [];

    for (let access of accessories) {
        const date = moment(access.createAt).format('DD-MM-YYYY');
        let tmpDate = query[date] || []
        ids.push(access.id.toString());


        query = {
            ...query,
            [date] :[...new Set([...tmpDate,access.id.toString()])]
        }
    }
    batch(() => {
        syncCheckins(accessories);
        setCheckinsQueries({
            all: ids,
            ...query
        });
    });
};


// export const useCheckinIds = () => {
//     return useCheckinsByQuery("all") || [];
// };


