import Layout from 'components/Layout';
import CompletedOrderTable from 'components/AfterSales/CompletedOrder/CompletedOrderTable';
import { SubRoutesAfterSales as SUBROUTES } from 'components/AfterSales/SubRoutesAfterSales';

const CompletedOrder = () => {
  return (
    <Layout routes={SUBROUTES()} title="After Sales">
      <div className="flex justify-start">
        <p className="my-4 bg-white  p-2 rounded-md cursor-pointer text-center">
          Completed Order
        </p>
      </div>
      <CompletedOrderTable />
    </Layout>
  );
};

export default CompletedOrder;
