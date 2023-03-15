import Layout from 'components/Layout';
import GenerateVoucher from 'components/ManagementSales/VoucherGenartor/GenerateVoucher';
import ListVoucherTable from 'components/ManagementSales/VoucherGenartor/ListVoucherTable';
import { useState, useEffect } from 'react';
import { getVoucherData } from 'service/api';
import { Tooltip } from '@mui/material';
import { getUser } from 'helpers/parseJWT';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesManagementSales as SUBROUTES } from 'components/ManagementSales/SubRoutesManagementSales';

const VoucherGenerator = () => {
  const [voucherData, setVoucherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
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

  const fetchVoucherData = async () => {
    setIsLoading(true);
    const data = await getVoucherData();
    if (data) {
      setVoucherData(data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchVoucherData();
  }, [update]);
  return (
    <Layout routes={SUBROUTES(userOBE)} title="CRM">
      <Tooltip title="Refresh table" placement="right">
        <p
          className="my-4 bg-white w-40 p-2 text-center rounded-md cursor-pointer"
          onClick={fetchVoucherData}>
          Voucher Generator
        </p>
      </Tooltip>
      <GenerateVoucher setUpdate={setUpdate} />
      <ListVoucherTable isLoading={isLoading} voucherData={voucherData} />
    </Layout>
  );
};

export default VoucherGenerator;
