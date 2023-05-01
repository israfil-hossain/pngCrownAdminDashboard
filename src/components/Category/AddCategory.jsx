import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Box, Chip, Divider, IconButton, Switch } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ErrorMessage, Field, Form, Formik } from "formik";
import categoryValidationSchema from "../../utils/validation/categoryValidation";
import CategoryService from "../../service/CategoryService";
import { toast } from "react-toastify";

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

const AddCategoryModal = ({ open, onClose, data, fetchData }) => {
  const handleResetAndClose = (resetForm) => {
    resetForm();
    fetchData();
    onClose();
  };

  // Add Data
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      //api call
      const response = await CategoryService.addCategory(values);
      // console.log("object :>> ", response);
      // console.log("Status Code : ", response.status);
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.error) {
          toast.error(responseData.error.message);
          const errorData = responseData.error;
          if (errorData.errors) {
            const errors = Object.keys(errorData.errors).reduce((acc, key) => {
              acc[key] = errorData.errors[key].msg;
              return acc;
            }, {});
            // console.log(errors);
            setErrors(errors);
          }
        } else {
          toast.success("Successfully Add User ");
          onClose(true);
          fetchData();
        }
        setSubmitting(false);
      }
    } catch (err) {
      if (err.response) {
        const errorData = err.response.data;
        toast.error(errorData.message);
        if (errorData.errors) {
          const errors = Object.keys(errorData.errors).reduce((acc, key) => {
            acc[key] = errorData.errors[key].msg;
            return acc;
          }, {});
       
          setErrors(errors);
        } else {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // Update Data
  const handleUpdate = async (values, { setSubmitting, setErrors }) => {
    
    try {
      //api call
      const response = await CategoryService.updateCategory(data?._id, values);
      if (response.status === 200) {
        toast.success("Successfully Update User ");
        onClose(true);
        fetchData();
        setSubmitting(false);
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      setErrors(err);
      setSubmitting(false);
    }
  };

  const inputClass = `mt-1 block w-full border rounded-md py-2 px-3 text-sm leading-5
        bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-blue-500
        focus:border-blue-500 sm:text-sm sm:leading-5`;

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
              cat_name: data ? data.cat_name : "",
              cat_status: data ? data.cat_status : "active",
            }}
            validationSchema={categoryValidationSchema}
            onSubmit={data ? handleUpdate : handleSubmit}
          >
            {({
              values,
              resetForm,
              handleChange,
              errors,
              touched,
              handleSubmit,
            }) => (
              <Form>
                {/* <>{JSON.stringify(values)}</> */}
                <Box
                  sx={{
                    pb: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" component="h5">
                    {data ? "Update " : "Add "} Category
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
                  <Chip label="Category" />
                </Divider>
                <div className="space-y-6 mx-auto max-w-md">
                  <div>
                    <label
                      htmlFor="cat_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <Field
                      type="text"
                      name="cat_name"
                      id="cat_name"
                      placeholder="Category Name"
                      handleChange={handleChange}
                      inputValue={values.cat_name}
                      autoComplete="off"
                      className={`${inputClass} ${
                        errors.cat_name && touched.cat_name
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="cat_name"
                      component="div"
                      className="mt-2 text-sm text-red-600"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <Field name="cat_status">
                      {({ field, form }) => (
                        <Switch
                          id="cat_status"
                          name="cat_status"
                          checked={field.value === "active"}
                          onChange={(e) => {
                            const newStatus = e.target.checked
                              ? "active"
                              : "inactive";
                            form.setFieldValue("cat_status", newStatus);
                          }}
                          color="primary"
                        />
                      )}
                    </Field>
                    <label
                      htmlFor="cat_status"
                      className="text-sm font-medium text-gray-700"
                    >
                      {values.cat_status === "active" ? "Active" : "Inactive"}
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {data ? "Update" : "Save"}
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

export default AddCategoryModal;
