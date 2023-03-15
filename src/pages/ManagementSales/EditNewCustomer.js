import Layout from 'components/Layout';
import { useSelector } from 'react-redux';
import { getUser } from 'helpers/parseJWT';
import { selectAddData } from 'redux/addDataSlice';
import React, { useEffect, useState } from 'react';
import { getDetailsNewCustomerData } from 'service/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory, useLocation } from 'react-router-dom';
import CardAddNewSales from 'components/ManagementSales/NewCustomer/EditNewCustomer/CardAddNewSales';
import CardHistory from 'components/ManagementSales/NewCustomer/EditNewCustomer/CardHistory';
import ReleaseSales from 'components/ManagementSales/NewCustomer/EditNewCustomer/ReleaseSales';
import CardLastOrder from 'components/ManagementSales/NewCustomer/EditNewCustomer/CardLastOrder';
import CardCustomerDetails from 'components/ManagementSales/NewCustomer/EditNewCustomer/CardCustomerDetails';
import ButtonNewPassword from 'components/ManagementSales/NewCustomer/EditNewCustomer/ButtonNewPassword';
import { SubRoutesManagementSales as SUBROUTES } from 'components/ManagementSales/SubRoutesManagementSales';

const EditNewCustomer = () => {
  const { email } = useLocation();
  const history = useHistory();
  const { obe: userOBE } = useSelector(selectAddData);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataEditNewCustomer, setDataEditNewCustomer] = useState({
    customer: {},
    history: {},
    last_order: [],
    obe: [],
    NewPassword: ``,
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

  const fetchDetailsNewCustomer = async () => {
    setIsLoading(true);
    const res = await getDetailsNewCustomerData(email);
    if (res?.status === 200) {
      setDataEditNewCustomer({
        ...dataEditNewCustomer,
        customer: res?.customer,
        history: res?.history,
        last_order: res?.last_order,
        obe: res?.obe,
      });
      setIsLoading(false);
    } else {
      console.log(res?.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    !email
      ? history.push('/management-sales/New-customer')
      : fetchDetailsNewCustomer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, history, dataUpdate]);

  return (
    <Layout routes={SUBROUTES(userOBE)} searchBar={false} title="CRM">
      <div style={{ fontFamily: 'Poppins' }}>
        <div className="flex justify-between items-center bg-white rounded-lg px-5 mb-5">
          <a
            href="/management-sales/New-customer"
            className="flex items-center justify-center py-2 text-lg gap-2 text-black font-bold my-2">
            <ArrowBackIcon fontSize="large" className="shadow-md" />
            Account Customers
          </a>
          {userOBE?.includes(getUser().user) && (
            <ButtonNewPassword
              dataEditNewCustomer={dataEditNewCustomer}
              setDataEditNewCustomer={setDataEditNewCustomer}
              email={email}
            />
          )}
        </div>
        <CardHistory
          isLoading={isLoading}
          history={dataEditNewCustomer?.history}
        />
        <div className="flex mt-5 gap-2">
          <CardCustomerDetails
            loading={isLoading}
            CustomerDetails={dataEditNewCustomer?.customer}
            setDataUpdate={setDataUpdate}
          />
          <div className="w-96">
            <div className="flex flex-col gap-2 h-full">
              <CardAddNewSales
                listSales={dataEditNewCustomer?.obe}
                email={email}
                initialSales={dataEditNewCustomer?.customer?.sales}
                setDataUpdate={setDataUpdate}
              />
              <ReleaseSales
                id={dataEditNewCustomer?.customer?.id}
                sales={dataEditNewCustomer?.customer?.sales}
                setDataUpdate={setDataUpdate}
              />
            </div>
          </div>
        </div>
        <CardLastOrder lastOrder={dataEditNewCustomer?.last_order} />
      </div>
    </Layout>
  );
};

export default EditNewCustomer;
