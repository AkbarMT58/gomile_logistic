import { useState, useEffect } from 'react';
import Container from 'components/Layout/Container';
import Navbar from 'components/Layout/Navbar';
import SearchBar from 'components/Layout/SearchBar';
import Sidebar from 'components/Layout/Sidebar';
import { getReceivedWhIndoData } from 'service/api';
import ReceivedWhIndoTable from 'components/LogisticIndo/ReceivedWhIndo/ReceivedWhIndoTable';
import ScanBarcode from 'components/LogisticIndo/ReceivedWhIndo/ScanBarcode/ScanBarcode';
import { SubRoutesLogisticIndo as SUBROUTES } from 'components/LogisticIndo/SubRoutesLogisticIndo';

const ReceivedWhIndo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [update, setUpdate] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [select, setSelect] = useState('');

  // const SUBROUTES = [
  //   {
  //     name: 'Received WH Indo',
  //     pathname: '/logistic-indo/received-wh-indo',
  //   },
  //   {
  //     name: 'Gudang Pengiriman',
  //     pathname: '/logistic-indo/warehouse-sorting',
  //   },
  //   {
  //     name: 'WH Indo Delivery',
  //     pathname: '/logistic-indo/wh-indo-delivery',
  //   },
  //   {
  //     name: 'Logistics Indo',
  //     pathname: '/logistic-indo/logistics-indo',
  //   },
  //   {
  //     name: 'Form Actual Price',
  //     pathname: '/logistic-indo/form-actual-price',
  //   },
  //   { name: 'Abnormal', pathname: '/logistic-indo/abnormal' },
  //   // { name: 'Persetujuan', pathname: '/logistic-indo/ApprovalWhIndo' },
  // ];

  const fetchOrderData = async (limit, page, select) => {
    setIsLoading(true);
    let params = new URLSearchParams({
      limit,
      page,
      filter: select,
    }).toString();

    const data = await getReceivedWhIndoData(params);
    if (data?.status === 200) {
      const newFormat = [];
      for (let i = 0; i < data.data.data.customer.collection.length; i++) {
        const customer = data.data.data.customer.collection[i];
        const order = data.data.data.orders.collection[i];
        const idOrder = data.data.data.idOrders.collection[i];
        const finance = data.data.data.finance.collection[i];
        newFormat.push({ customer, order, idOrder, finance });
      }
      setDataOrder(newFormat);
      setPageInfo({
        dataInPage: data.data.dataInPage,
        totalData: data.data.totalData,
        totalPage: data.data.totalPage,
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    fetchOrderData(limit, page, select);
  }, [update, limit, page, select]);

  return (
    <>
      <Navbar />
      <div className="flex bg-gray-200 min-w-full min-h-screen  text-gray-600 ">
        <div className="w-30">
          <Sidebar routes={SUBROUTES()} title="Logistic Indo" />
        </div>
        <Container>
          <div className="flex items-center justify-between mb-4">
            <SearchBar />
          </div>
          <div className="flex justify-between">
            <p className="mb-2 bg-white p-2 rounded-md cursor-pointer text-center">
              Received WH Indo
            </p>
            <ScanBarcode />
          </div>
          <ReceivedWhIndoTable
            isLoading={isLoading}
            page={page}
            pageInfo={pageInfo}
            dataOrder={dataOrder}
            limit={limit}
            select={select}
            setLimit={setLimit}
            setUpdate={setUpdate}
            setPage={setPage}
            setSelect={setSelect}
          />
        </Container>
      </div>
    </>
  );
};

export default ReceivedWhIndo;
