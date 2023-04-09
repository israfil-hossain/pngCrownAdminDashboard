import { API, FAPI } from "../config/axiosConfig";

const addSlider = (values) => {
  return FAPI.post("/slider/add", values);
};
const getSlider = () => {
  return API.get("/slider");
};

const getSingleSlider = (id) => {
  return API.get(`/slider/${id}`);
};

const updateSlider = (id, values) => {
  return FAPI.put(`/slider/update/${id}`, values);
};
const deleteSlider = (id) => {
  return API.delete(`/slider/delete/${id}`);
};
const SliderService = {
  getSlider,
  addSlider,
  updateSlider,
  getSingleSlider,
  deleteSlider,
};

export default SliderService;
