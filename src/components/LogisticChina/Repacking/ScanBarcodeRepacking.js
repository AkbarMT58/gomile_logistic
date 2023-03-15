import React, { useState, useEffect } from 'react'
import RepackingInput from './RepackingInput'
import { getRepackingData } from 'service/api';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import { useRef } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius : 2,
    p: 4,
  };

function ScanBarcodeRepacking() {
    const tracking_noRef = useRef(null)
    const [dataOrder, setDataOrder] = useState(null)
    const [tracking_no, setTracking_no] = useState("")
    const [update, setUpdate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isModal, setIsModal] = useState({
      modalScan_trackingno: false,
    });
    const [openModalDetail, setOpenModalDetail] = useState(false);
    const handleModalOpen = (e) => {
      const { name } = e.currentTarget;
      const key = name;
  
      setIsModal({
        ...isModal,
        [key]: true,
      });
    };
    
    const handleModalClose = (e) => {
        const { name } = e.currentTarget;
        const key = name;

        if (name === 'modalScan_trackingno') {
            setTracking_no("")
        }
        setDataOrder(null)
        setIsModal({
        ...isModal,
        [key]: false,
        });
    };
    const handleSubmitScanBarcode = async (e) => {
        e.preventDefault()
        fetchOrderData(tracking_no)
    }
    const fetchOrderData = async (id) => {
        setIsLoading(true)
        const params = new URLSearchParams({ id }).toString();
        const response = await getRepackingData(params);
    
        if (response?.status === 200) {
            if (response.data.totalData > 0) {
                const customer = response.data.data.customer.collection[0];
                const order = response.data.data.orders.collection[0];
                const idOrder = response.data.data.idOrders.collection[0];
                const finance = response.data.data.finance.collection[0];
                setDataOrder({ customer, order, idOrder, finance });
                setOpenModalDetail(true)
            }
            else {
                swal('Oops',`The data you are looking for was not found`,'warning')
                setOpenModalDetail(false)
            }
        } else {
            swal('Oops',`The data you are looking for was not found`,'warning')
            setOpenModalDetail(false)
        }
        setIsLoading(false)
    };
    
    useEffect(() => {
        if (!openModalDetail) {
            setDataOrder(null)
            setTracking_no("")
        }
        if(tracking_noRef.current){
            tracking_noRef.current.focus()
        }
    }, [openModalDetail])

    useEffect(() => {
        if (isModal.modalScan_trackingno) {
            setTimeout(()=> {
                document.getElementById("inptTrackingNo").focus()
            },100)
        }
    
    }, [isModal.modalScan_trackingno])
    
    
    return (
        <div>
            <button 
                name='modalScan_trackingno'
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-600 text-white "
                onClick={(e) => handleModalOpen(e)}
            >Scan Barcode</button>
            
            <Modal
                name='modalScan_trackingno'
                open={isModal?.modalScan_trackingno}
                onClose={(e) => handleModalClose(e)}>
                <Box sx={style}>
                <div className='flex justify-end -mt-5'>
                    <IconButton
                    name='modalScan_trackingno'
                    onClick={(e) => handleModalClose(e)}
                    style={{ textAlign: 'right' }}>
                    <CloseIcon className='hover:text-red-600' />
                    </IconButton>
                </div>

                <div className='text-gray-800 font-semibold mb-2'>ID Order or Tracking Number</div>
                <form onSubmit={(e) => !isLoading && handleSubmitScanBarcode(e)}>
                    <input 
                        id='inptTrackingNo'
                        ref={tracking_noRef}
                        type="text" 
                        name='tracking_no' 
                        value={tracking_no} 
                        className='border-2 rounded-sm w-full p-2 hover:outline-blue focus:outline-blue text-gray-800'
                        onChange={e => setTracking_no(e.target.value)}
                        placeholder='ID Order or Tracking Number'
                    />
                    <div className='flex justify-end mt-5'>
                    <button
                        name='modal_cartonDetails'
                        disabled={tracking_no === '' || isLoading}
                        type='submit'
                        className='p-2 px-4 rounded-md cursor-pointer text-white
                    bg-blue-500 text-center hover:bg-blue-600'>
                        {isLoading ? "Loading..." : "Submit"}
                    </button>
                    </div>
                </form>
                </Box>
            </Modal>
            {dataOrder && (<RepackingInput
                openTriggerFromScanBarcode={openModalDetail}
                setOpenTriggerFromScanBarcode={setOpenModalDetail}
                RowCategory={dataOrder?.order?.[0].category}
                id_so={dataOrder.idOrder.id_so}
                id_po={dataOrder.idOrder.id_po}
                products={dataOrder.order}
                setUpdate={setUpdate}
                totalQty={dataOrder.idOrder.totalQty}
                totalBox={dataOrder.idOrder.totalBox}
            /> )}
        </div>
    )
}

export default ScanBarcodeRepacking