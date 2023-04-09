import { useEffect, useState, useContext } from "react";
import { useRef } from "react";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation,} from "react-router-dom";
import { MenuContext } from "../../../context/MenuContext";

// * React icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson,BsSliders,BsFillImageFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";

import logo from "../../../assets/pngcrown.png";
import logo2 from "../../../assets/logo2.png";


// const subMenusList = [
//   {
//     name: "build",
//     icon: RiBuilding3Line,
//     menus: ["auth", "app settings", "Storage", "hosting"],
//   },
//   {
//     name: "analytics",
//     icon: TbReportAnalytics,
//     menus: ["dashboard", "realtime", "events"],
//   },
// ];

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const { isOpen, toggleMenu } = useContext(MenuContext);
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [isTabletMid, pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };
  
  return (
    <>
      <div
        onClick={toggleMenu}
        // onClick={handleClick}
        className={`md:hidden fixed inset-0 min-h-screen z-[998] bg-black/50 ${
          isOpen ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={isOpen ? "open" : "closed"}
        className=" bg-gray-900 text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
          overflow-hidden md:relative fixed
       h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <img
            src={logo}
            width={45}
            alt="logo"
          />
          <img
            src={logo2}
            width={128}
            height={40}
            alt="logo"
          />
          {/* <span className="text-xl text-gray-200 whitespace-pre">PngCrown</span> */}
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
            <li>
              <NavLink to={"/"} className="link text-gray-200">
                <AiOutlineAppstore
                  size={23}
                  className="min-w-max text-gray-200"
                />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to={"/slider"} className="link text-gray-200">
                <BsSliders
                  size={23}
                  className="min-w-max text-gray-200"
                />
                Slider
              </NavLink>
            </li>
            <li>
              <NavLink to={"/category"} className="link text-gray-200">
                <BiCategoryAlt
                  size={23}
                  className="min-w-max text-gray-200"
                />
                Category
              </NavLink>
            </li>
            <li>
              <NavLink to={"/addimage"} className="link text-gray-200">
                <BsFillImageFill
                  size={23}
                  className="min-w-max text-gray-200"
                />
                Images
              </NavLink>
            </li>
            
            <li>
              <NavLink to={"/users"} className="link text-gray-200">
                <BsPerson size={23} className="min-w-max text-gray-200" />
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to={"/activity"} className="link text-gray-200">
                <FiActivity
                  size={23}
                  className="min-w-max text-gray-200"
                />
                User Activity
              </NavLink>
            </li>
            
          </ul>
         
        </div>
        <motion.div
          onClick={() => {
            // setOpen(!open);
            toggleMenu(!isOpen);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute text-gray-300 w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          {isOpen ? <IoIosArrowBack size={25} /> : <IoIosArrowForward size={25} />}
        </motion.div>
      </motion.div>
    </>
  );
};

export default Sidebar;
