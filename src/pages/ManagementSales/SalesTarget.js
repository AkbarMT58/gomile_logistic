import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import SalesTable from 'components/ManagementSales/SalesTarget/SalesTable';
import { getUser } from 'helpers/parseJWT';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { getSalesData } from 'service/api';
import FilterSalesTarget from 'components/ManagementSales/SalesTarget/FilterSalesTarget';
import { SubRoutesManagementSales as SUBROUTES } from 'components/ManagementSales/SubRoutesManagementSales';

const SalesTarget = () => {
  const { obe: userOBE } = useSelector(selectAddData);
  const [salesData, setSalesData] = useState([]);
  const [salesDataNew, setsalesDataNew] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

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

  const fetchSalesData = async () => {
    setIsLoading(true);

    const data = await getSalesData();

    if (data?.status === 200) {
      setSalesData(data.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchSalesData();
  }, [update]);

  useEffect(() => {
    setSalesData(salesDataNew);
  }, [salesDataNew, isFiltered]);

  return (
    <Layout routes={SUBROUTES(userOBE)} title="CRM">
      <p className="my-4 bg-white w-28 p-2 rounded-md cursor-pointer text-center">
        Sales Target
      </p>
      <FilterSalesTarget
        setIsLoading={setIsLoading}
        setIsFiltered={setIsFiltered}
        setsalesDataNew={setsalesDataNew}
      />

      <SalesTable
        isLoading={isLoading}
        setUpdate={setUpdate}
        salesData={salesData}
      />
    </Layout>
  );
};

export default SalesTarget;
