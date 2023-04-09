import { API } from "../config/axiosConfig"


const addUser = (values)=>{
  return API.post('/users/adduser', values)
}
const getUsers = ()=>{
  return API.get("/users")
}

const getSingleUser = (id)=>{
  return API.get(`/users/${id}`)
}

const updateUser = (id,values)=>{
  return API.put(`/users/update/${id}`,values); 
}
const deleteUser = (id)=>{
  return API.delete(`/users/delete/${id}`); 
}

const deleteActivity = (id)=>{
  return API.delete(`/user-activity/delete/${id}`); 
}
const userActivity = ()=>{
  return API.get("/user-activity")
}

const UserService = {
  getUsers,
  addUser,
  updateUser, 
  getSingleUser, 
  deleteUser,
  userActivity,
  deleteActivity,
};

export default UserService;
