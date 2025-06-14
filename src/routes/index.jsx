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
import CambiarContra from "../components/CambiarContra";
import Webhooks from "./Webhooks";

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
                    },
                    {
                        path: '/webhook',
                        element: <Webhooks />
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

    const { isLogged, getUserData } = useUser()
    if(isLogged == null) return <div></div>

    if(isLogged == true && getUserData?.cambio_contra == 0) {
        return <CambiarContra />
    }
    return (
        <RouterProvider router={routes}></RouterProvider>
    )
}