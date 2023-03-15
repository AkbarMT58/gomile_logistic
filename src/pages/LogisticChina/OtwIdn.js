import Layout from "components/Layout";
import OtwIdnTable from "components/LogisticChina/OtwIdn/OtwIdnTable";
import { SubRoutesLogisticChina as SUBROUTES } from 'components/LogisticChina/SubRoutesLogisticChina';

const OtwIdn = () => {
  return (
    <Layout routes={SUBROUTES()} title="Logistic China">
      {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        OTW IDN
      </p> */}
      <OtwIdnTable />
    </Layout>
  );
};

export default OtwIdn;
