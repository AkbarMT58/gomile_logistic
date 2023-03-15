import { useState } from 'react';
import { getDataPrintLabelDetails } from 'service/api';
import { LoadingComponentDefault } from 'components/UI/LoadingComponent';
import PrintBarcodeModal from './PrintBarcodeModal';

export default function GenerateLabel({ customerData, id_group, id_so }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [isBolean, setIsBolean] = useState({
    isLoadingBarcode: false,
  });

  const handleOpen = async () => {
    const params = id_group ? id_group : id_so;

    setIsBolean({
      isLoadingBarcode: true,
    });

    const response = await getDataPrintLabelDetails(params);
    if (response?.status === 200) {
      setIsBolean({
        isLoadingBarcode: false,
      });
      setData(response?.data);
    } else {
      setIsBolean({
        isLoadingBarcode: false,
      });
    }

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div>
      <LoadingComponentDefault
        textLoading={'Loading . . .'}
        setIsLoading={isBolean?.isLoadingBarcode}>
        <button
          className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md w-full"
          onClick={handleOpen}>
          Barcode
        </button>
      </LoadingComponentDefault>

      <PrintBarcodeModal
        customerData={customerData}
        id_group={id_group}
        id_so={id_so}
        open={open}
        handleClose={handleClose}
        data={data}
        isBolean={isBolean}
      />
    </div>
  );
}
