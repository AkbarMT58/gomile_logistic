import { useEffect,  useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    insert_category_oci_logistic,
    update_category_oci_logistic,
    delete_category_oci_logistic
} from 'service/api';
import swal from 'sweetalert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FormatRupiah from 'helpers/FormatRupiah';

export default function MaterialForm({ categoryOciLogistic, _getCategoryOciLogisticsData }) {
    const [selectedData, setSelectedData] = useState(null)
    const handleCloseModal = () => {
        setSelectedData(null)
    }

    const handleDelete = async (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                await delete_category_oci_logistic(id)
                swal("the data has been deleted!", {
                    icon: "success",
                });
                _getCategoryOciLogisticsData()
            } 
        });
    }
    return (
        <div>
            <div className='flex justify-between items-center mt-5 mb-4'>
                <h1 className="text-xl font-bold ">Category Logistics</h1>
                <div>
                    <button onClick={e => setSelectedData({})} className="px-4 py-2 bg-orange-500 hover:bg-orange-400 rounded-md text-black">Create New Category</button>
                </div>
            </div>

            <div className="category-wrapper bg-white rounded-lg p-2 drop-shadow-md">

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Kategori Barang</th>
                                <th scope="col" className="px-6 py-3">Harga Kirim Laut</th>
                                <th scope="col" className="px-6 py-3">Harga Kirim Udara</th>
                                <th scope="col" className="px-6 py-3">Detail Barang</th>
                                <th scope="col" className="px-6 py-3 w-40"></th></tr>
                        </thead>
                        <tbody>
                            {categoryOciLogistic && categoryOciLogistic.map((item, idx) => {
                                return <ItemRow key={idx} idx={idx} item={item} setSelectedData={setSelectedData} handleDelete={handleDelete}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalCategoryOciLogistic data={selectedData} handleClose={handleCloseModal} _getCategoryOciLogisticsData={_getCategoryOciLogisticsData}/>
        </div>
    );
}



const ItemRow = ({ idx, item, setSelectedData, handleDelete }) => {
    return (
        <tr key={item.id} className="bg-white dark:bg-gray-800">
            <td scope="row" className="px-6 py-4">{item.kategori_barang}</td>
            <td scope="row" className="px-6 py-4">{FormatRupiah(item.harga_kirim_laut)}</td>
            <td scope="row" className="px-6 py-4">{FormatRupiah(item.harga_kirim_udara)}</td>
            <td scope="row" className="px-6 py-4">{item.detail_barang}</td>
            <td className="px-6 py-4">
                <>
                    <button onClick={e => setSelectedData(item)} className="px-2 hover:text-orange-500">
                        <EditTwoToneIcon className=''/>
                    </button>
                    <button onClick={e => handleDelete(item.id)} className="px-2 text-red-500 hover:text-red-600">
                        <DeleteIcon className=''/>
                    </button>
                </>
            </td>
        </tr>
    )
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth : "500px",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius : 2,
};

const ModalCategoryOciLogistic = ({data, _getCategoryOciLogisticsData, handleClose}) => {
    const [inputs, setInputs] = useState({
        kategori_barang:"",
        harga_kirim:"",
        detail_barang:"",
    })

    useEffect(() => {
      if (data) {
        setInputs({
            kategori_barang:data?.kategori_barang,
            harga_kirim_laut:data?.harga_kirim_laut,
            harga_kirim_udara:data?.harga_kirim_udara,
            detail_barang:data?.detail_barang,
        })
      }
    }, [data])
    
    const handleSubmit = async () => {
        console.log({inputs})
        if (!inputs.kategori_barang || inputs.kategori_barang === ""){
            swal('Oops', 'Please input "Kategory Barang" before submit !', 'error');
            return
        }
        if (!inputs.harga_kirim_laut || inputs.harga_kirim_laut === ""){
            swal('Oops', 'Please input "Harga Kirim" before submit !', 'error');
            return
        }
        if (!inputs.harga_kirim_udara || inputs.harga_kirim_udara === ""){
            swal('Oops', 'Please input "Harga Kirim" before submit !', 'error');
            return
        }
        if (!inputs.detail_barang || inputs.detail_barang === ""){
            swal('Oops', 'Please input "Detail Barang" before submit !', 'error');
            return
        }

        const payload = JSON.stringify({
            id : data.id,
            kategori_barang:inputs.kategori_barang,
            harga_kirim_laut:Number(inputs.harga_kirim_laut),
            harga_kirim_udara:Number(inputs.harga_kirim_udara),
            detail_barang:inputs.detail_barang,
        })

        let req 
        if (data.id == null) {
            req = await insert_category_oci_logistic(payload);
        } else {
            req = await update_category_oci_logistic(payload);
        }

        if (req?.status === 200) {
            swal('Submitted', 'Request submit succesfully', 'success');
            setInputs({
                kategori_barang:"",
                 harga_kirim:"",
                detail_barang:"",
            })
            handleClose()
            _getCategoryOciLogisticsData()
        } else {
            swal('Oops', 'Bad Request!', 'error');
        }

    }

    const handleChangeInput = (e) => { setInputs({...inputs,[e.target.name] : e.target.value}) }
    return (
        <Modal
            open={!!data}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <div className="mb-4">
                    <label 
                        htmlFor="kategori_barang" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Kategori Barang
                    </label>
                    <input 
                        id="kategori_barang" 
                        value={inputs.kategori_barang} 
                        onChange={handleChangeInput} 
                        type="text" 
                        name="kategori_barang" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" 
                        placeholder="Kategori Barang" 
                        required/>
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="harga_kirim_laut" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Harga Kirim Laut
                    </label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            Rp
                        </span>
                        <input 
                            id="harga_kirim_laut" 
                            value={inputs.harga_kirim_laut} 
                            onChange={handleChangeInput} 
                            type="number" 
                            name="harga_kirim_laut" 
                            className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Harga Kirim" 
                            required/>
                    </div>
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="harga_kirim_udara" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Harga Kirim Udara
                    </label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            Rp
                        </span>
                        <input 
                            id="harga_kirim_udara" 
                            value={inputs.harga_kirim_udara} 
                            onChange={handleChangeInput} 
                            type="number" 
                            name="harga_kirim_udara" 
                            className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Harga Kirim" 
                            required/>
                    </div>
                </div>
                <div className="mb-4">
                    <label 
                        htmlFor="detail_barang" 
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Detail Barang
                    </label>
                    <input 
                        id="detail_barang" 
                        value={inputs.detail_barang} 
                        onChange={handleChangeInput} 
                        type="text" 
                        name="detail_barang" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" 
                        placeholder="Detail Barang" 
                        required/>
                </div>
                <div className='flex justify-end'>
                    <button onClick={handleClose} className="px-8 py-2 shadow hover:bg-gray-100 rounded-md mr-2 border">Cancel</button>
                    <button onClick={handleSubmit} className="px-8 py-2 bg-orange-500 hover:bg-orange-400 rounded-md shadow-md">Submit</button>
                </div>
            </Box>
        </Modal>
    )
}