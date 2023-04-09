import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Box, Chip, Divider, IconButton } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: ["90%", "90%", "30%"],
  bgcolor: "background.paper",
  border: "2px solid #F7FDFF",
  borderRadius: "10px",
  boxShadow: `3px 2px 3px 1px rgba(0, 0, 0, 0.2)`,
  p: 4,
};

const ViewCategoryModal = ({ open, onClose, data, fetchData }) => {
  const handleResetAndClose = () => {
    fetchData();
    onClose();
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
          <Box
            sx={{
              pb: 0,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" component="h5">
              View Category
            </Typography>
            <div>
              <IconButton
                aria-label="edit"
                onClick={() => handleResetAndClose()}
              >
                <AiOutlineCloseCircle
                  sx={{ color: "#ff4a68", height: "22px", width: "22px" }}
                  className="text-red-400 hover:text-600"
                />
              </IconButton>
            </div>
          </Box>
          <Divider sx={{ mb: 2 }}>
            <Chip label="View Category" />
          </Divider>
          <div className="space-y-6 mx-auto max-w-md">
            <div className="block text-sm font-medium text-gray-700">
              <span className="text-xl pr-5 ">Category :</span>
              <span className="text-xl text-blue-500">{data?.cat_name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl pr-5 ">Status :</span>
              {data.cat_status === "active" ? (
                <span className="text-xl text-green-500 bg-gray-100 p-1 w-32 text-center rounded-xl">{data?.cat_status}</span>
              ) : (
                <span className="text-xl text-red-500 bg-gray-100 p-1 w-32 text-center rounded-xl">{data?.cat_status}</span>
              )}

              <label
                htmlFor="cat_status"
                className="text-sm font-medium text-gray-700"
              ></label>
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewCategoryModal;
