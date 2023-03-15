import callAPI from 'service/config';

// PRODUCTION

// DASHBOARD

let baseUrl = process.env.REACT_APP_URL_API_GATEWAY;
let baseUrlGolang = process.env.REACT_APP_URL_API_GATEWAY_GOLANG;

let baseUrlNewGolang = process.env.REACT_APP_URL_API_GATEWAY_NEW_GOLANG;
let tokenize = true;
let noHeader = 'false';

if (process.env.REACT_APP_ENV === 'DEVELOPMENT') {
  baseUrl = process.env.REACT_APP_URL_API_OMS_DEV;
  baseUrlGolang = process.env.REACT_APP_URL_API_GATEWAY_GOLANG;
  tokenize = false;
  noHeader = 'true';
}

export async function getUserObe() {
  const url = `${baseUrlGolang}/user-obe`;
  return callAPI({
    url,
    method: 'GET',
    token: noHeader,
  });
}

export async function getAnalyticsData() {
  const url = `${baseUrl}/home/statistik2`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// MANAGEMENT SALES

// Customer Management
export async function getListCustomerManagement(searchData, setParams) {
  const url = `${baseUrl}/management-sales/customer-management${
    searchData ? searchData : setParams
  }`;

  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function addSalesData(data) {
  const url = `${baseUrl}/management-sales/customer-management`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function releaseSalesData(data) {
  const url = `${baseUrl}/management-sales/customer-management`;
  return callAPI({
    url,
    method: 'DELETE',
    data,
    token: tokenize,
  });
}

export async function addSalesActivity(data) {
  const url = `${baseUrl}/management-sales/customer-management/notes`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function viewModal(email) {
  const url = `${baseUrl}/management-sales/customer-management/order/${email}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function trackingModal(id) {
  const url = `${baseUrl}/management-sales/customer-management/tracking/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updatePhoneNumber(data) {
  const url = `${baseUrl}/management-sales/customer-management/edit-number`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function setFlagDataCM(data) {
  const url = `${baseUrl}/management-sales/customer-management/prospect`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// Sales Target
export async function getSalesData() {
  const url = `${baseUrl}/management-sales/sales-target`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateSalesTarget(data) {
  const url = `${baseUrl}/management-sales/sales-target`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function filterSalesTarget(params) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/management-sales/sales-target?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function setTargetContact(data) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/management-sales/sales-target/target-contact`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function getActivitySales(params) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/management-sales/sales-target/target-contact/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// New Customer
export async function getNewCustomerData() {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/management-sales/new-customer`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function filterNewCustomerGolang(params) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/management-sales/new-customer?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function filterAllCustomerRequest(params) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/pre-sales/all-customer-request?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDetailsNewCustomerData(email) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/management-sales/new-customer/${email}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateNewCustomerDetails(data) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/management-sales/new-customer/edit`;
  return callAPI({
    url,
    method: 'PUT',
    token: tokenize,
    data,
  });
}

export async function updateNewCustomerLocation(data) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/management-sales/new-customer/alamat/edit`;
  return callAPI({
    url,
    method: 'PUT',
    token: tokenize,
    data,
  });
}

export async function getGenerateResetPassword(params) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_GOLANG}/reset-password/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// OBE
export async function getListOBE(page, limit, params) {
  const url = `${baseUrl}/management-sales/obe?${page || limit ? params : ''}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function addSalesOBE(data) {
  const url = `${baseUrl}/management-sales/obe`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function releaseSalesOBE(email) {
  const url = `${baseUrl}/management-sales/obe/${email}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function addCustomerOBE(data) {
  const url = `${baseUrl}/management-sales/obe`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function addSalesActivityOBE(data) {
  const url = `${baseUrl}/management-sales/obe/notes`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function updatePhoneNumberOBE(data) {
  const url = `${baseUrl}/management-sales/obe/edit-number`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function setFlagData(data) {
  const url = `${baseUrl}/management-sales/obe/prospect`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function updateEmailOBE(data) {
  const url = `${baseUrl}/management-sales/obe/edit-email`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

// Performance
export async function getPerformanceData(params) {
  const url = `${baseUrl}/management-sales/performance?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// // PRE SALES

// Voucher
export async function getVoucherData() {
  const url = `${baseUrl}/pre-sales/voucher-generator`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function generateVoucher(data) {
  const url = `${baseUrl}/pre-sales/voucher-generator`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

//Sales Request
export async function getSalesRequestData(params) {
  const url = `${baseUrl}/pre-sales/sales-request?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDetailRequest(id) {
  const url = `${baseUrl}/pre-sales/sales-request/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function inputSalesProduct(data) {
  const url = `${baseUrlGolang}/pre-sales/sales-request/draft-orders`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function inputSalesRequestData(data) {
  const url = `${baseUrlNewGolang}/pre-sales/sales-request`; 
  // const url = `http://localhost:8787/api/oms/pre-sales/sales-request`; // ikhsan
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function inputSalesRequestDraftOrders(data) {
  const url = `${baseUrlGolang}/pre-sales/sales-request/draft-orders`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function inputsalesVolumePIC(data) {
  const url = `${baseUrlGolang}/pre-sales/sales-request/updater`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function submitCustomProductVariant(data) {
  const url = `${baseUrlGolang}/pre-sales/sales-request/custom-order`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

//PRODUCTION
export async function getChinaDetail(data) {
  const url = process.env.REACT_APP_URL_API_GET_CHINA;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: true,
  });
}
export async function getChinaDetail2(toko,id) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY1}/get-china/${toko}/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}
export async function getChinaRawDetail(toko,id) {
  const url = `${baseUrlGolang}/get-china-test/${toko}/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

export async function cancelVolumeData(data) {
  const url = `${baseUrl}/pre-sales/sales-request`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function cancelVolumeDataAll(data) {
  const url = `${baseUrlGolang}/pre-sales/sales-request/all`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function checkLinkRequest(data) {
  const url = `${baseUrl}/pre-sales/sales-request/search`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function assignRequestToList(data) {
  const url = `${baseUrl}/pre-sales/sales-request/assign`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function checkLinkAddVariant(data) {
  const url = `${baseUrlGolang}/pre-sales/all-orders/addvariant`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function postAddVariant(data) {
  const url = `${baseUrl}/pre-sales/all-orders/addvariant/insert`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// Customer Request
export async function getCustomerRequestData() {
  const url = `${baseUrl}/pre-sales/customer-request`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDetailProductRequest(id) {
  const url = `${baseUrl}/pre-sales/customer-request/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function inputCustomerRequest(data) {
  const url = `${baseUrl}/pre-sales/customer-request`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// Check Details
export async function getVolumeDataAssign() {
  const url = `${baseUrlGolang}/pre-sales/check-volume/update
  `;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function cancelVolumeRequest(data) {
  const url = `${baseUrl}/pre-sales/check-volume`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function inputVolumeData(data) {
  const url = `${baseUrlNewGolang}/pre-sales/check-volume`; 
  // const url = `http://localhost:8787/oms/pre-sales/check-volume`; // ikhsan
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function getVolumeData() {
  const url = `${baseUrlGolang}/pre-sales/check-volume`; 
  // const url = `http://localhost:8080/oms/pre-sales/check-volume`; // ikhsan
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getVariants(id) {
  const url = `${baseUrlGolang}/pre-sales/check-volume/${id}`;
  // const url = `http://localhost:8080/oms/pre-sales/check-volume/${id}`; // ikhsan
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// All Orders
export async function getAllOrdersData(params) {
  const url = `${baseUrlGolang}/pre-sales/all-orders?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitManualPayment(data) {
  const url = `${baseUrl}/pre-sales/all-orders`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function getProductAllOrder(id) {
  const url = `${baseUrlGolang}/pre-sales/all-orders/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function postAdjustment(data) {
  const url = `${baseUrlGolang}/pre-sales/all-orders/adjustment`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

//All Customer Request
export async function getAllCustomerRequest(params) {
  const url = `${baseUrlGolang}/pre-sales/all-customer-request?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDetailCustomerRequest(id) {
  const url = `${baseUrlGolang}/pre-sales/all-customer-request/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function exportAllCustomerRequest() {
  const url = `${baseUrlGolang}/pre-sales/all-customer-request/download`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

//My Tasks
export async function getMyTasks(params) {
  const url = `${baseUrlNewGolang}/mytask/report?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getReportDetailProduct(params) {
  const url = `${baseUrlGolang}/detail-produk/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// export async function adjustMyTask() {
//   const url = `${baseUrlNewGolang}/mytask/report`;
//   return callAPI({
//     url,
//     method: 'PUT',
//     token: tokenize,
//   });
// }

export async function sendReport(data) {
  const url = `${baseUrlNewGolang}/mytask/report`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function reduceQty(data) {
  const url = `${baseUrlNewGolang}/mytask/report/reduce-qty`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function deleteMyTaskReport(id) {
  const url = `${baseUrlNewGolang}/mytask/report/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function solveIssue(data) {
  const url = `${baseUrlNewGolang}/mytask/report`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function submitFullRefund(data) {
  const url = `${baseUrlNewGolang}/mytask/report/full-refund`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function changeReportSupplier(data) {
  const url = `${baseUrlNewGolang}/mytask/report/change-supplier`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}
////////////////////

// UTILS

// Search Bar
export async function searchGlobalData(option, input) {
  const url = `${baseUrl}/search/${option}/${input}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// Live search
export async function getLiveSearchResult(email) {
  const url = `${baseUrl}/management-sales/customer-management/${email}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getAutoFillDataLiveSearch(input) {
  const url = `https://gateway2.ocistok.co.id/oms/customer/autofill${
    input ? '/' + input : ''
  }`;
  return callAPI({
    url,
    method: 'GET',
    token: true,
  });
}

// DEVELOPMENT

// Purchasing Data
export async function getDetailOrderData(id) {
  const url = `${baseUrlGolang}/detail-order/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function refundOrder(data) {
  const url = `${baseUrlGolang}/detail-order`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function getOrderNotesData(id) {
  const url = `${baseUrl}/notes-order/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function postOrderNotesData(data) {
  const url = `${baseUrl}/notes-order`;
  return callAPI({
    data,
    url,
    method: 'POST',
    token: tokenize,
  });
}

export async function refundAbnormal(data) {
  const url = `${baseUrl}/purchasing/abnormal/refund`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function resendAbnormal(data) {
  const url = `${baseUrl}/purchasing/abnormal/resend`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function reoderAbnormal(data) {
  const url = `${baseUrl}/purchasing/abnormal/reorder`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function cancelAbnormal(data) {
  const url = `${baseUrl}/purchasing/abnormal/cancel`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

// New Orders
export async function getOrderData(params) {
  const url = `${baseUrlNewGolang}/purchasing/new-orders?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function makePoToSupplier(data) {
  const url = `${baseUrl}/purchasing/new-orders`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function deleteOrderData(data) {
  const url = `${baseUrl}/purchasing/new-orders`;
  return callAPI({
    url,
    method: 'DELETE',
    data,
    token: tokenize,
  });
}

export async function sendNotesData(data) {
  const url = `${baseUrl}/notes-product`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function sendAdjustmentRequest(data) {
  const url = `${baseUrl}/purchasing/new-orders/adjustment`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function send_purchasing(id) {
  const url = `${baseUrlNewGolang}/1688-purchase-order/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// Already PO
export async function getAlreadyPOData(params) {
  const url = `${baseUrlNewGolang}/purchasing/already-po?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updatePaymentData(data) {
  const url = `${baseUrl}/purchasing/already-po`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function changeSupplierData(data) {
  const url = `${baseUrl}/purchasing/already-po`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function cancelAlreadyPO(data) {
  const url = `${baseUrl}/purchasing/already-po`;
  return callAPI({
    url,
    method: 'DELETE',
    data,
    token: tokenize,
  });
}

export async function synchronizeData(id) {
  const url = `${baseUrlNewGolang}/updatepo/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// PoPaid
export async function getPoPaidData(params) {
  const url = `${baseUrlNewGolang}/purchasing/po-paid?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateTrackingData(data) {
  const url = `${baseUrl}/purchasing/po-paid`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function cancelPoPaid(data) {
  const url = `${baseUrl}/purchasing/po-paid`;
  return callAPI({
    url,
    method: 'DELETE',
    data,
    token: tokenize,
  });
}

export async function sendAdjustmentPo(data) {
  const url = `${baseUrl}/purchasing/po-paid/adjustment`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// Otw Wh China
export async function getOtwChinaData(params) {
  const url = `${baseUrl}/purchasing/otw-wh-china?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function editTrackingData(data) {
  const url = `${baseUrl}/purchasing/otw-wh-china`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function submitReceivedData(data) {
  const url = `${baseUrl}/purchasing/otw-wh-china`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function sendBarcode(data) {
  const url = `${baseUrl}/purchasing/otw-wh-china/scan`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function submitReceivedDataScan(data) {
  const url = `${baseUrl}/purchasing/otw-wh-china/scan-insert`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// Abnormal Purchasing
export async function getAbnormalData(params) {
  const url = `${baseUrl}/purchasing/abnormal?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// Approval
export async function getApproval(params) {
  const url = `${baseUrl}/purchasing/approval?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function approvalPayment(data) {
  const url = `${baseUrl}/purchasing/approval`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// LOGISTIC CHINA

// Repacking
export async function getRepackingData(params) {
  const url = `${baseUrl}/logistic-china/v2/repacking?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function insertRepackingData(data) {
  const url = `${baseUrl}/logistic-china/v2/repacking`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function getScanDetailCarton(params) {
  const url = `${baseUrlGolang}/logistic-china/send-to-idn/detail-karton/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getWhIndoProductDetail(params) {
  const url = `${baseUrlGolang}/whindo/flutter/get-otw-whindo/produk/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function insertTableContainer(data) {
  const url = `${baseUrlGolang}/logistic-china/send-to-idn`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}
// Send to IDN
export async function getSendToIdnData(params) {
  const url = `${baseUrlGolang}/logistic-china/send-to-idn?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateContainerNumber(data) {
  const url = `${baseUrl}/logistic-china/send-to-idn`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function getDetailOrderDataRepacking(id) {
  const url = `${baseUrlNewGolang}/logistic-china/get-repacking-data?id_so=${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateDetailOrderDataRepacking(data) {
  const url = `${baseUrlNewGolang}/logistic-china/update-repacking-data`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

// export async function insertDataExcel(data) {
//   // const url = `${baseUrl}logistic-china/v2/repacking/import-excel`;
//   const url = `http://192.168.14.11:8787/oms/logistic-china/v2/repacking/import-excel`;
//   return callAPI({
//     url,
//     method: 'POST',
//     data,
//     token: 'excel',
//   });
// }

// Container

export async function getContainerData(params) {
  const url = `${baseUrl}/logistic-china/container?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getAllContainerList() {
  const url = `${baseUrlGolang}/logistic-china/get-all-container`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateContainerSingle(data) {
  const url = `${baseUrlGolang}/logistic-china/container/single`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function updateContainerAll(data) {
  const url = `${baseUrlGolang}/logistic-china/container`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function deleteContainerSingle(idCarton) {
  const url = `${baseUrlGolang}/logistic-china/container/single/${idCarton}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function checkContainerId(params) {
  const url = `${baseUrl}/logistic-china/container?container=${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function exportPackingList(containerNumber) {
  const url = `${baseUrlGolang}/sendemail-packing-list/${containerNumber}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateETA(data) {
  const url = `${baseUrl}/logistic-china/container`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

// Otw IDN
export async function getOtwIdnData(params) {
  const url = `${baseUrl}/logistic-china/otw-idn?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function confirmArrivedContainer(data) {
  const url = `${baseUrl}/logistic-china/otw-idn`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// Arrived IDN
export async function getArrivedIdnData(params) {
  const url = `${baseUrl}/logistic-china/arrived-idn?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDetailContainerData(params) {
  const url = `${baseUrl}/container/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function confirmArrivedIdnContainer(data) {
  const url = `${baseUrl}/logistic-china/arrived-idn`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// LOGISTIC INDO

// Received WH Indo
export async function getReceivedWhIndoData(params) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitReceivedDataWhIndo(data) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function getDataPrintLabelDetails(params) {
  const url = `${baseUrlGolang}/logistic-indo/search/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// Delivery WH Indo
export async function getDataBarcodeWhIndo(id) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDataBarcodeWhIndoOut(id) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/out/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDeliveryWhIndoData(params) {
  const url = `${baseUrl}/logistic-indo/wh-indo-delivery?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function sendProductToCustomer(data) {
  const url = `${baseUrl}/logistic-indo/wh-indo-delivery`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function getAllDataAprovalWHindo() {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/draft`;

  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function editDataAprovalWHindo(data) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/draft/edit`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function sendAprovalWHindo(data) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/draft/verify`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function recjectAprovalWHindo(id) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/draft/${id}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function recjectMultipleAprovalWHindo(data) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/draft/multiple-delete`;

  return callAPI({
    url,
    method: 'DELETE',
    data,
    token: tokenize,
  });
}

// Gudang Pengiriman
export async function getDataWarehouseSendIDN(params) {
  const url = `${baseUrlGolang}/logistic-indo/sorting-wilayah?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateDataWarehouseSendIDN(data) {
  const url = `${baseUrlGolang}/logistic-indo/sorting-wilayah`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function filterDatWarehouseSendIDN(data) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/filter`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function getDataWarehouseTotal() {
  const url = `${baseUrlGolang}/logistic-indo/sorting-wilayah/total`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDetailRelatedKarton(params) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/in/related/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitAllKarton(params) {
  const url = `${baseUrlGolang}/logistic-indo/received-wh-indo/in/all/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// Abnormal Logistic Indo
export async function getAbnormalDataLogistcIndo(params) {
  const url = `${baseUrl}/logistic-indo/abnormal?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function refundAbnormalLogisticIndo(data) {
  const url = `${baseUrl}/logistic-indo/abnormal/refund`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// Raja Ongkir
export async function getProvince() {
  const url = `${baseUrl}/rajaongkir/province`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getCity(params) {
  const url = `${baseUrl}/rajaongkir/city/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getSubdistrict(params) {
  const url = `${baseUrl}/rajaongkir/subdistrict/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getListCourier(id, courier, weight) {
  const url = `${baseUrl}/rajaongkir/courier?id=${id}&courier=${courier}&weight=${weight}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// Payment Logistic Indo
export async function getPaymentLogisticData(params) {
  const url = `${baseUrl}/logistic-indo/logistics-indo?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitPaymentLogisticData(data) {
  const url = `${baseUrl}/logistic-indo/logistics-indo`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function receivedManual(data) {
  const url = `${baseUrl}/logistic-indo/logistics-indo`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

// Form Actual Price
export async function getFormActualData(params) {
  const url = `${baseUrl}/logistic-indo/form-actual-price?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitFormActualData(data) {
  const url = `${baseUrl}/logistic-indo/form-actual-price`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// Pallet Management
export async function getDataPallet() {
  const url = `${baseUrlGolang}/logistic-indo/palet`;

  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDetailPallet(id) {
  const url = `${baseUrlGolang}/logistic-indo/palet/${id}`;

  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function createPallet(data) {
  const url = `${baseUrlGolang}/logistic-indo/palet`;

  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

export async function editPallet(data) {
  const url = `${baseUrlGolang}/logistic-indo/palet`;

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function removePallet(param) {
  const url = `${baseUrlGolang}/logistic-indo/palet/${param}`;

  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function getDetailBarcode(id) {
  const url = `${baseUrlGolang}/logistic-indo/palet/barcode/${id}`;

  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// AFTER SALES

// Refund Customer
export async function getRefundCustomerData(params) {
  const url = `${baseUrl}/after-sales/refund-customer?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitRefundCustomerData(data) {
  const url = `${baseUrl}/after-sales/refund-customer`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// Refund Oci
export async function getRefundOciData(params) {
  const url = `${baseUrl}/after-sales/refund-oci?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateAccountBank(data) {
  const url = `${baseUrl}/after-sales/refund-approval/update`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

// export async function submitRefundCustomerData(data) {
//   const url = `${baseUrl}/after-sales/refund-customer`;
//   return callAPI({
//     url,
//     method: "POST",
//     data,
//     token: tokenize,
//   });
// }

// Cancel Order
export async function getCancelOrderData(params) {
  const url = `${baseUrl}/after-sales/canceled-order?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// Completed Order
export async function getCompletedOrderData(params) {
  const url = `${baseUrl}/after-sales/completed-order?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// Refund Approval
export async function getRefundApprovalData(params) {
  const url = `${baseUrl}/after-sales/refund-approval?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitRefundApporvalData(data) {
  const url = `${baseUrl}/after-sales/refund-approval`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function getDetailPoRefund(id) {
  const url = `${baseUrl}/detail-po/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDetailProductData(id_so, id_po) {
  const url = `${baseUrl}/detail-product-po/${id_so}/${id_po}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitRefundApprovalData(data) {
  const url = `${baseUrl}/after-sales/refund-approval`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// WAREHOUSE
export async function getWarehouseChinaData(limit, page, search) {
  const url = `${
    process.env.REACT_APP_URL_API_GATEWAY
  }/warehouse/whchina?halaman=${page ? page : '1'}&pages=10&search=${
    search ? search : ''
  }`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getWarehouseIndoData(limit, page, search) {
  const url = `${
    process.env.REACT_APP_URL_API_GATEWAY
  }/warehouse/whindo?halaman=${page ? page : '1'}&pages=10&search=${
    search ? search : ''
  }`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// CATALOG
export async function getListCatalogProducts(params) {
  const url = `${baseUrlGolang}/catalog/catalog-product?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function checkLinkData(data) {
  const url = `${baseUrlGolang}/catalog/pool-product/search`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function addNewProduct(data) {
  const url = `${baseUrlGolang}/catalog/pool-product`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function deleteProductCatalog(data) {
  const url = `${baseUrlGolang}/catalog/catalog-product`;
  return callAPI({
    url,
    data,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function getListPoolProducts(params) {
  const url = `${baseUrlGolang}/catalog/pool-product?${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function addCatalogProduct(data) {
  const url = `${baseUrlGolang}/catalog/pool-product`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function editPoolProduct(data) {
  const url = `${baseUrlGolang}/catalog/pool-product/edit`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function getDetailProduct(data) {
  const url = `https://gateway.ocistok.co.id/update-gambar`;
  return callAPI({
    url,
    method: 'POST',
    data,
    token: tokenize,
  });
}

// EXPORT DATA
export async function exportNewOrders() {
  const url = `${baseUrl}/purchasing/new-orders/export`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function exportAlreadyPo() {
  const url = `${baseUrl}/purchasing/already-po/export`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function exportAbnormal() {
  const url = `${baseUrl}/purchasing/abnormal/export`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function exportOtwWhChina() {
  const url = `${baseUrl}/purchasing/otw-wh-china/export`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function exportPoPaid() {
  const url = `${baseUrl}/purchasing/po-paid/export`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// BLOG SECTION

// Blog Posts
export async function getListBlogPost(limit, currentPages) {
  const url = `${baseUrlGolang}/blog/pages/${currentPages}/${limit}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getListOrganization(params) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/organization/${params}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function getDetailsBlogPost(id) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/blog/detail/${id}`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function updateBlogPost(data, id) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/blog`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function deleteBlogPost(id) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/blog/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function getListTags() {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/blog/tags`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

// Blog Type

export async function submitBlogPost(data) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/blog`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function getListTypeBlog() {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/type`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitTypeBlog(data) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/type`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function updateTypeBlog(id, data) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/type/${id}`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function deleteTypeBlog(id) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/type/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

// Blog Category
export async function getListCategoryBlog() {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/category`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitCategoryBlog(data) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/category`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function updateCategoryBlog(id, data) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/category/${id}`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function deleteCategoryBlog(id) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/category/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

// Blog Tags
export async function getListTag() {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/tag`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function submitTagBlog(data) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/tag`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function updateTagBlog(id, data) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/tag/${id}`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function deleteTagBlog(id) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/tag/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function updateTagsName(id, data) {
  const url = `${process.env.REACT_APP_URL_API_BLOG}/tag/${id}`;
  return callAPI({
    url,
    method: 'PUT',
    data,
    token: tokenize,
  });
}

export async function getCategoryDataIndo() {
  const url = `${baseUrlGolang}/cms/categories`; 
  // const url = `http://localhost:8080/oms/cms/categories/indo-china`; // ikhsan
  return callAPI({
    url,
    method: 'GET',
    bigInt: true,
    token: tokenize,
  });
}
export async function getCategoryData() {
  const url = `${baseUrlGolang}/cms/categories/indo-china`; 
  // const url = `http://localhost:8080/oms/cms/categories/indo-china`; // ikhsan
  return callAPI({
    url,
    method: 'GET',
    bigInt: true,
    token: tokenize,
  });
}

export async function submit_new_category(data) {
  const url = `${baseUrlGolang}/cms/categories`;
  return callAPI({
    url,
    data,
    bigInt: true,
    method: 'POST',
    token: true,
  });
}

export async function update_category(data) {
  const url = `${baseUrlGolang}/cms/categories/main`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: true,
  });
}

export async function delete_category(id) {
  const url = `${baseUrlGolang}/cms/categories/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}

export async function submit_new_subcategory(data) {
  const url = `${baseUrlGolang}/cms/categories/sub`;
  return callAPI({
    url,
    data,
    bigInt: true,
    method: 'POST',
    token: true,
  });
}

export async function update_sub_category(data) {
  const url = `${baseUrlGolang}/cms/categories/sub`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: true,
  });
}
export async function delete_sub_category(id) {
  const url = `${baseUrlGolang}/cms/categories/sub/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: true,
  });
}

export async function getCategoryOciLogisticsData() {
  const url = `${baseUrlGolang}/cms/category-oci-logistics`; 
  // const url = `http://localhost:8080/oms/cms/materials`; // ikhsan
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}
export async function insert_category_oci_logistic(data) {
  const url = `${baseUrlGolang}/cms/category-oci-logistics`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function update_category_oci_logistic(data) {
  const url = `${baseUrlGolang}/cms/category-oci-logistics`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function delete_category_oci_logistic(id) {
  const url = `${baseUrlGolang}/cms/category-oci-logistics/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}
export async function getMaterialsData() {
  const url = `${baseUrlGolang}/cms/materials`; 
  // const url = `http://localhost:8080/oms/cms/materials`; // ikhsan
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function insert_material(data) {
  const url = `${baseUrlGolang}/cms/materials`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function update_material(data) {
  const url = `${baseUrlGolang}/cms/materials`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function delete_material(id) {
  const url = `${baseUrlGolang}/cms/materials/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function getAllBanners() {
  const url = `${baseUrlGolang}/cms/banners`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function add_banner(data) {
  const url = `${baseUrlGolang}/cms/banners`;
  return callAPI({
    url,
    data,
    method: 'POST',
    token: tokenize,
  });
}

export async function update_banner(data) {
  const url = `${baseUrlGolang}/cms/banner`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function remove_banner(id) {
  const url = `${baseUrlGolang}/cms/banners/${id}`;
  return callAPI({
    url,
    method: 'DELETE',
    token: tokenize,
  });
}

export async function bulk_update_banner(data) {
  const url = `${baseUrlGolang}/cms/banners`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}

export async function getPopUps() {
  const url = `${baseUrlGolang}/cms/pop-up`;
  return callAPI({
    url,
    method: 'GET',
    token: tokenize,
  });
}

export async function update_popup(data) {
  const url = `${baseUrlGolang}/cms/pop-up`;
  return callAPI({
    url,
    data,
    method: 'PUT',
    token: tokenize,
  });
}


// code area logistik api 

  export async function getData_Artikel(formrequest) {
    // const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/getArtikel`;
 
   
    // return call_Ocistik_API({
    //   url,
    //   method: 'GET',
    //   headers:{
    //     'Access-Control-Allow-Origin':'*',
    //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //     'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
    //   },
    //   token:false,
    // });

    const paramrequest=formrequest
    const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/getSearchArtikel`;
  
  const response =await axios({
      method: "post",
      url: url,
      data: paramrequest,
      headers: { "Content-Type": "multipart/form-data" },
  })

  const axiosResponse = response;
   
  return axiosResponse;


      
  }


  export async function getData_Artikel_By_Slug(slug_) {
    const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/getArtikelbyslug/${slug_}`;
 
    return call_Ocistik_API({
      url,
      method: 'GET',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
      },
      token:false,
    });

  }

  export async function getData_Artikel_By_ID(id) {
    const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/getArtikelbyId/${id}`;
 
    return call_Ocistik_API({
      url,
      method: 'GET',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
      },
      token:false,
    });

  }

      

    export async function update_artikel(form_input) {
      const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/updateArtikel`;

      const form_input_data=form_input
   
      return call_Ocistik_API({
        url,
        method: 'PUT',
        headers:{
          // 'Access-Control-Allow-Origin':'*',
          // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          // 'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid",
          "Content-Type": "multipart/form-data"

          
        },
        data:form_input_data,
        token:false,
      });
  
        
    }


    //get kontak customer

  export async function getData_Kontak() {
    const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/getKontak`;
 
    return call_Ocistik_API({
      url,
      method: 'GET',
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
      },
      token:false,
    });

  }

  
    //get penulis

    export async function getData_Penulis() {
      const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/getPenulis`;
   
      return call_Ocistik_API({
        url,
        method: 'GET',
        headers:{
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
        },
        token:false,
      });
  
    }

           //get penulis

           export async function getData_Penulis_By_ID(id_) {
            const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/getPenulisbyid/${id_}`;
         
            return call_Ocistik_API({
              url,
              method: 'GET',
              headers:{
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
              },
              token:false,
            });
        
          }

      //get editor

      export async function getData_Editor() {
        const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/getEditor`;
     
        return call_Ocistik_API({
          url,
          method: 'GET',
          headers:{
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
          },
          token:false,
        });
    
      }


         //get editor

         export async function getData_Editor_By_ID(id_) {
          const url = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/getEditorbyid/${id_}`;
       
          return call_Ocistik_API({
            url,
            method: 'GET',
            headers:{
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
            },
            token:false,
          });
      
        }

  //batas logistik area

    
