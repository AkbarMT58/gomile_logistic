import { getUser } from 'helpers/parseJWT';

export const SubRoutesReport = () => [
  {
    name: `${getUser().role === 'admin' ? 'Penjualan' : ''}`,
    pathname: '/report/penjualan',
  },
  {
    name: `${getUser().role === 'admin' ? 'Register' : ''}`,
    pathname: '/report/register',
  },
  {
    name: `${getUser().role === 'admin' ? 'Customer Level & Spending' : ''}`,
    pathname: '/report/customer-level-spending',
  },
  {
    name: `${getUser().role === 'admin' ? 'Pengajuan' : ''}`,
    pathname: '/report/pengajuan',
  },
];
