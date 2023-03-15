import Layout from 'components/Layout';
import RefundOciTable from 'components/AfterSales/RefundOCI/RefundOciTable';
import { SubRoutesAfterSales as SUBROUTES } from 'components/AfterSales/SubRoutesAfterSales';

const RefundOci = () => {
  return (
    <Layout routes={SUBROUTES()} title="After Sales">
      <div className="flex justify-start">
        <p className="my-4 bg-white  p-2 rounded-md cursor-pointer text-center">
          Refund OCI
        </p>
      </div>
      <RefundOciTable />
    </Layout>
  );
};

export default RefundOci;
