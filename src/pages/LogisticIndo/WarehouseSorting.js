import React, { useEffect, useState } from 'react';
import {
  filterDatWarehouseSendIDN,
  getDataWarehouseSendIDN,
  getDataWarehouseTotal,
  updateDataWarehouseSendIDN,
} from 'service/api';
import swal from 'sweetalert';
import Layout from 'components/Layout';
import Print from 'components/LogisticIndo/GudangPengiriman/Print';
import SearchBox from 'components/LogisticIndo/GudangPengiriman/SearchBox';
import ModalFilter from 'components/LogisticIndo/GudangPengiriman/ModalFilter';
import LayoutTable from 'components/LogisticIndo/GudangPengiriman/LayoutTable';
import HeaderPengiriman from 'components/LogisticIndo/GudangPengiriman/HeaderPengiriman';
import { SubRoutesLogisticIndo as SUBROUTES } from 'components/LogisticIndo/SubRoutesLogisticIndo';
import DownloadExcel from 'components/LogisticIndo/GudangPengiriman/DownloadExcel';

const WarehouseSorting = () => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataTotalGudang, setDataTotalGudang] = useState([]);
  const [inputs, setinputs] = useState({
    pencarian: '',
    resultPencarian: null,
    isModal: false,
    wilayah: '',
    kurir: '',
    container: '',
    tanggal: '',
  });

  const handleClose = () =>
    setinputs({
      ...inputs,
      isModal: false,
    });

  const handleCariData = (value) => {
    // array -> arrayFiltered -> EditJadwal, gabungin Lagi
    let tempData = [...data];

    tempData.filter((i) => i === value);

    const result = tempData?.filter((i) => {
      return Object.values(i)
        .join('')
        .toLowerCase()
        .includes(value.toLowerCase());
    });

    setinputs({
      ...inputs,
      resultPencarian: result,
    });
  };

  const handleSubmit = async () => {
    let tempSubmitData = data?.filter((i) => i.is_updated === true);
    let tempSubmitInputs = inputs?.resultPencarian
      ? inputs?.resultPencarian?.filter((i) => i.is_updated === true)
      : [];
    let resultSubmit = [...tempSubmitData, ...tempSubmitInputs];

    console.log(resultSubmit);

    const body = JSON.stringify(resultSubmit);

    if (!resultSubmit?.length) {
      swal('Peringatan', 'Tidak ada jadwal yang berubah', 'warning');
      return;
    }

    const response = await updateDataWarehouseSendIDN(body);
    if (response?.status === 200) {
      swal(
        'Berhasil',
        `${resultSubmit?.length} Data berhasil di Submit`,
        'success'
      );
    } else {
      swal(
        'Berhasil',
        `Data Gagal di Submit, Error : ${response?.message}`,
        'success'
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    handleCariData(value);
    setinputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleChangeDate = (e, id) => {
    const { value, name } = e.target;

    if (name === 'data') {
      let tempData = [...data];
      tempData[id].jadwal = value;
      tempData[id].is_updated = value?.length !== 0 ? true : false;

      setinputs({
        ...inputs,
        resultPencarian: tempData,
      });
      swal(
        `1 data telah di update di komputer anda. Kirim Melalui Submit Data`
      );
      return;
    }

    if (name === 'inputsResultPencarian') {
      let tempData = [...inputs?.resultPencarian];
      tempData[id].jadwal = value;
      tempData[id].is_updated = value?.length !== 0 ? true : false;

      setinputs({
        ...inputs,
        resultPencarian: tempData,
      });
      swal(
        `1 data telah di update di komputer anda. Kirim Melalui Submit Data`
      );
      return;
    }

    if (name === 'all') {
      let dataChange = data.forEach((data) => {
        data.jadwal = value;
        data.is_updated = value?.length !== 0 ? true : false;
      });

      setinputs({
        ...inputs,
        resultPencarian: dataChange,
      });

      swal(
        `${data?.length} data telah di update di komputer anda. Kirim Melalui Submit Data`
      );
      return;
    }

    if (name === 'allFiltered') {
      let dataChange = inputs?.resultPencarian.forEach((data) => {
        data.jadwal = value;
        data.is_updated = value?.length !== 0 ? true : false;
      });

      setinputs({
        ...inputs,
        pencarian: '',
        resultPencarian: dataChange,
      });

      swal(
        `${inputs?.resultPencarian?.length} data telah di update di komputer anda. Kirim Melalui Submit Data`
      );
      return;
    }
  };

  const handleFilter = () => {
    setinputs({
      ...inputs,
      isModal: true,
    });
  };

  const handleSubmitFilter = async () => {
    const { wilayah, kurir, container, tanggal } = inputs;
    setisLoading((prev) => !prev);

    let body = {
      wilayah,
      kurir,
      container,
      tanggal,
    };

    if (!wilayah && !kurir && !container && !tanggal) {
      swal('Oops', `Minimum 1 filter input dipilih`, 'info');
      return setisLoading((prev) => !prev);
    }

    const response = await filterDatWarehouseSendIDN(JSON.stringify(body));
    if (response?.status === 200) {
      setData(response?.data);
      setinputs({
        ...inputs,
        resultPencarian: null,
        isModal: false,
      });
    } else {
      swal('error', `Gagal Filter Data, ${response.message}`, 'error');
    }

    return setisLoading((prev) => !prev);
  };

  const handleCariDataTerbanyak = async (nameWilayah) => {
    let body = {
      wilayah: nameWilayah,
    };

    const response = await filterDatWarehouseSendIDN(JSON.stringify(body));
    if (response?.status === 200) {
      setData(response?.data);
      setinputs({
        ...inputs,
        resultPencarian: null,
        isModal: false,
      });
    } else {
      swal('error', `Gagal Filter Data, ${response?.message}`, 'error');
    }
  };

  const handleRefreshTable = async () => {
    setisLoading((prev) => !prev);
    const params = new URLSearchParams({ page: 1, limit: 5000 }).toString();

    const response = await getDataWarehouseSendIDN(params);
    if (response?.status === 200) {
      setData(response?.data);
      setinputs({
        ...inputs,
        pencarian: '',
      });
    } else {
      swal('error', `Gagal Mendapatkan Data : ${response?.message}`, 'error');
    }

    return setisLoading((prev) => !prev);
  };

  useEffect(() => {
    const fetchDataGudangPengiriman = async () => {
      setisLoading((prev) => !prev);
      const params = new URLSearchParams({ page: 1, limit: 5000 }).toString();

      const response = await getDataWarehouseSendIDN(params);
      if (response?.status === 200) {
        setData(response?.data);
      } else {
        swal('error', `Gagal Mendapatkan Data : ${response?.message}`, 'error');
      }

      return setisLoading((prev) => !prev);
    };

    fetchDataGudangPengiriman();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchDataGudangTotal = async () => {
      const response = await getDataWarehouseTotal();
      if (response?.status === 200) {
        setDataTotalGudang(response?.data);
      }
    };

    fetchDataGudangTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const SUBROUTES = [
  //   {
  //     name: 'Received WH Indo',
  //     pathname: '/logistic-indo/received-wh-indo',
  //   },
  //   {
  //     name: 'Gudang Pengiriman',
  //     pathname: '/logistic-indo/warehouse-sorting',
  //   },
  //   {
  //     name: 'WH Indo Delivery',
  //     pathname: '/logistic-indo/wh-indo-delivery',
  //   },
  //   {
  //     name: 'Logistics Indo',
  //     pathname: '/logistic-indo/logistics-indo',
  //   },
  //   {
  //     name: 'Form Actual Price',
  //     pathname: '/logistic-indo/form-actual-price',
  //   },
  //   { name: 'Abnormal', pathname: '/logistic-indo/abnormal' },
  //   // { name: 'Persetujuan', pathname: '/logistic-indo/ApprovalWhIndo' },
  // ];

  return (
    <Layout searchBar={false} routes={SUBROUTES()} title="Gudang Pengiriman">
      <HeaderPengiriman
        dataTotalPengiriman={dataTotalGudang}
        isLoading={isLoading}
        handleCariDataTerbanyak={handleCariDataTerbanyak}
      />

      <div
        style={{ fontFamily: 'Poppins' }}
        className="bg-white w-full rounded-lg p-5 mt-2">
        <SearchBox
          inputs={inputs}
          setinputs={setinputs}
          handleChange={handleChange}
          handleRefreshTable={handleRefreshTable}
        />

        <div className="mt-7">
          <div className="ml-4 space-x-5 relative mt-10">
            <Print inputs={inputs} />
            <DownloadExcel data={data} />

            <button
              onClick={handleFilter}
              className="bg-blue-500 rounded-t-lg duration-300 text-white text-sm px-5 pt-1 pb-px absolute bottom-0 right-10 hover:pb-5">
              Filter Data Server
            </button>
          </div>
          <LayoutTable
            isLoading={isLoading}
            inputs={inputs}
            data={data}
            handleChangeDate={handleChangeDate}
          />
        </div>
        <div className="flex items-center justify-end mt-5">
          <button
            onClick={handleSubmit}
            className="text-white bg-blue-400 text-lg px-5 py-2 rounded-md hover:bg-blue-500">
            Submit Data
          </button>
        </div>
      </div>
      <ModalFilter
        inputs={inputs}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmitFilter={handleSubmitFilter}
      />
    </Layout>
  );
};

export default WarehouseSorting;
