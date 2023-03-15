import Layout from "components/Layout";
import { getRefundCustomerData } from "service/api";
import { useEffect, useState } from "react";
import RefundCustomerTable from "components/AfterSales/RefundCustomer/RefundCustomerTable";
import { SubRoutesAfterSales as SUBROUTES } from 'components/AfterSales/SubRoutesAfterSales';

const RefundCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [update, setUpdate] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [select, setSelect] = useState("");

  const fetchOrderData = async (limit, page, select, id) => {
    setIsLoading(true);
    let tempParams = {
      limit,
      page,
      filter: select,
    }
    if (id) {
      tempParams.id = id
    }
    
    let params = new URLSearchParams(tempParams).toString();

    const data = await getRefundCustomerData(params);

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
          Refund Customer
        </p>
      </div>
      <RefundCustomerTable
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
        fetchOrderData={fetchOrderData}
      />
    </Layout>
  );
};

export default RefundCustomer;
