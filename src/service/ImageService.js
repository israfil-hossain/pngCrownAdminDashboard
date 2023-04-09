import { API, FAPI } from "../config/axiosConfig";

const addImage = (values) => {
  return FAPI.post("/image/add", values);
};
const getImage = () => {
  return API.get("/image");
};

const getSingleImage = (id) => {
  return API.get(`/image/${id}`);
};

const updateImage = (id, values) => {
  return FAPI.put(`/image/update/${id}`, values);
};
const deleteImage = (id) => {
  return API.delete(`/image/delete/${id}`);
};
const ImageService = {
  getImage,
  addImage,
  updateImage,
  getSingleImage,
  deleteImage,
};

export default ImageService;
