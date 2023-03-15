import Layout from 'components/Layout';
import { getRefundApprovalData } from 'service/api';
import { useEffect, useState } from 'react';
import RefundApprovalTable from 'components/AfterSales/RefundApproval/RefundApprovalTable';
import MakeRefund from 'components/AfterSales/RefundApproval/MakeRefund';
import { SubRoutesAfterSales as SUBROUTES } from 'components/AfterSales/SubRoutesAfterSales';

const RefundApproval = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [update, setUpdate] = useState(false);
  const [pageInfo, setPageInfo] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [select, setSelect] = useState('');

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

    const data = await getRefundApprovalData(params);

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
      <div className="flex items-center justify-between">
        <p className="my-4 bg-white  p-2 rounded-md cursor-pointer text-center">
          Refund Approval
        </p>
        <MakeRefund setUpdate={setUpdate} />
      </div>
      <RefundApprovalTable
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

export default RefundApproval;
