import * as Yup from "yup";

const imageValidationSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Only PNG images are allowed", (value) => {
      return value ? value.type === "image/png" : true;
    }),
  category : Yup.string().required("Category  is required"),
  imageName : Yup.string().required("Image name is required"),
});

export default imageValidationSchema;
