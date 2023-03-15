// import { getUser } from 'helpers/parseJWT';

export const SubRoutesLogisticChina = (userOBE) => [
    { name: 'Processing', pathname: '/logistic-china/repacking' },
    { name: 'Send to IDN', pathname: '/logistic-china/send-to-idn' },
    { name: 'Container', pathname: '/logistic-china/container' },
    { name: 'OTW IDN', pathname: '/logistic-china/otw-idn' },
    { name: 'Arrived IDN', pathname: '/logistic-china/arrived-idn' },
];