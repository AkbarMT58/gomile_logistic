// import { getUser } from 'helpers/parseJWT';

import { SubRoutesAfterSales } from "components/AfterSales/SubRoutesAfterSales";
import { SubRoutesCatalog } from "components/Catalog/SubRoutesCatalog";
import { SubRoutesCms } from "components/Cms/SubRoutesCms";
import { SubRoutesLogisticChina } from "components/LogisticChina/SubRoutesLogisticChina";
import { SubRoutesLogisticIndo } from "components/LogisticIndo/SubRoutesLogisticIndo";
import { SubRoutesManagementSales } from "components/ManagementSales/SubRoutesManagementSales";
import { SubRoutesMarketing } from "components/Marketing/SubRoutesMarketing";
// import { SubRoutesMyTasks } from "components/MyTasks/SubRoutesMyTasks";
// import { SubRoutesNotification } from "components/Notification/SubRoutesNotification";
import { SubRoutesPurchasing } from "components/Purchasing/SubRoutesPurchasing";
import { SubRoutesQuotation } from "components/Quotation/SubRoutesQuotation";
import { SubRoutesReport } from "components/Report/SubRoutesReport";
import { SubRoutesWarehouse } from "components/Warehouse/SubRoutesWarehouse";

export const MainRoutes = (role) => {
  return [
    {
      name: "CRM",
      pathname: "/management-sales",
      subMenu: SubRoutesManagementSales()
    },
    // { name: 'Pre-Sales', pathname: '/pre-sales' },
    {
      name: `${role === "admin" ? "Quotation" : ""}`,
      pathname: `/quotation`,
      subMenu: SubRoutesQuotation()
    },
    {

      name: `${role === 'admin' || role === "sales" ? 'Purchasing' : ''}`,
      pathname: `/purchasing`,
      subMenu: SubRoutesPurchasing()
    },
    {
      name: `${role === "admin" ? "Logistic China" : ""}`,
      pathname: "/logistic-china",
      subMenu: SubRoutesLogisticChina()
    },
    {
      name: `${role === "admin" ? "Logistic Indo" : ""}`,
      pathname: "/logistic-indo",
      subMenu: SubRoutesLogisticIndo()
    },
    {
      name: `${role === "admin" ? "After Sales" : ""}`,
      pathname: "/after-sales",
      subMenu: SubRoutesAfterSales()
    },
    // {
    //   name: `${role === "admin" ? "Warehouse" : ""}`,
    //   pathname: "/warehouse",
    //   subMenu: SubRoutesWarehouse()
    // },
    // {
    //   name: `${role === "admin" ? "My Tasks" : ""}`,
    //   pathname: "/my-tasks",
    //   subMenu: SubRoutesMyTasks()
    // },
    {
      name: `${role === "admin" ? "Catalog" : ""}`,
      pathname: "/catalog",
      subMenu: SubRoutesCatalog()
    },
    // {
    //   name: `${role === "admin" ? "Tracking" : ""}`,
    //   pathname: "/tracking",
    // },
    // { name: "UangMe", pathname: "/uangme-dashboard" },
    {
      name: `${role === "admin" ? "Blog" : ""}`,
      pathname: "/Blog",
    },
    // {
    //   name: `${role === "admin" ? "Report" : ""}`,
    //   pathname: "/report",
    //   subMenu: SubRoutesReport()
    // },
    // {
    //   name: `${role === "admin" ? "CMS" : ""}`,
    //   pathname: "/cms",
    //   subMenu: SubRoutesCms()
    // },
    // {
    //   name: `${role === "admin" ? "Marketing" : ""}`,
    //   pathname: "/marketing",
    //   subMenu: SubRoutesMarketing()
    // },
    // {
    //   name: `${role === "admin" ? "Notification" : ""}`,
    //   pathname: "/notification",
    //   subMenu: SubRoutesNotification()
    // },
  ];
};
