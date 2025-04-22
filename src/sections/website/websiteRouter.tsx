import { lazy } from "react";
import { RouteObject } from "react-router";


const HomeSection = lazy(() => import('./HomeSection'))
const websiteRouter : RouteObject[] = [
    {
        path: "/",
        element: <HomeSection/>,
    }
]

export default websiteRouter;
