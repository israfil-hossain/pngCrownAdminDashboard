import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Backdrop,
  Box,
  Chip,
  Divider,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Switch } from "@mui/material";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";
import sliderValidationSchema from "../../utils/validation/sliderValidation";
import SliderService from "../../service/SliderService";
import { toast } from "react-toastify";
import { Progress } from "../common/Progress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: ["90%", "90%", "50%"],
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  borderRadius: "10px",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
};
const AddSlider = ({ open, onClose, data, fetchData }) => {
  const handleResetAndClose = (resetForm) => {
    fetchData();
    onClose();
    resetForm();
  };
  const [isLoading, setIsLoading] = useState(false);

  const [previewImage, setPreviewImage] = useState(data ? data.imageUrl : "");

  
  const handleSubmit = async (values, { setSubmitting }) => {
   
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("status", values.status);
      formData.append("link", values.link);
      const response = await SliderService.addSlider(formData);
      console.log(response);
      toast.success("Add Successfully");
      fetchData(); 
      onClose(); 

    } catch (error) {
      toast.error("Something went wrong uploading "); 
      console.log(error);
    }
    setIsLoading(false); 
    setSubmitting(false);
  };

  const handleUpdate = async (values, { setSubmitting }) => {
   try {
     setIsLoading(true);
     const formData = new FormData();
     formData.append("image", values.image);
     formData.append("status", values.status);
     formData.append("link", values.link);
     const response = await SliderService.updateSlider(data?._id,formData);
     console.log(response);
     toast.success("Update Successfully");
     fetchData(); 
     onClose(); 

   } catch (error) {
     toast.error("Something went wrong uploading "); 
     console.log(error);
   }
   setIsLoading(false); 
   setSubmitting(false);
 };
  
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={false}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Formik
            initialValues={{
              image: data ? data?.imageUrl : "",
              status: data ? data?.status : "active",
              link: data? data?.link : "https://www.google.com/",
            }}
            validationSchema={sliderValidationSchema}
            onSubmit={ data ? handleUpdate : handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
              resetForm
            }) => (
              <Form>
                {/* <>{JSON.stringify(values)}</> */}
                <Box
                  sx={{
                    pb: 0,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" component="h5">
                    {data ? "Update " : "Add "} Slider
                  </Typography>
                  <div style={{}}>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleResetAndClose(resetForm)}
                    >
                      <AiOutlineCloseCircle
                        sx={{ color: "#ff4a68", height: "22px", width: "22px" }}
                        className="text-red-400 hover:text-600"
                      />
                    </IconButton>
                  </div>
                </Box>
                <Divider sx={{ mb: 2 }}>
                  <Chip label="Slider" />
                </Divider>
                <div className="space-y-6 mx-auto max-w-md">
                  <div className="my-4 rounded-md">
                    <label htmlFor="image">Image</label>
                    <div className="mt-1 flex border flex-col justify-center items-center space-x-2 p-10 bg-white rounded-md h-100vh">
                      {previewImage ? (
                        <div className="rounded-md bg-gray-100 p-3 mb-5 flex items-center justify-center">
                          <img
                            src={previewImage}
                            alt="Preview"
                            style={{ height: "100px", marginTop: "10px" }}
                            className="w-50 h-50 rounded-md"
                          />
                        </div>
                      ) : (
                        <div>
                          <AiOutlineCloudUpload className="w-16 h-16 text-blue-300 mb-5" />
                        </div>
                      )}
                      <input
                        id="image"
                        name="image"
                        type="file"
                        onChange={(event) => {
                          setFieldValue("image", event.currentTarget.files[0]);
                          setPreviewImage(
                            URL.createObjectURL(event.currentTarget.files[0])
                          );
                        }}
                        onBlur={handleBlur}
                        className={touched.image && errors.image ? "error" : ""}
                      />
                    </div>

                    <ErrorMessage
                      name="image"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Field name="status">
                      {({ field, form }) => (
                        <Switch
                          id="status"
                          name="status"
                          checked={field.value === "active"}
                          onChange={(e) => {
                            const newStatus = e.target.checked
                              ? "active"
                              : "inactive";
                            form.setFieldValue("status", newStatus);
                          }}
                          color="primary"
                        />
                      )}
                    </Field>
                    <label
                      htmlFor="status"
                      className="text-sm font-medium text-gray-700"
                    >
                      {values.status === "active" ? "Active" : "Inactive"}
                    </label>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="link"
                      className="block text-gray-800  mb-2"
                    >
                      Link :
                    </label>
                    <Field
                      type="text"
                      name="link"
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                     {isLoading ?  <Progress /> :  ""} { "  "}
                    {data ? "Update" : "Upload"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddSlider;
