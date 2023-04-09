import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Autocomplete,
  Backdrop,
  Box,
  Chip,
  Divider,
  Fade,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Switch } from "@mui/material";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";

import { toast } from "react-toastify";
import { Progress } from "../common/Progress";
import CategoryService from "../../service/CategoryService";
import imageValidationSchema from "../../utils/validation/imageValidation";
import ImageService from "../../service/ImageService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: ["90%", "90%", "60%"],
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  borderRadius: "10px",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
  maxHeight: "90vh",
  overflow: "auto",
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "350px",
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  borderRadius: "10px",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
};

const AddImage = ({ open, onClose, data, fetchData }) => {
  const handleResetAndClose = (resetForm) => {
    fetchData();
    onClose();
    resetForm();
  };
  const [opencat, setOpencat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState();
  const [tags, setTags] = useState("");
  const [tagsAlldata, setTagsAlldata] = useState();
  const [previewImage, setPreviewImage] = useState(data? data?.imageUrl : "");

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleCatSubmit = async (event) => {
    event.preventDefault();

    const newProduct = {
        tagsitem: tags, // add tags value to the newProduct object
    };

    const res = await CategoryService.addTags(newProduct);
    console.log("Tags add successfully:", res.data);
    toast.success("Tags added successfully");
    fetchTags();
    handleCatClose(true);
  };

  const handleCatOpen = () => setOpencat(true);
  const handleCatClose = () => setOpencat(false);

  useEffect(() => {
    fetchCategory();
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const res = await CategoryService.getTags();
    setTagsAlldata(res.data);
    console.log("Tags is :", res.data);
  };
  const fetchCategory = async () => {
    const res = await CategoryService.getCategory();
    const activeCategories = res.data.filter(
      (category) => category.cat_status === "active"
    );
    setCategory(
      activeCategories.map((category) => ({
        value: category.cat_name,
        label: category.cat_name,
      }))
    );
    console.log("activeCategories Data ==>", activeCategories);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Values", values);
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("status", values.status);
      formData.append("category", values.category);
      formData.append("imageName", values.imageName);
      formData.append("tags",values.tags);
      console.log("FormData", formData);

      const response = await ImageService.addImage(formData);
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
    console.log("Values", values);
   try {
     setIsLoading(true);
     const formData = new FormData();
     formData.append("image", values.image);
     formData.append("status", values.status);
     formData.append("category", values.category);
     formData.append("imageName", values.imageName);

     const response = await ImageService.updateImage(data?._id,formData);
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
              image: data ? data.imageUrl : "",
              status: data ? data?.status : "active",
              tags: data ? data?.tags : [],
              imageName: data ? data?.imageName : "",
              category: data ? data?.category : "",
            }}
            validationSchema={imageValidationSchema}
            onSubmit={data ? handleUpdate : handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
              setFieldValue,
              resetForm,
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
                    {data ? "Update " : "Add "} Image
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
                  <Chip label="Image" />
                </Divider>

                <div className="space-y-6 mx-auto max-w-xl">
                  <div className="my-4 rounded-md">
                    <div
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 "
                    >
                      Category
                    </div>

                    <div className="mt-5">
                      <FormControl fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                          labelId="category-label"
                          id="category"
                          name="category"
                          value={values?.category}
                          onChange={handleChange}
                          label="Category"
                          onBlur={handleBlur}
                          error={touched.category && Boolean(errors.category)}
                        >
                          {category?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option?.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.category && Boolean(errors.category) && (
                          <FormHelperText error>
                            {errors.category}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                  </div>
                  <div className="my-4 rounded-md ">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700 "
                    >
                      Image
                    </label>
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
                        style={{ color: "blue" }}
                      />
                    </div>

                    <ErrorMessage
                      name="image"
                      component="div"
                      className="error-message text-danger"
                      style={{ color: "red" }}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700 ">
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
                      className="text-sm font-medium text-gray-700 "
                    >
                      {values.status === "active" ? "Active" : "Inactive"}
                    </label>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="imagename"
                      className="block text-gray-800   mb-2"
                    >
                      Image Name
                    </label>
                    <Field
                      type="text"
                      name="imageName"
                      placeholder="Enter Image Name"
                      error={touched.imageName && errors.imageName}
                      className={`appearance-none block w-full px-3 py-2 border border-gray-300 
                                    rounded-md shadow-sm placeholder-gray-400 
                                    focus:ring-green-500 focus:border-green-500 focus:ring-1 sm:text-sm ${
                                      touched.imageName && errors.imageName
                                        ? "border-red-500"
                                        : ""
                                    }`}
                      //   className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {touched.imageName && errors.imageName && (
                      <p className="mt-2 text-sm text-red-600 ">
                        {errors.imageName}
                      </p>
                    )}
                  </div>
                  {
                    data ? "" : 
                    <div className="mb-4">
                    <label htmlFor="tags" className="block text-gray-800  mb-2">
                      Tags
                    </label>
                    <div className=" justify-center items-center">
                      <Autocomplete
                        fullWidth
                        multiple
                        id="tags-outlined"
                        options={tagsAlldata?.map((tag)=>tag?.tagsitem)}
                        getOptionLabel={(option) => option}
                        value={values?.tags}
                        onChange={(event, newValue) => {
                          handleChange({
                            target: {
                              name: "tags",
                              value: newValue,
                            },
                          });
                        }}
                        onBlur={handleBlur}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Tags"
                            placeholder="Select tags"
                          />
                        )}
                      />
                      <div className="items-center justify-center mt-2">
                        <button
                          className="bg-green-400 px-4 py-1 rounded-md ml-2"
                          onClick={handleCatOpen}
                        >
                          +Add
                        </button>
                      </div>
                    </div>
                  </div>
                  }

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isLoading ? <Progress className="mr-2" /> : ""}
                    {data ? "Update" : "Upload"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          {/* Add Tags Modal  */}
          <Modal
            open={opencat}
            onClose={handleCatClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>
              <div className="mb-4">
                <label
                  htmlFor="tags"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Add Tags
                </label>
                <div className=" ">
                  <input
                    type="text"
                    name="tags"
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter tags name"
                    value={tags}
                    onChange={handleTagsChange}
                  />
                </div>
                <button
                  className="bg-indigo-600 text-white px-4 py-1 mt-2 rounded-md ml-2"
                  onClick={handleCatSubmit}
                >
                  Add
                </button>
              </div>
            </Box>
          </Modal>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddImage;
