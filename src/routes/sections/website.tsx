import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.tsx";

const HomePage = lazy(() => import('../../pages/website/HomePage.tsx'))
const NoticiasPage = lazy(() => import('../../pages/website/NoticiasPage'))
const NoticiaPage = lazy(() => import('../../pages/website/NoticiaPage.tsx'))
const DocsPage = lazy(() => import('../../pages/website/DocsPage.tsx'))
const PrivacyPage = lazy(() => import('../../pages/website/PrivacyPage.tsx'))
const StatusPage = lazy(() => import('../../pages/website/StatusPage.tsx'))
const SupportPage = lazy(() => import('../../pages/website/SupportPage.tsx'))
const TermsPage = lazy(() => import('../../pages/website/TermsPage.tsx'))
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage.tsx'))
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
    },
    {
        path: "/documentation",
        children : [
            {
                element : (
                    <DocsPage/>
                ),
                index : true
            }
        ]
    },
    {
        path: "/support",
        children : [
            {
                element : (
                    <SupportPage/>
                ),
                index : true
            }
        ]
    },
    {
        path: "/privacy",
        children : [
            {
                element : (
                    <PrivacyPage/>
                ),
                index : true
            }
        ]
    },
    {
        path: "/statuspage",
        children : [
            {
                element : (
                    <StatusPage/>
                ),
                index : true
            }
        ]
    },
    {
        path: "/terms",
        children : [
            {
                element : (
                    <TermsPage/>
                ),
                index : true
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />
    }

]

export default websiteRoutes;
