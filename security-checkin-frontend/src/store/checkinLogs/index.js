import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { createDynamicReducer} from "../../utils/createDynamicReducers";
import { batch } from "react-redux";





const { setStore, reducer, sync, useByKey, setQueries, removeByKey, useKeysByQuery } =
createDynamicReducer("checkin", "_id");

export const setCheckinStore = setStore;
export const checkinReducer = reducer;
export const useCheckin = useByKey;
export const syncCheckin = sync;
export const setCheckinQueries = setQueries;
export const removeCheckinByKey = removeByKey;
export const useCheckinsByQuery = useKeysByQuery;


export const syncAllCheckins = (accessories) => {
    let query = {};
    let ids = [];

    for (let access of accessories) {
         ids.push(access._id.toString());
    }
    batch(() => {
        syncCheckin(accessories);
        setCheckinQueries({
            all: ids,
            ...query
        });
    });
};


export const useCheckinIds = () => {
    return useCheckinsByQuery("all") || [];
};
