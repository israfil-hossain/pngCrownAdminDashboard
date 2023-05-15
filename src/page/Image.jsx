//External Import
import React, { useEffect, useState } from "react";
import { Box, Breadcrumbs, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { CSVLink } from "react-csv";
import { debounce, filter } from "lodash";

//Internal Import
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import CustomSearchField from "../components/common/SearchField";
import PackageButton from "../components/common/PackageButton";
import { MdSaveAlt } from "react-icons/md";

import { BsImageFill } from "react-icons/bs";
import ImageTable from "../components/common/ImageTable";

import jsPDF from 'jspdf'
import 'jspdf-autotable';

import AddImage from "../components/Images/AddImages";
import ImageService from "../service/ImageService";
import imageHeader from "../constants/image";
import csvImageheaders from "../constants/imageHeaders";
import { Progress } from "../components/common/Progress";
import { CommonProgress } from "../components/common/CommonProgress";

const Image = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {};
  // Fetch User Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true); // Set isLoading to true before making the API call
    try {
      const res = await ImageService.getImage();
      setData(res.data);
    } catch (error) {
      // Handle errors here
      console.error(error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the API call is completed
    }
  };
  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);
  const filteredData = data.filter((image) =>
    image.imageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.category.toLowerCase().includes(searchQuery.toLowerCase()) || 
    image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // console.log("Filter Data is :", filteredData);
  const [open,setOpen] = useState(false);
  const handleOpen=()=>setOpen(true);
  const handleClose = ()=>setOpen(false);

  const handleDownloadPDF = ()=>{
    const pdf = new jsPDF(); 
    pdf.autoTable({html:'#imagedata'});
    pdf.save("imageData.pdf")
  }
  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <BsImageFill size={23} className="min-w-max text-gray-500" />
              &nbsp; Images
            </Box>
          </Link>
          {/* <Typography color="grey">sdfgh</Typography> */}
        </Breadcrumbs>
      </PackageBreadcrumb>
      <Stack
        direction={{
          lg: "row",
          xs: "column",
          sm: "column",
          md: "row",
        }}
        justifyContent={"space-between"}
      >
        {/* Search Box  */}
        <CustomSearchField
          name={"Search by Username or Email"}
          onChange={handleSearchQueryChange}
        />
        <Box
          sx={{
            display: "flex",
            width: { sm: "100%", xs: "100%" },
            justifyContent: "space-between",
          }}
        >
         <Box>
         <CSVLink data={data} headers={csvImageheaders} filename="Imagedata.csv">
            <LoadingButton
              sx={{
                height: "30px",
                width: "75px",
                mt: { lg: "6px", md: "6px" },
                ml: { lg: "10px", md: "6px" },
                alignContent: "left",
                textAlign: "left",
              }}
              size="small"
              color="secondary"
              onClick={handleClick}
              // loading={loading}
              loadingPosition="start"
              startIcon={<MdSaveAlt size={25} />}
              variant="contained"
              disabled={data ? false : true}
            >
              <span>csv</span>
            </LoadingButton>
          </CSVLink>
          <LoadingButton
              sx={{
                height: "30px",
                width: "75px",
                mt: { lg: "6px", md: "6px" },
                ml: { lg: "10px", md: "6px",sm:"4px" },
                alignContent: "left",
                textAlign: "left",
              }}
              size="small"
              color="primary"
              onClick={handleDownloadPDF}
              // loading={loading}
              loadingPosition="start"
              startIcon={<MdSaveAlt size={25} />}
              variant="contained"
              disabled={data ? false : true}
            >
              <span>pdf</span>
            </LoadingButton>
         </Box>
          {/* Add Button  */}
          <Box
            sx={{
              alignContent: "right",
              textAlign: "right",
              marginBottom: "10px",
            }}
            onClick={handleOpen}
          >
            <PackageButton
              color={"green"}
              text={"+ Add"}
              variant={"contained"}
            />
          </Box>
        </Box>
      </Stack>
      <div className="pt-5">
        {/* <CommonTable   columns={userHeader} data={filteredData} typeData={"user"} onDeleted={fetchData}/> */}
        {
          isLoading ? <CommonProgress /> :  
          <ImageTable
          id={"imagedata"}
          columns={imageHeader}
          data={filteredData}
          typeData={"image"}
          fetchData={fetchData}
        />
        }
        
      </div>

      <AddImage open={open} onClose={handleClose} fetchData={fetchData}/>
    </div>
  );
};

export default Image;
