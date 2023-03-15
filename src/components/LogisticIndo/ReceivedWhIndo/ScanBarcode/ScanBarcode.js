import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import ReceivedManualTable from './ReceivedManualTable';
import {
  getDataBarcodeWhIndo,
  getDetailRelatedKarton,
  submitAllKarton,
  submitReceivedDataWhIndo,
} from 'service/api';
import swal from 'sweetalert';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import CancelIcon from '@mui/icons-material/Cancel';
import { LoadingComponentDefault } from 'components/UI/LoadingComponent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  overflow: 'hidden',
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 3,
};

export default function ScanBarcode() {
  const inputImages = useRef(null);
  const [open, setOpen] = useState(false);
  const [isModalTable, setIsModalTable] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [receivedData, setReceivedData] = useState([]);
  const [dataContainer, setDataContainer] = useState({
    container: '',
    id_order: '',
    carton: '',
    kota: '',
    kurir: '',
  });
  const [dataKartonProcess, setdataKartonProcess] = useState([]);
  const [dataCustomer, setDataCustomer] = useState({});
  const [imagesUpload, setImagesUpload] = useState([]);
  const [isBolean, setIsBolean] = useState({
    isLoadingGet: false,
  });
  const handleCloseTable = () => {
    setIsModalTable(false);
    setdataKartonProcess([]);
    setDataContainer({
      container: '',
      id_order: '',
      carton: '',
      kota: '',
      kurir: '',
    });
    setReceivedData([]);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setdataKartonProcess([]);
    setDataContainer({
      container: '',
      id_order: '',
      carton: '',
      kota: '',
      kurir: '',
    });
    setReceivedData([]);
  };

  const getData = async (e) => {
    e.preventDefault();
    setIsBolean({
      ...isBolean,
      isLoadingGet: true,
    });

    const data = await getDataBarcodeWhIndo(barcode);
    if (data?.status === 200) {
      setDataContainer({
        container: data?.data?.container,
        carton: data?.data?.id_karton,
        id_order: data?.data?.id_so,
        kota: data?.data?.kota,
        kurir: data?.data?.kurir,
      });
      setDataCustomer(data?.data?.customer);
      setIsModalTable(true);
    }
    if (data?.status === 404) {
      swal('Oops', 'Carton Not Found', 'error');
    }
    if (data?.status === 403) {
      swal('Oops', 'Invalid carton number !', 'error');
    }

    const dataRelated = await getDetailRelatedKarton(barcode);
    if (dataRelated?.status === 200) {
      const newData = dataRelated?.data.map((obj) => {
        return {
          ...obj,
          is_checked: false,
        };
      });
      setReceivedData(newData);
    } else {
      swal('Oops', `${dataRelated?.message}`, 'error');
    }

    return setIsBolean({
      ...isBolean,
      isLoadingGet: false,
    });
  };

  const postData = async () => {
    const body = {
      id_so: dataContainer?.id_order,
      id_karton: dataContainer?.carton,
      is_terima_semmua: false,
      gambar: imagesUpload,
      produk: dataKartonProcess.map((data) => {
        return {
          ...data,
          recieve: Number(data?.received),
          lost: Number(data?.lost),
          damaged: Number(data?.rejected),
          unsuitable: Number(data?.unsuitable),
        };
      }),
    };

    const validateReceived = body?.produk.filter((obj) => {
      return (
        obj.received === '' || obj.receive === 0 || obj.received > obj?.qty
      );
    });

    if (validateReceived.length !== 0) {
      swal('Oops', 'Periksa Kembali input barang Diterima', 'warning');
      return;
    }

    const data = await submitReceivedDataWhIndo(JSON.stringify(body));
    if (data?.status === 200) {
      swal('Success', 'Data Berhasil disubmit', 'success');
      setIsModalTable(false);
      setImagesUpload([]);
    }
    if (data?.status === 400) {
      swal('Oops', 'Input Tidak Benar', 'error');
    }
    if (data?.status === 500) {
      swal('Oops', 'Server Bermasalah', 'error');
    }
  };

  const submitImage = (e) => {
    let formData = new FormData();
    formData.append('gambar', e.target.files[0]);
    fetch(`${process.env.REACT_APP_URL_API_IMAGE_UPLOAD2}`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          setImagesUpload([...imagesUpload, data.file]);
        } else {
          swal('Oops', data.message, 'error');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteImages = (src) => {
    const newImage = imagesUpload.filter((i) => i !== src);
    setImagesUpload(newImage);
  };

  const handleProcessKarton = async (produk) => {
    if (produk) {
      const resProcessKarton = await getDataBarcodeWhIndo(produk?.id_karton);
      if (resProcessKarton?.status === 200) {
        let dataKarton = resProcessKarton?.data?.produk[0];
        let idKarton = resProcessKarton?.data?.produk[0]?.id_karton;
        let newArry = receivedData?.filter(
          (data) => data.id_karton !== idKarton
        );
        const newDataKarton = {
          ...dataKarton,
          received: '',
          rejected: '',
          unsuitable: '',
          lost: '',
        };

        console.log({ newDataKarton });

        setReceivedData(newArry);
        setdataKartonProcess([...dataKartonProcess, newDataKarton]);
        console.log({ resProcessKarton, idKarton, newArry });
        return;
      } else {
        swal('Oops', `${resProcessKarton?.message}`, 'error');
      }
      return;
    }

    if (!produk) {
      const resProcessAllKarton = await submitAllKarton(dataContainer?.carton);
      if (resProcessAllKarton?.status === 200) {
        setdataKartonProcess(
          resProcessAllKarton?.data.map((data) => {
            return {
              ...data,
              received: '',
              rejected: '',
              unsuitable: '',
              lost: '',
            };
          })
        );
        setReceivedData([]);
        return;
      } else {
        swal('Oops', `${resProcessAllKarton?.message}`, 'error');
      }
    }
  };

  // const handleChangeCheckBox = (index) => {
  //   let cloneReceivedData = [...receivedData];

  //   if (receivedData[index] === true) {
  //     cloneReceivedData[index]['is_checked'] = false;
  //     return;
  //   }

  //   if (receivedData[index] === false) {
  //     cloneReceivedData[index]['is_checked'] = true;
  //     return;
  //   }
  // };

  return (
    <div>
      {/* <button
        className='p-1 px-3 rounded-md cursor-pointer text-white bg-blue-500 text-center'
        onClick={() => {
          handleOpen();
        }}>
        Scan Barcode
      </button> */}

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: '50%', Height: '90%', ...style }}>
          <div className='flex justify-end -mt-5'>
            <IconButton
              onClick={handleClose}
              style={{ textAlign: 'right', color: 'red' }}>
              <DisabledByDefaultIcon />
            </IconButton>
          </div>
          <div className='text-xl font-semibold'>Carton :</div>
          <form
            className='flex items-center justify-center gap-2'
            onSubmit={(e) => getData(e)}>
            <input
              autoFocus
              name='barcode'
              onChange={(e) => setBarcode(e.target.value)}
              placeholder='Masukan Carton'
              type='text'
              className='w-full border-2 rounded-md focus:border-blue-200 outline-none'
            />
            <div className='flex'>
              <LoadingComponentDefault
                textLoading={'Tunggu'}
                setIsLoading={isBolean?.isLoadingGet}>
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2'>
                  Submit
                </button>
              </LoadingComponentDefault>
            </div>
          </form>
        </Box>
      </Modal>

      <Modal open={isModalTable} onClose={handleCloseTable}>
        <Box sx={{ width: '90%', Height: '90%', ...style }}>
          <div className='flex justify-end -mt-5'>
            <IconButton
              onClick={handleCloseTable}
              style={{ textAlign: 'right', color: 'red' }}>
              <DisabledByDefaultIcon />
            </IconButton>
          </div>
          <div className='overflow-y-scroll h-[500px] pr-2'>
            <div className='flex gap-5'>
              <div className='w-1/2 border-2 rounded-lg'>
                <div className='bg-blue-200 w-full p-1 text-lg font-medium'>
                  Tentang Detail Penerimaan
                </div>
                <div className='p-2'>
                  <div className='flex text-base'>
                    <div className='w-24'>Container</div>
                    <div className='mr-2'>:</div>
                    <div className='uppercase'> {dataContainer?.container}</div>
                  </div>
                  <div className='flex text-base'>
                    <div className='w-24'>ID Order</div>
                    <div className='mr-2'>:</div>
                    <div className='uppercase'>{dataContainer?.id_order}</div>
                  </div>
                  <div className='flex text-base'>
                    <div className='w-24'>Carton</div>
                    <div className='mr-2'>:</div>
                    <div className='uppercase'> {dataContainer?.carton}</div>
                  </div>
                </div>
              </div>
              <div className='w-1/2 border-2 rounded-lg'>
                <div className='bg-blue-200 w-full p-1 text-lg font-medium'>
                  Tentang Customer
                </div>
                <div className='p-2'>
                  <div className='flex text-base'>
                    <div className='w-28'>Nama</div>
                    <div className='mr-2'>:</div>
                    <div className='uppercase'>{dataCustomer?.name}</div>
                  </div>
                  <div className='flex text-base'>
                    <div className='w-28'>Kota</div>
                    <div className='mr-2'>:</div>
                    <div className='uppercase'>{dataCustomer?.city}</div>
                  </div>
                  <div className='flex text-base'>
                    <div className='w-28'>Alamat</div>
                    <div className='mr-2'>:</div>
                    <div className='lowercase w-[300px]'>
                      {dataCustomer?.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full mt-2'>
              <div className='w-full p-1 mb-2 text-lg '>
                Tabel Produk{' '}
                <span className='capitalize font-medium'>
                  {dataCustomer?.name}
                </span>{' '}
                dalam container{' '}
                <span className='uppercase font-medium'>
                  {dataContainer?.container}{' '}
                </span>
              </div>
              <div className='flex text-center items-center bg-blue-200 border-2 p-2 font-medium pr-4'>
                <div className='w-[25%]'>ID Order</div>
                <div className='w-[25%]'>ID Karton</div>
                <div className='w-[25%]'>Action</div>
              </div>

              <div className='overflow-y-scroll h-[300px] border-2'>
                {receivedData.map((produk, index) => (
                  <div
                    key={index}
                    className='flex text-center items-center border-2 p-2 gap-y-4'>
                    {/* <div className='w-[5%]'>
                      <input
                        value={produk?.is_checked}
                        onChange={() => handleChangeCheckBox(index)}
                        type='checkbox'
                      />
                    </div> */}
                    <div className='w-[25%]'>{produk?.id_so}</div>
                    <div className='w-[25%]'>{produk?.id_karton}</div>
                    <div className='w-[25%]'>
                      <button
                        onClick={() => handleProcessKarton(produk)}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-px'>
                        Process Karton
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex justify-between mt-2'>
                <div className='text-medium font-medium'>
                  Total Karton : {receivedData?.length}
                </div>
                <button
                  onClick={(e) => handleProcessKarton()}
                  className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md mr-5'>
                  Process Semua Karton
                </button>
              </div>
            </div>

            <div className='flex flex-col justify-between mt-5 pt-5 border-t-2'>
              <div className='w-full px-1 text-lg '>
                Tabel Produk{' '}
                <span className='capitalize font-medium'>
                  {dataCustomer?.name}
                </span>{' '}
                dalam Process
                <span className='capitalize font-medium'> Pengecekan </span>
              </div>
              <ReceivedManualTable
                dataKartonProcess={dataKartonProcess}
                setdataKartonProcess={setdataKartonProcess}
              />

              <div>
                <div className='flex items-center justify-center gap-5'>
                  <button
                    className='mt-3 p-2 bg-blue-400 text-white rounded-md'
                    onClick={postData}>
                    Submit
                  </button>

                  <input
                    ref={inputImages}
                    name='input'
                    onChange={submitImage}
                    className='hidden'
                    type='file'
                  />
                  <button
                    className='mt-3 p-2 bg-blue-400 text-white rounded-md'
                    onClick={() => inputImages.current.click()}>
                    Update Gambar
                  </button>
                </div>

                {imagesUpload.length > 0 && (
                  <div className='flex flex-wrap justify-end gap-5 my-5'>
                    {imagesUpload?.map((src, index) => (
                      <div key={index} className='bg-blue-200 relative'>
                        <img
                          src={src}
                          alt='Images'
                          className='w-40 h-40 object-contain'
                        />
                        <div className='absolute -top-5 -right-5'>
                          <IconButton
                            className='duration-300 hover:rotate-12 hover:scale-125 p-0'
                            onClick={() => deleteImages(src)}>
                            <CancelIcon
                              className='text-red-500 '
                              fontSize='large'
                            />
                          </IconButton>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
