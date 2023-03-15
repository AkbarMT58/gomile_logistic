import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import MemberRoute from './MemberRoute';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import GlobalSearch from 'pages/GlobalSearch';

// Management Sales
import ManagementSales from 'pages/ManagementSales';
import CustomerManagement from 'pages/ManagementSales/CustomerManagement';
import SalesTarget from 'pages/ManagementSales/SalesTarget';
import OBE from 'pages/ManagementSales/OBE';
import NewCustomer from 'pages/ManagementSales/NewCustomer';
import EditNewCustomer from 'pages/ManagementSales/EditNewCustomer';
import AllCustomerRequest from 'pages/ManagementSales/AllCustomerRequest';
import VoucherGenerator from 'pages/ManagementSales/VoucherGenerator';
import SalesRequest from 'pages/ManagementSales/SalesRequest';
import AllOrders from 'pages/ManagementSales/AllOrders';

//Quotation
import Quotation from 'pages/Quotation';
import Performance from 'pages/Quotation/Performance';
import CheckVolume from 'pages/Quotation/CheckVolume';

// Pre Sales
// import PreSales from 'pages/PreSales';

// Purchasing
import NewOrders from 'pages/Purchasing/NewOrders';
import AlreadyPO from 'pages/Purchasing/AlreadyPO';
import PoPaid from 'pages/Purchasing/PoPaid';

// Tracking
import TrackingClick from 'pages/Tracking/TrackingClick';

// Uang Me
// import UangMe from "pages/UangMe/UangMe";
// import UangMeTransaction from "pages/UangMe/UangMeTransaction";
import NotFound from 'pages/NotFound';

//PURCHASHING
import Purchasing from 'pages/Purchasing';
import OtwWhChina from 'pages/Purchasing/OtwWhChina';
import AbnormalPurchasing from 'pages/Purchasing/AbnormalPurchasing';
import Approval from 'pages/Purchasing/Approval';
//LOGISTIC CHINA
import LogisticChina from 'pages/LogisticChina';
import Repacking from 'pages/LogisticChina/Repacking';
import SendToIdn from 'pages/LogisticChina/SendToIdn';
import Container from 'pages/LogisticChina/Container';
import OtwIdn from 'pages/LogisticChina/OtwIdn';
import ArrivedIdn from 'pages/LogisticChina/ArrivedIdn';
//LOGISTIC INDO
import LogiscticIndo from 'pages/LogisticIndo';
import ReceivedWhIndo from 'pages/LogisticIndo/ReceivedWhIndo';
import ApprovalWhIndo from 'pages/LogisticIndo/ApprovalWhIndo';
import PalletManagement from 'pages/LogisticIndo/PalletManagement';
import WarehouseSorting from 'pages/LogisticIndo/WarehouseSorting';
import DeliveryWhIndo from 'pages/LogisticIndo/DeliveryWhIndo';
import PaymentLogisticIndo from 'pages/LogisticIndo/PaymentLogisticIndo';
import FormActualPrice from 'pages/LogisticIndo/FormActualPrice';
import Abnormal from 'pages/LogisticIndo/Abnormal';
//AFTER SALES
import AfterSales from 'pages/AfterSales';
import RefundCustomer from 'pages/AfterSales/RefundCustomer';
import CancelOrder from 'pages/AfterSales/CancelOrder';
import CompletedOrder from 'pages/AfterSales/CompletedOrder';
import RefundApproval from 'pages/AfterSales/RefundApproval';
import RefundOci from 'pages/AfterSales/RefundOci';
//WAREHOUSE
import Warehouse from 'pages/Warehouse';
import WarehouseChina from 'pages/Warehouse/WarehouseChina';
import WarehouseIndo from 'pages/Warehouse/WarehouseIndo';

// MY TASKS
import MyTasks from 'pages/MyTasks';
import MyTasksSales from 'pages/MyTasks/Sales';
import MyTasksAfterSales from 'pages/MyTasks/AfterSales';
import MyTasksProductDevelopment from 'pages/MyTasks/ProductDevelopment';

//CATALOG
import Catalog from 'pages/Catalog';
import CatalogProduct from 'pages/Catalog/CatalogProduct';
import PoolProduct from 'pages/Catalog/PoolProduct';

