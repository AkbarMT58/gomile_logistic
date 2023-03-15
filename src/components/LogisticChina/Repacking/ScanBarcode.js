import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModalDetailsCarton from './ModalDetailsCarton';
import { checkContainerId } from 'service/api';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ScanBarcode = () => {
  const [datas, setdatas] = useState({
    dataToTable: [],
  });
  const [isModal, setIsModal] = useState({
    modalScan_carton: false,
    modal_cartonDetails: false,
  });
  const [inputs, setInputs] = useState({
    scanBarcode_container: '',
    input_cartonId: '',
  });
  const [isLoading, setIsLoading] = useState(false)

  const handleModalOpen = (e) => {
    const { name } = e.currentTarget;
    const key = name;

    setIsModal({
      ...isModal,
      [key]: true,
    });
  };

  const handleModalScanbarcode = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    
    const params = inputs?.scanBarcode_container;
    
    const response = await checkContainerId(params);
    if(response?.status === 200) {
      if(response.data.data.length === 0) {
        setdatas(prev => {return {...prev, dataToTable: []}})
        setIsModal({
          ...isModal,
          modal_cartonDetails: true,
        });
      } else {
        if(response.data.data[0].status === '' || 
            response.data.data[0].status === 'repacking' || 
            response.data.data[0].status === 'Shipping to Indonesia') {
          setdatas(prev => {return {...prev, dataToTable: response.data.data[0].detail}})
          setIsModal({
            ...isModal,
            modal_cartonDetails: true,
          });
        } else {
          swal(
            'Oops',
            `Currently container ID ${inputs?.scanBarcode_container} is being sent to IND!`,
            'warning'
          ).then(() => {
            setInputs({
              ...inputs,
              scanBarcode_container: '',
            });
            return;
          })
        }
      }
      
      setInputs({
        ...inputs,
        // scanBarcode_container: '',
        input_cartonId: '',
      });
    }
    setIsLoading(false)
    
  };

  const handleModalClose = (e) => {
    const { name } = e.currentTarget;
    const key = name;

    if (name === 'modalScan_carton') {
      setInputs({
        ...inputs,
        scanBarcode_container: '',
        input_cartonId: '',
      });
    }

    setIsModal({
      ...isModal,
      [key]: false,
    });
  };

  const handleInputs = (e) => {
    let { name, value } = e.currentTarget;
    let key = name;

    if (name === 'scanBarcode_container') {
      let tempValue = value.replace(/\s/g, '').toUpperCase();
      value = tempValue;
    }

    setInputs({
      ...inputs,
      [key]: value,
    });
  };

  return (
    <div>
      <button
        name='modalScan_carton'
        className='p-2 rounded-md cursor-pointer text-white bg-blue-500 text-center mb-2'
        onClick={(e) => handleModalOpen(e)}>
        Scan Barcode
      </button>

      <Modal
        name='modalScan_carton'
        open={isModal?.modalScan_carton}
        onClose={(e) => handleModalClose(e)}>
        <Box sx={style}>
          <div className='flex justify-end -mt-5'>
            <IconButton
              name='modalScan_carton'
              onClick={(e) => handleModalClose(e)}
              style={{ textAlign: 'right' }}>
              <CloseIcon className='hover:text-red-600' />
            </IconButton>
          </div>

          <div className='text-gray-800 font-semibold'>Container ID</div>
          <form onSubmit={(e) => !isLoading && handleModalScanbarcode(e)}>
            <input
              type='text'
              name='scanBarcode_container'
              value={inputs?.scanBarcode_container}
              onChange={(e) => handleInputs(e)}
              className='border-2 rounded-sm w-full p-px px-1 hover:outline-blue focus:outline-blue text-gray-800'
              placeholder='Input Container ID'
            />
            <div className='flex justify-end mt-5'>
              <button
                name='modal_cartonDetails'
                disabled={inputs?.scanBarcode_container === '' || isLoading}
                type='submit'
                className='p-1 px-3 rounded-md cursor-pointer text-white
              bg-blue-500 text-center hover:bg-blue-600'>
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      <ModalDetailsCarton
        datas={datas?.dataToTable}
        inputs={inputs}
        isModal={isModal}
        setdatas={setdatas}
        setInputs={setInputs}
        setIsModal={setIsModal}
        handleInputs={handleInputs}
        handleModalClose={handleModalClose}
      />
    </div>
  );
};

export default ScanBarcode;
