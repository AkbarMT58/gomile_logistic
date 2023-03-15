import { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { CircularProgress, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { refundOrder } from 'service/api';
import swal from 'sweetalert';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 2,
  boxShadow: 24,
  overflowY: 'scroll',
  p: 4,
};

export default function RefundModal({ id_group, orderData, closeOrderDetail }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [detailOrder, setDetailOrder] = useState(
  //   JSON.parse(JSON.stringify(orderData))
  // );
  const [isLoading, setLoading] = useState();
  const [detailRefund, setDetailRefund] = useState();
  const [totalRefundQuantity, setTotalRefundQuantity] = useState(0);
  const [totalRefundPrice, setTotalRefundPrice] = useState(0);

  useEffect(() => {
    if (orderData) {
      const tempProduk = [];
      orderData.product.map((prod) => {
        tempProduk.push({
          id_produk: parseInt(prod.idvariant),
          kuantiti: 0,
          harga: prod.price,
          total: 0,
          image: prod.image,
          sku: prod.sku,
          product: prod.product,
        });
      });

      setDetailRefund({
        id_so: parseInt(orderData.orderNumber),
        keterangan: '',
        produk: tempProduk,
      });
      // setDetailOrder(orderData);
    }
  }, [orderData]);

  const renderLoading = isLoading ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        padding: '10px',
        borderRadius: 2,
        backgroundColor: 'white',
        marginBottom: 1,
        height: '100%',
      }}>
      <div className="flex items-center justify-center w-full h-full p-4 rounded-md">
        <CircularProgress />
      </div>
    </Box>
  ) : null;

  const setRefundQty = (e, index) => {
    if (parseInt(e.target.value) <= orderData.product[index].qty) {
      const newDetailRefund = detailRefund;
      newDetailRefund.produk[index].kuantiti = parseInt(e.target.value);
      newDetailRefund.produk[index].total =
        parseInt(e.target.value) * newDetailRefund.produk[index].harga;

      setDetailRefund(newDetailRefund);

      //SET TOTAL REFUND QUANTITY
      const total_refund_qty = detailRefund.produk.reduce(
        (acc, cur) => acc + cur.kuantiti,
        0
      );
      setTotalRefundQuantity(total_refund_qty);

      //SET TOTAL REFUND PRICE
      const total_refund_price = detailRefund.produk.reduce(
        (acc, cur) => acc + cur.kuantiti * cur.harga,
        0
      );
      setTotalRefundPrice(total_refund_price);
    }
  };

  const submitRefund = async () => {
    const newDetailRefund = JSON.parse(JSON.stringify(detailRefund));
    const filteredRefunds = newDetailRefund.produk.filter(
      (prod) => prod.kuantiti !== 0
    );
    newDetailRefund.produk = filteredRefunds;

    if (filteredRefunds.length !== 0 && newDetailRefund.keterangan !== '') {
      setLoading(true);
      const data = await refundOrder(JSON.stringify(newDetailRefund));
      if (data?.status === 200) {
        swal('Success', 'Refund berhasil disubmit.', 'success').then(() => {
          handleClose();
          closeOrderDetail();
        });
      } else {
        handleClose();
        swal('Oops', data?.message, 'error');
      }
      setLoading(false);
    }
  };

  const set_Keterangan = (e) => {
    setDetailRefund((prev) => {
      return { ...prev, keterangan: e.target.value };
    });
  };

  return (
    <>
      <div className="flex justify-end mt-3">
        <div
          className="text-white bg-blue-500 hover:bg-blue-600 text-sm px-3 py-1 rounded-xl cursor-pointer"
          onClick={() => {
            handleOpen();
          }}>
          REFUND
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style} className="variant-scroll">
            {isLoading ? (
              renderLoading
            ) : (
              <>
                <div className="flex justify-end -mt-5">
                  <IconButton
                    onClick={handleClose}
                    style={{ textAlign: 'right' }}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div className="flex flex-col space-y-3 mb-3">
                  <Typography
                    id="transition-modal-title"
                    variant="h6"
                    component="h2">
                    Refund{' '}
                    <span className="font-bold">{detailRefund?.id_so}</span>
                  </Typography>
                </div>

                <div className="max-h-[20rem] border border-gray-100 overflow-y-scroll variant-scroll mt-3">
                  {/* Table */}
                  <table className="min-w-full bg-white border border-gray-200 rounded-md">
                    <thead className="border-b border-gray-200 ">
                      <tr>
                        <th className="text-left py-3 px-4 font-normal text-xs">
                          PIC
                        </th>
                        <th className="text-left py-3 px-4 font-normal text-xs">
                          SKU
                        </th>
                        <th className="text-left py-3 px-4 font-normal text-xs">
                          Product
                        </th>
                        {/* <th className="text-left py-3 px-4 font-normal text-xs">
                          Link
                        </th> */}
                        <th className="text-left py-3 px-4 font-normal text-xs w-10">
                          Quantity
                        </th>
                        <th className="text-left py-3 px-4 font-normal text-xs">
                          Price
                        </th>
                        <th className="text-left py-3 px-4 font-normal text-xs">
                          Total Price
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      style={{ height: '100px' }}
                      className="text-gray-700 rounded-b-md">
                      {detailRefund?.produk?.map((product, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="text-left py-3 px-4">
                            <img
                              src={
                                product?.image
                                  ? product?.image
                                  : '/default_image.png'
                              }
                              alt="product"
                              className="w-20 rounded-md object-cover shadow-md"
                            />
                          </td>
                          <td className="w-40 text-left py-3 px-4 text-xs">
                            <p className="line-clamp-1" title={product.sku}>
                              {product.sku}
                            </p>
                          </td>
                          <td className="w-58 text-left py-3 px-4 text-xs">
                            <p className="line-clamp-2" title={product.product}>
                              {product.product}
                            </p>
                          </td>
                          {/* <td className="text-left py-3 px-4 text-xs">
                            <a
                              href={product?.link}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="line-clamp-1 w-[100px] text-blue-500 hover:text-orange-500">
                              {product?.link}
                            </a>
                          </td> */}
                          <td className="text-left py-3 px-4 text-xs">
                            <input
                              type="number"
                              className="w-10 text-center px-1 border rounded-sm"
                              value={product.kuantiti}
                              onChange={(e) => setRefundQty(e, index)}
                            />
                            {/* <p>{product.kuantiti}</p> */}
                          </td>
                          <td className="text-left whitespace-nowrap py-3 px-4 text-xs">
                            <p>Rp. {product.harga.toLocaleString('id-ID')}</p>
                          </td>
                          <td className="text-left whitespace-nowrap py-3 px-4 text-xs">
                            <p>Rp. {product.total.toLocaleString('id-ID')}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end items-center">
                  <div
                    className="text-right py-2 px-4 text-xs font-semibold"
                    colSpan="3">
                    Total
                  </div>
                  <div className="text-center py-2 px-4 text-xs font-semibold whitespace-nowrap">
                    {totalRefundQuantity} pcs
                  </div>
                  <div
                    className="text-right py-2 px-4 text-xs font-semibold whitespace-nowrap"
                    colSpan="2">
                    Rp. {totalRefundPrice.toLocaleString('id-ID')}
                  </div>
                </div>

                <div className="flex items-start gap-y-3 flex-col mt-2">
                  <textarea
                    id="keterangan"
                    name="keterangan"
                    rows="3"
                    cols="50"
                    className="border rounded-md text-sm px-2"
                    onChange={(e) => set_Keterangan(e)}></textarea>
                  <div
                    className="text-white bg-blue-500 hover:bg-blue-600 text-sm px-3 py-1 rounded-xl cursor-pointer"
                    onClick={() => submitRefund()}>
                    Submit Refund
                  </div>
                </div>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
