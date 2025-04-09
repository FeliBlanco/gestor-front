import { Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function RouteUnlogged() {
    const { isLogged } = useUser()
    if(isLogged == true) {
        window.location.href = "/"
        return;
    }
    return <Outlet />
}