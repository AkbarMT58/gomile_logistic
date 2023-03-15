import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 500,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};
export default function ModalPallet({ open, handleClose, currentData, setCurrentData, generatePallete, updatePallete }) {
  const [ketValue, setKetValue] = useState('')

  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="flex justify-end -mt-5">
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
            {open === "add" ? "Add" : "Edit"} Pallet
          </Typography>

          <form onSubmit={(e) => {
            e.preventDefault()
            if(e.target.keterangan.value !== '') {
              if(open === 'add') {
                generatePallete(e)
              }
              if(open === 'edit') {
                updatePallete(e)
              }
            }
          }}>
            <label>Keterangan</label>
            <div className="text-sm text-center">
                <input type="hidden" name="id" value={currentData?.id} />
                <input
                  type="text"
                  id="keterangan"
                  name="keterangan"
                  className='w-full border border-gray-400 rounded py-1 mb-3 px-1'
                  value={open === 'edit' ? currentData?.keterangan || "" : ketValue}
                  onChange={(e) => open === 'edit' ? setCurrentData(prev => {return {...prev, keterangan: e.target.value}}) : setKetValue(e.target.value)}
                />
              <button
                  type='submit'
                  aria-label="submit"
                  component="span"
                  variant="contained"
                  size="small"
                  className='bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600'>
                  {open === 'edit' ? 'Edit' : 'Buat'}
              </button>
            </div>
          </form>
        </Box>
      </Modal>
  );
}
