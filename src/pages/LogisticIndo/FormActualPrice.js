import Layout from 'components/Layout';
import { getFormActualData } from 'service/api';
import { useEffect, useState } from 'react';
import FormActualPriceTable from 'components/LogisticIndo/FormActualPrice/FormActualPriceTable';
import { SubRoutesLogisticIndo as SUBROUTES } from 'components/LogisticIndo/SubRoutesLogisticIndo';

const FormActualPrice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [update, setUpdate] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [select, setSelect] = useState('');

  const fetchOrderData = async (limit, page, select) => {
    setIsLoading(true);
    let params = new URLSearchParams({
      limit,
      page,
      filter: select,
    }).toString();

    const data = await getFormActualData(params);

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
    <Layout routes={SUBROUTES()} title="Logistic Indo">
      <div className="flex justify-start">
        <p className="my-4 bg-white  p-2 rounded-md cursor-pointer text-center">
          Form Actual Price
        </p>
      </div>
      <FormActualPriceTable
        isLoading={isLoading}
        page={page}
        pageInfo={pageInfo}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        setUpdate={setUpdate}
        select={select}
        setSelect={setSelect}
        dataOrder={dataOrder}
      />
    </Layout>
  );
};

export default FormActualPrice;
