import { getUser } from 'helpers/parseJWT';

export const SubRoutesMyTasks = (userOBE) => [
  // {
  //   name: `${
  //     userOBE?.includes(getUser().user) && getUser().role === 'sales'
  //       ? ''
  //       : 'Customer Management'
  //   }`,
  //   pathname: '/management-sales/customer-management',
  // },
  // {
  //   name: `${['obe'].some((i) => getUser().division.includes(i)) ? 'New Customer' : ''}`,
  //   pathname: '/management-sales/New-customer',
  // },
  // {
  //   name: 'All Orders',
  //   pathname: '/management-sales/all-orders',
  // },
  {
    name: `${getUser().role === 'admin' && ['quotation'].some((i) => getUser().division.includes(i)) ? 'Product Development' : ''}`,
    pathname: '/my-tasks/product-development',
  },
  {
    name: `${getUser().role === 'admin' ? 'Sales' : ''}`,
    pathname: '/my-tasks/sales',
  },
  {
    name: `${getUser().role === 'admin' ? 'After Sales' : ''}`,
    pathname: '/my-tasks/after-sales',
  },
];