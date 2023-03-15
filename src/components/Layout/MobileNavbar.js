import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { getUser } from 'helpers/parseJWT';
import Cookies from 'js-cookie';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { MainRoutes } from './MainRoutes';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  height: '100vh',
  border: '2px solid lightgray',
  boxShadow: 24,
  borderRadius: 5,
};

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const ROUTES = [
  //   {
  //     name: 'CRM',
  //     pathname: '/management-sales',
  //   },
  //   // { name: 'Pre-Sales', pathname: '/pre-sales' },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Quotation' : ''}`,
  //     pathname: `/quotation`,
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Purchasing' : ''}`,
  //     pathname: `/purchasing`,
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Logistic China' : ''}`,
  //     pathname: '/logistic-china',
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Logistic Indo' : ''}`,
  //     pathname: '/logistic-indo',
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'After Sales' : ''}`,
  //     pathname: '/after-sales',
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Warehouse' : ''}`,
  //     pathname: '/warehouse',
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Catalog' : ''}`,
  //     pathname: '/catalog',
  //   },
  //   // {
  //   //   name: `${getUser().role === "admin" ? "Tracking" : ""}`,
  //   //   pathname: "/tracking",
  //   // },
  //   // { name: "UangMe", pathname: "/uangme-dashboard" },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Blog' : ''}`,
  //     pathname: '/Blog',
  //   },
  // ];

  const logoutHandler = () => {
    swal({
      text: 'Are you sure want to logout?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Cookies.remove('oms_token');
        Cookies.remove('exp_token');
        history.push('/login');
      }
    });
  };

  return (
    <div>
      <div className="md:hidden flex items-center justify-between px-5 bg-ocistok_nav-blue sticky w-full h-16">
        <div className="w-28" style={{ zIndex: '9999 !important' }}>
          <NavLink to="/">
            <img src="/logoOCIpng.png" alt="logo" />
          </NavLink>
        </div>

        <IconButton onClick={handleOpen}>
          <MenuIcon className="text-white" />
        </IconButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className="bg-ocistok_nav-blue py-16 p-10">
          <div className="flex justify-end -mt-7 mr-3">
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon className="text-white" />
            </IconButton>
          </div>
          <div className="space-y-3 flex flex-col">
            {MainRoutes(getUser()?.role).map((route, id) => {
              return (
                route.name.trim() !== '' && (
                  <NavLink
                    key={id}
                    className={(isActive) =>
                      isActive
                        ? 'bg-white p-2  text-black h-full text-center'
                        : 'hover:bg-white text-white hover:text-black  p-2  h-full transition-all duration-300 text-center'
                    }
                    to={route.pathname}>
                    {route.name}
                  </NavLink>
                )
              );
            })}

            <div
              className="text-white text-center rounded-md py-1 px-3 bg-gray-500 mx-20"
              onClick={logoutHandler}>
              Logout
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MobileNavbar;
