import {applyMiddleware, createStore, combineReducers} from 'redux';
// import { persistReducer} from 'redux-persist';
// import {composeWithDevTools} from 'redux-devtools-extension';

import { productReducer, setProductStore } from "./products";
import {configureStore} from "@reduxjs/toolkit";
import {constantReducer, constantSetStore} from "./constant";
import {setUserStore, userReducer} from "./user";
import { locationsReducer, setLocationsStore } from './location';
import { checkinReducer, setCheckinStore } from './checkinLogs';
// const middlewares: any[] = [];


// const reducers = combineReducers({
//     product:productReducer,
//
// });

const persistConfig = {
  key: 'root',
};


export const store = configureStore({
  reducer: {
      location:locationsReducer,
      checkin: checkinReducer,
  }
});
// export type RootState = ReturnType<typeof store.getState>;
setCheckinStore(store)
setLocationsStore(store)

