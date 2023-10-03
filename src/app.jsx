import React, { lazy, Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./routes/pages/root/index";
import Loading from "./components/loading";
import Debugging from "./pages/debugging";

const Home = lazy(() => import("./pages/home/index"));
const Contact = lazy(() => import("./pages/contact/index"));
const About = lazy(() => import("./pages/about/index"));
const Skills = lazy(() => import("./pages/skills/index"));
const Portfolio = lazy(() => import("./pages/portfolio/index"));
const Blog = lazy(() => import("./pages/blog/index"));
const Services = lazy(() => import("./pages/services/index"));
const Error = lazy(() => import("./routes/pages/error/index"));
const Article = lazy(() => import("./pages/article/index"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/skills",
        element: (
          <Suspense fallback={<Loading />}>
            <Skills />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<Loading />}>
            {/* <Blog /> */}
            <Error />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/blog/:id",
        element: (
          <Suspense fallback={<Loading />}>
            {/* <Article /> */}
            <Error />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/portfolio",
        element: (
          <Suspense fallback={<Loading />}>
            <Portfolio />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/services",
        element: (
          <Suspense fallback={<Loading />}>
            <Services />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/debugging",
        element: <Debugging />,
        errorElement: <Error />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
