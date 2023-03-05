import axios from "axios";
import { BASE_URL } from "./adminService";

const apiClient = axios.create({
    baseURL: BASE_URL
})


//Member API's
export const loginMember = (memberdata) => apiClient.post(`/members/login`, memberdata)

export const createNewMember = (memberData) => apiClient.post(`/members`, memberData)

export const getAllMembers = () => apiClient.get(`/members`)

export const getSingleMember = (memberId) => apiClient.get(`/members/${memberId}`);

export const updateMember = (memberId, memberData) =>
    apiClient.put(`/members/${memberId}`, memberData);

export const deleteMember = (memberId) => apiClient.delete(`/members/${memberId}`);


//Scheme API's
export const getMatchingScheme = (memberData) => apiClient.post(`/schemes/matching`, memberData)


//Application API's
export const getAllApplications = () => apiClient.get(`/applications`);

export const deleteApplication = (applicationId) => apiClient.delete(`/applications/${applicationId}`)

export const uploadFile = (memberId, schemeId, file) => {
    const formData = new FormData();
    formData.append("file", file)
    return apiClient.post(`/members/${memberId}/schemes/${schemeId}/applications`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}


//Query API's
export const getAllQueries = () => apiClient.get(`/queries`)

export const createNewQuery = (memberId, schemeId, queryData) =>
    apiClient.post(`/members/${memberId}/schemes/${schemeId}/queries`, queryData)

export const deleteQuery = (queryId) => apiClient.delete(`/queries/${queryId}`)