import Layout from 'components/Layout';
import ArrivedIdnTable from 'components/LogisticChina/ArrivedIdn/ArrivedIdnTable';
import { SubRoutesLogisticChina as SUBROUTES } from 'components/LogisticChina/SubRoutesLogisticChina';

const ArrivedIdn = () => {
  return (
    <Layout routes={SUBROUTES()} title="Logistic China">
      {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Arrived IDN
      </p> */}
      <ArrivedIdnTable />
    </Layout>
  );
};

export default ArrivedIdn;
