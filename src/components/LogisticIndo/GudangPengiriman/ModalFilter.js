import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';

const ModalFilter = ({
  inputs,
  handleClose,
  handleChange,
  handleSubmitFilter,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal
      open={inputs?.isModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style} className="overflow-y-scroll variant-scroll">
        <div className="flex justify-end -mt-5">
          <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-lg font-semibold">Wilayah :</div>
            <input
              name="wilayah"
              value={inputs?.wilayah}
              onChange={(e) => handleChange(e)}
              className="border-2 drop-shadow-lg rounded-md px-2 w-full focus:outline-none  py-1 text-lg"
              type="text"
              placeholder="Masukan Wilayah"
            />
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold">Kurir :</div>
            <input
              name="kurir"
              value={inputs?.kurir}
              onChange={(e) => handleChange(e)}
              className="border-2 drop-shadow-lg rounded-md px-2 w-full focus:outline-none  py-1 text-lg"
              type="text"
              placeholder="Masukan Kurir"
            />
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold">No Container :</div>
            <input
              name="container"
              value={inputs?.container}
              onChange={(e) => handleChange(e)}
              className="border-2 drop-shadow-lg rounded-md px-2 w-full focus:outline-none  py-1 text-lg"
              type="text"
              placeholder="Masukan Container"
            />
          </div>
          <div className="space-y-2">
            <div className="text-lg font-semibold">Tanggal :</div>
            <input
              type="text"
              name="tanggal"
              value={inputs?.tanggal}
              onChange={(e) => handleChange(e)}
              className="border-2 drop-shadow-lg rounded-md px-2 focus:outline-none py-1 text-lg"
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
              placeholder="Masukan Tanggal"
            />
          </div>
          <div className="flex justify-end items-center">
            <button
              onClick={handleSubmitFilter}
              className="text-white bg-blue-400 text-lg px-5 py-2 rounded-md hover:bg-blue-500">
              Submit
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default React.memo(ModalFilter);
