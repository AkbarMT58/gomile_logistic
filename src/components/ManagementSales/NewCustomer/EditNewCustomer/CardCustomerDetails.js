import React, { useEffect, useState } from 'react';
import LayoutCard from './LayoutCard';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CircularProgress, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppBadIcon from '@mui/icons-material/GppBad';
import {
  getProvince,
  updateNewCustomerDetails,
  getCity,
  getSubdistrict,
} from 'service/api';
import swal from 'sweetalert';
import UpdateLocation from './UpdateLocation';

const style = {
  fontFamily: 'Poppins',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  overflowY: 'scroll',
  p: 4,
};

const CardCustomerDetails = ({ CustomerDetails, setDataUpdate, loading }) => {
  const [payloadEditCustomer, setPayloadEditCustomer] = useState({
    nama_lengkap: '',
    // nama_depan: '',
    // nama_belakang: '',
    telepon: '',
    email: '',
  });
  const [modal, setModal] = useState({
    editCustomer: false,
    daftarAlamat: false,
    editAlamat: false,
  });
  const [payloadEditAlamat, setPayloadEditAlamat] = useState({});
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [subDistric, setSubDistric] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setPayloadEditCustomer({
      ...payloadEditCustomer,
      [name]: value,
    });
  };

  const handleSubmitEditCustomer = async () => {
    const { nama_lengkap, telepon, email } = payloadEditCustomer;

    if (
      nama_lengkap.length > 1 &&
      // nama_depan.length > 1 &&
      // nama_belakang.length > 1 &&
      telepon.length > 1 &&
      email.length > 1
    ) {
      const body = JSON.stringify(payloadEditCustomer);

      const response = await updateNewCustomerDetails(body);
      if (response?.status === 200) {
        setDataUpdate((prev) => !prev);
        setModal({
          ...modal,
          editCustomer: false,
        });
        swal('success', 'Update Data Berhasil', 'success');
      } else {
        swal('oops', `Failed Update Data ${response?.message}`, 'oops');
      }
    } else {
      swal('Oops', `Input Tidak Boleh Kosong`, 'info');
    }
  };

  const handleChangeLocation = (e) => {
    const { name } = e.target;
    let obj = CustomerDetails?.Alamat.find((o) => o.id === Number(name));
    setPayloadEditAlamat(obj);
    setModal({
      ...modal,
      daftarAlamat: false,
      editAlamat: true,
    });

    initGetProvince();
    initGetCity(obj?.id_provinsi);
    initGetSubdistrict(obj?.id_kabupaten);
  };

  const initGetProvince = async () => {
    setIsLoading((prev) => !prev);
    const data = await getProvince();
    if (data?.status === 200) {
      setProvince(data?.data);
      setIsLoading((prev) => !prev);
    }
  };

  const initGetCity = async (id) => {
    setIsLoading((prev) => !prev);
    const data = await getCity(id);
    if (data?.status === 200) {
      setCity(data?.data);
      setIsLoading((prev) => !prev);
    }
  };

  const initGetSubdistrict = async (id) => {
    setIsLoading((prev) => !prev);
    const data = await getSubdistrict(id);
    if (data?.status === 200) {
      setSubDistric(data?.data);
      setIsLoading((prev) => !prev);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'kode_pos' || name === 'alamatLengkap') {
      if (name === 'kode_pos') {
        setPayloadEditAlamat({
          ...payloadEditAlamat,
          kode_pos: Number(value),
        });
      } else if (name === 'alamatLengkap') {
        setPayloadEditAlamat({
          ...payloadEditAlamat,
          alamat: value,
        });
      }
    } else {
      const fixValue = JSON.parse(e.target.value);

      if (name === 'id_province') {
        initGetCity(fixValue.id);
        setPayloadEditAlamat({
          ...payloadEditAlamat,
          id_provinsi: Number(fixValue.id),
          provinsi: fixValue.name,
        });
      } else if (name === 'id_city') {
        initGetSubdistrict(fixValue.id);
        setPayloadEditAlamat({
          ...payloadEditAlamat,
          id_kabupaten: Number(fixValue.id),
          kabupaten: fixValue.name,
        });
      } else if (name === 'subdistrict_id') {
        setPayloadEditAlamat({
          ...payloadEditAlamat,
          id_kecamatan: Number(fixValue.id),
          kecamatan: fixValue.name,
        });
      }
    }
  };

  useEffect(() => {
    setPayloadEditCustomer({
      nama_lengkap: CustomerDetails?.nama_lengkap,
      // nama_depan: CustomerDetails?.namaDepan,
      // nama_belakang: CustomerDetails?.namaBelakang,
      telepon: CustomerDetails?.telepon,
      email: CustomerDetails?.email,
    });
  }, [CustomerDetails]);

  return (
    <>
      <LayoutCard classNames="w-full">
        {loading ? (
          <div className="flex w-full justify-center items-center h-full">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div className="px-5">
              <div className="flex justify-between ">
                <div className="text-start text-lg font-bold text-black uppercase my-2">
                  Customer Details
                </div>
                <button
                  onClick={() => {
                    setModal({ ...modal, editCustomer: true });
                  }}
                  className="text-blue-400 text-lg font-bold ">
                  Edit
                </button>
              </div>

              <div className="mt-2">
                <div className="grid grid-cols-2 gap-2">
                  {/* Biling Details */}
                  <div className="flex flex-col">
                    <div className="text-gray-500 font-bold text-2xl">
                      Biling Details
                    </div>
                    <div className="text-blue-400 font-normal text-lg">
                      {CustomerDetails?.nama_lengkap}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <div className="text-gray-500 font-bold text-2xl">
                      Phone
                    </div>
                    <div className="text-blue-400 font-normal text-lg">
                      {CustomerDetails?.telepon}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <div className="text-gray-500 font-bold text-2xl">
                      Email
                    </div>
                    <div className="text-blue-400 font-normal text-lg">
                      {CustomerDetails?.email}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="text-gray-500 font-bold text-2xl">
                      Status
                    </div>
                    <div className="text-blue-400 font-normal text-lg">
                      {CustomerDetails?.is_verified ? (
                        <div className="flex gap-1 items-center">
                          <VerifiedUserIcon color="success" />
                          <div className="text-lg ">Verified</div>
                        </div>
                      ) : (
                        <div className="flex gap-1 items-center">
                          <GppBadIcon color="error" />
                          <div className="text-lg ">Not Verified</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-px border-gray-300 my-2" />
            <div className="px-5">
              <div className="flex flex-col gap-1">
                <div className="text-gray-500 font-bold text-2xl">
                  Alamat{' '}
                  <span className="bg-blue-200 text-blue-500 font-normal py-px px-3 text-sm rounded-full">
                    Utama
                  </span>
                  <div className="text-black font-normal text-xl w-4/6">
                    {CustomerDetails?.Alamat !== null
                      ? CustomerDetails?.Alamat?.slice(0, 1).map((alamat) => {
                          return alamat.alamat;
                        })
                      : 'Belum Mengisi Alamat'}
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  setModal({
                    ...modal,
                    daftarAlamat: true,
                  })
                }
                className="text-blue-400 text-xl font-bold mt-2">
                Kelola Alamat
              </button>
            </div>
          </>
        )}
      </LayoutCard>

      {/* Edit Customer */}
      <Modal
        aria-labelledby="Edit Customer"
        aria-describedby="Edit Customer"
        open={modal?.editCustomer}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={modal?.editCustomer}>
          <Box sx={style} className="variant-scroll">
            <div className="flex justify-between items-center -mt-5">
              <div className="text-start text-lg font-bold text-black uppercase my-2">
                Edit Customers
              </div>
              <IconButton
                onClick={() => {
                  setModal({ ...modal, editCustomer: false });
                }}
                style={{ textAlign: 'right' }}>
                <HighlightOffIcon color="primary" fontSize="large" />
              </IconButton>
            </div>

            <div className="flex flex-col gap-2 w-full px-5">
              <label className="text-black text-lg">Full Name</label>
              <input
                name="nama_lengkap"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                value={payloadEditCustomer?.nama_lengkap}
                onChange={handleInput}
              />
              {/* <label className="text-black text-lg">Nama Depan</label>
              <input
                name="nama_depan"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                value={payloadEditCustomer?.nama_depan}
                onChange={handleInput}
              />

              <label className="text-black text-lg">Nama Belakang</label>
              <input
                name="nama_belakang"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                value={payloadEditCustomer?.nama_belakang}
                onChange={handleInput}
              /> */}

              <label className="text-black text-lg">Nomor Handphone</label>
              <input
                name="telepon"
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                value={payloadEditCustomer?.telepon}
                onChange={handleInput}
              />

              <label className="text-black text-lg">Email</label>
              <input
                disabled
                name="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue"
                defaultValue={payloadEditCustomer?.email}
                // onChange={handleInput}
              />
            </div>
            <div className="flex justify-center mt-5">
              <button
                onClick={handleSubmitEditCustomer}
                className="text-white bg-blue-400 hover:bg-blue-500 py-2 px-5 rounded-xl">
                Ubah Profile
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* Daftar Alamat */}
      <Modal
        aria-labelledby="Daftar Alamat"
        aria-describedby="Daftar Alamat"
        open={modal?.daftarAlamat}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={modal?.daftarAlamat}>
          <Box sx={style} className="variant-scroll">
            <div className="flex justify-between items-center -mt-5">
              <div className="text-start text-lg font-bold text-black uppercase my-2">
                Daftar Alamat
              </div>
              <IconButton
                onClick={() => {
                  setModal({ ...modal, daftarAlamat: false });
                }}
                style={{ textAlign: 'right' }}>
                <HighlightOffIcon color="primary" fontSize="large" />
              </IconButton>
            </div>

            <div className="flex flex-col space-y-5 w-full p-5">
              {CustomerDetails?.Alamat?.map((alamat) => (
                <div
                  key={alamat?.id}
                  className="border-2 p-5 border-blue-500 bg-blue-200 text-black space-y-2">
                  <div className="text-xl">{alamat?.kota}</div>
                  <div className="text-xl">{alamat?.kecamatan}</div>
                  <div className="text-xl">{alamat?.provinsi}</div>
                  <div className="text-xl text-gray-800 line-clamp-3">
                    {alamat?.alamat}
                  </div>
                  <div className="text-xl">{alamat?.kode_pos}</div>
                  <div className="flex w-full justify-center items-center">
                    <button
                      name={`${alamat?.id}`}
                      onClick={(e) => {
                        handleChangeLocation(e);
                      }}
                      className="bg-blue-400 rounded-xl text-white text-xl py-2 px-3">
                      Ubah Alamat
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* Edit Daftar Alamat */}
      <UpdateLocation
        payloadEditAlamat={payloadEditAlamat}
        modal={modal}
        setModal={setModal}
        province={province}
        city={city}
        subDistric={subDistric}
        isLoading={isLoading}
        handleChange={handleChange}
        setDataUpdate={setDataUpdate}
      />
    </>
  );
};

export default CardCustomerDetails;
