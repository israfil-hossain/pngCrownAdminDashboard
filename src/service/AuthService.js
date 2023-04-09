import { toast } from "react-toastify";
import { API } from "../config/axiosConfig";

const signin = (values) => {
  return API.post("/login", values);
};

const handleLogout=()=> {
  API.delete("/logout")
    .then((response)=>{
        localStorage.removeItem("token");
        toast.success("Logout Successfully!");
        return window.location.replace("/login"); 
    })
    .catch((err)=>{
      toast.error("Something is Wrong,");
      console.log("Err => ", err);  
    })
};


const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

const AuthService = {
  signin,
  getCurrentUser,
  handleLogout,
};
export default AuthService;
