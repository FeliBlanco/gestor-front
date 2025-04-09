import axios from "axios"
import useUser from "./useUser"

const getConfigs = (config, token) => {
    if(!config.headers) config.headers = {};
    config.headers = {...config.headers, 'Authorization': `Bearer ${token}`}
    return config;
}

export default function useFetch() {

    const { getToken } = useUser()

    async function customFetch(url, method, config) {
        const response = await axios({
            url,
            method,
            ...getConfigs(config, getToken)
        })
        return response;

    }

    const getFetch = async (url, config = {}) => await customFetch(url, "GET", config)
    const postFetch = async (url, data = {}, config = {}) => await customFetch(url, "POST", {...config, data})
    const putFetch = async (url, data = {}, config = {}) => await customFetch(url, "PUT", {...config, data})
    const deleteFetch = async (url, config = {}) => await customFetch(url, "DELETE", config)

    return {
        getFetch,
        postFetch,
        putFetch,
        deleteFetch
    }
}