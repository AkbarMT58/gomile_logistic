import React, { useState } from 'react';
import { getScanDetailCarton, getWhIndoProductDetail, insertTableContainer } from 'service/api';
import DeleteIcon from '@mui/icons-material/Delete';
import swal from 'sweetalert';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxHeight: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const ModalDetailsCarton = ({
  datas,
  setdatas,
  inputs,
  setInputs,
  isModal,
  setIsModal,
  handleModalClose,
  handleInputs,
}) => {
  const [showMore, setShowMore] = useState(null);
  const [activeDetailProduct, setActiveDetailProduct] = useState([]);

  const handleInputCarton = async (e) => {
    e.preventDefault();
    let hasAllreadyValue = datas?.some(
      (dataToTable) => dataToTable['id_karton'] === inputs?.input_cartonId
    );

    if (inputs?.input_cartonId === '') {
      swal('Oops', `Please input Carton Id`, 'warning');
      return;
    }

    if (hasAllreadyValue) {
      swal(
        'Oops',
        `ID Carton ${inputs?.input_cartonId} Already Input`,
        'warning'
      );
      return;
    }

    if (!hasAllreadyValue) {
      const params = inputs?.input_cartonId;

      const response = await getScanDetailCarton(params);
      if (response?.status === 200) {
        if (response?.data[0].id_carton === '') {
          swal('Oops', `Details Carton ID, Not Found`, 'warning');
        } else {
          const oldArray = datas;
          setdatas({
            ...datas,
            dataToTable: [...oldArray, ...response?.data],
          });
        }
      } else {
        swal('Oops', `${response?.message}`, 'warning');
      }
      setInputs({
        ...inputs,
        input_cartonId: '',
      })
    }
  };

  const handleDeleteCarton = (e, id_karton) => {
    let newDataToMap = datas.filter((i) => i.id_karton !== id_karton);
    setdatas({
      ...datas,
      dataToTable: newDataToMap,
    });
  };

  const handleShowMore = async (e, index, data) => {
    if(showMore !== index) {
      setShowMore(index)
      setActiveDetailProduct([])
      
      const response = await getWhIndoProductDetail(data.id_karton);
      if(response.status === 200) {
        setActiveDetailProduct(response.data)
      }

    } else {
      setShowMore(null)
      setActiveDetailProduct([])
    }
  };

  const handleSubmitTableContainer = async () => {
    const body = {
      container: inputs?.scanBarcode_container,
      id_karton: datas.map((value) => value.id_karton),
    };

    if (datas?.length === 0) {
      swal('Oops', `Tabel Container Can't Be Empty`, 'warning');
      return;
    }

    if (datas?.length !== 0) {
      swal({
        title: 'Are you sure?',
        text: 'Submit data on Table Container',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((yes) => {
        if (yes) {
          const submit = async () => {
            const response = await insertTableContainer(JSON.stringify(body));
            if (response.status === 201) {
              swal('Table Container has been Submited', {
                icon: 'success',
              });
              setIsModal({
                ...isModal,
                modal_cartonDetails: false,
              });
              setdatas({
                ...datas,
                dataToTable: [],
              });
              setInputs({
                ...inputs,
                scanBarcode_container: '',
                input_cartonId: '',
              });
            }

            if (response.status !== 201) {
              swal(
                `Failed Submit Table Container, Errpr : ${response?.message}`,
                {
                  icon: 'error',
                }
              );
            }
          };

          submit();
        } else {
          swal('Your canceled to Submit Table Container');
        }
      });
    }
  };

  return (
    <>
      <Modal
        name='modal_cartonDetails'
        open={isModal?.modal_cartonDetails}
        onClose={(e) => handleModalClose(e)}>
        <Box sx={style}>
          <div className='flex justify-end -mt-5'>
            <IconButton
              name='modal_cartonDetails'
              onClick={(e) => handleModalClose(e)}
              style={{ textAlign: 'right' }}>
              <CloseIcon className='hover:text-red-600' />
            </IconButton>
          </div>
          <div className='w-full h-full '>
            <div className='text-gray-800 font-bold text-xl'>
              Container : {inputs?.scanBarcode_container}
            </div>
            <form onSubmit={(e) => handleInputCarton(e)}>
              <input
                autoFocus
                name='input_cartonId'
                value={inputs?.input_cartonId}
                onChange={(e) => handleInputs(e)}
                // onFocus={(e) =>
                //   setInputs({
                //     ...inputs,
                //     input_cartonId: '',
                //   })
                // }
                type='text'
                className='border-2 rounded-sm w-3/12 p-px px-1 hover:outline-blue focus:outline-blue text-gray-800 text-lg'
                placeholder='Input Carton id'
              />
              <div className='text-xs text-red-400 mt-1'>
                * Press Enter to submit
              </div>
            </form>
            <div className='border mt-6 max-h-[450px] overflow-y-scroll z-50'>
              <div className='flex items-center bg-blue-200 w-full border-b-2 sticky top-0 z-50'>
                <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1'>
                  No.
                </p>
                <p className='w-[33.2%] text-gray-700 font-semibold text-base text-center p-1'>
                  ID Karton
                </p>
                {/* <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1'>
                  Total Karton
                </p> */}
                <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1'>
                  Volume
                </p>
                <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1'>
                  Total QTY
                </p>
                <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1'>
                  Options
                </p>
              </div>
              {datas?.map((data, i) => (
                <div key={i}>
                  <div
                    onClick={(e) => handleShowMore(e, i, data)}
                    className={`${
                      i % 2 ? 'bg-blue-50' : 'bg-gray-50'
                    } flex items-center w-full hover:bg-blue-100 cursor-pointer z-[9999]`}>
                    <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1 '>
                      {i + 1}
                    </p>
                    <p className='w-[33.2%] text-gray-700 font-semibold text-base text-center p-1 '>
                      {data?.id_karton}
                    </p>
                    {/* <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1'>
                      {data?.total_carton}
                    </p> */}
                    <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1'>
                      {(data?.volume / 1000000).toFixed(4)} M<sup>3</sup>
                    </p>
                    <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1'>
                      {data?.qty}
                    </p>
                    <p className='w-[16.6%] text-gray-700 font-semibold text-base text-center p-1'>
                      <IconButton
                        onClick={(e) => handleDeleteCarton(e, data?.id_karton)}
                        className='hover:text-red-400 hover:rotate-45 z-50'>
                        <DeleteIcon />
                      </IconButton>
                    </p>
                  </div>
                  <div
                    className={`${
                      showMore === i ? 'max-h-[240px]' : 'h-0'
                    } duration-500 ease-in-out z-0 overflow-y-scroll text-xs`}>
                    <p className='text-gray-700 font-semibold px-2'>
                      Product Inside Karton :
                    </p>
                    <div className='flex items-center w-full border sticky top-0 bg-white'>
                      <p className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                        Image
                      </p>
                      <p className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                        ID PO
                      </p>
                      <p className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                        ID SO
                      </p>
                      <p className='w-[33.2%] text-gray-700 font-semibold text-center p-1 line-clamp-2'>
                        Product Name
                      </p>
                      <p className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                        Qty
                      </p>
                      {/* <p className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                        Variant
                      </p> */}
                    </div>
                    {activeDetailProduct?.map((produk, index) => (
                      <div key={index}>
                        <div className='flex items-center w-full border-b-2'>
                          <p className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                            <img
                              className='w-28 mx-auto object-contain'
                              src={
                                produk?.gambar ? produk?.gambar : '/no-image.png'
                              }
                              alt='produk images'
                            />
                          </p>
                          <div className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                            <p>{produk?.id_po}</p>
                          </div>
                          <div className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                            <p>{produk?.id_so}</p>
                          </div>
                          <div className='w-[33.2%] text-gray-700 font-semibold text-center p-1 line-clamp-2'>
                            <Tooltip title={produk?.produk}>
                              <p className='line-clamp-1 cursor-help'>
                                {produk?.produk}
                              </p>
                            </Tooltip>
                          </div>
                          <div className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                            <p>{produk?.kuantiti}</p>
                          </div>
                          {/* <div className='w-[16.6%] text-gray-700 font-semibold text-center p-1'>
                            <Tooltip title={produk?.variant}>
                              <p className='line-clamp-1 cursor-help'>
                                {produk?.variant}
                              </p>
                            </Tooltip>
                          </div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="total-carton mt-1">
              Total Karton: <span className='font-bold'>{datas.length}</span>
            </div>
            <div className='flex justify-end mt-5'>
              <button
                onClick={handleSubmitTableContainer}
                className='p-2 px-6 rounded-md cursor-pointer text-white bg-blue-500 text-center mb-2 hover:bg-blue-600 text-lg'>
                Submit
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalDetailsCarton;
