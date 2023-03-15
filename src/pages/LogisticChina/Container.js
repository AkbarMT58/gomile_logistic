import Layout from "components/Layout";
import ContainerTable from "components/LogisticChina/Container/ContainerTable";
import { SubRoutesLogisticChina as SUBROUTES } from 'components/LogisticChina/SubRoutesLogisticChina';

const Container = () => {
  return (
    <Layout routes={SUBROUTES()} title="Logistic China">
      {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Container
      </p> */}
      <ContainerTable />
    </Layout>
  );
};

export default Container;
