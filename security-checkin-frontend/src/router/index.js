import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../pages/Login/Login';

export default function Router() {
    return (
        <React.Fragment>
            <Routes>
                <Route path='/' element={<MainLayout />} >
                    <div>
                        {/* Navbar  */}
                    </div>
                    <div>
                        {/* Header */}
                        <Route path='/' element={<Dashboard />} />
                    </div>
                </Route>

                <Route path='/login' element={<Login />} />
            </Routes>
        </React.Fragment>
    )
}