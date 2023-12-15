import React from 'react';
import { useDispatch } from 'react-redux';
import { visibleLoading } from '../../redux/reducers/loadingSlice';
// import { Navbar } from 'react';

const Dashboard = (props) => {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <button onClick={() => dispatch(visibleLoading())} className='bg-red-500'>Loading</button>
            {/* <Navbar>
                <button className='bg-black'> taif dung</button>
            </Navbar> */}
        </React.Fragment>
    );
};

export default Dashboard; 