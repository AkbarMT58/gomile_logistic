import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
  IconButton,
  Collapse,
  Typography,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DetailProductTable from "./DetailProductTable";

export default function ContainerTable({ box }) {
  const Row = ({ rowData }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow>
          <TableCell align="center">
            <div className="flex flex-col items-center space-y-3">
              <p className="text-xs font-semibold">{rowData.id}</p>
              <div className="flex items-center text-center">
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                <span className="text-xs">Detail</span>
              </div>
            </div>
          </TableCell>
          <TableCell align="center">
            <p className="text-xs">{rowData.volume}</p>
          </TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center">
            <p className="text-xs">{rowData.container}</p>
          </TableCell>
          <TableCell align="center">
            <p className="text-xs">{rowData.courierIdn}</p>
          </TableCell>
          <TableCell align="center">
            <p className="text-xs">{rowData.receipt}</p>
          </TableCell>
          <TableCell align="center">
            <p className="text-xs">{rowData.status}</p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Detail Container
                </Typography>
                <DetailProductTable dataContainer={rowData.detail} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <TableContainer
        component={Paper}
        className="overflow-x-scroll h-96 variant-scroll"
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <p className="text-xs">Box Number</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs"> Volume (CM3)</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Expediton (CH-IDN)</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Container Number</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Expedition IDN</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Expedition Number IDN</p>
              </TableCell>
              <TableCell align="center">
                <p className="text-xs">Status</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {box?.length > 0 ? (
              <>
                {box.map((row, id) => (
                  <Row rowData={row} key={id} />
                ))}

                {box.length <= 3 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                      style={{ height: "50vh" }}
                    ></TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    style={{ height: "70vh" }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
