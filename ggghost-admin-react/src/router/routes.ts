import React from "react";
import Login from '../page/login'
import Test from "../page/test";
import App from "../App";
interface IRoutes {
    path: string;
    component: React.FC;
}

const routes: IRoutes[] = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: '/test',
        component: Test,
    },
    {
        path: '/',
        component: App
    }
]

export default routes;