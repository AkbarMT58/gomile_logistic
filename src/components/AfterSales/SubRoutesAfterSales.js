// import { getUser } from 'helpers/parseJWT';

export const SubRoutesAfterSales = (userOBE) => [
    { name: "Refund Approval", pathname: "/after-sales/refund-approval" },
    { name: "Refund Customer", pathname: "/after-sales/refund-customer" },
    { name: "Refund OCI", pathname: "/after-sales/refund-oci" },
    { name: "Completed Order", pathname: "/after-sales/completed-order" },
    { name: "Cancel Order", pathname: "/after-sales/cancel-order" },
];