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
import { submitReceivedDataWhIndo } from 'service/api';
import swal from 'sweetalert';

const Row = ({ rowData, handleChecked, id, newDataOrder, setNewDataOrder }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        {/* <TableCell>
          <input
            type='checkbox'
            style={{ width: '20px', height: '20px' }}
            checked={rowData.isChecked}
            onChange={(e) => handleChecked(e, id)}
          />
        </TableCell> */}
        <TableCell align='center'>
          <div className='flex flex-col items-center'>
            <p className='font-semibold'>{rowData.id_carton}</p>
            {/* <div className='text-center'>
              <IconButton
                aria-label='expand row'
                size='small'
                onClick={() => {
                  setOpen(!open);
                }}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              <span className='text-xs'>Details</span>
            </div> */}
          </div>
        </TableCell>
        <TableCell align='center'>{rowData.id_so}</TableCell>
        <TableCell align='center'>{rowData.volume} CM3</TableCell>
        <TableCell align='center'>{rowData.qty}</TableCell>
        <TableCell align='center'>{rowData.user}</TableCell>
        <TableCell align='center'>{rowData.updatedDate}</TableCell>
        <TableCell align='center'>
          <div className='flex justify-center'>
            <img
              src={`https://ocistok.co.id/control-panel/foto/${rowData.image[0]}`}
              alt=''
              className='w-14 object-cover'
            />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <SubDetailProduct
                dataOrder={rowData.product}
                index={id}
                newDataOrder={newDataOrder}
                setNewDataOrder={setNewDataOrder}
              />
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
      return {
        ...data,
        isChecked: false,
        image: [],
        product: data.product.map((product) => {
          return {
            ...product,
            id_product: product.id_product,
            received: product.qty,
            rejected: '',
            unsuitable: '',
            note: '',
          };
        }),
      };
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

  const submitReceivedData = async () => {
    const submitData = newDataOrder
      .filter((filtered) => filtered.isChecked)
      .map((data) => {
        return {
          box_id: data.id_carton,
          image: data.image,
          id_product: data.product.map((data) => data.id_product),
          received: data.product.map((data) => Number(data.received)),
          defect: data.product.map((data) => Number(data.rejected)),
          unsuitable: data.product.map((data) => Number(data.unsuitable)),
          note: data.product.map((data) => data.note),
        };
      });

    let validateImageCount = [];
    for (let i = 0; i < submitData.length; i++) {
      if (submitData[i].image.length === 0) {
        validateImageCount.push(submitData[i]);
      }
    }

    const body = JSON.stringify({ id_so, box: submitData });

    if (submitData.length === 0) {
      swal('Oops', 'Please select at least 1 carton !', 'error');
      return;
    }

    // if (validateImageCount.length === 0) {
    //   swal('Oops', 'Please upload all image required !', 'error');
    //   return;
    // }

    const data = await submitReceivedDataWhIndo(body);
    if (data?.status === 200) {
      swal('Success', 'Received data saved succesfully !', 'success');
      setUpdate((prev) => !prev);
    }
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className='variant-scroll'>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {/* <TableCell>
              <input
                type='checkbox'
                style={{ width: '20px', height: '20px' }}
                checked={checkedAll}
                onChange={handleChecked}
              />
            </TableCell> */}
            <TableCell align='center'>ID Carton</TableCell>
            <TableCell align='center'>ID Order</TableCell>
            <TableCell align='center'>Volume</TableCell>
            <TableCell align='center'>Quantity</TableCell>
            <TableCell align='center'>User</TableCell>
            <TableCell align='center'>Date</TableCell>
            <TableCell align='center'>Pic</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newDataOrder.map((rowData, id) => (
            <Row
              rowData={rowData}
              newDataOrder={newDataOrder}
              setNewDataOrder={setNewDataOrder}
              handleChecked={handleChecked}
              id={id}
              key={id}
            />
          ))}
          {/* <TableRow>
            <TableCell colSpan={8}>
              <div className='flex justify-end '>
                <button
                  className='text-white p-2 px-5 bg-blue-500 rounded-md'
                  onClick={submitReceivedData}>
                  Save
                </button>
              </div>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
