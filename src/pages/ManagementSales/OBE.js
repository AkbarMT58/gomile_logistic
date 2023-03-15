import Layout from 'components/Layout';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Tooltip } from '@mui/material';
import CustomerTable from 'components/ManagementSales/OBE/CustomerTable';
import AddCustomer from 'components/ManagementSales/OBE/AddCustomer';
import PaginationFilter from 'components/ManagementSales/OBE/PaginationFilter';
import { getUser } from 'helpers/parseJWT';
import { getListOBE } from 'service/api';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesManagementSales as SUBROUTES } from 'components/ManagementSales/SubRoutesManagementSales';

const OBE = () => {
  const [customerData, setCustomerData] = useState([]);
  const [changeData, setChangeData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState('');
  const [select, setSelect] = useState('true');
  const { obe: userOBE } = useSelector(selectAddData);
  const [ListSalesWithoutHendro, setListSalesWithoutHendro] = useState([]);

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

  const fetchCustomerData = async (page, limit, select) => {
    setIsLoading(true);
    const params = new URLSearchParams({
      page,
      limit: limit ? limit : 50,
      withsales: select,
    }).toString();
    const data = await getListOBE(page, limit, params);
    if (data?.status === 200) {
      if (data.data.data.length === 0 && data.data?.errorMessage)
        swal('Oops', `${data.data.errorMessage}`, 'error');
      setCustomerData(data.data);
    } else {
      swal('error', `${data?.message}, 'error'`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCustomerData(page, limit, select);
  }, [changeData, limit, page, select]);

  useEffect(() => {
    const arr = userOBE?.filter((item) => item !== 'hendro');
    setListSalesWithoutHendro(arr);
  }, [userOBE]);

  return (
    <Layout routes={SUBROUTES(userOBE)} title="CRM">
      <Tooltip title="Refresh table" placement="right">
        <p
          className="my-4 bg-white w-12 p-2 rounded-md cursor-pointer text-center"
          onClick={() => {
            setLimit(50);
            setPage(1);
            setSelect('');
          }}>
          OBE
        </p>
      </Tooltip>
      <div className="flex items-center justify-between bg-white p-2 rounded-md my-3 md:overflow-x-hidden overflow-x-scroll w-full">
        <div className="flex space-x-3 items-center">
          <AddCustomer
            setChangeData={setChangeData}
            setLoading={setIsLoading}
          />
          {customerData.totalData && (
            <div>
              <p className="md:text-sm text-xs font-semibold line-clamp-1">
                Showing {customerData.dataInPage} data of{' '}
                {customerData.totalData}
              </p>
            </div>
          )}
        </div>
        <PaginationFilter
          page={page}
          setPage={setPage}
          setLimit={setLimit}
          totalPage={customerData?.totalPage}
          listSales={ListSalesWithoutHendro}
          select={select}
          setSelect={setSelect}
        />
      </div>
      <CustomerTable
        customerData={customerData}
        isLoading={isLoading}
        setChangeData={setChangeData}
        setLoading={setIsLoading}
      />
    </Layout>
  );
};

export default OBE;
