import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard/Dashboard';

export default function Router() {
    return (
        <React.Fragment>
            <Routes>
                <Route path='/' element={<MainLayout />} >
                    <Route path='/' element={<Dashboard />} />
                    {/* Add page route here */}
                </Route>
            </Routes>
        </React.Fragment>
    )
}