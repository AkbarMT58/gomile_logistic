import { useState, useEffect } from 'react';
import { getAllOrdersData } from 'service/api';
import { Tooltip } from '@mui/material';
import Layout from 'components/Layout';
import { getUser } from 'helpers/parseJWT';
import swal from 'sweetalert';
import AllOrdersTable from 'components/ManagementSales/AllOrders/AllOrdersTable';
import FilterDate from 'components/ManagementSales/AllOrders/FilterDate';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesManagementSales as SUBROUTES } from 'components/ManagementSales/SubRoutesManagementSales';

const AllOrders = () => {
  const { obe: userOBE } = useSelector(selectAddData);
  const [data, setData] = useState([]);
  const [filterWithSales, setFilterWithSales] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [date, setDate] = useState({
    sales: '',
    start: '',
    end: '',
    status: '',
    id: '',
  });

  // const SUBROUTES = [
  //   {
  //     name: `${
  //       userOBE?.includes(getUser().user) && getUser().role === 'sales'
  //         ? ''
  //         : 'Customer Management'
  //     }`,
  //     pathname: '/management-sales/customer-management',
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Sales Target' : ''}`,
  //     pathname: '/management-sales/sales-target',
  //   },
  //   {
  //     name: `${userOBE?.includes(getUser().user) ? 'New Customer' : ''}`,
  //     pathname: '/management-sales/New-customer',
  //   },
  //   {
  //     name: `${
  //       userOBE?.includes(getUser().user) ? 'Customer Management OBE' : ''
  //     }`,
  //     pathname: '/management-sales/obe',
  //   },
  //   {
  //     name: `${
  //       userOBE?.includes(getUser().user) && getUser().role === 'sales'
  //         ? ''
  //         : 'All Customer Request'
  //     }`,
  //     pathname: '/management-sales/all-customer-request',
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Voucher Generator' : ''}`,
  //     pathname: '/management-sales/voucher-generator',
  //   },
  //   { name: 'Sales Request', pathname: '/management-sales/sales-request' },
  //   {
  //     name: 'All Orders',
  //     pathname: '/management-sales/all-orders',
  //   },
  // ];

  const fetchData = async () => {
    setIsLoading(true);

    const salesParams = date.sales !== '' ? `sales=${date.sales}&` : '';
    const startParams = date.start !== '' ? `start=${date.start}&` : '';
    const endParams = date.end !== '' ? `end=${date.end}&` : '';
    const statusParams = date.status !== '' ? `status=${date.status}&` : '';
    const idParams = date.id !== '' ? `id=${date.id}&` : '';

    const params =
      `page=${page}&limit=${limit}&` +
      salesParams +
      startParams +
      endParams +
      statusParams +
      idParams;

    const response = await getAllOrdersData(params);
    if (response?.status === 200) {
      setData(response?.data);
      setFilterWithSales(response.sales.map((user) => user.user));
    } else if (response?.status === 500) {
      swal('Oops', `Server is Shutting Down`, 'error');
    } else {
      swal('Oops', `${response?.message}`, 'error');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, page, limit]);

  return (
    <Layout routes={SUBROUTES(userOBE)} title="CRM">
      <Tooltip title="Refresh table" placement="right">
        <p
          className="my-4 bg-white w-32 p-2  rounded-md cursor-pointer text-center"
          onClick={fetchData}>
          All Orders
        </p>
      </Tooltip>
      <FilterDate
        page={page}
        date={date}
        setDate={setDate}
        setPage={setPage}
        setUpdate={setUpdate}
        filterWithSales={filterWithSales}
      />

      <AllOrdersTable
        page={page}
        limit={limit}
        dataTable={data?.data}
        isLoading={isLoading}
        totalPage={data.totalPage}
        setPage={setPage}
        setLimit={setLimit}
        setUpdate={setUpdate}
      />
    </Layout>
  );
};

export default AllOrders;
