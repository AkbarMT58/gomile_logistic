import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NumberFormat from 'react-number-format';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const VariantProduct = ({ variant, setVariant, isAirPlane }) => {
  const [childVariant, setChildVariant] = useState([]);

  useEffect(() => {
    const filterChildVariant = variant.find((item) => item.is_selected);
    setChildVariant(filterChildVariant);
  }, [variant]);

  const changeVariant = (properties) => {
    const filterData = variant.map((item) => {
      if (item.properties === properties) {
        item.is_selected = true;
      } else {
        item.is_selected = false;
      }
      return item;
    });
    setVariant(filterData);
  };

  const checkVariant = (type, checked) => {
    let filterData;
    if (type === 'all') {
      filterData = variant.map((item) => {
        if (item.is_selected) {
          // eslint-disable-next-line
          item.children.map((child) => {
            if (child.stock === 1) {
              child.is_checked = checked;
            }
          });
          item.is_check_all = checked;
        }
        return item;
      });
    } else {
      filterData = variant.map((item) => {
        if (item.is_selected) {
          item.children[type].is_checked = checked;
        }
        return item;
      });
    }
    setVariant(filterData);
  };

  const updateQty = (index, qty) => {
    const filterData = variant.map((item) => {
      if (item.is_selected) {
        item.children[index].qty = qty;
      }
      return item;
    });

    setVariant(filterData);
  };

  return (
    <div className='w-full mt-5'>
      <div className='flex flex-wrap gap-3'>
        {variant.map((item) => {
          return (
            <button
              type='button'
              onClick={() => changeVariant(item.properties)}
              className={`border ${
                item.is_selected ? 'border-blue-500 text-blue-500' : ''
              } p-2`}>
              {item.url.trim().length === 0 ? (
                item.valueidn
              ) : (
                <div className='flex flex-col items-center'>
                  <img
                    src={item.url}
                    className='w-20 h-20 object-contain'
                    alt='variant'
                  />
                  <p className='text-sm'>{item.valueidn}</p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {childVariant?.children?.length > 0 && (
        <TableContainer component={Paper} className='mt-5'>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{ maxWidth: 10 }}>
                  <input
                    type='checkbox'
                    onChange={(e) => checkVariant('all', e.target.checked)}
                    checked={childVariant.is_check_all}
                  />
                </TableCell>
                <TableCell align='left'>Variant</TableCell>
                <TableCell align='left'>Laut</TableCell>
                <TableCell align='left'>Pesawat</TableCell>
                <TableCell align='left'>Total</TableCell>
                <TableCell align='left'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {childVariant?.children.map((item, index) => {
                return (
                  <TableRow
                    className={`${item.stock !== 1 && 'bg-gray-300'}`}
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align='left'>
                      <input
                        type='checkbox'
                        checked={item.is_checked}
                        onChange={(e) => checkVariant(index, e.target.checked)}
                        disabled={item.stock !== 1}
                      />
                    </TableCell>
                    <TableCell align='left'>{item.variantIdn}</TableCell>
                    <TableCell align='left'>
                      <NumberFormat
                        value={item?.harga_pesawat}
                        displayType={'text'}
                        className='text-md'
                        thousandSeparator={true}
                        prefix={'IDR '}
                        decimalScale={2}
                      />
                    </TableCell>
                    <TableCell align='left'>
                      <NumberFormat
                        value={item?.harga_laut}
                        displayType={'text'}
                        className='text-md'
                        thousandSeparator={true}
                        prefix={'IDR '}
                        decimalScale={2}
                      />
                    </TableCell>
                    <TableCell align='left'>
                      <NumberFormat
                        value={
                          isAirPlane
                            ? item.qty * item?.harga_pesawat
                            : item.qty * item?.harga_laut
                        }
                        displayType={'text'}
                        className='text-md'
                        thousandSeparator={true}
                        prefix={'IDR '}
                        decimalScale={2}
                      />
                    </TableCell>
                    <TableCell align='left'>
                      <div className='flex space-x-2 items-center'>
                        <button
                          type='button'
                          onClick={() => updateQty(index, item.qty - 1)}
                          disabled={item.qty === 0 || item.stock !== 1}
                          className={` ${
                            item.stock !== 1 || item.qty === 0
                              ? 'text-gray-500'
                              : 'text-blue-500'
                          }`}>
                          <RemoveCircleOutlineIcon />
                        </button>
                        <p>{item.qty}</p>
                        <button
                          type='button'
                          disabled={item.stock !== 1}
                          onClick={() => updateQty(index, item.qty + 1)}
                          className={` ${
                            item.stock !== 1 ? 'text-gray-500' : 'text-blue-500'
                          }`}>
                          <AddCircleOutlineIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default VariantProduct;
