import { Suspense } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import Splash from "../components/ui/Splash.tsx";
import websiteRouter from "./websiteRouter.tsx";

const router = createBrowserRouter([
{
  element:(
    <Suspense fallback={<Splash/>}>
      <Outlet/>
    </Suspense>
  ),
  children:[
    ...websiteRouter
  ]
},
]);

export default router;

