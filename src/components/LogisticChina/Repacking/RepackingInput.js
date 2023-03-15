import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RepackingInputTable from './RepackingInputTable';
import swal from 'sweetalert';
import {
  insertRepackingData,
  getDetailOrderData,
  getDataPrintLabelDetails,
} from 'service/api';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import PrintBarcodeModal from 'components/General/DetailOrderModal/CustomerDetail/PrintBarcodeModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  maxHeight: 650,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export default function RepackingInput({
  openTriggerFromScanBarcode,
  setOpenTriggerFromScanBarcode,
  id_so,
  id_po,
  products,
  setUpdate,
  totalQty,
  RowCategory,
  totalBox,
}) {
  const { category } = useSelector(selectAddData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    getDetailOrder();
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false)
    if(openTriggerFromScanBarcode){
      setOpenTriggerFromScanBarcode(false)
    }
  };
  const [box, setBox] = useState([]);
  const [repacking, setRepacking] = useState({ numOfCarton: '', category: '' });
  const [show, setShow] = useState(false);
  const [newDataProduct, setNewDataProduct] = useState(
    products.map((data) => {
      return {
        idProduk: data.idProduk,
        sku: data.sku,
        name: data.name,
        qty: data.qty,
        avQty: data.qty_whchina,
        orderedQty: data.qty,
      };
    })
  );

  const [dataBarcode, setDataBarcode] = useState(null);
  const [openBarcode, setOpenBarcode] = useState(false);
  const [detailOrder, setDetailOrder] = useState({});
  const [isBolean, setIsBolean] = useState({
    isLoadingBarcode: false,
  });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if(openTriggerFromScanBarcode){
      handleOpen()
    }
  }, [openTriggerFromScanBarcode])

  useEffect(() => {
    if(detailOrder) {
      setRepacking((prev) => {
        return { ...prev, category: detailOrder.category };
      });
    }
  }, [detailOrder])

  const handleChangeBoxData = (e) => {
    const { name, value } = e.target;
    if (name !== 'category') {
      setBox([]);
    }

    if (name === 'numOfCarton') {
      setNewDataProduct(
        products.map((data) => {
          return {
            idProduk: data.idProduk,
            sku: data.sku,
            name: data.name,
            qty: data.qty,
            avQty: data.qty_whchina,
            orderedQty: data.qty,
          };
        })
      );
    }
    setRepacking((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const generateCarton = () => {
    if (repacking.numOfCarton !== '') {
      if (Number(repacking.numOfCarton <= totalQty)) {
        if (Number(repacking.numOfCarton) >= 100) {
          swal({
            title: 'Are you sure?',
            text: `You will generate ${repacking.numOfCarton} cartons !`,
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then((willGenerated) => {
            if (willGenerated) {
              for (let i = 0; i < Number(repacking.numOfCarton); i++) {
                const boxProduct = [...detailOrder?.orderDetail?.product].map(
                  (order) => {
                    return {
                      sku: order.sku,
                      name: order.product,
                      qty: order.qty_whchina,
                      actual_qty: order.qty_whchina,
                      idProduct: order.idvariant,
                      qtyInput: '',
                      avQty: order.qty_whchina,
                      orderedQty: order.qty,
                      image: order.image,
                    };
                  }
                );
                setBox((prev) => [
                  ...prev,
                  {
                    id_box: `${id_so}-${i + 1 + ~~totalBox}`, // *totalBox being forced converted to integer (while it's not presented by backend yet)
                    panjang: '',
                    width: '',
                    height: '',
                    weight: '',
                    box_product: boxProduct,
                  },
                ]);
              }
              setShow(true);
            } else {
              swal('Generte carton canceled !');
              handleClose();
            }
          });
        } else {
          for (let i = 0; i < Number(repacking.numOfCarton); i++) {
            const boxProduct = [...detailOrder?.orderDetail?.product].map(
              (order) => {
                return {
                  sku: order.sku,
                  name: order.product,
                  qty: order.qty_whchina,
                  actual_qty: order.qty_whchina,
                  idProduct: order.idvariant,
                  qtyInput: '',
                  avQty: order.qty_whchina,
                  orderedQty: order.qty,
                  image: order.image,
                };
              }
            );
            setBox((prev) => [
              ...prev,
              {
                id_box: `${id_so}-${i + 1 + ~~totalBox}`, // *totalBox being forced converted to integer (while it's not presented by backend yet)
                panjang: '',
                width: '',
                height: '',
                weight: '',
                box_product: boxProduct,
              },
            ]);
          }
          setShow(true);
        }
      } else {
        swal('Oops', `Over maximum number of carton!`, 'error');
      }
    }
  };

  const checkSimilarID = (boxData) => {
    let arrayStatus = [];
    for (let i = 0; i < boxData.length; i++) {
      let similar = false;
      let uniqueId = [];
      for (let j = 0; j < boxData[i].box_product.length; j++) {
        if (uniqueId.includes(boxData[i].box_product[j].id_product)) {
          similar = true;
          break;
        } else {
          uniqueId.push(boxData[i].box_product[j].id_product);
        }
      }
      arrayStatus.push(similar);
    }
    return arrayStatus;
  };

  const submitRepackingData = async () => {
    const tempBox = []
    const emptyBox = []
    box.map((data) => {
      const isDirty = data.box_product.filter((boxData) => boxData.qtyInput !== '' && boxData.qtyInput !== '0');
      
      if(isDirty.length !== 0) {
       tempBox.push(data)
      }
      if(isDirty.length == 0) {
       emptyBox.push(data.id_box)
      }
    });

    const box_submit = box.map((data) =>  {
      return {
        ...data,
        box_product: data.box_product.filter((boxData) => boxData.qtyInput !== '' && boxData.qtyInput !== '0').map((product) => {
          return {
            id_product: product.idProduct,
            qty: Number(product.qtyInput),
            actual_qty: Number(product.actual_qty),
          };
        }),
      };
    });

    const validateInput = box_submit.filter(
      (data) =>
        data.panjang === '' ||
        data.width === '' ||
        data.height === '' ||
        data.weight === '' ||
        data.box_product.filter(
          (data) =>
            data.qty === '' || data.id_product === '' || data.actualQty === ''
        ).length > 0
    );

    const validateIdProduct = checkSimilarID(box_submit);

    if (validateIdProduct.includes(true)) {
      swal('Oops', "Product can't be same each carton !", 'error');
      return;
    }

    if (validateInput.length > 0) {
      swal('Oops', 'Input not valid !', 'error');
      return;
    }

    if (repacking.category === '') {
      swal('Oops', 'Please select category before submit !', 'error');
      return;
    }

    if (emptyBox.length > 0) {
      swal('Oops', 'You still have empty box!', 'error');
      return;
    }
    setLoading(true);

    const body = JSON.stringify({
      id_so,
      invoice: id_po,
      category: repacking.category,
      total_product: products.length,
      box: box_submit,
    });

    const data = await insertRepackingData(body);

    if (data?.status === 200) {
      handleOpenBarcode();
      // swal('Success', 'Repacking submitted succesfully', 'success');
      // setBox([]);
      // setShow(false);
      // setUpdate((prev) => !prev);
    }
    if (data?.status === 400) {
      swal('Oops', data?.message, 'error');
    }
    setLoading(false);
  };

  useEffect(() => {
    setRepacking({
      ...repacking,
      category: RowCategory,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetailOrder = async () => {
    setLoading(true);
    const data = await getDetailOrderData(id_so);
    if (data?.status === 200) {
      setDetailOrder(data.data);
    } else {
      handleClose();
      swal('Oops', data?.message, 'error');
    }
    setLoading(false);
  };

  const handleOpenBarcode = async () => {
    const params = id_so;

    setIsBolean({
      isLoadingBarcode: true,
    });

    const response = await getDataPrintLabelDetails(params);
    if (response?.status === 200) {
      setIsBolean({
        isLoadingBarcode: false,
      });
      setDataBarcode(response?.data);
    } else {
      setIsBolean({
        isLoadingBarcode: false,
      });
    }

    setOpenBarcode(true);
    setShow(false);
  };
  const handleCloseBarcode = () => {
    setBox([]);
    setShow(false);
    setUpdate((prev) => !prev);
    setOpenBarcode(false);
  };

  return (
    <div>
      <div
        className={"py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center cursor-pointer " + (openTriggerFromScanBarcode && "hidden")}
        onClick={() => {
          handleOpen();
        }}>
        Repacking
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style} className="overflow-y-scroll variant-scroll">
          <div className="flex justify-end -mt-5">
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Detail Product: {id_so}
          </Typography>
          <div className="flex my-5 space-x-5">
            <div className="w-1/3 space-y-3">
              <div className="flex justify-between">
                <label className="text-sm font-semibold">
                  Number Of Carton
                </label>
                <input
                  type="text"
                  onChange={handleChangeBoxData}
                  name="numOfCarton"
                  placeholder={`Max ${totalQty} ${
                    totalQty > 1 ? 'Cartons' : 'Carton'
                  }`}
                  value={repacking.numOfCarton}
                  className="p-1 rounded-md border border-gray-300 w-52 focus:outline-blue"
                />
              </div>
              <div className="flex justify-between">
                <label className="text-sm font-semibold">Order Number</label>
                <input
                  type="text"
                  disabled={true}
                  defaultValue={id_so}
                  className="p-1 rounded-md border border-gray-300 w-52 focus:outline-blue"
                />
              </div>
              <div className="flex justify-between">
                <label className="text-sm font-semibold">PO Number</label>
                <input
                  type="text"
                  disabled={true}
                  defaultValue={id_po}
                  className="p-1 rounded-md border border-gray-300 w-52 focus:outline-blue"
                />
              </div>
              <div className="flex justify-between">
                <label className="text-sm font-semibold">Category</label>
                <select
                  className="p-1 rounded-md border border-gray-300 w-52 focus:outline-blue"
                  name="category"
                  value={repacking.category}
                  onChange={handleChangeBoxData}>
                  <option value="">Choose Category</option>
                  {category?.map((cat, index) => (
                    <option key={index} value={cat.value}>{cat.category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-2/3 flex  items-end">
              <button
                className="p-1 px-2 bg-blue-500 text-white rounded-md"
                onClick={() =>
                  box.length === 0
                    ? repacking.category
                      ? generateCarton()
                      : swal('Oops', 'Please choose category first!', 'error')
                    : null
                }>
                Add Carton
              </button>
            </div>
          </div>
          {show && (
            <RepackingInputTable
              box={box}
              setBox={setBox}
              setUpdate={setUpdate}
              products={products}
              newDataProduct={newDataProduct}
              setNewDataProduct={setNewDataProduct}
            />
          )}
          <hr className="my-3" />
          <div className="flex justify-center">
            {show && (
              <button
                className={`${
                  box.length !== 0 ? 'bg-blue-500' : 'bg-gray-400 '
                } p-2 px-4 text-white rounded-md`}
                onClick={!isLoading && submitRepackingData}
                disabled={box.length === 0}>
                {isLoading ? "Loading..." : "Submit"}
              </button>
            )}
          </div>
        </Box>
      </Modal>

      <PrintBarcodeModal
        customerData={detailOrder?.customerDetail}
        // id_group={id_group}
        // id_so={id_so}
        open={openBarcode}
        handleClose={handleCloseBarcode}
        data={dataBarcode}
        isBolean={isBolean}
      />
    </div>
  );
}
