import Layout from 'components/Layout';
import CustomerTable from 'components/ManagementSales/CustomerManagement/CustomerTable';
import CustomFilter from 'components/ManagementSales/CustomerManagement/CustomFilter';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Tooltip } from '@mui/material';
import { getListCustomerManagement } from 'service/api';
import { getUser } from 'helpers/parseJWT';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesManagementSales as SUBROUTES } from 'components/ManagementSales/SubRoutesManagementSales';

const CustomerManagement = () => {
  const [customerData, setCustomerData] = useState([]);
  const [changeData, setChangeData] = useState(false);
  const [filterData, setFilterData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState('');
  const [searchData, setSearchData] = useState('');
  const { obe: userOBE } = useSelector(selectAddData);

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

  const fetchCustomerData = async (filterData, searchData, page, limit) => {
    setIsLoading(true);
    const params = new URLSearchParams({
      ...filterData,
      page,
      limit,
    }).toString();
    const setParams = `?${params}`;

    const data = await getListCustomerManagement(searchData, setParams);

    if (data?.status === 200) {
      if (data.data.data.length === 0 && data.data?.errorMessage)
        swal('Oops', `${data.data.errorMessage}`, 'error');
      setCustomerData(data.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomerData(filterData, searchData, page, limit);
  }, [changeData, filterData, searchData, page, limit]);

  return (
    <Layout routes={SUBROUTES(userOBE)} title="CRM">
      <Tooltip title="Refresh table" placement="right">
        <p
          className="my-4 bg-white w-48 p-2 rounded-md cursor-pointer text-center"
          onClick={() => {
            setFilterData({});
            setSearchData('');
          }}>
          Customer Management
        </p>
      </Tooltip>
      <CustomFilter
        setFilterData={setFilterData}
        setCustomerData={setCustomerData}
        setIsLoading={setIsLoading}
        setSearchData={setSearchData}
        listSales={customerData?.listSales}
        totalData={customerData?.totalData}
        dataCount={customerData?.dataInPage}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        limit={limit}
        totalPage={customerData?.totalPage}
      />
      <CustomerTable
        customerData={customerData}
        setChangeData={setChangeData}
        isLoading={isLoading}
        setSearchData={setSearchData}
      />
    </Layout>
  );
};

export default CustomerManagement;
