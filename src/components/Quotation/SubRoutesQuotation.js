import { getUser } from "helpers/parseJWT";

export const SubRoutesQuotation = (userOBE) => [
  {
    name: `${getUser().role === "sales" ? "" : "Performance"}`,
    pathname: "/quotation/performance",
  },
  {
    name: `${getUser().role === "admin" ? "Check Details" : ""}`,
    pathname: "/quotation/check-volume",
  },
];
