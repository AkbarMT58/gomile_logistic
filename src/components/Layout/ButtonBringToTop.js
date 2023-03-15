import React from 'react';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { IconButton, Tooltip } from '@mui/material';

const ButtonBrintToTop = () => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const [scrolling, setScrolling] = React.useState(false);

  const handleBringToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop, scrolling]);

  if (scrollTop >= 200) {
    return (
      <div
        className={`rounded-full bg-ocistok_nav-blue fixed left-5 bottom-5 animate-bounce flex items-center justify-center`}>
        <Tooltip placement='right' title='Bring Me To Top'>
          <IconButton size='small' onClick={handleBringToTop}>
            <DoubleArrowIcon
              className='text-white -rotate-90'
              fontSize='large'
            />
          </IconButton>
        </Tooltip>
      </div>
    );
  } else {
    return null;
  }
};

export default ButtonBrintToTop;
