import Layout from 'components/Layout';
import RepackingTable from 'components/LogisticChina/Repacking/RepackingTable';
// import ScanBarcodeRepacking from 'components/LogisticChina/Repacking/ScanBarcodeRepacking';
import { useState } from 'react';
import { SubRoutesLogisticChina as SUBROUTES } from 'components/LogisticChina/SubRoutesLogisticChina';

const Repacking = () => {
  const [showModalScanBarcode, setShowModalScanBarcode] = useState(false)

  return (
    <Layout routes={SUBROUTES()} title="Logistic China">
      <div className="flex justify-between items-center">

        {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
          Processing
        </p> */}
        <div className='flex gap-2'>
          {/* <ScanBarcodeRepacking /> */}
        </div>
      </div>
      <RepackingTable showModalScanBarcode={showModalScanBarcode} setShowModalScanBarcode={setShowModalScanBarcode}/>
    </Layout>
  );
};

export default Repacking;
