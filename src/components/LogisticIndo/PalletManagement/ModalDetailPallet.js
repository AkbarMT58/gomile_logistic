import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import swal from 'sweetalert';
import { styled } from '@mui/material/styles';
import { Button, IconButton, Tooltip, Collapse, } from '@mui/material';
import CameraAlt from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  maxWidth: '90%',
  maxHeight: "95%",
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};
export default function ModalDetailPallet({ open, handleClose, data, details }) {
    const [openDetailPO, setOpenDetailPO] = useState(false)

    const set_OpenDetailPO = (value) => {
        if(!openDetailPO || openDetailPO !== value) {
            setOpenDetailPO(value)
        } else {
            setOpenDetailPO(false)
        }
    }
    
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
            
            <div className="w-full flex justify-between items-center py-2 border-b">
                <div className="font-bold">ID Palet: {data.id}</div>
                <div className="font-bold">Carton: {data.kuantiti}</div>
            </div>

            {details?.map((pallet, index) => (
                <>
                <div className="w-full flex justify-between items-center py-2 border-b">
                    <div>
                        <div className="flex items-center font-bold">
                            <div className="w-[8rem]">ID Carton</div>
                            <div className="">{pallet.id_carton}</div>
                        </div>
                        <div className="flex items-center text-sm">
                            <div className="w-[8rem]">ID SO</div>
                            <div className="">{pallet.id_so}</div>
                        </div>
                        <div className="flex items-center text-sm">
                            <div className="w-[8rem]">Tanggal</div>
                            <div className="">{pallet.updatedDate}</div>
                        </div>
                    </div>
                    <div className="text-yellow-500 hover:text-yellow-600 cursor-pointer" onClick={() => set_OpenDetailPO(pallet)}>
                        {openDetailPO === pallet ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} Produk Detail
                    </div>
                </div>
                <Collapse in={openDetailPO === pallet} timeout="auto" unmountOnExit>
                    {pallet.product?.map((product, index) => (
                        <div key={product.id_product} className='bg-gray-100 text-gray-600 space-y-2 p-2 border-b-2'>
                            <div>
                                <div className="flex items-center font-bold">
                                    <div className="w-[8rem]">ID PO</div>
                                    <div className="">{product.id_po}</div>
                                </div>
                                <div className="flex items-center text-sm">
                                    <div className="w-[8rem]">ID Product</div>
                                    <div className="">{product.id_product}</div>
                                </div>
                            </div>
                            <div className='flex items-stretch gap-2'>
                                <img src={product.image || "/default_image.png"} alt={product.name} className='w-[80px] h-[80px] flex-shrink-0 object-center object-cover rounded-md overflow-hidden shadow' />
                                <div className='w-full'>
                                    <div className="font-bold line-clamp-2 leading-4" title={product.name}>{product.name}</div>
                                    <div className=""><span className='font-semibold'>Total Qty</span> : {product.qty}</div>
                                    <div className=""><span className='font-semibold'>Variant</span> : {product.variant}</div>
                                    {/* <div className="date text-right text-xs">{pallet.updatedDate}</div> */}
                                </div>
                            </div>

                            {/* <div className="variants px-5 max-h-52 overflow-auto">
                                <table className=''>
                                    <thead>
                                        <tr className='text-lg font-semibold'>
                                            <td className='w-full'>Variant</td>
                                            <td className='text-center'>
                                                <div className='w-20'>Qty</div>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {[1,2,3,4,5].map((variant, index) => (
                                            <tr key={index} className='font-semibold'>
                                                <td className='w-full py-1'>
                                                    <div className='flex items-center gap-2 text-sm'>
                                                        <img src="/default_image.png" alt="" className='w-[50px] h-[50px] flex-shrink-0 object-center object-cover rounded-md overflow-hidden ' />
                                                        <div className='w-full pr-2 line-clamp-1'>
                                                            168 Topi Tekanan Tinggi GX160/1
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='text-center'>
                                                    <div className='w-20'>20</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> */}
                        </div>
                    ))}
                </Collapse>
                </>
            ))}
        </Box>
    </Modal>
  );
}
