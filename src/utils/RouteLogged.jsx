import { Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";

export default function RouteLogged() {
    const { isLogged } = useUser()
    if(isLogged == false) {
        window.location.href = "/login"
        return;
    }
    return <Outlet />
}