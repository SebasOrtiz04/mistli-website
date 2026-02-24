import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.tsx";

const HomePage = lazy(() => import('../../pages/website/HomePage.tsx'))
const NoticiasPage = lazy(() => import('../../pages/website/NoticiasPage'))
const NoticiaPage = lazy(() => import('../../pages/website/NoticiaPage.tsx'))

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
    },
    {
        path: "/noticias",
        children : [
            {
                element : (
                    <MainLayout>
                        <NoticiasPage/>
                    </MainLayout>
                ),
                index : true
            },
            {
                path: ":id",  // 👈 esto resuelve /noticias/123
                element: <MainLayout><NoticiaPage /></MainLayout>
            }
        ]
    }
]

export default websiteRoutes;
