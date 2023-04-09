import * as Yup from 'yup'; 

const signinValidationSchema = Yup.object().shape({
    username: Yup.string().email('** Invalid email address').required('** Email is Required'),
    password: Yup.string().min(6).required('** Password is Required'),
})

export default signinValidationSchema; 