import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
  Typography,
  Modal,
  Fade,
  Box,
  Backdrop,
} from "@mui/material";
import { trackingModal } from "service/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function TrackingModal({ id, setDetail }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [trackingData, setTrackingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const trackingHandler = async (id) => {
    const data = await trackingModal(id);
    if (data) {
      setTrackingData(data.data);
      setDetail(data.data);
    }
    setIsLoading(false);
  };

  const rows = [trackingData];

  return (
    <>
      <Tooltip title="Tracking Order">
        <IconButton
          onClick={() => {
            handleOpen();
            trackingHandler(id);
          }}
        >
          <HistoryIcon />
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
              Tracking Order
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
                className="variant-scroll table-scroll"
              >
                <Table
                  stickyHeader
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Detail</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>User</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trackingData?.length > 0 ? (
                      rows?.map((rowData) =>
                        rowData?.map((row, id) => (
                          <TableRow key={id}>
                            <TableCell>{row.id_so}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>
                              <p className="w-96 break-all">{row.keterangan}</p>
                            </TableCell>
                            <TableCell>{row.tanggal}</TableCell>
                            <TableCell>
                              {row.user.slice(0, 1).toUpperCase() +
                                row.user.slice(1)}
                            </TableCell>
                          </TableRow>
                        ))
                      )
                    ) : (
                      <TableRow key={id}>
                        <TableCell align="center" colSpan={5}>
                          No Data
                        </TableCell>
                      </TableRow>
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
