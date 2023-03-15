import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Collapse,
  IconButton,
  Box,
} from "@mui/material";
import { useState } from "react";
import SubDetailProduct from "./SubDetailProduct";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Row = ({ rowData }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell align="center">
          <div className="flex flex-col items-center">
            <p className="font-semibold">{rowData.id_so}</p>
            <div className="text-center">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <span className="text-xs">Details</span>
            </div>
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <SubDetailProduct dataOrder={rowData.id_po} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function DetailListBoxTable({ dataContainer }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Order Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataContainer?.map((row, id) => (
            <Row rowData={row} key={id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
