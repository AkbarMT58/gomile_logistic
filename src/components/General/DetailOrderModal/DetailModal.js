import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DetailOrderHeader from './DetailOrderHeader';
import TabMenu from './TabMenu';
import { getDetailOrderData } from 'service/api';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  overflowY: 'scroll',
  p: 4,
};

export default function DetailModal({ id, id_group }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [detailOrder, setDetailOrder] = useState({});
  const [isLoading, setLoading] = useState();
  const renderLoading = isLoading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        padding: '10px',
        borderRadius: 2,
        backgroundColor: 'white',
        marginBottom: 1,
        height: '100%',
      }}>
      <div className="flex items-center justify-center w-full h-full p-4 rounded-md">
        <CircularProgress />
      </div>
    </Box>
  ) : null;

  const getDetailOrder = async (id) => {
    setLoading(true);
    const data = await getDetailOrderData(id);
    if (data?.status === 200) {
      setDetailOrder(data.data);
    } else {
      handleClose();
      swal('Oops', data?.message, 'error');
    }
    setLoading(false);
  };

  return (
    <>
      <div
        className="w-40 text-xl font-bold cursor-pointer hover:text-blue-400"
        onClick={() => {
          handleOpen();
          getDetailOrder(id);
        }}>
        {id}
        <br />
        {id_group !== undefined && `ID Group : ${id_group}`}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style} className="variant-scroll">
            {isLoading ? (
              renderLoading
            ) : (
              <>
                <div className="flex justify-end -mt-5">
                  <IconButton
                    onClick={handleClose}
                    style={{ textAlign: 'right' }}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div className="flex flex-col space-y-3">
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2">
                    Order Detail
                  </Typography>
                </div>
                <DetailOrderHeader
                  id_group={id_group}
                  detailOrder={detailOrder}
                />
                <TabMenu
                  detailOrder={detailOrder}
                  idSo={id}
                  id_group={id_group}
                  closeOrderDetail={handleClose}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
