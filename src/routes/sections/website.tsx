import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.tsx";

const HomePage = lazy(() => import('../../pages/website/HomePage.tsx'))

const websiteRoutes : RouteObject[] = [
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

export default websiteRoutes;
