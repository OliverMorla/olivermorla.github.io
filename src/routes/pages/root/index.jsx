import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from '@/components/header/index';
import Footer from '@/components/footer/index';

export default function Root() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}