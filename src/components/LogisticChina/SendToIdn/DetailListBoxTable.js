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
} from '@mui/material';
import { useState } from 'react';
import React from 'react';
import { Box } from '@mui/system';
import SubDetailProduct from './SubDetailProduct';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InputContainerNumber from './InputContainerNumber';

const Row = ({ rowData, handleChecked, id }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell>
          <input
            type="checkbox"
            style={{ width: '20px', height: '20px' }}
            checked={rowData.isChecked}
            onChange={(e) => handleChecked(e, id)}
          />
        </TableCell>
        <TableCell align="center">
          <div className="flex flex-col items-center">
            <p className="font-semibold">
              {rowData.id_carton}/{rowData.total_carton}
            </p>
            <div className="text-center">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setOpen(!open);
                }}>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
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

export default function DetailListBoxTable({ dataOrder, setUpdate, id_so }) {
  const [newDataOrder, setNewDataOrder] = useState(
    dataOrder.map((data) => {
      return { ...data, isChecked: false };
    })
  );
  const [checkedAll, setCheckedAll] = useState(false);
  const handleChecked = (e, id) => {
    const { checked } = e.target;
    const values = [...newDataOrder];
    if (id !== undefined) {
      values[id].isChecked = checked;
      setNewDataOrder(values);
      const isCheckAll = newDataOrder.filter(
        (data) => data.isChecked === false
      );
      if (isCheckAll.length === 0) {
        setCheckedAll(true);
      } else {
        setCheckedAll(false);
      }
    } else {
      setCheckedAll(checked);
      setNewDataOrder(
        newDataOrder.map((data) => {
          return { ...data, isChecked: checked };
        })
      );
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <input
                type="checkbox"
                style={{ width: '20px', height: '20px' }}
                checked={checkedAll}
                onChange={handleChecked}
              />
            </TableCell>
            <TableCell align="center">ID Carton</TableCell>
            <TableCell align="center">ID Order</TableCell>
            <TableCell align="center">Volume</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">User</TableCell>
            <TableCell align="center">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newDataOrder.map((rowData, id) => (
            <Row
              rowData={rowData}
              handleChecked={handleChecked}
              id={id}
              key={id}
            />
          ))}
          <TableRow>
            <TableCell colSpan={7}>
              <div className="flex justify-end text-blue-500">
                <InputContainerNumber
                  carton={newDataOrder
                    .filter((data) => data.isChecked === true)
                    .map((data) => data.id_carton)}
                  setUpdate={setUpdate}
                  id_so={id_so}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
