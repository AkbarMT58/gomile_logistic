import React, { useEffect, useState } from 'react';
import { formatDateDDMMYY } from 'helpers/ConvertTime';
import {
  getAllDataAprovalWHindo,
  recjectAprovalWHindo,
  recjectMultipleAprovalWHindo,
  sendAprovalWHindo,
} from 'service/api';
import Layout from 'components/Layout';
import swal from 'sweetalert';
import TableApprovalWhIndo from 'components/LogisticIndo/ApprovalWhIndo/TableApprovalWhIndo';
import SearchApprovalWhIndo from 'components/LogisticIndo/ApprovalWhIndo/SearchApprovalWhIndo';
import { SubRoutesLogisticIndo as SUBROUTES } from 'components/LogisticIndo/SubRoutesLogisticIndo';

const ApprovalWhIndo = () => {
  const [data, setData] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [isInputs, setIsInputs] = useState({
    searchInput: '',
    modeSearch: '',
    dumbTable: [],
  });
  const [isBolean, setIsBolean] = useState({
    isFirstFetch: false,
    isShowMore: false,
    isLoading: false,
    isDataUpdated: false,
  });

  const handleSendAproval = (data, setCheckedRowData) => {
    // const payload = {
    //   id_so: data?.id_so,
    //   Id_karton: data?.Id_karton,
    //   gambar: [],
    //   produk: data?.produk,
    // };
    
    swal({
      title: `Apakah Anda Yakin ?`,
      text: `${Array.isArray(data) ? "Konfirmasi Semua Order Rows Terpilih" : "Konfirmasi ID Order : " + data?.Id_karton}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (konfirmasi) => {
      if (konfirmasi) {
        const response = await sendAprovalWHindo(JSON.stringify(data));
        if (response?.status === 200) {
          swal(
            'success',
            `${Array.isArray(data) ? "Berhasil Mengonfirmasi Semua Order Rows Terpilih" : "Berhasil Konfirmasi, ID Order :" + data?.Id_karton}`,
            'success'
          ).then(async () => {
            setIsBolean((prev) => ({
              ...prev,
              isDataUpdated: !prev.isDataUpdated,
            }));
            setDataUpdated((prev) => !prev);
            document.getElementById('check-all').checked = false
            setCheckedRowData([])
          });
        }
      }
    });
  };

  const handleRejectAproval = (data) => {
    swal({
      title: `Apakah Anda Yakin ?`,
      text: `Reject ID Order : ${data?.Id_karton}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (Reject) => {
      if (Reject) {
        const response = await recjectAprovalWHindo(data?.Id_karton);
        if (response.status === 200) {
          swal(
            'success',
            `Berhasil Reject, ID Order : ${data?.Id_karton}`,
            'success'
          );
          setDataUpdated((prev) => !prev);
        } else {
          swal('Error', `${response.message}`, 'error');
        }
      }
    });
  };
  
  const handleRejectMultipleAproval = (data) => {
    swal({
      title: `Apakah Anda Yakin ?`,
      text: `Reject Semua Order Rows Terpilih`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (Reject) => {
      if (Reject) {
        const response = await recjectMultipleAprovalWHindo(JSON.stringify(data));
        if (response.status === 200) {
          swal(
            'success',
            `Berhasil Reject Rows Terpilih`,
            'success'
          );
          setDataUpdated((prev) => !prev);
        } else {
          swal('Error', `${response.message}`, 'error');
        }
      }
    });
  };

  const handleChangeInputs = (e) => {
    const { name, value } = e.target;

    setIsInputs({
      ...isInputs,
      [name]: value,
    });
  };

  const handleShowMore = (index) => {
    if (isBolean?.isShowMore !== index) {
      setIsBolean(() => {
        return {
          ...isBolean,
          isShowMore: index,
        };
      });
    } else {
      setIsBolean(() => {
        return {
          ...isBolean,
          isShowMore: null,
        };
      });
    }
  };

  const fetchDataAprovalWHindo = async () => {
    setIsBolean(() => {
      return {
        ...isBolean,
        isFirstFetch: true,
      };
    });

    const response = await getAllDataAprovalWHindo();
    if (response?.status === 200) {
      const newData = response?.data.map((obj) => {
        return {
          ...obj,
          tanggal: formatDateDDMMYY(obj?.tanggal),
          warna:
            obj.warna === 'hijau'
              ? 'text-green-500'
              : obj.warna === 'kuning'
              ? 'text-yellow-500'
              : 'text-red-500',
        };
      });

      setData(newData);
      setIsInputs({
        ...isInputs,
        dumbTable: newData,
      });
    } else {
      swal('Error', `${response?.message}`, 'error');
    }

    setIsBolean(() => {
      return {
        ...isBolean,
        isFirstFetch: false,
      };
    });
  };

  const handleSearchTable = () => {
    const value = isInputs?.searchInput;

    let ClonedData = [...data];
    const result = ClonedData?.filter((obj) => {
      return Object.values(obj)
        .join('')
        .toLowerCase()
        .includes(value.toLowerCase());
    });

    setData(result);
    setIsInputs({
      searchInput: '',
      modeSearch: '',
      dumbTable: ClonedData,
    });
  };

  useEffect(() => {
    fetchDataAprovalWHindo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdated]);

  return (
    <Layout routes={SUBROUTES()} title="Logistic Indo">
      <div className="flex justify-start">
        <p className="my-4 bg-white  p-2 rounded-md cursor-pointer text-center">
          Persetujuan Gudang Indo
        </p>
      </div>

      <div className="w-full mb-5 bg-white p-2 rounded-md flex gap-5">
        <SearchApprovalWhIndo
          setData={setData}
          isInputs={isInputs}
          handleSearchTable={handleSearchTable}
          handleChangeInputs={handleChangeInputs}
        />
      </div>
      <TableApprovalWhIndo
        data={data}
        isBolean={isBolean}
        handleSendAproval={handleSendAproval}
        handleRejectAproval={handleRejectAproval}
        handleRejectMultipleAproval={handleRejectMultipleAproval}
        handleShowMore={handleShowMore}
      />
    </Layout>
  );
};

export default ApprovalWhIndo;
