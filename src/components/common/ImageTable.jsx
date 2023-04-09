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
  console.log("data ", data);
  console.log("data type ", typeData);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [dataType, setDataType] = useState(null);
  console.log("Datatype ", dataType);
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
        toast.success("Slider Deleted Successfully !");
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
        console.log("Slider selected", item);
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
      <TableContainer component={Paper}>
        <Table
          id={id}
          sx={{ minWidth: 650, marginBottom: "30px", width: "100%" }}
          aria-label="dynamic table"
        >
          <TableHead sx={{ bgcolor: "#F7F4FC", width: "100%" }}>
            <TableRow>
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#000000",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                {"ID"}
              </TableCell>
              {columns?.map((column) => (
                <TableCell
                  key={column?.id}
                  sx={{
                    textAlign: "left",

                    fontSize: "16px",
                    fontWeight: "600",
                    color: column?.color,
                  }}
                >
                  <Typography sx={{ color: column?.color }}>
                    {column?.label}
                  </Typography>
                </TableCell>
              ))}
              <TableCell
                sx={{
                  textAlign: "center",
                  color: "#000000",
                  fontSize: "13px",
                  fontWeight: "500",
                  flexDirection: "row",
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
                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: "black",
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
                  <TableCell sx={{maxWidth:"150px"}}>
                    <Typography
                      sx={{
                        color: "black",
                      }}
                    >
                      {item &&
                        item.tags.map((tagString, id) => (
                          <div key={id} clasName="">
                            <div className="flex flex-wrap">
                              {tagString.split(",").map((tag, index) => (
                                <div
                                  key={index}
                                  className="bg-indigo-200 rounded-md mt-1 mr-1 px-2 items-center text-center justify-center"
                                >
                                  {tag.trim()}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{}}>
                    <Typography
                      sx={{
                        color: "black",
                      }}
                    >
                      {item?.height}x{item?.width}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{}}>
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ textAlign: "center", justifyContent: "center" }}
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

      {/* <CommonModal
        selectedData={selectedData}
        open={open}
        onClose={handleClose}
        typeData={typeData}
      /> */}
    </>
  );
};

export default ImageTable;