// AUTH ENDPOINTS
export const authEndpoints = {
    SIGNUP_API: import.meta.env.VITE_BASE_URL + "/api/v1/accounts" + "/register",
    LOGIN_API: import.meta.env.VITE_BASE_URL + "/api/v1/accounts" + "/login",
}