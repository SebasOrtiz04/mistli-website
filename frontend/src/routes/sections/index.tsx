import { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Splash from "../../components/ui/Splash.tsx";
import authRoutes from "./auth.tsx";
import websiteRoutes from "./website.tsx";
import ScrollToHash from "../../components/ui/ScrollToHash.tsx";

const router = createBrowserRouter([
{
  element:(
    <Suspense fallback={<Splash/>}>
      <ScrollToHash/>
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

