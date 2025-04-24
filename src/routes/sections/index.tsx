import { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import Splash from "../../components/ui/Splash.tsx";
import authRoutes from "./auth.tsx";
import websiteRoutes from "./website.tsx";


const router = createBrowserRouter([
{
  element:(
    <Suspense fallback={<Splash/>}>
      <Outlet/>
    </Suspense>
  ),
  children:[
    ...websiteRoutes,
    ...authRoutes,
  ]
},
]);

export default router;

