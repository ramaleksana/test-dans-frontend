import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DetailPage, HomePage, LoginPage, RegisterPage } from "../pages";
import Template from "./Template";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Template isAuth />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/:id",
                element: <DetailPage />,
            },
        ],
    },
    {
        element: <Template />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
        ],
    },
]);

const Routes = (props) => {
    return <RouterProvider router={router} />;
};

export default Routes;
