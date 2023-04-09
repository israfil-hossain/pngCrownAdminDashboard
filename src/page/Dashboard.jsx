import React from "react";
import PackageBreadcrumb from "../components/common/PackageBreadcrumb";
import { Box, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";
import { AiOutlineAppstore } from "react-icons/ai";
import { BiUser, BiCategoryAlt } from "react-icons/bi";
import { FiDownloadCloud } from "react-icons/fi";
import { BsImages } from "react-icons/bs";
import { useQuery } from "react-query";
import { API } from "../config/axiosConfig";
import { CommonProgress } from "../components/common/CommonProgress";

const Dashboard = () => {
  const { data, isLoading, isError } = useQuery("totalData", () =>
    API.get("/alldata").then((res) => res.data)
  );
  if (isLoading) {
    return (
      <div>
        <CommonProgress />
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching data </div>;
  }
  console.log("Dashbaord data is : ", data);
  return (
    <div className="">
      <PackageBreadcrumb>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="grey" href="/">
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <AiOutlineAppstore
                size={23}
                className="min-w-max text-gray-500"
              />
              &nbsp; Dashboard
            </Box>
          </Link>
          {/* <Typography color="grey">sdfgh</Typography> */}
        </Breadcrumbs>
      </PackageBreadcrumb>
      <div className="grid lg:grid-cols-4 gap-5 md:grid-cols-2 sm:grid-cols-1 ">
        <div className="bg-green-50 h-[150px] items-center text-center justify-center rounded-md gap-4 flex flex-col pt-3">
          <div className="rounded-full flex bg-emerald-200 w-20 h-20 justify-center items-center text-center ">
            <BiUser className="w-8 h-8 animate-my-pulse" />
          </div>
          <div className="pb-2">
            Total Users :{" "}
            <span className="font-medium text-xl">{data?.totalUserDatas}</span>
          </div>
        </div>
        <div className="bg-indigo-50 h-[150px] items-center text-center justify-center rounded-md gap-4 flex flex-col">
          <div className="rounded-full flex bg-indigo-200 w-20 h-20 justify-center items-center text-center ">
            <BiCategoryAlt className="w-8 h-8 animate-my-pulse" />
          </div>
          <div>
            Total Category :{" "}
            <span className="font-medium text-xl">{data?.totalCategories}</span>
          </div>
        </div>
        <div className="bg-purple-50 h-[150px] items-center text-center justify-center rounded-md gap-4 flex flex-col">
          <div className="rounded-full flex bg-purple-200 w-20 h-20 justify-center items-center text-center ">
            <BsImages className="w-8 h-8 animate-my-pulse" />
          </div>
          <div>
            Total Images :{" "}
            <span className="font-medium text-xl">{data?.totalImages}</span>
          </div>
        </div>
        <div className="bg-cyan-50 h-[150px] items-center text-center justify-center rounded-md gap-4 flex flex-col">
          <div className="rounded-full flex bg-cyan-200 w-20 h-20 justify-center items-center text-center animate-my-pulse ">
            <FiDownloadCloud className="w-8 h-8 animate-my-pulse" />
          </div>
          <div>
            Total Slider :{" "}
            <span className="font-medium text-xl">
              {data?.totalSliderDatas}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
