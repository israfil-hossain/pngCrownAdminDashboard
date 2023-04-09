import React from "react";
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
import { AiOutlineCloseCircle } from "react-icons/ai";

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
  maxHeight: "90vh",
  overflow: "auto",
};
const ViewImages = ({ open, onClose, data, fetchData }) => {
  const handleResetAndClose = () => {
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
              View Image
            </Typography>
            <div style={{}}>
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
            <Chip label="view image" />
          </Divider>
          <div className="space-y-6 mx-auto max-w-md">
            <div className="my-4 rounded-md">
              <label htmlFor="image">Image</label>
              <div className="mt-1 flex border flex-col justify-center items-center space-x-2 p-10 bg-white rounded-md h-100vh">
                <div className="rounded-md bg-gray-100 p-3 mb-5 flex items-center justify-center">
                  <img
                    src={data?.imageUrl}
                    alt="Preview"
                    style={{ height: "100px", marginTop: "10px" }}
                    className="w-full h-full rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between ">
              <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>

                <Switch
                  id="status"
                  name="status"
                  checked={data?.status === "active"}
                  color="primary"
                />

                <label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-700"
                >
                  {data?.status === "active" ? "Active" : "Inactive"}
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image Size :
                </label>
                <div className="bg-violet-400 text-white rounded-xl px-4 py-1 ">
                  {data?.width}x {data?.height}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 justify-between ">
              <div className="flex flex-col space-y-6">
              <div className="flex items-center space-x-2">
                <label className="block text-sm font-medium text-gray-700">
                  Image Name :
                </label>
                <div className="bg-cyan-400 rounded-xl px-4 py-1 ">
                  {data?.imageName}
                </div>
              </div>
              <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                Category :
              </label>
              <div className="bg-emerald-400 text-white rounded-xl px-4 py-1 ">
                {data?.category}
              </div>
            </div>
              </div>
              <div className="flex items-center space-x-3">
                <label className="block text-sm font-medium text-gray-700">
                  Tag List :
                </label>
                {data &&
                  data.tags.map((tagString, id) => (
                    <div key={id} clasName="flex flex-col">
                      {tagString.split(",").map((tag, index) => (
                        <div
                          key={index}
                          className="flex-col px-3 text-white bg-indigo-400 rounded-md mt-1 items-center text-center justify-center"
                        >
                          {tag.trim()}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ViewImages;
