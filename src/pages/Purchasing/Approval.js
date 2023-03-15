import Layout from 'components/Layout';
import ApprovalTable from 'components/Purchasing/Approval/ApprovalTable';

import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesPurchasing as SUBROUTES } from 'components/Purchasing/SubRoutesPurchasing';

const Approval = () => {
  const { obe: userOBE } = useSelector(selectAddData);
  
  return (
    <Layout routes={SUBROUTES(userOBE)} title="Purchasing">
      <div className="flex justify-between items-center">
        {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
          Approval
        </p> */}
      </div>

      <ApprovalTable />
    </Layout>
  );
};

export default Approval;
