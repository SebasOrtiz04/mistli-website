import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.tsx";
import CrearNoticia from "../../pages/website/CrearNoticia.tsx";

const HomePage = lazy(() => import('../../pages/website/HomePage.tsx'))
const NoticiasPage = lazy(() => import('../../pages/website/NoticiasPage'))
const NoticiaPage = lazy(() => import('../../pages/website/NoticiaPage.tsx'))
const DocsPage = lazy(() => import('../../pages/website/DocsPage.tsx'))
const PrivacyPage = lazy(() => import('../../pages/website/PrivacyPage.tsx'))
const StatusPage = lazy(() => import('../../pages/website/StatusPage.tsx'))
const SupportPage = lazy(() => import('../../pages/website/SupportPage.tsx'))
const TermsPage = lazy(() => import('../../pages/website/TermsPage.tsx'))
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage.tsx'))
const IA = lazy(() => import('../../pages/website/ia/IAPage.tsx'))
const Web = lazy(() => import('../../pages/website/web/WebPage'))
const Backend = lazy(()=> import('../../pages/website/backend/BackendPage'))
const Automatizacion = lazy(()=> import('../../pages/website/automatizacion/AutomatizacionPage.tsx'))
const Documentos = lazy(()=> import('../../pages/website/documentos/DocumentosPage.tsx'))
const Aplicaciones = lazy(()=>import('../../pages/website/aplicaciones/AplicacionesPage.tsx'))
const Contacto = lazy(()=> import('../../pages/website/contacto/contactoPage.tsx'))

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
                path: ":noticia",  // 👈 esto resuelve /noticias/123
                element: (
                    <MainLayout>
                        <NoticiaPage />
                    </MainLayout>)
            }
        ]
    },
    {
        path: "/documentation",
        children : [
            {
                element : (
                    <MainLayout>
                        <DocsPage/>
                    </MainLayout>
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
                    <MainLayout>
                        <SupportPage/>
                    </MainLayout>
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
                    <MainLayout>
                        <PrivacyPage/>
                    </MainLayout>
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
                    <MainLayout>
                        <StatusPage/>
                    </MainLayout>
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
                    <MainLayout>
                        <TermsPage/>
                    </MainLayout>
                ),
                index : true
            }
        ]
    },
    {
        path: "/createnews",
        children : [
            {
                element : (
                    <MainLayout>
                        <CrearNoticia/>
                    </MainLayout>
                ),
                index : true
            }
        ]
    },
    {
        path: "/ia",
        children : [
            {
                element : (
                <MainLayout>    
                    <IA/>
                </MainLayout>
                ),
                index : true
            }
        ]
    },
    {
        path: "/web",
        children:[
            {
                element:(
                <MainLayout>
                    <Web/>
                </MainLayout>
                ),
                index:true
            }
        ]
    },
    {
        path: "backend",
        children:[
            {
                element:(
                <MainLayout>
                    <Backend/>
                </MainLayout>
                ),
                index:true
            }
        ]
    },
    {
        path: "aplicaciones",
        children:[
            {
                element:(
                <MainLayout>
                    <Aplicaciones/>
                </MainLayout>
                ),
                index:true
            }
        ]
    },
    {
        path: "automatizacion",
        children:[
            {
                element:(
                <MainLayout>
                    <Automatizacion/>
                </MainLayout>
                ),
                index:true
            }
        ]
    },
    {
        path: "contacto",
        children:[
            {
                element:(
                <MainLayout>
                    <Contacto/>
                </MainLayout>
                ),
                index:true
            }
        ]
    },
    {
        path: "documentos",
        children:[
            {
                element:(
                <MainLayout>
                    <Documentos/>
                </MainLayout>
                ),
                index:true
            }
        ]
    },
    {
        path: "*",
        element: (<MainLayout>
                <NotFoundPage />
                </MainLayout>)
    }

]

export default websiteRoutes;
