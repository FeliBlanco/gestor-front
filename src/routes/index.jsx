import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import NuevoProyecto from "./NuevoProyecto";
import Agregar from "./Agregar";
import Proyecto from "./Proyecto";
import Grupo from "./Grupo";
import SocketContextProvider from "../contexts/socket";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <SocketContextProvider />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/:grupo',
                element: <Grupo />
            },
            {
                path: '/:grupo/new-project',
                element: <NuevoProyecto />
            },
            {
                path: '/agregar',
                element: <Agregar />
            },
            {
                path: '/:grupo/:proyecto',
                element: <Proyecto />
            }
        ]
    }
])

export default function Routes() {
    return (
        <RouterProvider router={routes}></RouterProvider>
    )
}