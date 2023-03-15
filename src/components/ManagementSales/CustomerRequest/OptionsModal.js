import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import {
  IconButton,
  TextField,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Typography,
  Fade,
  Box,
  Backdrop,
  Modal,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import swal from "sweetalert";
import { getDetailProductRequest, inputCustomerRequest } from "service/api";
import { useSelector } from "react-redux";
import { selectAddData } from "redux/addDataSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 550,
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function OptionsModal({
  id_detail,
  product,
  name,
  notesProduct,
  id_request,
  link,
  email,
  setUpdate,
}) {
  const { category } = useSelector(selectAddData);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [detailProduct, setDetailProduct] = useState([]);
  const [checked, setChecked] = useState(1);
  const handleCheckedChange = (event) => {
    const { checked } = event.target;
    const value = checked ? 1 : 0;
    setChecked(value);
  };
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("oms_token");
  const getProductDetail = async (id) => {
    setLoading(true);

    const data = await getDetailProductRequest(id);

    if (data) {
      setDetailProduct(data.data);
    }

    setLoading(false);
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    const values = [...detailProduct];
    values[id][name] = parseInt(value);
    setDetailProduct(values);
  };

  const submitRequest = async (token) => {
    const newDetail = detailProduct.map((data) => {
      const {
        harga = 0,
        panjang = 0,
        lebar = 0,
        tinggi = 0,
        berat = 0,
        jenis = 0,
        box = 0,
        id,
        qty,
      } = data;

      return {
        harga: harga,
        kuantiti: qty,
        panjang: panjang,
        lebar: lebar,
        tinggi: tinggi,
        berat: berat,
        jenis: jenis,
        id,
        box,
      };
    });

    const body = JSON.stringify({
      id_request,
      kelipatan: checked,
      link,
      produk: newDetail,
    });

    const data = await inputCustomerRequest(body);

    if (data?.status === 200) {
      swal("Submitted", "Request submitted successfully", "success", {
        buttons: false,
        timer: 1000,
      });
      setUpdate((prev) => !prev);
      handleClose();
    }
  };

  const rows = [...detailProduct];

  return (
    <>
      <div
        onClick={() => {
          handleOpen();
          getProductDetail(id_detail);
        }}
        className="bg-blue-500 text-white rounded-md p-1 text-sm w-full text-center cursor-pointer"
      >
        OPTION
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
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="variant-scroll">
            <div className="flex justify-end -mt-5">
              <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Product ID : {id_detail}
            </Typography>
            <div className="flex  flex-col space-y-3 mt-5">
              <TextField
                id="outlined-read-only-input"
                label="Product"
                defaultValue={product}
                sixe="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Notes"
                defaultValue={notesProduct}
                sixe="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Name"
                defaultValue={name}
                sixe="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Email"
                defaultValue="Hello World"
                sixe="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="outlined-read-only-input"
                label="Email"
                defaultValue={email}
                sixe="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onChange={handleCheckedChange}
                    color="primary"
                  />
                }
                label="Box"
              />
              <TextField
                id="outlined-read-only-input"
                label="URL Supplier"
                defaultValue={link}
                sixe="small"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <div className="flex flex-col">
                  <CircularProgress />
                  <p className="text-gray-500 text-sm mt-2">Loading ...</p>
                </div>
              </Box>
            ) : (
              <TableContainer
                sx={{ maxHeight: 440, marginTop: 2 }}
                component={Paper}
                className="table-scroll"
              >
                <Table
                  stickyHeader
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>PIC</TableCell>
                      <TableCell>Variant</TableCell>
                      <TableCell>Variant_CH</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price Request</TableCell>
                      <TableCell>Price Pcs</TableCell>
                      <TableCell>P (CM)</TableCell>
                      <TableCell>L (CM)</TableCell>
                      <TableCell>T (CM)</TableCell>
                      <TableCell>Weight (Gram)</TableCell>
                      <TableCell>Pcs/Box</TableCell>
                      <TableCell>Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.map((rowData, id) => (
                      <TableRow key={id}>
                        <TableCell>{rowData?.pic}</TableCell>
                        <TableCell>{rowData.variant}</TableCell>
                        <TableCell>{rowData.variantChina}</TableCell>
                        <TableCell>
                          <input
                            defaultValue={rowData.qty}
                            className="p-2 border border-gray-200 rounded-md w-20"
                            readOnly
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            defaultValue={rowData.priceRequest}
                            className="p-2 border border-gray-200 rounded-md w-20"
                            readOnly
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            name="harga"
                            type="number"
                            onChange={(e) => handleChange(id, e)}
                            className="p-2 border border-gray-200 rounded-md w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            name="panjang"
                            type="number"
                            onChange={(e) => handleChange(id, e)}
                            className="p-2 border border-gray-200 rounded-md w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            name="lebar"
                            type="number"
                            onChange={(e) => handleChange(id, e)}
                            className="p-2 border border-gray-200 rounded-md w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            name="tinggi"
                            type="number"
                            onChange={(e) => handleChange(id, e)}
                            className="p-2 border border-gray-200 rounded-md w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            name="berat"
                            type="number"
                            onChange={(e) => handleChange(id, e)}
                            className="p-2 border border-gray-200 rounded-md w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            name="box"
                            type="number"
                            onChange={(e) => handleChange(id, e)}
                            className="p-2 border border-gray-200 rounded-md w-20"
                          />
                        </TableCell>
                        <TableCell>
                          <select
                            name="jenis"
                            onChange={(e) => handleChange(id, e)}
                            className="p-2 border border-gray-200 rounded-md"
                          >
                            <option value="">Select Catagory</option>
                            {category?.map((cat) => (
                              <option value={cat.value}>{cat.category}</option>
                            ))}
                          </select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <div className="flex items-center mt-4 w-full space-x-3">
              <button
                className="p-2 bg-blue-300 text-white rounded-md cursor-pointer"
                onClick={() => submitRequest(token)}
              >
                Submit
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
