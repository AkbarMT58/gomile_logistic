import { useState, useEffect } from 'react';
import { getMyTasks } from 'service/api';
import { Tooltip } from '@mui/material';
import Layout from 'components/Layout';
import { getUser } from 'helpers/parseJWT';
import swal from 'sweetalert';

import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesMyTasks as SUBROUTES } from 'components/MyTasks/SubRoutesMyTasks';
import AfterSalesTable from 'components/MyTasks/AfterSalesTable';
import FilterDate from 'components/MyTasks/FilterDate';
import { fetchData } from 'components/MyTasks/fetchData';

const MyTasksAfterSales = () => {
  const { obe: userOBE } = useSelector(selectAddData);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [date, setDate] = useState({
    sales: '',
    start: '',
    end: '',
    status: '',
    type: '',
    id: '',
  });

  // const fetchData = async () => {
  //   setIsLoading(true);

  //   const startParams = date.start !== '' ? `start=${date.start}&` : '';
  //   const endParams = date.end !== '' ? `end=${date.end}&` : '';
  //   const status = date.status !== '' ? `status=${date.status}&` : '';
  //   const type = date.type !== '' ? `type=${date.type}&` : '';
  //   const idParams = date.id !== '' ? `id_so=${date.id}&` : '';

  //   const params =
  //     `page=${page}&limit=${limit}&menu=AfterSales&` +
  //     startParams +
  //     endParams +
  //     status +
  //     type +
  //     idParams;

  //   const response = await getMyTasks(params);
  //   if (response?.status === 200) {
  //     setData(response?.data);
  //   } else if (response?.status === 500) {
  //     swal('Oops', `Server is Shutting Down`, 'error');
  //   } else {
  //     swal('Oops', `${response?.message}`, 'error');
  //   }
  //   setIsLoading(false);
  // };

  useEffect(() => {
    fetchData(date, setData, setIsLoading, page, limit, 'AfterSales');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, page, limit]);

  return (
    <Layout routes={SUBROUTES(userOBE)} title="My Tasks">
      <Tooltip title="Refresh table" placement="right">
        <p
          className="my-4 bg-white w-32 p-2  rounded-md cursor-pointer text-center"
          onClick={() => fetchData(date, setData, setIsLoading, page, limit, 'AfterSales')}>
          After Sales
        </p>
      </Tooltip>
      <FilterDate
        date={date}
        setDate={setDate}
        setUpdate={setUpdate}
        page={page}
        setPage={setPage}
      />

      <AfterSalesTable
        page={page}
        limit={limit}
        dataTable={data}
        isLoading={isLoading}
        totalPage={data?.totalPage}
        setPage={setPage}
        setLimit={setLimit}
        setUpdate={setUpdate}
      />
    </Layout>
  );
};

export default MyTasksAfterSales;
