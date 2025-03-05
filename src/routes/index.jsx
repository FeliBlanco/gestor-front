import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import NuevoProyecto from "./NuevoProyecto";
import Agregar from "./Agregar";
import Proyecto from "./Proyecto";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/new-project',
        element: <NuevoProyecto />
    },
    {
        path: '/agregar',
        element: <Agregar />
    },
    {
        path: '/project/:id',
        element: <Proyecto />
    }
])

export default function Routes() {
    return (
        <RouterProvider router={routes}></RouterProvider>
    )
}