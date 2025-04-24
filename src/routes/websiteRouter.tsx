import { lazy } from "react";
import { RouteObject } from "react-router";
import MainLayout from "../layouts/MainLayout.tsx";

const HomePage = lazy(() => import('../pages/website/HomePage.tsx'))

const websiteRouter : RouteObject[] = [
    {
        path: "/",
        children : [
            {
                element : (
                    <MainLayout>
                        <HomePage/>
                    </MainLayout>
                ),
                index : true
            }
        ]
    }
]

export default websiteRouter;
