import { useContext } from "react"
import { UserContext } from "../contexts/user"

export default function useUser() {
    const { getUserData, setUserData, isLogged, userLogin, getToken } = useContext(UserContext)
    return {
        getUserData,
        setUserData,
        isLogged,
        userLogin,
        getToken
    }
}