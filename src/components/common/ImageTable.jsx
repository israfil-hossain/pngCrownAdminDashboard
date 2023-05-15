import { MdEdit, MdVisibility, MdDelete } from "react-icons/md";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

import SliderService from "../../service/SliderService";
import ImageService from "../../service/ImageService";
import AddSlider from "../Slider/AddSlider";
import ViewSlider from "../Slider/ViewSlider";
import ViewImages from "../Images/ViewImages";
import AddImage from "../Images/AddImages";

const ImageTable = ({ id, columns, data, typeData, fetchData }) => {
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataType, setDataType] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Open Usb Modal Function ....
  const handleView = (item) => {
    switch (typeData) {
      case "image":
        setDataType("image_view");
        setOpen(true);
        setSelectedData(item);
        break;
      case "slider":
        setDataType("slider_view");
        setOpen(true);
        setSelectedData(item);
        break;
      default:
        return "Not Found !";
    }
  };

  // For Slider Deleted Function Call.....
  const handleSliderDelete = async (id) => {
    try {
      const response = await SliderService.deleteSlider(id);

      if (response.status === 200) {
        toast.success("Slider Deleted Successfully !");
        fetchData();
      }
    } catch (err) {
      toast.error("Something went wrong !");
      console.log(err);
    }
  };

  // For Image Deleted Function Call.....
  const handleImageDelete = async (id) => {
    try {
      const response = await ImageService.deleteImage(id);

      if (response.status === 200) {
        toast.success("Image Deleted Successfully !");
        fetchData();
      }
    } catch (err) {
      toast.error("Something went wrong !");
      console.log(err);
    }
  };

  // Global HandleDelete For Any Tables
  const handleDelete = async (id) => {
    switch (typeData) {
      case "image":
        handleImageDelete(id);
        break;
      case "slider":
        handleSliderDelete(id);
        break;
      default:
        return "Not Found !";
    }
  };

  const handleEdit = (item) => {
    switch (typeData) {
      case "image":
        // return navigate(`/package/edit/${id}`);
        setDataType("image_edit");
        setOpen(true);
        setSelectedData(item);
        break;
      case "slider":
        setDataType("slider_edit");
        setOpen(true);
        setSelectedData(item);
        break;
      default:
        return "Not Found !";
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", width: "100%" }}
      >
        <Table
          id={id}
          sx={{
            minWidth: 650,
            maxWidth: "100%",
            marginBottom: "30px",
            width: "100%",
          }}
          aria-label="dynamic table"
        >
          <TableHead sx={{ bgcolor: "#F7F4FC", width: "100%" }}>
            <TableRow sx={{ width: "100%" }}>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#000000",
                  fontSize: "13px",
                  fontWeight: "500",
                  width: "5%",
                }}
              >
                {"ID"}
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "left",

                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                <Typography sx={{ color: "" }}>Image</Typography>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "600",
                  width: "10%",
                }}
              >
                <Typography sx={{ color: "" }}>Category name</Typography>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",
                  fontSize: "16px",
                  fontWeight: "600",
                  width: "15%",
                }}
              >
                <Typography sx={{ color: "" }}>Image Name</Typography>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",

                  fontSize: "16px",
                  fontWeight: "600",
                  width: "20%",
                }}
              >
                <Typography sx={{ color: "" }}>Status</Typography>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",

                  fontSize: "16px",
                  fontWeight: "600",
                  width: "35%",
                }}
              >
                <Typography sx={{ color: "" }}>Tag Name</Typography>
              </TableCell>
              <TableCell
                sx={{
                  textAlign: "left",

                  fontSize: "16px",
                  fontWeight: "600",
                  width: "10%",
                }}
              >
                <Typography sx={{ color: "" }}>Size</Typography>
              </TableCell>

              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#000000",
                  fontSize: "13px",
                  fontWeight: "500",
                  flexDirection: "row",
                  width: "10%",
                }}
              >
                {"Actions"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontWeight: "500", color: "black" }}>
                      {index + 1}{" "}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Box
                      sx={{
                        width: "80px",
                        height: "80px",
                        overflow: "hidden",
                        padding: "3px",
                        background: "#f2f2f2",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={item?.imageUrl} // Assuming image URL is stored in the "image" property of the data object
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }} // Adjust styles as needed
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: data.color,
                      }}
                    >
                      {item?.category}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: "35%" }}>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: "14px",
                      }}
                    >
                      {item?.imageName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: item?.status === "active" ? "green" : "red",
                      }}
                    >
                      {item?.status}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{width:"25%"}}>
                    <Typography
                      sx={{
                        color: "black",
                        
                      }}
                    >
                      {item?.tags?.map((tag, index) => (
                        <React.Fragment key={tag}>
                          <span className="text-small rounded-md mr-1 px-2 py-1">
                            {tag}
                          </span>
                          {(index + 1) % 5 === 0 && <br />}
                        </React.Fragment>
                      ))}

                    </Typography>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: "black",flex: 1,
                      }}
                    >
                      {(item?.size / 1048576).toFixed(2)} {"MB"}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{
                        textAlign: "center",
                        justifyContent: "center",
                        width: "120px",
                      }}
                    >
                      <div sx={{ ml: 10 }}>
                        <IconButton
                          aria-label="view"
                          onClick={() => handleView(item)}
                        >
                          <MdVisibility style={{ color: "green" }} />
                        </IconButton>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(item)}
                        >
                          <MdEdit style={{ color: "blue" }} />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleDelete(item?._id)}
                        >
                          <MdDelete style={{ color: "red" }} />
                        </IconButton>
                      </div>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          width={"100%"}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: "#F7F4FC" }}
        />
      </TableContainer>

      {(() => {
        switch (typeData) {
          case "slider":
            if (dataType === "slider_edit") {
              return (
                <AddSlider
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "slider_view") {
              return (
                <ViewSlider
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;

          case "image":
            if (dataType === "image_edit") {
              return (
                <AddImage
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "image_view") {
              return (
                <ViewImages
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;
          default:
            return (
              <Box>
                <Typography>No Data Availavle;</Typography>
              </Box>
            );
        }
      })()}

    </>
  );
};

export default ImageTable;
