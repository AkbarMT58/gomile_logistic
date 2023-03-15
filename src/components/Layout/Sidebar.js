import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import Button from "../UI/Button";
// import Input from "../UI/Input";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";

function Sidebar({ routes, title }) {
  const screenWidth = window.innerWidth;
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (screenWidth < 600) {
      setToggle(true);
    }
  }, [screenWidth]);

  return (
    <>
      <div
        className={`${
          toggle ? "-ml-2" : "-ml-10 bg-white "
        } transition-all duration-300 z-0 `}
        onClick={() => setToggle(false)}>
        <Tooltip title='Show Sidebar'>
          <IconButton>
            <DoubleArrowIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div
        className={`-mt-10 min-h-full transition-all duration-300 ${
          toggle
            ? "-ml-10 bg-gray-200  "
            : "ml-0 bg-white border-r border-gray-100 w-52"
        }`}>
        <div className={`p-3 transition-all ${toggle && "hidden"} w-full`}>
          <div
            className={`${toggle ? "hidden" : "block"} flex justify-end -mt-5`}
            onClick={() => setToggle(true)}>
            <div className='-mr-2'>
              <Tooltip title='Hide Sidebar'>
                <IconButton>
                  <DoubleArrowIcon className='transform rotate-180 transition-all duration-300 ' />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          {/* <NavLink to="/">
            <h1 className="text-md text-left font-semibold  -mt-5 mb-2">
              Dashboard
            </h1>
          </NavLink>
          <Input
            type="text"
            className="p-1 focus:outline-none rounded-md w-32 md:w-full"
          />
          <div className="text-white text-sm flex justify-between">
            <Button className="bg-blue-800 py-1 px-5 rounded-md hover:bg-blue-500 ">
              Search
            </Button>
            <Button className="bg-blue-300 py-1 px-5 rounded-md hover:bg-blue-100">
              Advance
            </Button>
          </div> */}
          <h1 className='text-sm text-gray-500 mt-3 text-center mb-1 font-bold'>
            {title ? title : "Purchasing"}
          </h1>
        </div>
        <hr className='border bg-gray-100' />
        <div className='flex flex-col text-sm text-gray-600  py-4'>
          {routes
            .filter((data) => data.name)
            .map((route, id) => (
              <NavLink
                key={id}
                to={`${route.pathname}`}
                className={(isActive) =>
                  isActive
                    ? `bg-gray-200 p-3 ${toggle && "hidden"}`
                    : `${
                        toggle && "hidden"
                      } p-3 hover:bg-gray-200 transition-all duration-300`
                }>
                {route.name}
              </NavLink>
            ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
