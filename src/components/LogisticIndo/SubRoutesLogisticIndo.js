// import { getUser } from 'helpers/parseJWT';

export const SubRoutesLogisticIndo = () => [
  {
    name: 'Received WH Indo',
    pathname: '/logistic-indo/received-wh-indo',
  },
  { name: 'Approval WH Indo', pathname: '/logistic-indo/approval-whindo' },
  { name: 'Pallet Management', pathname: '/logistic-indo/pallet-management' },
  {
    name: 'Gudang Pengiriman',
    pathname: '/logistic-indo/warehouse-sorting',
  },
  {
    name: 'WH Indo Delivery',
    pathname: '/logistic-indo/wh-indo-delivery',
  },
  {
    name: 'Logistics Indo',
    pathname: '/logistic-indo/logistics-indo',
  },
  {
    name: 'Form Actual Price',
    pathname: '/logistic-indo/form-actual-price',
  },
  { name: 'Abnormal', pathname: '/logistic-indo/abnormal' },
];
