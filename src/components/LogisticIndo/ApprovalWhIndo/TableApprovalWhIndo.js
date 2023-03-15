import React, { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import { CircularProgress, IconButton } from '@mui/material';
import Lightbox from 'react-image-lightbox';
import swal from 'sweetalert';
import { editDataAprovalWHindo } from 'service/api';
import CloseIcon from '@mui/icons-material/Close';
// import AddIcon from '@mui/icons-material/Add';

const TableApprovalWhIndo = ({
  data,
  isBolean,
  handleSendAproval,
  handleRejectAproval,
  handleRejectMultipleAproval,
  handleShowMore,
}) => {
  const [copyData, setCopyData] = useState();
  const [checkedRowData, setCheckedRowData] = useState([]);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [editApprovalObj, setEditApprovalObj] = useState(false);
  const [productEdited, setProductEdited] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      const copy_data = JSON.parse(JSON.stringify(data)); // Create completely new copy nested object of data
      setCopyData(copy_data);
    }
  }, [data]);

  const set_EditApprovalObj = (e, name, indexParent, indexProduk, idCarton) => {
    const newData = JSON.parse(JSON.stringify(copyData));
    let totalNumber =
      data[indexParent].produk[indexProduk].recieve +
      data[indexParent].produk[indexProduk].lost +
      data[indexParent].produk[indexProduk].damaged +
      data[indexParent].produk[indexProduk].unsuitable;

    newData[indexParent].produk[indexProduk][name] = parseInt(e.target.value);
    if (
      0 <=
      data[indexParent].produk[indexProduk].recieve -
        newData[indexParent].produk[indexProduk].lost -
        newData[indexParent].produk[indexProduk].damaged -
        newData[indexParent].produk[indexProduk].unsuitable
    ) {
      newData[indexParent].produk[indexProduk].recieve =
        totalNumber -
        newData[indexParent].produk[indexProduk].lost -
        newData[indexParent].produk[indexProduk].damaged -
        newData[indexParent].produk[indexProduk].unsuitable;

      setCopyData(newData);
      setProductEdited((prev) => [...new Set([...prev, idCarton])]);
    }
  };

  const removeImageApproval = (image, indexParent, indexImage, idCarton) => {
    swal({
      title: `Apakah Anda Yakin Ingin Menghapus Gambar ?`,
      text: `Url gambar : ${image}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (remove) => {
      if (remove) {
        const newData = JSON.parse(JSON.stringify(copyData));
        newData[indexParent].gambar.splice([indexImage], 1);
        setCopyData(newData);
        setProductEdited((prev) => [...new Set([...prev, idCarton])]);
      }
    });
  };

  const handleChangeImages = async (event, indexParent, idCarton) => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append('gambar', event.target.files[0]);
    const response = await fetch(
      `${process.env.REACT_APP_URL_API_IMAGE_UPLOAD2}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const result = await response.json();
    if (result?.status === 200) {
      const newData = JSON.parse(JSON.stringify(copyData));
      newData[indexParent].gambar.push(result?.file);

      setCopyData(newData);
      setProductEdited((prev) => [...new Set([...prev, idCarton])]);
      setIsLoading(false);
    } else {
      swal('Oops', `Images ${result.message}`, 'error');
      setIsLoading(false);
    }
  };

  const saveChanges = (data, index) => {
    swal({
      title: `Apakah Anda Yakin Ingin Mengubah Data ?`,
      text: `Edit ID Order : ${data?.Id_karton}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (Edit) => {
      if (Edit) {
        setIsLoading(true);
        const response = await editDataAprovalWHindo(JSON.stringify(data));
        if (response.status === 200 || response.status === 201) {
          swal(
            'success',
            `Berhasil Mengedit, ID Order : ${data?.Id_karton}`,
            'success'
          ).then(async () => {
            setProductEdited((prev) =>
              prev.filter((arr) => arr !== data?.Id_karton)
            );
            setEditApprovalObj(false);
            handleShowMore(index);
            setIsLoading(false);
          });
          // setDataUpdated((prev) => !prev);
        } else {
          swal('Error', `${response.message}`, 'error');
          setIsLoading(false);
        }
      }
    });
  };

  const resetData = (index, idSO) => {
    const newCopyData = JSON.parse(JSON.stringify(copyData));
    newCopyData[index] = data[index];
    setCopyData(newCopyData);
    setProductEdited((prev) => prev.filter((arr) => arr !== idSO));
    setEditApprovalObj(false);
  };

  const checkRowData = (value, datas) => {
    if(value) {
      const filterRowData = checkedRowData.find((data) => data.id_karton === datas.Id_karton)
      if(!filterRowData) {
        setCheckedRowData(prev => {return [...prev, {id_so: datas.id_so, id_karton: datas.Id_karton}]})
      }
    } else {
      const filterRowData = checkedRowData.filter((data) => data.id_karton !== datas.Id_karton)
      setCheckedRowData(filterRowData)
    }
  }
  const checkAllRowData = (value) => {
    if(value) {
        let newRowData = []
        data.forEach(element => {
          newRowData.push({id_so: element.id_so, id_karton: element.Id_karton})
        });
        setCheckedRowData(newRowData)
    } else {
      setCheckedRowData([])
    }
  }
  
  // if (!copyData) {
  //   return null;
  // }
  return (
    <div className="w-full h-auto rounded-md ">
      {checkedRowData.length > 1 &&
        <div className='space-x-3'>
          <button
            onClick={(e) => handleSendAproval(checkedRowData, setCheckedRowData)}
            className="bg-blue-500 hover:bg-blue-600 w-fit text-white hover:scale-105 duration-100 px-3 rounded-sm mb-2">
            Konfirmasi Rows Terpilih
          </button>
          <button
            onClick={(e) => handleRejectMultipleAproval(checkedRowData)}
            className="bg-red-500 hover:bg-red-600 w-fit text-white hover:scale-105 duration-100 px-3 rounded-sm mb-2">
            Reject Rows Terpilih
          </button>
        </div>
      }
      <div className="flex justify-center gap-x-2 py-4 bg-blue-300 rounded-t-md text-gray-700 font-medium">
        <div className="w-[3%] h-5">
          <input id="check-all" type="checkbox" onChange={(e) => checkAllRowData(e.target.checked)} />
        </div>
        <div className="w-[10%] h-5">ID Order</div>
        <div className="w-[20%] h-5">Nama Customer</div>
        <div className="w-[20%] h-5">Container / Karton</div>
        <div className="w-[15%] h-5">Tanggal</div>
        <div className="w-[10%] h-5">Status</div>
        <div className="w-[15%] h-5">Aktivitas</div>
      </div>

      {isBolean?.isFirstFetch ? (
        <div className="w-full h-screen bg-white text-center pt-10">
          <div className="flex items-center justify-center gap-5">
            <CircularProgress size={30} />
            <p className="animate-pulse font-semibold text-gray-600">
              Mengambil Data Aproval Gudang
            </p>
          </div>
        </div>
      ) : (
        <>
          {copyData?.map((datas, index) => (
            <div
              key={index}
              className={`${
                isBolean?.isShowMore === index ? 'outline-blue' : ''
              } bg-white mb-2`}>
              <div className="flex justify-center items-center gap-x-2 py-4 bg-white">
                <div className="w-[3%]">
                  <input type="checkbox" 
                  onChange={(e) => checkRowData(e.target.checked, datas)}
                  checked={checkedRowData.map((data) => data.id_karton).includes(datas.Id_karton)}
                  />
                </div>
                <div className="w-[10%]">{datas?.id_so}</div>
                <div className="w-[20%]">{datas?.nama}</div>
                <div className="w-[20%]">
                  {datas?.container} / {datas?.Id_karton}
                </div>
                <div className="w-[15%]">{datas?.tanggal}</div>
                <div className="w-[10%]">
                  <AccessTimeIcon className={`ml-2 ${datas?.warna}`} />
                </div>
                <div className="w-[15%] space-x-5 flex items-center">
                  <div className="w-full space-y-2">
                    {!datas?.is_checked && (
                      <button
                        onClick={(e) => handleSendAproval(datas)}
                        className="bg-blue-500 hover:bg-blue-600 w-full text-white hover:scale-105 duration-100 px-3 rounded-sm">
                        Konfirmasi
                      </button>
                    )}
                    <button
                      onClick={(e) => handleRejectAproval(datas)}
                      className="bg-red-500 hover:bg-red-600 w-full text-white hover:scale-105 duration-100 px-3 rounded-sm">
                      Reject
                    </button>
                  </div>
                  <IconButton
                    className={`${
                      isBolean?.isShowMore === index ? 'rotate-0' : 'rotate-180'
                    } hover:bg-blue-100`}
                    onClick={(e) => handleShowMore(index)}>
                    <KeyboardArrowUpSharpIcon
                      fontSize="large"
                      className={`border border-blue-500 hover:bg-blue-100 rounded-full text-blue-500`}
                    />
                  </IconButton>
                </div>
              </div>
              <div
                className={`${
                  isBolean?.isShowMore === index ? 'h-[530px]' : 'h-0'
                } duration-300 overflow-y-auto z-50`}>
                <div className="w-full flex flex-col gap-2 px-2">
                  <div className="flex gap-5">
                    <div className="w-1/2 h-[530px] border-2 rounded-md">
                      <div className="font-semibold text-gray-600 bg-gray-100 p-2">
                        Tentang Customer
                      </div>
                      <hr />
                      <div className="p-2 font-medium space-y-2">
                        <div className="flex gap-x-3 ">
                          <p className="w-20">Nama</p>
                          <p>: {datas?.nama}</p>
                        </div>
                        <div className="flex gap-x-3 ">
                          <p className="w-20">Telepon</p>
                          <p>: {datas?.telepon}</p>
                        </div>
                        <div className="flex gap-x-3 ">
                          <p className="w-20">Kota</p>
                          <p>: {datas?.kota}</p>
                        </div>
                        <div className="flex gap-x-3">
                          <p className="w-20">Keterangan</p>
                          <p>
                            :{' '}
                            {datas?.keterangan !== '' ? datas?.keterangan : '-'}
                          </p>
                        </div>
                        <div className="flex gap-x-3 ">
                          <p className="w-20">Palet</p>
                          <p>: {datas?.palet}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="p-2 font-medium space-y-2">
                        <div className="flex space-x-2">
                          <p className="w-60">Total Product Di Beli Customer</p>
                          <p>:</p>
                          <p>{datas?.produk?.length}</p>
                        </div>
                        <div className="flex space-x-2">
                          <p className="w-60">Total Karton</p>
                          <p>:</p>
                          <p>{datas?.total_karton}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 h-[530px] overflow-scroll border-2 rounded-md">
                      <div className="flex justify-between items-center font-medium text-gray-600 bg-gray-100 p-2 sticky top-0">
                        Tentang Produk Customer
                        {productEdited.includes(datas?.Id_karton) && (
                          <div
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-lg cursor-pointer"
                            onClick={() => resetData(index, datas?.Id_karton)}>
                            RESET
                          </div>
                        )}
                      </div>
                      <hr />
                      <div className="flex font-medium p-2 gap-x-2">
                        <p className="w-14">Produk</p>
                        <p>:</p>
                        <p className="line-clamp-3">
                          {datas?.produk[0]?.produk}
                        </p>
                      </div>
                      <div className="flex font-medium p-2 gap-x-2">
                        <p className="w-14">Images</p>
                        <p>:</p>
                        <div className="flex items-center flex-wrap gap-2">
                          {datas.gambar.map((image, idx) => (
                            <div key={idx} className="relative">
                              <CloseIcon
                                fontSize="small"
                                className="absolute top-0 right-0 z-10 text-white bg-black opacity-10 hover:opacity-75 rounded-xl"
                                onClick={() =>
                                  removeImageApproval(
                                    image,
                                    index,
                                    idx,
                                    datas.Id_karton
                                  )
                                }
                              />
                              <img
                                key={idx}
                                src={image}
                                className="w-28 h-20 object-contain border rounded-lg overflow-hidden cursor-pointer"
                                alt="approval"
                                onClick={() => setOpenLightbox(image)}
                              />
                              {openLightbox === image && (
                                <Lightbox
                                  mainSrc={image}
                                  onCloseRequest={() => setOpenLightbox(false)}
                                />
                              )}
                            </div>
                          ))}
                          <label htmlFor={datas.Id_karton}>
                            {/* <AddIcon className="opacity-50 hover:opacity-100 hover:scale-110 cursor-pointer" /> */}
                            <div className="w-fit shrink-0 text-center text-white text-xs bg-green-500 hover:bg-green-600 px-2 py-1 rounded-xl cursor-pointer">
                              {isLoading
                                ? 'Uploading image...'
                                : 'Tambah Lampiran'}
                            </div>
                          </label>
                          <input
                            type="file"
                            name={datas.Id_karton}
                            id={datas.Id_karton}
                            hidden
                            onChange={(e) =>
                              !isLoading &&
                              handleChangeImages(e, index, datas.Id_karton)
                            }
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      {productEdited.includes(datas?.Id_karton) && (
                        <div className="flex justify-end px-4">
                          <div
                            className="bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg px-3 py-1 mb-2 cursor-pointer"
                            onClick={() =>
                              !isLoading && saveChanges(datas, index)
                            }>
                            {isLoading
                              ? 'Saving changes...'
                              : 'Simpan Perubahan'}
                          </div>
                        </div>
                      )}
                      <hr />
                      <div className="flex flex-col max-h-[275px] divide-y-2 space-y-5 overflow-y-auto p-2">
                        {datas?.produk?.map((objProduk, idx) => (
                          <div key={idx} className="mt-2 p-2 h-full relative">
                            <div
                              className={`${
                                editApprovalObj === objProduk.id_produk
                                  ? 'text-red-600'
                                  : 'text-blue-600'
                              } absolute top-2 right-2 text-xs font-semibold cursor-pointer`}
                              onClick={() =>
                                editApprovalObj === objProduk.id_produk
                                  ? setEditApprovalObj(false)
                                  : setEditApprovalObj(objProduk.id_produk)
                              }>
                              {editApprovalObj === objProduk.id_produk
                                ? 'Close'
                                : 'Edit'}
                            </div>
                            <div className="flex gap-5">
                              <img
                                className="w-[20%] object-contain"
                                src={`${
                                  objProduk?.gambar
                                    ? objProduk?.gambar
                                    : '/no-image.png'
                                }`}
                                alt={`${objProduk?.gambar}`}
                              />
                              <div className="font-medium">
                                <div className="flex gap-x-2 pr-6">
                                  <p className="w-14">Variant</p>
                                  <p>:</p>
                                  <p className="line-clamp-2">
                                    {objProduk?.variant}
                                  </p>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div>
                                    <div className="flex gap-x-2">
                                      <p className="w-14">Diterima</p>
                                      <p>:</p>
                                      <input
                                        type="number"
                                        value={objProduk?.recieve}
                                        // onChange={(e) =>
                                        //   set_EditApprovalObj(
                                        //     e,
                                        //     'recieve',
                                        //     index,
                                        //     idx,
                                        //     datas?.Id_karton
                                        //   )
                                        // }
                                        className={`w-12 bg-white text-gray-400 font-semibold`}
                                        disabled
                                      />
                                    </div>
                                    <div className="flex gap-x-2">
                                      <p className="w-14">Hilang</p>
                                      <p>:</p>
                                      <input
                                        type="number"
                                        value={objProduk?.lost}
                                        onChange={(e) =>
                                          set_EditApprovalObj(
                                            e,
                                            'lost',
                                            index,
                                            idx,
                                            datas?.Id_karton
                                          )
                                        }
                                        className={`w-12 bg-white ${
                                          editApprovalObj === objProduk.id_produk && 'border-b-2'
                                        }`}
                                        disabled={
                                          editApprovalObj !== objProduk.id_produk
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex gap-x-2">
                                      <p className="w-14">Rusak</p>
                                      <p>:</p>
                                      <input
                                        type="number"
                                        value={objProduk?.damaged}
                                        onChange={(e) =>
                                          set_EditApprovalObj(
                                            e,
                                            'damaged',
                                            index,
                                            idx,
                                            datas?.Id_karton
                                          )
                                        }
                                        className={`w-12 bg-white ${
                                          editApprovalObj === objProduk.id_produk && 'border-b-2'
                                        }`}
                                        disabled={
                                          editApprovalObj !== objProduk.id_produk
                                        }
                                      />
                                    </div>
                                    <div className="flex gap-x-2">
                                      <p className="w-28">Tidak Sesuai</p>
                                      <p>:</p>
                                      <input
                                        type="number"
                                        value={objProduk?.unsuitable}
                                        onChange={(e) =>
                                          set_EditApprovalObj(
                                            e,
                                            'unsuitable',
                                            index,
                                            idx,
                                            datas?.Id_karton
                                          )
                                        }
                                        className={`w-12 bg-white ${
                                          editApprovalObj === objProduk.id_produk && 'border-b-2'
                                        }`}
                                        disabled={
                                          editApprovalObj !== objProduk.id_produk
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TableApprovalWhIndo;
