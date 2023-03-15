import { useEffect, useState } from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ isModal, width, height }) => {
  const [isBolean, setIsBolean] = useState({
    isModalOpen: isModal,
  });

  const styleCustomModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${width ? width : '90%'}`,
    height: `${height ? height : '90%'}`,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: 'full',
  };

  const handleCloseModal = () => {
    setIsBolean({
      ...isBolean,
      isModalOpen: false,
    });
  };

  useEffect(() => {
    setIsBolean((prev) => {
      return {
        ...prev,
        isModalOpen: isModal,
      };
    });
  }, [isModal]);

  return (
    <>
      <Modal open={isBolean.isModalOpen} onClose={handleCloseModal}>
        <Box sx={styleCustomModal} className='relative'>
          <div className='flex justify-end p-3'>
            <IconButton
              onClick={handleCloseModal}
              style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className='overflow-y-scroll variant-scroll w-full h-full p-5'></div>
        </Box>
      </Modal>
    </>
  );
};

export { CustomModal };
