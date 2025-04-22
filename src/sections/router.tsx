import { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Splash from "../components/ui/Splash.tsx";
import DefaultLayout from "../layouts/DefaultLayout.tsx";
import websiteRouter from "./website/websiteRouter.tsx";

const router = createBrowserRouter([
{
  path: "/",
  element:(
    <Suspense fallback={<Splash/>}>
      <DefaultLayout/>
    </Suspense>
  ),
  children:[
    ...websiteRouter
  ]
},
]);

export default router;

