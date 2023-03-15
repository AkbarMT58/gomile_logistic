import Layout from "components/Layout";
import WarehouseIndoTable from "components/Warehouse/WarehouseIndo/WarehouseIndoTable";
import { SubRoutesWarehouse as SUBROUTES } from 'components/Warehouse/SubRoutesWarehouse';

const WarehouseIndo = () => {
  return (
    <Layout routes={SUBROUTES()}>
      {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Abnormal
      </p> */}
      <WarehouseIndoTable />
    </Layout>
  );
};

export default WarehouseIndo;
