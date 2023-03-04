import { toast } from "react-toastify"

// const values = {
//     schemeType: '', caste: '', maritalStatus: '', gender: '', startAge: '', endAge: '',
//     title: '', description: '', documents: ''
// }

export const validateSchemeForm = (values) => {
    if (values.schemeType === "" || values.caste === "" || values.maritalStatus === ""
        || values.gender === "" || values.startAge === "" || values.endAge === ""
        || values.title === "" || values.description === "" || values.documents === "") {
        toast.error("Field cannot be empty")
    }
}