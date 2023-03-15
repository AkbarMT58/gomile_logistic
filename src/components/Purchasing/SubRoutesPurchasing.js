import { getUser } from 'helpers/parseJWT';

export const SubRoutesPurchasing = (userOBE) => [
    { name: 'New Orders', pathname: '/purchasing/new-order' },
    { name: 'Already PO', pathname: '/purchasing/already-po' },
    { name: 'PO Paid', pathname: '/purchasing/po-paid' },
    // { name: "OTW WH China", pathname: "/purchasing/otw-wh-china" },
    {
        name: `${getUser().roles.includes('admin') ? 'Abnormal' : ''}`,
        pathname: '/purchasing/abnormal',
    },
    {
        name: `${getUser().roles.includes('admin') ? 'Approval' : ''}`,
        pathname: '/purchasing/approval',
    },
];