// Blog
import Blog from 'pages/Blog';
import BlogPosts from 'pages/Blog/BlogPosts';
import AddBlogPost from 'pages/Blog/AddBlogPost';
import UpdateBlogPost from 'pages/Blog/UpdateBlogPost';
// REPORT
import Report from 'pages/Report';
import ReportPenjualan from 'pages/Report/ReportPenjualan';
import ReportRegister from 'pages/Report/ReportRegister';
import ReportCustomerLevel from 'pages/Report/ReportCustomerLevel';
import ReportPengajuan from 'pages/Report/ReportPengajuan';

// CMS
import Cms from 'pages/Cms';
import Categories from 'pages/Cms/Categories';
import Material from 'pages/Cms/Material';
import Banner from 'pages/Cms/Banner';
import Popup from 'pages/Cms/Popup';
import CategoryOciLogistic from 'pages/Cms/CategoryOciLogistik';

// Marketing
import Marketing from 'pages/Marketing';
import BlastEmail from 'pages/Marketing/BlastEmail';
import EmailTemplate from 'pages/Marketing/EmailTemplate';


const Routes = () => {
  return (
    <Router basename="/oms">
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        {/* UangMe */}
        {/* <MemberRoute exact path="/uangme-dashboard" component={UangMe} />
        <MemberRoute
          exact
          path="/uangme-dashboard/tracking-payment"
          component={UangMe}
        />
        <MemberRoute
          exact
          path="/uangme-dashboard/uangme-transaction"
          component={UangMeTransaction}
        /> */}
        {/* Global search */}
        <MemberRoute exact path="/search" component={GlobalSearch} />

        {/* Management Sales */}
        <MemberRoute
          exact
          path="/management-sales"
          component={ManagementSales}
        />
        <MemberRoute
          path="/management-sales/customer-management"
          component={CustomerManagement}
        />
        <MemberRoute
          path="/management-sales/sales-target"
          component={SalesTarget}
        />
        <MemberRoute
          path="/management-sales/new-customer"
          component={NewCustomer}
        />
        <MemberRoute path="/management-sales/obe" component={OBE} />
        <MemberRoute
          exact
          path="/management-sales/all-customer-request"
          component={AllCustomerRequest}
        />
        <MemberRoute
          exact
          path="/management-sales/voucher-generator"
          component={VoucherGenerator}
        />
        <MemberRoute
          exact
          path="/management-sales/sales-request"
          component={SalesRequest}
        />
        <MemberRoute
          exact
          path="/management-sales/all-orders"
          component={AllOrders}
        />
        <MemberRoute
          path="/management-sales/edit-new-customer"
          component={EditNewCustomer}
        />

        {/* Pre Sales */}
        {/* <MemberRoute exact path='/pre-sales' component={PreSales} /> */}

        {/* Quotation */}
        <MemberRoute exact path="/quotation" component={Quotation} />
        <MemberRoute path="/quotation/performance" component={Performance} />
        <MemberRoute
          exact
          path="/quotation/check-volume"
          component={CheckVolume}
        />

        {/* Purchasing */}
        <MemberRoute exact path="/purchasing" component={Purchasing} />
        <MemberRoute exact path="/purchasing/new-order" component={NewOrders} />
        <MemberRoute
          exact
          path="/purchasing/already-po"
          component={AlreadyPO}
        />
        <MemberRoute exact path="/purchasing/po-paid" component={PoPaid} />
        <MemberRoute
          exact
          path="/purchasing/otw-wh-china"
          component={OtwWhChina}
        />
        <MemberRoute
          exact
          path="/purchasing/abnormal"
          component={AbnormalPurchasing}
        />
        <MemberRoute exact path="/purchasing/approval" component={Approval} />
        {/* Logistic china */}
        <MemberRoute exact path="/logistic-china" component={LogisticChina} />
        <MemberRoute exact path="/logistic-china/repacking" component={Repacking} />
        <MemberRoute exact path="/logistic-china/send-to-idn" component={SendToIdn} />
        <MemberRoute exact path="/logistic-china/container"component={Container} />
        <MemberRoute exact path="/logistic-china/otw-idn" component={OtwIdn} />
        <MemberRoute exact path="/logistic-china/arrived-idn" component={ArrivedIdn} />
        {/*  Logistic Indo */}
        <MemberRoute exact path="/logistic-indo" component={LogiscticIndo} />
        <MemberRoute exact path="/logistic-indo/warehouse-sorting" component={WarehouseSorting} />
        <MemberRoute exact path="/logistic-indo/received-wh-indo" component={ReceivedWhIndo} />
        <MemberRoute exact path="/logistic-indo/approval-whindo" component={ApprovalWhIndo} />
        <MemberRoute exact path="/logistic-indo/pallet-management" component={PalletManagement} />
        <MemberRoute exact path="/logistic-indo/wh-indo-delivery" component={DeliveryWhIndo} />
        <MemberRoute exact path="/logistic-indo/logistics-indo" component={PaymentLogisticIndo} />
        <MemberRoute exact path="/logistic-indo/form-actual-price" component={FormActualPrice} />
        <MemberRoute exact path="/logistic-indo/abnormal" component={Abnormal} />

        {/* After Sales */}
        <MemberRoute exact path="/after-sales" component={AfterSales} />
        <MemberRoute exact path="/after-sales/refund-approval" component={RefundApproval} />
        <MemberRoute exact path="/after-sales/refund-customer" component={RefundCustomer} />
        <MemberRoute exact path="/after-sales/refund-oci" component={RefundOci} />
        <MemberRoute exact path="/after-sales/cancel-order" component={CancelOrder} />
        <MemberRoute exact path="/after-sales/completed-order" component={CompletedOrder} />
        {/* Warehouse */}
        <MemberRoute exact path="/warehouse" component={Warehouse} />
        <MemberRoute exact path="/warehouse/warehouse-china" component={WarehouseChina} />
        <MemberRoute exact path="/warehouse/warehouse-indo" component={WarehouseIndo} />

        {/* Tracking */}
        <MemberRoute exact path="/tracking" component={TrackingClick} />
        <MemberRoute exact path="/tracking/tracking-click" component={TrackingClick} />
        {/* Catalog */}
        <MemberRoute exact path="/catalog" component={Catalog} />
        <MemberRoute exact path="/catalog/catalog-product" component={CatalogProduct} />
        <MemberRoute exact path="/catalog/pool-product" component={PoolProduct} />
        <MemberRoute exact path="/dashboard" component={Dashboard} />
        {/* Blog */}
        <MemberRoute exact path="/blog" component={Blog} />
        <MemberRoute exact path="/blog/blog-posts" component={BlogPosts} />
        <MemberRoute exact path="/blog/add-blog-post" component={AddBlogPost} />
        <MemberRoute exact path="/blog/update-blog-post" component={UpdateBlogPost} />
        
        {/* Report */}
        <MemberRoute exact path="/report" component={Report} />
        <MemberRoute exact path="/report/penjualan" component={ReportPenjualan} />
        <MemberRoute exact path="/report/register" component={ReportRegister} />
        <MemberRoute exact path="/report/customer-level-spending" component={ReportCustomerLevel} />
        <MemberRoute exact path="/report/pengajuan" component={ReportPengajuan} />

        {/* My Tasks */}
        <MemberRoute exact path="/my-tasks" component={MyTasks} />
        <MemberRoute exact path="/my-tasks/sales" component={MyTasksSales} />
        <MemberRoute exact path="/my-tasks/after-sales" component={MyTasksAfterSales} />
        <MemberRoute exact path="/my-tasks/product-development" component={MyTasksProductDevelopment} />

        {/* CMS */}
        <MemberRoute exact path="/cms" component={Cms} />
        <MemberRoute exact path="/cms/category-oci-logistic" component={CategoryOciLogistic} />
        <MemberRoute exact path="/cms/categories" component={Categories} />
        <MemberRoute exact path="/cms/materials" component={Material} />
        <MemberRoute exact path="/cms/banner" component={Banner} />
        <MemberRoute exact path="/cms/popup" component={Popup} />

        {/* Marketing */}
        <MemberRoute exact path="/marketing" component={Marketing} />
        <MemberRoute exact path="/marketing/blast-email" component={BlastEmail} />
        <MemberRoute exact path="/marketing/email-template" component={EmailTemplate} />

        <Route path="/login" component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
