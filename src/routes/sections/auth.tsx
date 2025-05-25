import { lazy } from "react";
import { Outlet, RouteObject } from "react-router";
import AuthLayout from "../../layouts/AuthLayout.tsx";

const LoginPage = lazy(() => import('../../pages/auth/LoginPage.tsx'));

const authRoutes : RouteObject[] = [
    {
        path: 'auth',
        element:(
            <AuthLayout>
                <Outlet/>
            </AuthLayout>
        ),
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            }
        ]
    }
]

export default authRoutes;
