import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const UserContext = createContext(null);


export default function UserContextProvider({children}) {

    const [getUserData, setUserData] = useState(null);
    const [isLogged, setLogged] = useState(null);
    const [getToken, setToken] = useState(null)



    useEffect(() => {

        const token = localStorage.getItem('token');
        const userdata = localStorage.getItem('userdata');
        if(token) {
            if(userdata) {
                try {
                    const decode = JSON.parse(userdata)
                    setUserData(decode)
                }
                catch(_){}
            }
            setToken(token)
        } else {
            setLogged(false)
        }
    }, [])


    useEffect(() => {
        (async() => {
            if(getToken) {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user/user_data`, {
                        headers: {
                            Authorization: `Bearer ${getToken}`
                        }
                    })
                    localStorage.setItem('userdata', JSON.stringify(response.data))
                    setUserData(response.data)
                    setLogged(true)
                }
                catch(err) {
                    if(err.status == 403) {
                        localStorage.removeItem('userdata')
                        localStorage.removeItem('token')
                        setLogged(false)
                        setUserData(null)
                    }
                    else alert("ERROR")
                }

            } else {
                if(isLogged == true) {
                    localStorage.removeItem('userdata')
                    localStorage.removeItem('token')
                    setUserData(null)
                    setLogged(false)
                }
            }
        })()
    }, [getToken])


    const userLogin = token => {
        localStorage.setItem('token', token)
        setToken(token)
    }
    return <UserContext.Provider value={{
        getUserData,
        setUserData,
        isLogged,
        userLogin,
        getToken
    }}>{children}</UserContext.Provider>
}