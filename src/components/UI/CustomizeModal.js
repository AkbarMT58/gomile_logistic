import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import swal from 'sweetalert';
import { Fade } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
};
export default function CustomizeModal({
  setOpenModal,
  content,
  actions,
  setUpdate,
  openModal,
}) {
  const handleClose = () => setOpenModal(false);

  const handleActions = async () => {
    const res = await actions();
    if (res === 200) {
      swal('Success', content.swal, 'success');
      handleClose();
      setUpdate((prev) => !prev);
    }
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Fade in={openModal}>
          <Box sx={style}>
            <div className="bg-blue-400 rounded-t-xl p-2 flex justify-center">
              <img src="/warning.png" alt="" className="w-24 h-24" />
            </div>
            <div className="flex flex-col items-center p-5 space-y-5">
              <p className=" text-center font-semibold text-md text-gray-600">
                {content.title}
              </p>
              <div className="flex items-center space-x-8">
                <button
                  onClick={handleClose}
                  className="hover:outline-blue-400 font-semibold p-1 px-3 rounded-md w-24 text-gray-600">
                  Cancel
                </button>
                <button
                  onClick={handleActions}
                  className="bg-blue-400 text-white font-semibold p-1 px-3 rounded-md w-24">
                  Yes
                </button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
