export const BASE_URL = "/api/v1.0"

export const API_ENDPOINTS = {

    LOGIN : "/login",
    REGISTER : "/register",
    GET_USER_INFO: "/profile",
    CREATE_CATEGORY:"/categories/save",
    GET_ALL_INCOMES:"/income/all",
    ADD_INCOME:"/income",
    GET_ALL_EXPENSE:"/expense",
    ADD_EXPENSE:"/expense",
    DELETE_INCOME:(id) => `/income/${id}`,
    DELETE_EXPENSE:(id) => `/expense/${id}`,
    CATEGORY_BY_TYPE:(type) => `/categories/${type}`,
    UPDATE_CATEGORY:(categoryId) => `/categories/${categoryId}`,

    GET_ALL_CATEGORIES:"/categories/get"
    


}
