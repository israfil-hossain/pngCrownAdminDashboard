import { object, string } from 'yup';

const signupValidationSchema = object({
    name: string().required("Name is Required"),
    email:string().email().required("Email is Required"),
    mobile: string().matches(/^[0-9]+$/, 'Mobile number must contain only digits')
    .required('Mobile number is required'),
    password: string().required("Password is Required").min(6),
    role: string().oneOf(['admin', 'user','superadmin']).required()
})

export default signupValidationSchema; 