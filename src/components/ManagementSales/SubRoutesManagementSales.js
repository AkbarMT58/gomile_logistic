import { getUser } from 'helpers/parseJWT';

export const SubRoutesManagementSales = (userOBE) => [
  {
    name: `${
      getUser().user === 'hendro' || getUser().user === 'damai'
        ? 'Customer Management'
        : ''
    }`,
    pathname: '/management-sales/customer-management',
  },
  {
    name: `${getUser().role === 'admin' ? 'Sales Target' : ''}`,
    pathname: '/management-sales/sales-target',
  },
  {
    name: `${['obe'].some((i) => getUser().division.includes(i)) ? 'New Customer' : ''}`,
    pathname: '/management-sales/New-customer',
  },
  {
    name: `${
      ['obe'].some((i) => getUser().division.includes(i)) ? 'Customer Management OBE' : ''
    }`,
    pathname: '/management-sales/obe',
  },

  // New From Presales
  {
    name: 'All Customer Request',
    pathname: '/management-sales/all-customer-request',
  },
  {
    name: `${getUser().role === 'admin' ? 'Voucher Generator' : ''}`,
    pathname: '/management-sales/voucher-generator',
  },
  { name: 'Sales Request', pathname: '/management-sales/sales-request' },
  {
    name: 'All Orders',
    pathname: '/management-sales/all-orders',
  },
  // {
  //   name: `${getUser().role === 'admin' ? 'My Tasks' : ''}`,
  //   pathname: '/management-sales/my-tasks',
  // },
  // {
  //   name: `${['quotation'].some((i) => getUser().division.includes(i)) ? 'My Tasks' : ''}`,
  //   pathname: '/management-sales/my-tasks',
  // },
];