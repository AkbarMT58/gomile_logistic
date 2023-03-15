import Container from './Container';
import React from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';
import ButtonBringToTop from './ButtonBringToTop';

const Layout = ({
  searchBar = true,
  routes = null,
  children,
  title = null,
}) => {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <div className='flex bg-gray-200 min-w-full min-h-screen  text-gray-600 '>
        {routes ? (
          <div className='w-30'>
            <Sidebar routes={routes} title={title} />
          </div>
        ) : (
          <></>
        )}
        <Container>
          {searchBar ? <SearchBar /> : <></>}
          {children}
        </Container>
        <ButtonBringToTop />
      </div>
    </>
  );
};

export default Layout;
