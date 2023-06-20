import React from 'react';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './routes/pages/root/index';

import Home from './pages/home/index';
import About from './pages/about/index';
import Contact from './pages/contact/index';
import Skills from './pages/skills/index';
import Blog from './pages/blog/index';
import Portfolio from './pages/portfolio/index';
import Services from './pages/services/index';
import Error from './routes/pages/error/index';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
                errorElement: <Error />,
            },
            {
                path: '/about',
                element: <About />,
                errorElement: <Error />,
            },
            {
                path: '/skills',
                element: <Skills />,
                errorElement: <Error />,
            },
            {
                path: '/blog',
                element: <Blog />,
                errorElement: <Error />,
            },
            {
                path: '/portfolio',
                element: <Portfolio />,
                errorElement: <Error />,
            },
            {
                path: '/services',
                element: <Services />,
                errorElement: <Error />,
            },
            {
                path: '/contact',
                element: <Contact />,
                errorElement: <Error />,
            }]
    }
])

const App = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default App;