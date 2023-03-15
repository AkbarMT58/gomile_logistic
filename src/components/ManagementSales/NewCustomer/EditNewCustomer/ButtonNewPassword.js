import React, { useState } from 'react';
import { getGenerateResetPassword } from 'service/api';
import Backdrop from '@mui/material/Backdrop';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const style = {
  fontFamily: 'Poppins',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  overflowY: 'scroll',
  p: 4,
};

const ButtonNewPassword = ({
  dataEditNewCustomer,
  setDataEditNewCustomer,
  email,
}) => {
  const [modal, setModal] = useState(false);
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const handleGeneratePassword = async () => {
    const response = await getGenerateResetPassword(email);
    if (response?.status === 200) {
      setDataEditNewCustomer({
        ...dataEditNewCustomer,
        NewPassword: response?.credential?.password,
      });
    }
  };

  return (
    <>
      <div>
        {!dataEditNewCustomer?.NewPassword ? (
          <button
            onClick={handleGeneratePassword}
            className='rounded-full py-2 px-3 bg-green-500 hover:bg-green-400 text-white'>
            Generate Temporary Password
          </button>
        ) : (
          <button
            onClick={() => setModal(true)}
            className='rounded-full py-2 px-3 bg-green-500 hover:bg-green-400 text-white'>
            View Temporary Password
          </button>
        )}
      </div>

      <Modal
        aria-labelledby='View Temporary Password'
        aria-describedby='View Temporary Password'
        open={modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={modal}>
          <Box sx={style} className='variant-scroll'>
            <div className='flex justify-between items-center -mt-5'>
              <div className='text-start text-lg font-bold text-black uppercase my-2'>
                New Password
              </div>
              <IconButton
                onClick={() => {
                  setModal(false);
                }}
                style={{ textAlign: 'right' }}>
                <HighlightOffIcon color='primary' fontSize='large' />
              </IconButton>
            </div>
            <div className='flex justify-center items-center h-full border border-gray-300 rounded-md'>
              <IconButton
                onClick={() => {
                  setHiddenPassword((prev) => !prev);
                }}>
                {hiddenPassword ? (
                  <VisibilityIcon color='primary' fontSize='large' />
                ) : (
                  <VisibilityOffIcon color='primary' fontSize='large' />
                )}
              </IconButton>
              <div className='text-xl  text-blue-400 min-w-[90px] text-center'>
                {hiddenPassword
                  ? '- - - - - -'
                  : dataEditNewCustomer?.NewPassword}
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(
                      dataEditNewCustomer?.NewPassword
                    );
                  }}>
                  {!hiddenPassword && (
                    <>
                      <ContentCopyIcon color='primary' fontSize='small' />
                    </>
                  )}
                </IconButton>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default ButtonNewPassword;
