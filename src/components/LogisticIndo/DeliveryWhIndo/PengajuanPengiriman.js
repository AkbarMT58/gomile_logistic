import React, { useState } from 'react';
import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FieldData } from 'components/UI/FieldData';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { getDataBarcodeWhIndoOut } from 'service/api';
import swal from 'sweetalert';

const dummy = {
  data: {
    container: 'AA70GZ',
    customer: {
      name: 'Sanny Novianty',
      phone: '081808142034',
      id_city: 155,
      id_customer: 0,
      id_province: 6,
      id_subdistrict: 2128,
      email: 'sanny.nov88@gmail.com',
      province: 'DKI Jakarta',
      city: 'Kota Jakarta Utara',
      subdistrict: 'Tanjung Priok',
      address:
        'Jl Danau Indah 7 blok A7 no 28, sunter, kel sunter jaya, kec tanjung priok',
      level: 'DIAMOND',
      sales: 'novel',
      courier: '',
      service: '',
      zip: '14350',
    },
    id_so: 12744,
    id_karton: '12744-1',
    kota: 'Jakarta utara',
    kurir: '',
    total_karton: 10,
    produk: [
      {
        id_produk: 39837313138874,
        produk:
          'bulu mata padat berjajar bulu mata palsu 0.10 bahan tebal dan panjang tunggal ditanam bulu mata planted',
        variant: '3231-11',
        qty: 500,
        pic: '',
      },
    ],
  },
  status: 200,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: 650,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const PengajuanPengiriman = () => {
  const [data, setData] = useState({});
  const [dataInputs, setDataInputs] = useState({
    NomorBox: null,
  });
  const [isBolean, setIsBolean] = useState({
    isModalInputBox: false,
    isModalInputData: false,
  });

  const handleModalOpen = (name) => {
    if (name === 'isModalInputBox') {
      setData(dummy?.data);
    }

    setIsBolean((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleModalClose = (name) => {
    setIsBolean((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setDataInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitPengajuan = async () => {
    const params = dataInputs?.NomorBox;

    if (params.length < 3) {
      swal('Oops', 'Mohon Periksa Kembali Nomor Box', 'info');
      return;
    }

    handleModalOpen('isModalInputData');
    setData(dummy?.data);

    const response = await getDataBarcodeWhIndoOut(params);
    if (response?.status === 200) {
      handleModalOpen('isModalInputData');
    } else {
      swal('Oops', `${response?.message}`, 'warning');
    }
  };

  return (
    <>
      {/* <button
        onClick={() => handleSubmitPengajuan()}
        className='bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md'>
        Pengajuan Pengiriman
      </button>
      */}

      <Modal
        open={isBolean?.isModalInputBox}
        onClose={() => handleModalClose('isModalInputBox')}>
        <Box
          sx={{ width: '50%', ...style }}
          className='overflow-y-scroll variant-scroll'>
          <div className='flex justify-end -mt-5'>
            <IconButton
              onClick={() => handleModalClose('isModalInputBox')}
              style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className='flex gap-3 items-center mt-5'>
            <input
              name='NomorBox'
              value={dataInputs?.NomorBox}
              onChange={(e) => handleChange(e)}
              className='border-2 rounded-md focus:border-blue-500 w-full outline-none px-2 py-1'
              placeholder='Tuliskan Nomor Box Disini...'
              type='text'
              autoFocus
            />
            <button
              onClick={() => handleSubmitPengajuan()}
              className='bg-blue-500 hover:bg-blue-700 text-white rounded-md whitespace-nowrap px-2 py-1'>
              Submit Nomor Box
            </button>
          </div>
        </Box>
      </Modal>

      <Modal
        open={isBolean?.isModalInputData}
        onClose={() => handleModalClose('isModalInputData')}>
        <Box
          sx={{ width: '80%', ...style }}
          className='overflow-y-scroll variant-scroll'>
          <div className='flex justify-between items-center -mt-5'>
            <div className='text-lg font-semibold text-gray-900'>
              Pengajuan Pengiriman Barang
            </div>
            <IconButton
              onClick={() => handleModalClose('isModalInputData')}
              style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className='w-full mt-7'>
            <div className='mb-2'>
              <FieldData asValue={'ID Order'} value={data?.id_so} />
              <FieldData asValue={'ID Karton'} value={data?.id_karton} />
              <FieldData asValue={'ID Container'} value={data?.container} />
            </div>
            <div className='grid grid-cols-2 gap-5 mb-4'>
              <div className='w-full border-2 rounded-md shadow-xl'>
                <div className='border-b p-2 bg-blue-200 text-lg flex items-center gap-1'>
                  <PersonIcon fontSize='large' className='text-white' />
                  <div>Tentang Penerima</div>
                </div>
                <div className='p-4'>
                  <FieldData asValue={'Nama'} value={data?.customer?.name} />
                  <FieldData asValue={'Email'} value={data?.customer?.email} />
                  <FieldData asValue={'phone'} value={data?.customer?.phone} />
                  <FieldData asValue={'Level'} value={data?.customer?.level} />
                  <FieldData asValue={'sales'} value={data?.customer?.sales} />
                </div>
              </div>

              <div className='w-full border-2 rounded-md shadow-xl'>
                <div className='border-b p-2 bg-blue-200 text-lg flex items-center gap-1'>
                  <LocationOnIcon fontSize='large' className='text-white' />
                  Tentang Alamat Penerima
                </div>
                <div className='p-4'>
                  <FieldData
                    asValue={'Provinsi'}
                    value={data?.customer?.province}
                  />
                  <FieldData asValue={'Kota'} value={data?.customer?.city} />
                  <FieldData
                    asValue={'Kab/Kecam'}
                    value={data?.customer?.subdistrict}
                  />
                  <FieldData
                    asValue={'Alamat'}
                    value={data?.customer?.address}
                  />
                </div>
              </div>
            </div>
            <div className='w-full border-2 rounded-md shadow-xl'>
              <div className='border-b p-2 bg-blue-200 text-lg flex items-center gap-1'>
                <WidgetsIcon fontSize='large' className='text-white' />
                Tentang Produk
              </div>
              <div className=' w-full h-[250px] flex flex-col overflow-y-auto overflow-x-auto'>
                {data?.produk?.map((obj, index) => (
                  <div className='w-full p-3 flex gap-2'>
                    <img
                      className='w- object-contain'
                      src={obj?.pic ? obj?.pic : '/default_image.png'}
                      alt='Produk'
                    />
                    <div>
                      <FieldData asValue={'Produk'} value={obj?.produk} />
                      <FieldData asValue={'Variant'} value={obj?.variant} />
                      <FieldData asValue={'Jumlah'} value={obj?.qty} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default PengajuanPengiriman;
