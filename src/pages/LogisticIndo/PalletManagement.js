import React, { useEffect, useState } from 'react';
import {
  getDataPallet,
  getDetailPallet,
  createPallet,
  editPallet,
  removePallet,
} from 'service/api';
import Layout from 'components/Layout';
import swal from 'sweetalert';
import { SubRoutesLogisticIndo as SUBROUTES } from 'components/LogisticIndo/SubRoutesLogisticIndo';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import ModalAddPallet from 'components/LogisticIndo/PalletManagement/ModalAddPallet';
import ModalDetailPallet from 'components/LogisticIndo/PalletManagement/ModalDetailPallet';
import ModalPrintBarcode from 'components/LogisticIndo/PalletManagement/ModalPrintBarcode';

const PalletManagement = () => {
    const [showModalPallet, setShowModalPallet] = useState(false)
    const [showDetailPallet, setShowDetailPallet] = useState(false)
    const [showModalBarcode, setShowModalBarcode] = useState(false)
    const [palletList, setPalletList] = useState([])
    const [currentData, setCurrentData] = useState(null)
    const [detailPallet, setDetailPallet] = useState(null)

    useEffect(() => {
        get_DataPallete()
    }, [])

    const edit_Pallete = (e, data) => {
        setShowModalPallet('edit')
        setCurrentData(data)
    }

    const show_Barcode = (e, data) => {
        setShowModalBarcode(true)
        setCurrentData(data)
    }

    const set_ShowDetailPallet = (e, data) => {
        setShowDetailPallet(true)
        setCurrentData(data)
        get_DetailPallete(data.id)
    }

    const get_DataPallete = async () => {
        const response = await getDataPallet();
        if (response?.status === 200) {
            setPalletList(response.data)
        }
    }

    const get_DetailPallete = async (id) => {
        const response = await getDetailPallet(id);
        if (response?.status === 200) {
            setDetailPallet(response.data)
        } else{
            setDetailPallet(null)
        }
    }
    
    const generatePallete = async (data) => {
        const payload = {
            keterangan: data.target.keterangan.value
        }
        const response = await createPallet(JSON.stringify(payload));
        if(response.status === 200) {
            setShowModalPallet(false)
            setCurrentData(null)
            await get_DataPallete()
        }
    }
    
    const updatePallete = async (data) => {
        const payload = {
            id: parseInt(data.target.id.value),
            keterangan: data.target.keterangan.value
        }
        const response = await editPallet(JSON.stringify(payload));
        if(response.status === 201) {
            setShowModalPallet(false)
            setCurrentData(null)
            await get_DataPallete()
        }
    }
    
    const deletePallete = (e, id) => {
        e.stopPropagation()
        swal({
          title: `Are you sure want to delete pallete id=${id}?`,
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((yes) => {
          if (yes) {
            removePalleteConfirmed(id)
          }
        });
    }

    const removePalleteConfirmed = async (id) => {
        const response = await removePallet(id);
        if(response.status === 200) {
            setShowModalPallet(false)
            setCurrentData(null)
            get_DataPallete()
        }
    }
    
  return (
    <Layout routes={SUBROUTES()} title="Logistic Indo">
      <div className="flex justify-start">
        <p className="my-4 bg-white  p-2 rounded-md cursor-pointer text-center">
          Pallet Management
        </p>
      </div>
      
      <div className="w-full bg-white p-2 rounded-t-md border-b-2 border-gray-700 flex gap-5">
        <div className="title-bar w-full flex justify-between items-center px-5 py-2">
            <div className="text-lg font-semibold">Data Pallet</div>
            <div className="add-pallet-btn flex items-center space-x-1 text-yellow-500 cursor-pointer hover:text-yellow-600" onClick={() => {
                setCurrentData(null)
                setShowModalPallet('add')
                }}>
                <span className='font-semibold'>Tambah Pallet</span>
                <AddCircleRoundedIcon fontSize='small' />
            </div>
        </div>
      </div>
      <div className="w-full mb-5 bg-white p-2 rounded-b-md">
        <div className="px-5 py-2">
            <div className="list-pallet grid grid-cols-3 gap-4">
                {palletList?.map((pallet, index) => (
                    <div key={index} className="pallet-card flex justify-between rounded bg-gray-100 p-3 shadow-md">
                        <div className="w-full space-y-2">
                            <div className="flex items-center space-x-2 cursor-pointer" onClick={(e) => set_ShowDetailPallet(e, pallet)}>
                                <div className="flex items-center space-x-2">
                                    <img src="/pallet.svg" alt="pallet icon" width={20} />
                                    <div className='font-semibold'>ID Palet :</div>
                                </div>
                                <div className="pallet-id font-bold">{pallet.id}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-2">
                                    <img src="/box-pallet.svg" alt="box pallet icon" width={20} />
                                    <div className=''>Isi Box :</div>
                                </div>
                                <div className="box-count">{pallet.kuantiti}</div>
                            </div>
                            <div className="keterangan line-clamp-2 text-sm" title=''>
                                {pallet.keterangan}
                            </div>
                        </div>
                        <div className="w-[11.5rem] shrink-0 flex flex-col items-end space-y-2">
                            <div className="edit-pallet-btn text-green-600 hover:text-green-700 cursor-pointer" onClick={(e) => edit_Pallete(e, pallet)}>Ubah Data</div>

                            {pallet.kuantiti !== 0 &&
                                <div className="barcode-btn w-full text-center bg-blue-300 hover:bg-blue-400 text-white rounded-lg px-2 py-1 cursor-pointer" onClick={(e) => show_Barcode(e, pallet)}>Barcode</div>
                            }
                            {pallet.kuantiti === 0 &&
                                <div className="delete-btn" onClick={(e) => deletePallete(e, pallet.id)}>
                                    <img src="/delete.svg" alt="delete pallet" className='hover:scale-110 cursor-pointer' />
                                </div>
                            }
                            <div className="update-date text-xs text-gray-400 text-right">Tgl Update: {pallet.updated ? pallet.updated?.split(' ')[0] : pallet.tanggal?.split(' ')[0]}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
      {showModalPallet && 
        <ModalAddPallet 
        open={showModalPallet} 
        handleClose={() => setShowModalPallet(false)} 
        currentData={currentData} 
        setCurrentData={setCurrentData} 
        generatePallete={generatePallete} 
        updatePallete={updatePallete}
        />
      }

      {showDetailPallet && 
        <ModalDetailPallet 
        open={showDetailPallet} 
        handleClose={() => {
            setDetailPallet(null)
            setCurrentData(null)
            setShowDetailPallet(false)
        }} 
        data={currentData} 
        details={detailPallet} 
        />
      }

      {showModalBarcode && 
        <ModalPrintBarcode 
        open={showModalBarcode}
        handleClose={() => {
            setCurrentData(null)
            setShowModalBarcode(false)
        }} 
        currentData={currentData} 
        setCurrentData={setCurrentData}
        />
      }
    </Layout>
  );
};

export default PalletManagement;
