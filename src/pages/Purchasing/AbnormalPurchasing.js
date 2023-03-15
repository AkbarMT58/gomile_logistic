import { useState } from 'react';
import Layout from 'components/Layout';
import AbnormalTable from 'components/Purchasing/AbnormalPurchasing/AbnormalTable';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { exportAbnormal } from 'service/api';
import exportFromJSON from 'export-from-json';

import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesPurchasing as SUBROUTES } from 'components/Purchasing/SubRoutesPurchasing';
import swal from 'sweetalert';

const AbnormalPurchasing = () => {
  const { obe: userOBE } = useSelector(selectAddData);
  const [isLoading, setIsLoading] = useState(false)
  
  const handleExport = async () => {
    setIsLoading(true)
    const response = await exportAbnormal();
    const exportType = exportFromJSON.types.xls;
    if (response.status === 200) {
      exportFromJSON({
        data: response.data,
        fileName: response.fileName,
        exportType,
      });
    } else {
      swal('Oops', response.message, 'error');
    }
    setIsLoading(false)
  };
  return (
    <Layout routes={SUBROUTES(userOBE)} title="Purchasing">
      <div className="flex justify-between items-center">
        {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
          Abnormal
        </p> */}
        <button
          disabled={isLoading}
          onClick={handleExport}
          className={`${isLoading ? 'bg-gray-300 cursor-default' : 'bg-blue-500 hover:bg-blue-300'}  p-2 rounded-md text-white transiton-all duration-300`}>
            {isLoading? 'Exporting...' :
            <>
              <FileDownloadIcon fontSize="small" />
              <span>Export</span>
            </>
            }
        </button>
      </div>

      <AbnormalTable />
    </Layout>
  );
};

export default AbnormalPurchasing;
