import Layout from "components/Layout";
import { getCancelOrderData } from "service/api";
import { useEffect, useState } from "react";
import CancelOrderTable from "components/AfterSales/CancelOrder/CancelOrderTable";
import { SubRoutesAfterSales as SUBROUTES } from 'components/AfterSales/SubRoutesAfterSales';

const CancelOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [update, setUpdate] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [select, setSelect] = useState("");

  const fetchOrderData = async (limit, page, select) => {
    setIsLoading(true);
    let params = new URLSearchParams({
      limit,
      page,
      filter: select,
    }).toString();

    const data = await getCancelOrderData(params);

    if (data?.status === 200) {
      setDataOrder(data.data.data);
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
    <Layout routes={SUBROUTES()} title="After Sales">
      <div className="flex justify-start">
        <p className="my-4 bg-white  p-2 rounded-md cursor-pointer text-center">
          Cancel Order
        </p>
      </div>
      <CancelOrderTable
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

export default CancelOrder;
