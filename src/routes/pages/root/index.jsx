import React from 'react';

import Header from '../../../components/header/index';
import Footer from '../../../components/footer/index';

import { Outlet } from 'react-router-dom';

export default function Root() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}