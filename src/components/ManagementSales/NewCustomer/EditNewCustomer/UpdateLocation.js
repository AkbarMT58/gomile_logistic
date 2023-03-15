import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from '@mui/material/CircularProgress';
import { updateNewCustomerLocation } from 'service/api';
import swal from 'sweetalert';

const style = {
  fontFamily: 'Poppins',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 650,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  overflowY: 'scroll',
  p: 4,
};

const UpdateLocation = ({
  modal,
  setModal,
  payloadEditAlamat,
  province,
  city,
  subDistric,
  handleChange,
  isLoading,
  setDataUpdate,
}) => {
  const sumbitChangeLocation = async () => {
    const body = JSON.stringify(payloadEditAlamat);
    const response = await updateNewCustomerLocation(body);
    if (response?.status === 200) {
      swal(
        'Success',
        `Success Update Alamat, Email :  ${payloadEditAlamat?.email} `,
        'success'
      );
      setModal({ ...modal, editAlamat: false });
      setDataUpdate((prev) => !prev);
    } else {
      swal(
        'Failed',
        `Failed Update Alamat,Failed Message ${response?.message} `,
        'warning'
      );
    }
  };

  return (
    <Modal
      aria-labelledby='Daftar Alamat'
      aria-describedby='Daftar Alamat'
      open={modal?.editAlamat}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Fade in={modal?.editAlamat}>
        <Box sx={style} className='variant-scroll'>
          <div className='flex justify-between items-center -mt-5'>
            <div className='text-start text-lg font-bold text-black uppercase my-2'>
              Daftar Alamat
            </div>
            <IconButton
              onClick={() => {
                setModal({ ...modal, editAlamat: false });
              }}
              style={{ textAlign: 'right' }}>
              <HighlightOffIcon color='primary' fontSize='large' />
            </IconButton>
          </div>

          {isLoading ? (
            <div className='flex gap-2 justify-center items-center w-full h-full'>
              <CircularProgress />
              Loading Get address available
            </div>
          ) : (
            <div className='flex flex-col gap-2 w-full px-5'>
              <label className='text-black text-lg'>Provinsi</label>
              <select
                name='id_province'
                className='w-full p-2 border border-gray-300 rounded-md'
                value={payloadEditAlamat?.id_provinsi}
                onChange={handleChange}>
                <option value={payloadEditAlamat?.id_provinsi} disabled>
                  {payloadEditAlamat?.provinsi}
                </option>
                {province?.map((data) => (
                  <option
                    key={data.province_id}
                    value={`{"id" : "${data?.province_id}", "name" : "${data.province}"}`}>
                    {data.province}
                  </option>
                ))}
              </select>

              <label className='text-black text-lg'>Kota / Kabupaten</label>
              <select
                name='id_city'
                className='w-full p-2 border border-gray-300 rounded-md'
                value={payloadEditAlamat?.id_provinsi}
                onChange={handleChange}>
                <option value={payloadEditAlamat?.id_provinsi} disabled>
                  {payloadEditAlamat?.kabupaten}
                </option>
                {city?.map((data) => (
                  <option
                    key={data.id_city}
                    value={`{"id" : "${data?.id_city}", "name" : "${data.name}"}`}>
                    {data.name}
                  </option>
                ))}
              </select>

              <label className='text-black text-lg'>Kecamatan</label>
              <select
                name='subdistrict_id'
                className='w-full p-2 border border-gray-300 rounded-md'
                value={payloadEditAlamat?.id_kecamatan}
                onChange={handleChange}>
                <option value={payloadEditAlamat?.id_kecamatan} disabled>
                  {payloadEditAlamat?.kecamatan}
                </option>
                {subDistric?.map((data) => (
                  <option
                    key={data.subdistrict_id}
                    value={`{"id" : "${data?.subdistrict_id}", "name" : "${data.subdistrict_name}"}`}>
                    {data.subdistrict_name}
                  </option>
                ))}
              </select>

              <label className='text-black text-lg'>Kode Pos</label>
              <input
                name='kode_pos'
                type='number'
                className='w-full p-2 border border-gray-300 rounded-md focus:outline-blue'
                value={payloadEditAlamat?.kode_pos}
                onChange={handleChange}
              />

              <label className='text-black text-lg'>Alamat Lengkap</label>
              <textarea
                name='alamatLengkap'
                type='text'
                className='w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-blue'
                value={payloadEditAlamat?.alamat}
                onChange={handleChange}
              />

              <div className='flex justify-center mt-5'>
                <button
                  onClick={sumbitChangeLocation}
                  className='text-white bg-blue-400 hover:bg-blue-500 py-2 px-5 rounded-xl'>
                  Update Alamat
                </button>
              </div>
            </div>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateLocation;
