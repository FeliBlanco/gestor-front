import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Home";
import NuevoProyecto from "./NuevoProyecto";
import Agregar from "./Agregar";
import Proyecto from "./Proyecto";
import Grupo from "./Grupo";
import SocketContextProvider from "../contexts/socket";
import Login from "./Login";
import RouteLogged from "../utils/RouteLogged";
import useUser from "../hooks/useUser";
import RouteUnlogged from "../utils/RouteUnlogged";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <SocketContextProvider />,
        children: [
            {
                path:'/',
                element: <RouteLogged />,
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
        ]
    },
    {
        path:'/',
        element: <RouteUnlogged />,
        children: [
            {
                path:'/login',
                element: <Login />
            }
        ]
    }
])

export default function Routes() {

    const { isLogged } = useUser()
    if(isLogged == null) return <div></div>
    return (
        <RouterProvider router={routes}></RouterProvider>
    )
}