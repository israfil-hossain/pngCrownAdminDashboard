import * as Yup from 'yup';

const categoryValidationSchema = Yup.object({
    cat_name: Yup.string().min(2).required("Category Name is required"),
  });

export default categoryValidationSchema;