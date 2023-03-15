import { getUser } from 'helpers/parseJWT';

export const SubRoutesNotification = (userOBE) => [
  {
    name: `${getUser().role === 'admin' ? 'Device One' : ''}`,
    pathname: '/notification/device-1',
  },
  {
    name: `${getUser().role === 'admin' ? 'Device Two' : ''}`,
    pathname: '/notification/device-2',
  },
  // {
  //   name: `${['obe'].some((i) => getUser().division.includes(i)) ? 'New Customer' : ''}`,
  //   pathname: '/notification/New-customer',
  // },
  // {
  //   name: `${
  //     userOBE?.includes(getUser().user) ? 'Customer Management OBE' : ''
  //   }`,
  //   pathname: '/notification/obe',
  // },
];