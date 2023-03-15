import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import { getDetailBarcode } from 'service/api';
import { LoadingComponentDefault } from 'components/UI/LoadingComponent';
import moment from 'moment/moment';
import _ from 'lodash'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 600,
  minHeight: 300,
  maxHeight: '90%',
  overflow: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const options = {
  // width: 2,
  height: 60,
  format: 'CODE128',
  displayValue: true,
  fontOptions: '',
  font: 'monospace',
  textAlign: 'center',
  textPosition: 'bottom',
  textMargin: 2,
  fontSize: 20,
  background: '#ffffff',
  lineColor: '#000000',
  margin: 10,
  marginTop: undefined,
  marginBottom: undefined,
  marginLeft: undefined,
  marginRight: undefined,
};

export default function ModalPrintBarcode({
    open,
    handleClose,
    currentData,
    setCurrentData
}) {
  const [detailBarcode, setDetailBarcode] = useState(null)
  let componentRef = useRef();
  
  useEffect(() => {
    if(currentData) {
      get_DetailBarcode(currentData.id)
    }
  }, [currentData])

  const get_DetailBarcode = async (id) => {
    const response = await getDetailBarcode(id)
    if (response.status == 200) {
      groupList(response.data)
    }
  }
  
  const groupList = (data) => {
    let grouped = _.mapValues(_.groupBy(data, 'customer'),
                  // barcodelist => barcodelist.map(code => _.omit(code, 'customer'))
                  );
    setDetailBarcode(grouped)
  }
  return (
    <Modal open={open} onClose={handleClose}>
        <Box
            sx={style}
            className="overflow-y-scroll variant-scroll table-scroll">
            <div className="flex justify-end -mt-5 w-full">
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
            </IconButton>
            </div>

            <div ref={(el) => (componentRef = el)} className="text-center">
                <div className="w-[550px] space-y-4">
                  <div className="flex justify-between">
                    <div className="date-month-year self-start bg-gray-100 p-5 space-y-2">
                      <div className="format text-sm">DD/MM/YYYY</div>
                      <div className="grid grid-cols-3 gap-x-1 font-semibold">
                        <div className="date bg-gray-300 w-12 h-8 flex justify-center items-center">{moment().date()}</div>
                        <div className="month bg-gray-300 w-12 h-8 flex justify-center items-center">{moment().month() + 1}</div>
                        <div className="year bg-gray-300 w-12 h-8 flex justify-center items-center">{moment().year()}</div>
                      </div>
                    </div>
                    <Barcode value={String(currentData.id)} {...options} />
                  </div>
                  
                  {detailBarcode &&
                    <div className='space-y-2'>
                      <div className='text-xl font-bold'>
                          LABEL RELEASE BARANG
                      </div>
                      <table className='w-full border border-gray-400 text-sm text-center'>
                        <thead>
                          <tr className='font-semibold'>
                            <td className="w-[10%] border border-gray-400">NO</td>
                            <td className='w-[50%] border border-gray-400'>NAMA CUSTOMER</td>
                            <td className='w-[20%] border border-gray-400'>ID ORDER</td>
                            <td className='w-[20%] border border-gray-400'>TOTAL KARTON</td>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(detailBarcode).map((key, index) => (
                            <React.Fragment key={index}>
                              <tr>
                                <td className='border border-gray-400' rowSpan={detailBarcode[key].length}>{index + 1}</td>
                                <td className='border border-gray-400 text-left p-1' rowSpan={detailBarcode[key].length}>
                                  <div className='font-bold'>{detailBarcode[key][0].customer}</div>
                                  <div className="alamat">
                                    <span className='font-semibold'>Alamat : </span>{detailBarcode[key][0].alamat}
                                  </div>
                                </td>
                                <td className='border border-gray-400'>{detailBarcode[key][0].id_so}</td>
                                <td className='border border-gray-400'>{detailBarcode[key][0].total_karton}</td>
                              </tr>
                              {detailBarcode[key].slice(1)?.map((item, index) => (
                                <tr>
                                    <React.Fragment key={item.id_so}>
                                      <td className='border border-gray-400'>{item.id_so}</td>
                                      <td className='border border-gray-400'>{item.total_karton}</td>
                                    </React.Fragment>
                                </tr>
                              ))}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  }
                </div>
            </div>
            
            <ReactToPrint
            trigger={() => (
                <button className="barcode-btn block mx-auto mt-3 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-5 py-1">
                Print
                </button>
            )}
            content={() => componentRef}
            />
        </Box>
    </Modal>
  );
}
