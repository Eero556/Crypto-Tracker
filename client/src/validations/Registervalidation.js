import * as yup from "yup"

export const registerSchema = yup.object().shape({
    username: yup.string().min(4).max(12).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    confirmpassword: yup.string().oneOf([yup.ref("password"), null])
})


