import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {
  CircularProgress,
  IconButton,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  Table,
  Tooltip,
  Typography,
  Fade,
  Modal,
  Box,
  Backdrop,
} from "@mui/material";
import TrackingModal from "./TrackingModal";
import { viewModal } from "service/api";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function ViewModal({ email }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const fetchOrderData = async (email) => {
    const data = await viewModal(email, history);

    if (data) {
      setOrderData(data.data);
    }

    setIsLoading(false);
  };

  const rows = [orderData];

  return (
    <>
      <Tooltip title="Detail Order">
        <IconButton
          onClick={() => {
            handleOpen();
            fetchOrderData(email);
          }}
        >
          <RemoveRedEyeIcon />
        </IconButton>
      </Tooltip>
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
          <Box sx={style}>
            <div className="flex justify-end -mt-5">
              <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Detail Order
            </Typography>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <div className="flex flex-col">
                  <CircularProgress />
                  <p className="text-gray-500 text-sm mt-2">Loading ...</p>
                </div>
              </Box>
            ) : (
              <TableContainer
                component={Paper}
                sx={{ maxHeight: 440 }}
                className="variant-scroll"
              >
                <Table
                  stickyHeader
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Value</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Payment Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.map((rowData) =>
                      rowData.map((row) => (
                        <TableRow key={row.id_so}>
                          <TableCell>{row.id_so}</TableCell>
                          <TableCell>{row.email}</TableCell>
                          <TableCell>
                            {row.total.toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell className="capitalize">{row.status_payment}</TableCell>
                          <TableCell>
                            <TrackingModal id={row.id_so} />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
