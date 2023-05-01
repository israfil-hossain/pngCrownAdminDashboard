import * as Yup from "yup";

const sliderValidationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Image is required"),
   
  link : Yup.string().required("Link  is required"),
});

export default sliderValidationSchema;
