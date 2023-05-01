
//External Import 
import React, { useEffect, useState } from 'react'
import { Box, Breadcrumbs, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { AiOutlineAppstore } from 'react-icons/ai'
import { LoadingButton } from '@mui/lab'
import { CSVLink } from "react-csv";
import { debounce } from "lodash";

//Internal Import 
import PackageBreadcrumb from '../components/common/PackageBreadcrumb'
import CommonTable from '../components/common/CommonTable'
import CustomSearchField from '../components/common/SearchField'
import PackageButton from '../components/common/PackageButton'
import { MdSaveAlt } from 'react-icons/md'
import csvUserheaders from '../constants/csvUserheaders'
import UserService from '../service/UserService'
import userActivityHeader from '../constants/userActivity'
import jsPDF from 'jspdf'
import 'jspdf-autotable'; 
import csvUserActivityHeader from '../constants/csvUserActivity'

const Activity = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleClick = () => {};
  // Fetch User Data
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await UserService.userActivity();
    setData(res.data.userActivity);
  };
  const handleSearchQueryChange = debounce((query) => {
    setSearchQuery(query);
  }, 500);
  const filteredData = data.filter((activity) =>
  activity.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleDownloadPDF = ()=>{
    const pdf = new jsPDF(); 
    pdf.autoTable({html:'#useractivity'});
    pdf.save("userActivity.pdf")
  }
 
  return (
    <div>
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <AiOutlineAppstore
                size={23}
                className="min-w-max text-gray-500"
              />
              &nbsp; User Activity
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
          <CSVLink data={data} headers={csvUserActivityHeader} filename="UserActivity.csv">
            <LoadingButton
              sx={{
                height: "30px",
                width: "75px",
                mt: { lg: "6px", md: "6px" },
                ml: { lg: "10px", md: "6px", },
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
          >
            {/* <Link to="/user/add">
              <PackageButton
                color={"green"}
                text={"+ Add"}
                variant={"contained"}
              />
            </Link> */}
          </Box>
        </Box>
      </Stack>
      <div className='pt-5'>
        <CommonTable  id={"useractivity"} columns={userActivityHeader} data={filteredData} typeData={"activity"} onDeleted={fetchData}/>
      </div>
    </div>
  )
}

export default Activity;