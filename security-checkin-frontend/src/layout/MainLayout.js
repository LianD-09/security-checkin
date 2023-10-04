import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <React.Fragment>
            <div
            // style={superBeautifulSelfCustom}
            >
                <Outlet />
            </div>
        </React.Fragment>
    );
};

export default MainLayout;
