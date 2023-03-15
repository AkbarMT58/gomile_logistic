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
} from "@mui/material";
import { useState } from "react";
import React from "react";
import { Box } from "@mui/system";
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
            <p className="font-semibold">{rowData.id_carton}</p>
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
        <TableCell align="center">{rowData.id_so}</TableCell>
        <TableCell align="center">{rowData.volume} CM3</TableCell>
        <TableCell align="center">{rowData.qty}</TableCell>
        <TableCell align="center">{rowData.user}</TableCell>
        <TableCell align="center">{rowData.updatedDate}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <SubDetailProduct dataOrder={rowData.product} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default function DetailListBoxTable({ dataOrder }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID Carton</TableCell>
            <TableCell align="center">ID Order</TableCell>
            <TableCell align="center">Volume</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder.map((rowData, id) => (
            <Row rowData={rowData} key={id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
