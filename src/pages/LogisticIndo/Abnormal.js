import Layout from 'components/Layout';
import AbnormalTable from 'components/LogisticIndo/Abnormal/AbnormalTable';
import { SubRoutesLogisticIndo as SUBROUTES } from 'components/LogisticIndo/SubRoutesLogisticIndo';

const Abnormal = () => {
  return (
    <Layout routes={SUBROUTES()} title="Logistic Indo">
      {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Abnormal
      </p> */}
      <AbnormalTable />
    </Layout>
  );
};

export default Abnormal;
