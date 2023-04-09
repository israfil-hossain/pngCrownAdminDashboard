import { API } from "../config/axiosConfig";


const addCategory = (values) => {
  return API.post("/category/add", values);
};
const getCategory = () => {
  return API.get("/category");
};

const getSingleCategory = (id) => {
  return API.get(`/category/${id}`);
};

const updateCategory = (id, values) => {
  return API.put(`/category/update/${id}`, values);
};
const deleteCategory = (id) => {
  return API.delete(`/category/delete/${id}`);
};

const addTags = (values)=>{
  return API.post("/tags/addtags",values);
}
const getTags = ()=>{
  return API.get("/tags");
}
const CategoryService = {
  getCategory,
  addCategory,
  updateCategory,
  getSingleCategory,
  deleteCategory,
  addTags,
  getTags

};

export default CategoryService;
