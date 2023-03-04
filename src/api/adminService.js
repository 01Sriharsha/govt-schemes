import axios from "axios";

export const BASE_URL = 'http://localhost:9191/api/v1'

const apiClient = axios.create({
    baseURL: BASE_URL
})

export const adminLogin = (adminData) => apiClient.post('/admin/login', adminData)



export const addScheme = (schemeData) => apiClient.post(`/schemes`, schemeData)

export const getAllSchemes = () => apiClient.get(`/schemes`)


//user-types api's
export const getAllUserTypes = () => apiClient.get(`/user-types`);

export const addUserType = (userType) => apiClient.post(`user-types`, userType)

export const deleteUserType = (userTypeId) => apiClient.delete(`/user-types/${userTypeId}`)

//caste api's
export const getAllCaste = () => apiClient.get(`/caste`);

export const deleteCaste = (casteId) => apiClient.delete(`/caste/${casteId}`)

export const addCaste = (casteData) => apiClient.post(`/caste`, casteData)

