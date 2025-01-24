import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import NuevoProyecto from "./NuevoProyecto";
import Agregar from "./Agregar";

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
    }
])

export default function Routes() {
    return (
        <RouterProvider router={routes}></RouterProvider>
    )
}