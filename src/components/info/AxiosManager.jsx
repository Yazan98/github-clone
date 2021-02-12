import axios from "axios";

export const BASE_URL = "https://api.github.com/"
export const TIMEOUT = 3000
export const DEFAULT_REQUEST_METHOD = 'get'
export const HAVE_CREDENTIALS = false
export const SUCCESS_RESPONSE = 200

export const axiosManagerInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    method: DEFAULT_REQUEST_METHOD,
    withCredentials: HAVE_CREDENTIALS,
    headers: {
       'Content-Type': 'application/json'
    }
})

export async function getPopularRepositories(pageNumber = 1) {
    return await axiosManagerInstance.get(`search/repositories?q=stars:%3E1&sort=stars&page=${pageNumber}`)
}