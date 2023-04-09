import * as Yup from "yup";

const sliderValidationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "Image size should be less than 1 MB", (value) => {
      return value ? value.size <= 1024 * 1024 : true;
    })
    .test("fileType", "Only PNG images are allowed", (value) => {
      return value ? value.type === "image/png" : true;
    }),
  link : Yup.string().required("Link  is required"),
});

export default sliderValidationSchema;
