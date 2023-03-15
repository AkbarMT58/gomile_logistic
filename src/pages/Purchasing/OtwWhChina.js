import Container from 'components/Layout/Container';
import Navbar from 'components/Layout/Navbar';
import SearchBar from 'components/Layout/SearchBar';
import Sidebar from 'components/Layout/Sidebar';
import OtwWhChinaTable from 'components/Purchasing/OtwWhChina/OtwWhChinaTable';
import ScanBarcode from 'components/Purchasing/OtwWhChina/ScanBarcode/ScanBarcode';
import { exportOtwWhChina } from 'service/api';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import exportFromJSON from 'export-from-json';

import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesPurchasing as SUBROUTES } from 'components/Purchasing/SubRoutesPurchasing';
import swal from 'sweetalert';

const OtwWhChina = () => {
  const { obe: userOBE } = useSelector(selectAddData);
  
  const handleExport = async () => {
    const response = await exportOtwWhChina();

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
  };
  return (
    <>
      <Navbar />
      <div className="flex bg-gray-200 min-w-full min-h-screen  text-gray-600 ">
        <div className="w-30">
          <Sidebar routes={SUBROUTES(userOBE)} title="Purchasing" />
        </div>
        <Container>
          <div className="flex items-center justify-between mb-4">
            <SearchBar />
            <ScanBarcode />
          </div>
          <div className="flex justify-between items-center">
            {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
              OTW WH China
            </p> */}
            <button
              onClick={handleExport}
              className=" bg-blue-500 p-2 rounded-md text-white hover:bg-blue-300 transiton-all duration-300">
              <FileDownloadIcon fontSize="small" />
              <span>Export</span>
            </button>
          </div>

          <OtwWhChinaTable />
        </Container>
      </div>
    </>
  );
};

export default OtwWhChina;
