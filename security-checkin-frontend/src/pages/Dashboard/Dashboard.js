import React from 'react';
import { useDispatch } from 'react-redux';
import { visibleLoading } from '../../redux/reducers/loadingSlice';

const Dashboard = (props) => {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <button onClick={() => dispatch(visibleLoading())} className='bg-red-500'>Loading</button>
        </React.Fragment>
    );
};

export default Dashboard;