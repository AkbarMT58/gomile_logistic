import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { getUser } from 'helpers/parseJWT';
import Cookies from 'js-cookie';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { MainRoutes } from './MainRoutes';

const Navbar = () => {
  const [activeDropdownMenu, setActiveDropdownMenu] = useState('')
  const [activeDropdownMenuContent, setActiveDropdownMenuContent] = useState(null)
  const history = useHistory();

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

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#F05454',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(15),
      border: '1px solid #dadde9',
    },
  }));

  const set_ActiveDropdownMenu = (menu) => {
    if(menu) {
      setActiveDropdownMenu(menu.name)
      setActiveDropdownMenuContent(menu.subMenu?.filter((item) => item.name !== ''))
    } else {
      setActiveDropdownMenu('')
      setActiveDropdownMenuContent(null)
    }
  }
  return (
    <div className="hidden md:flex items-center justify-between px-5 bg-ocistok_nav-blue w-full h-12">
      <div className="w-32">
        <NavLink to="/">
          <img src="/logoOCIpng.png" alt="logo" />
        </NavLink>
      </div>

      <div className="flex items-center justify-center text-white text-sm h-12">
        {MainRoutes(getUser()?.role).map((route, id) => {
          return (
            route.name.trim() !== '' && (
              <div className="relative h-full"
              key={id}
              onMouseEnter={() => set_ActiveDropdownMenu(route)}
              onMouseLeave={() => set_ActiveDropdownMenu(null)}
              >
              <NavLink
                  className={(isActive) =>
                    isActive
                      ? 'bg-white px-4 text-black h-full flex items-center'
                      : 'hover:bg-white hover:text-black  px-4 h-full transition-all duration-300 flex items-center'
                  }
                  to={route.pathname}
                  >
                  {route.name}
                </NavLink>
                
                {activeDropdownMenu === route.name &&
                  <div className="min-w-[10rem] absolute left-0 bottom-0 translate-y-full bg-white text-black rounded shadow-md z-10">
                    {activeDropdownMenuContent?.map((menu, index) => 
                      <div key={index} className='whitespace-nowrap hover:bg-gray-100 px-3 py-1 cursor-pointer' onClick={(e) => {
                        e.stopPropagation()
                        history.push(menu.pathname);
                      }}>
                          {menu.name}
                      </div>
                      )}
                  </div>
                }
              </div>
            )
          );
        })}
      </div>
      <div className="flex items-center space-x-3 relative">
        <p className="text-white text-sm">{getUser().user}</p>
        <HtmlTooltip
          title={
            <div
              className="cursor-pointer text-white flex space-x-3"
              onClick={logoutHandler}>
              Logout
            </div>
          }>
          <div className="rounded-full bg-gray-300">
            <img src="/user.svg" alt="" className="w-8" />
          </div>
        </HtmlTooltip>
      </div>
    </div>
  );
};

export default Navbar;
