import Layout from 'components/Layout';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { getUser } from 'helpers/parseJWT';
import { useEffect, useState } from 'react';
import { getNewCustomerData } from 'service/api';
import NewCustomerTable from 'components/ManagementSales/NewCustomer/NewCustomerTable';
import FilterNewCustomer from 'components/ManagementSales/NewCustomer/FilterNewCustomer';
import swal from 'sweetalert';
import { Tooltip } from '@mui/material';
import { SubRoutesManagementSales as SUBROUTES } from 'components/ManagementSales/SubRoutesManagementSales';

const NewCustomer = () => {
  const [dataNewCustomer, setdataNewCustomer] = useState([]);
  const [changeData, setChangeData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [dataFiltered, setDataFiltered] = useState([]);
  const { obe: userOBE } = useSelector(selectAddData);
  const [isLimit] = useState('100');

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

  const fetchDataNewCustomer = async () => {
    setIsLoading(true);

    const data = await getNewCustomerData();
    if (data?.status === 200) {
      setdataNewCustomer(data?.data);
    } else {
      swal('Oops', `Gagal Mengambil Data, Coba lagi`, 'error');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setdataNewCustomer(dataFiltered);
  }, [dataFiltered, isFiltered]);

  useEffect(() => {
    fetchDataNewCustomer();
  }, [changeData]);

  return (
    <Layout routes={SUBROUTES(userOBE)} title="CRM">
      <Tooltip title="Refresh table" placement="right">
        <p
          className="my-4 bg-white w-60 p-2 rounded-md cursor-pointer text-center"
          onClick={() => {}}>
          New Customer Management
        </p>
      </Tooltip>
      <FilterNewCustomer
        setDataFiltered={setDataFiltered}
        setIsFiltered={setIsFiltered}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <NewCustomerTable
        isLimit={isLimit}
        dataNewCustomer={dataNewCustomer}
        userOBE={userOBE}
        setChangeData={setChangeData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default NewCustomer;
