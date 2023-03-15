import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import {
  insert_material,
} from 'service/api';
import swal from 'sweetalert';

const styleModalSelectCategory = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  minWidth:900
};

function ModalAddMaterial({ setAllMaterials }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [inputs, setInputs] = useState({
        display_name : "",
        subcategory_material_ids : "",
    })

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setInputs({...inputs,[name] : value})
    }


    const handleSubmit = async () => {
        const arrMaterialIds = inputs.subcategory_material_ids.split(",")
        for (let i = 0; i < arrMaterialIds.length; i++) {
            arrMaterialIds[i] = parseInt(arrMaterialIds[i])
            if (isNaN(arrMaterialIds[i])) {
                swal('Oops!', 'material index must be numbers', 'error');
                return;
            }
        }

        const payload = {
            display_name: inputs.display_name,
            subcategory_material_ids: arrMaterialIds
        }
        const response = await insert_material(JSON.stringify(payload));
        if (response.status === 200) {
            setAllMaterials(response.data)
            swal('Submitted', 'Successfully insert material', 'success');
            handleClose()
        }
    }
    return (
      <div>
        <div
          onClick={handleOpen}
          className='bg-blue-600 rounded-lg text-white font-semibold px-3 py-1 w-fit ml-auto mb-3 cursor-pointer'  
        >
          <span className=''>Add Materials</span>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={styleModalSelectCategory} className="rounded">
            <div className='w-full h-full relative'>
              <IconButton
                onClick={handleClose}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  color: 'red',
                }}>
                <CloseIcon />
              </IconButton>
              <div>
                <h1 className='text-xl py-4 px-6'>Add Material</h1>
                <div className="px-4">
                    <div className="mb-6">
                        <label htmlFor="display_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Display Name</label>
                        <input type="text" 
                            id="display_name" 
                            name="display_name" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            onChange={handleChangeInput}
                            required/>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="subcategory_material_ids" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subcategory Material Indexes</label>
                        <input type="text" 
                            id="subcategory_material_ids" 
                            name="subcategory_material_ids" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            onChange={handleChangeInput}
                            required/>
                    </div>
                </div>
                  
                <div className='p-4 flex justify-between items-center'>
                  <div>
                    <button className='border rounded px-3 py-1 font-medium text-lg' onClick={handleClose}>Cancel</button>
                    <button className='border rounded bg-blue-600 ml-2 text-white font-medium px-3 py-1 text-lg' onClick={handleSubmit}>Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

export default ModalAddMaterial