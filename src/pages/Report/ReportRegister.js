import { getUser } from 'helpers/parseJWT';
import { Tooltip } from '@mui/material';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { getAllCustomerRequest } from 'service/api';
import FilterReport from 'components/Report/FilterReport';
import ReportPenjualanTable from 'components/Report/Penjualan/ReportPenjualanTable';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesReport as SUBROUTES } from 'components/Report/SubRoutesReport';
import moment from 'moment';
import ReportRegisterTable from 'components/Report/Register/ReportRegisterTable';

const ReportRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [update, setUpdate] = useState(false);
  const { obe: userOBE } = useSelector(selectAddData);

  const [selectData, setSelectData] = useState({
    select_by: '',
    start: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
  });

  const fetchData = async () => {
    const { start, end, select_by } = selectData;

    setIsLoading(true);

    const select_byPayload = select_by !== '' ? `select_by=${select_by}&` : '';
    const startDate = start !== '' ? `start=${start}&` : '';
    const endDate = end !== '' ? `end=${end}` : '';

    let params = select_byPayload + startDate + endDate;

    const response = await getAllCustomerRequest(params);
    if (response?.status === 200) {
      setData(response.data);
    } else {
      swal('Oops', `${response?.message}`, 'error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (dataFiltered?.length !== 0) {
      setData(dataFiltered);
    }
  }, [dataFiltered]);

  useEffect(() => {
    fetchData();
  }, [update]);

  return (
    <Layout routes={SUBROUTES()} title="CRM">
      <Tooltip title="Refresh table" placement="right">
        <button
          className="my-4 bg-white w-52 p-2  rounded-md cursor-pointer text-center">
          Report Register
        </button>
      </Tooltip>

      <FilterReport
        setDataFiltered={setDataFiltered}
        setIsLoading={setIsLoading}
        selectData={selectData}
        setSelectData={setSelectData}
      />
      <ReportRegisterTable
        dataTable={data}
        isLoading={isLoading}
        setUpdate={setUpdate}
        update={update}
        selectData={selectData}
        setSelectData={setSelectData}
      />
    </Layout>
  );
};

export default ReportRegister;
