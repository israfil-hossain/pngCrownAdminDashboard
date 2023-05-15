import * as Yup from "yup";

const sliderValidationSchema = Yup.object().shape({
  image: Yup.mixed()
  .required("Image is required")
  .test("fileSize", "Image must be greater than 5KB or Please Select an Image ", (value) => {
    return value && value.size > 5 * 1024;
  }),
   
  link : Yup.string().required("Link  is required"),
});

export default sliderValidationSchema;
