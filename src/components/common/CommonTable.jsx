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
// import PackageService from "../../service/PackageService";
import UserService from "../../service/UserService";
import CategoryService from "../../service/CategoryService";
import AddCategoryModal from "../Category/AddCategory";
import ViewCategoryModal from "../Category/ViewCategory";
import AddUser from "../Users/AddUser";
import ViewUser from "../Users/ViewUser";

const CommonTable = ({ columns, data, typeData, fetchData,id}) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedData, setSelectedData] = useState(null);
  const [dataType, setDataType] = useState(null);

  // For View  Function ....

  const handleClick = (item) => {
    switch (typeData) {
      case "user":
        setDataType("user_view");
        setOpen(true);
        setSelectedData(item);
        // return navigate(`/package/edit/${item}`);
        break;
      case "activity":
        setDataType("act_view");
        setOpen(true);
        setSelectedData(item);
        break;

      case "category":
        setDataType("cat_view");
        setOpen(true);
        setSelectedData(item);
        break;
      default:
        return "Not Found !";
    }
  };

  // For Category Deleted Function Call.....
  const handleCategoryDelete = async (id) => {
    try {
      const response = await CategoryService.deleteCategory(id);

      if (response.status === 200) {
        toast.success("Category Deleted Successfully !");
        fetchData();
      }
    } catch (err) {
      toast.error("Something went wrong !");
      console.log(err);
    }
  };
  const handleUserDelete = async (id) => {
    try {
      const response = await UserService.deleteUser(id);

      if (response.status === 200) {
        toast.success("User Deleted Successfully !");
        fetchData();
      }
    } catch (err) {
      toast.error("Something went wrong !");
      console.log(err);
    }
  };
  const handleActivityDelete = async (id) => {
    try {
      const response = await UserService.deleteActivity(id);

      if (response.status === 200) {
        toast.success("User Activity Deleted Successfully !");
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
      case "user":
        handleUserDelete(id);
        break;
      case "activity":
        handleActivityDelete(id);
        break;
      case "category":
        handleCategoryDelete(id);
        break;
      default:
        return "Not Found !";
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (item) => {
    switch (typeData) {
      case "user":
        setDataType("user_edit");
        setOpen(true);
        setSelectedData(item);
        // return navigate(`/package/edit/${item}`);
        break;
      case "activity":
        setDataType("act_edit");
        setOpen(true);
        setSelectedData(item);
        break;

      case "category":
        setDataType("cat_edit");
        setOpen(true);
        setSelectedData(item);
        break;
      default:
        return "Not Found !";
    }
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
          sx={{ minWidth: 650, marginBottom: "30px" }}
          aria-label="dynamic table"
        >
          <TableHead sx={{ bgcolor: "#F7F4FC" }}>
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
                  <Typography sx={{ color: "black" }}>
                    {column?.label}
                  </Typography>
                </TableCell>
              ))}
              {typeData === "activity" ? (
                ""
              ) : (
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
              )}
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
                  {columns?.map((column) => (
                    <TableCell
                      key={column?.id}
                      sx={{
                        textAlign: "left",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "13px",
                          color:
                            column?.color && column?.id === "cat_status"
                              ? item[column?.id] === "active"
                                ? "green"
                                : "red"
                              : column?.color,
                        }}
                      >
                        {item[column?.id]}
                      </Typography>
                    </TableCell>
                  ))}
                  {typeData === "activity" ? (
                    ""
                  ) : (
                    <TableCell sx={{}}>
                      <Stack
                        direction="row"
                        spacing={0}
                        sx={{ textAlign: "center", justifyContent: "center" }}
                      >
                        <div sx={{ ml: 10 }}>
                          <IconButton
                            aria-label="view"
                            onClick={() => handleClick(item)}
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
                  )}
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
          case "category":
            if (dataType === "cat_edit") {
              return (
                <AddCategoryModal
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "cat_view") {
              return (
                <ViewCategoryModal
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;

          case "user":
            if (dataType === "user_edit") {
              return (
                <AddUser
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            if (dataType === "user_view") {
              return (
                <ViewUser
                  data={selectedData}
                  fetchData={fetchData}
                  open={open}
                  onClose={handleClose}
                />
              );
            }
            break;
          // return <UserModal selectedData={selectedData} onClose={onClose} />;

          default:
            return (
              ""
            );
        }
      })()}
    </>
  );
};

export default CommonTable;
