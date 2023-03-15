import { getUser } from 'helpers/parseJWT';
import { Tooltip } from '@mui/material';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { getAllCustomerRequest } from 'service/api';
import swal from 'sweetalert';
import AllCustomerRequestTable from 'components/ManagementSales/AllCustomerRequest/AllCustomerRequestTable';
import FilterAllCustomerRequest from 'components/ManagementSales/AllCustomerRequest/FilterAllCustomerRequest';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesManagementSales as SUBROUTES } from 'components/ManagementSales/SubRoutesManagementSales';
import moment from 'moment';

const AllCustomerRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterWithSales, setFilterWithSales] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [update, setUpdate] = useState(false);
  const { obe: userOBE } = useSelector(selectAddData);

  const [selectData, setSelectData] = useState({
    sales: '',
    status: '',
    start: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
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

  //   // New From Presales
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
    const { start, end, status, sales } = selectData;

    setIsLoading(true);

    const salesPayload = sales !== '' ? `sales=${sales}&` : '';
    const statusPayload = status !== '' ? `status=${status}&` : '';
    const startDate = start !== '' ? `start=${start}&` : '';
    const endDate = end !== '' ? `end=${end}` : '';

    let params = salesPayload + statusPayload + startDate + endDate;

    const response = await getAllCustomerRequest(params);
    if (response?.status === 200) {
      setData(response.data);
      setFilterWithSales(response.sales.map((user) => user.user));
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
    <Layout routes={SUBROUTES(userOBE)} title="CRM">
      <Tooltip title="Refresh table" placement="right">
        <button
          onClick={fetchData}
          className="my-4 bg-white w-52 p-2  rounded-md cursor-pointer text-center">
          All Customer Request
        </button>
      </Tooltip>

      <FilterAllCustomerRequest
        filterWithSales={filterWithSales}
        setIsFiltered={setIsFiltered}
        setDataFiltered={setDataFiltered}
        setIsLoading={setIsLoading}
        selectData={selectData}
        setSelectData={setSelectData}
      />
      <AllCustomerRequestTable
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

export default AllCustomerRequest;
