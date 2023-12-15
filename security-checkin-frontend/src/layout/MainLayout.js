import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <React.Fragment>
            <div
                // style={superBeautifulSelfCustom}
                className='h-full w-full'
                style={{ minHeight: '100vh' }}
            >
                <button className='bg-black h-7 w-7'>Tai</button>
                <Outlet />
            </div>
        </React.Fragment>
    );
};

export default MainLayout;
