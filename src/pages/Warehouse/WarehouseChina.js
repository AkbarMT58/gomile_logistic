import Layout from "components/Layout";
import WarehouseChinaTable from "components/Warehouse/WarehouseChina/WarehouseChinaTable";
import { SubRoutesWarehouse as SUBROUTES } from 'components/Warehouse/SubRoutesWarehouse';

const WarehouseChina = () => {
  return (
    <Layout routes={SUBROUTES()}>
      {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Abnormal
      </p> */}
      <WarehouseChinaTable />
    </Layout>
  );
};

export default WarehouseChina;
