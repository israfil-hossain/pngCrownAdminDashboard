//External Import
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import AddCategoryModal from "../Category/AddCategory";
// import PackageModal from "../package/PackageModal";
// import UserModal from "../User/UserModal";

const CommonModal = ({ selectedData,open,cid, onClose, typeData,onUpdate }) => {
  // console.log("====> ", cid); 
  return (
    <>
      {/* {(() => {
        switch (typeData) {
          case "category":
            return <AddCategoryModal cid={cid} onUpdate={onUpdate} onClose={onClose} open={open} selectedData={selectedData} />;

          case "user":
            // return <UserModal selectedData={selectedData} onClose={onClose} />;
            return "";
          default:
            return (
              <Box>
                <Typography>No Data Availavle;</Typography>
              </Box>
            );
        }
      })()} */}
    </>
  );
};

export default CommonModal;
