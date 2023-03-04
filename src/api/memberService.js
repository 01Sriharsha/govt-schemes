import axios from "axios";
import { BASE_URL } from "./adminService";

const apiClient = axios.create({
    baseURL: BASE_URL
})

export const loginMember = (memberdata) => apiClient.post(`/members/login`, memberdata)

export const createNewMember = (memberData) => apiClient.post(`/members`, memberData)

export const getAllMembers = () => apiClient.get(`/members`)

export const getSingleMember = (memberId) => apiClient.get(`/members/${memberId}`);


export const updateMember = (memberId, memberData) =>
    apiClient.put(`/members/${memberId}`, memberData);

export const deleteMember = (memberId) => apiClient.delete(`/members/${memberId}`);

export const getMatchingScheme = (memberData) => apiClient.post(`/schemes/matching`, memberData)

export const uploadFile = (memberId, schemeId, file) => {
    const formData = new FormData();
    formData.append("file", file)
    return apiClient.post(`/members/${memberId}/schemes/${schemeId}/applications`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const getAllApplications = () => apiClient.get(`/applications`);

export const deleteApplication = (applicationId) => apiClient.delete(`/applications/${applicationId}`)