import React, { lazy, Suspense } from 'react';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from './routes/pages/root/index';
// import Error from './routes/pages/error/index';

import Loading from './components/loading';

import Home from './pages/home/index';
import Contact from './pages/contact/index';

const About = lazy(() => import('./pages/about/index'))
const Skills = lazy(() => import('./pages/skills/index'))
const Portfolio = lazy(() => import('./pages/portfolio/index'))
const Blog = lazy(() => import('./pages/blog/index'))
const Services = lazy(() => import('./pages/services/index'))
const Error = lazy(() => import('./routes/pages/error/index'))
// import About from './pages/about/index';
// import Skills from './pages/skills/index';
// import Blog from './pages/blog/index';
// import Portfolio from './pages/portfolio/index';
// import Services from './pages/services/index';

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
                element: (
                    <Suspense fallback={<Loading />}>
                        <About />
                    </Suspense>
                ),
                errorElement: <Error />,
            },
            {
                path: '/skills',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Skills />
                    </Suspense>
                ),
                errorElement: <Error />,
            },
            {
                path: '/blog',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Blog />
                    </Suspense>
                ),
                errorElement: <Error />,
            },
            {
                path: '/portfolio',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Portfolio />
                    </Suspense>
                ),
                errorElement: <Error />,
            },
            {
                path: '/services',
                element: (
                    <Suspense fallback={<Loading />}>
                        <Services />
                    </Suspense>
                ),
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