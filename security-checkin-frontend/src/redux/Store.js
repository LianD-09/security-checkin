import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from './reducers/loadingSlice';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({ 
    reducer: {
        loading: loadingSlice,
        // ...
    }
 });

export { store };
