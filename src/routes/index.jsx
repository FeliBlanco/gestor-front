import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    }
])

export default function Routes() {
    return (
        <RouterProvider router={routes}></RouterProvider>
    )
}