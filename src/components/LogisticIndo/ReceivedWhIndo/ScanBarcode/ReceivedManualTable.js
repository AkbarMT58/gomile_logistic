import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';

export default function ReceivedManualTable({
  dataKartonProcess,
  setdataKartonProcess,
}) {
  const [massUpdate, setMassUpdate] = useState({
    received: '',
    rejected: '',
    unsuitable: '',
    lost: '',
    isChecked: false,
  });

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const values = [...dataKartonProcess];
    if (id !== undefined) {
      values[id][name] = value;
      setdataKartonProcess(values);
    } else {
      setMassUpdate((prev) => {
        return { ...prev, [name]: value };
      });
      setdataKartonProcess(
        dataKartonProcess.map((prev) => {
          return { ...prev, [name]: value };
        })
      );
    }
  };

  return (
    <TableContainer component={Paper} className='variant-scroll table-scroll'>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Gambar</TableCell>
            <TableCell align='center'>Produk</TableCell>
            <TableCell align='center'>ID Karton</TableCell>
            <TableCell align='center'>Varian</TableCell>
            <TableCell align='center'>Jumlah</TableCell>
            <TableCell align='center'>
              <div>
                <p>Diterima</p>
                <input
                  type='text'
                  name='received'
                  onChange={handleChange}
                  value={massUpdate.received}
                  className='w-14 border border-blue-400 rounded-md'
                />
              </div>
            </TableCell>
            <TableCell align='center'>
              <div>
                <p>Rusak</p>
                <input
                  type='text'
                  name='rejected'
                  onChange={handleChange}
                  value={massUpdate.rejected}
                  className='w-14 border border-blue-400 rounded-md'
                />
              </div>
            </TableCell>
            <TableCell align='center'>
              <div>
                <Tooltip title={'Tidak Sesuai'}>
                  <p className='line-clamp-1'>Tidak Sesuai</p>
                </Tooltip>
                <input
                  type='text'
                  name='unsuitable'
                  onChange={handleChange}
                  value={massUpdate.unsuitable}
                  className='w-14 border border-blue-400 rounded-md'
                />
              </div>
            </TableCell>
            <TableCell align='center'>
              <div>
                <p>Hilang</p>
                <input
                  type='text'
                  name='lost'
                  onChange={handleChange}
                  value={massUpdate.lost}
                  className='w-14 border border-blue-400 rounded-md'
                />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {dataKartonProcess?.map((row, id) => (
            <TableRow
              key={id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                position: 'relative',
              }}>
              <TableCell align='center'>
                {row?.image && <img src={row.image} alt='' className='w-36' />}
              </TableCell>
              <TableCell align='center'>
                <Tooltip title={row.produk}>
                  <p className='line-clamp-1'>{row.produk}</p>
                </Tooltip>
              </TableCell>
              <TableCell align='center'>
                <Tooltip title={row.id_karton}>
                  <p className='line-clamp-1'>{row.id_karton}</p>
                </Tooltip>
              </TableCell>
              <TableCell align='center'>
                <Tooltip title={row.variant}>
                  <p className='line-clamp-1'>{row.variant}</p>
                </Tooltip>
              </TableCell>
              <TableCell align='center'>
                <Tooltip title={row.qty}>
                  <p className='line-clamp-1'>{row.qty}</p>
                </Tooltip>
              </TableCell>
              <TableCell align='center' style={{ width: '12%' }}>
                <input
                  type='text'
                  name='received'
                  value={dataKartonProcess[id]?.received}
                  onChange={(e) => handleChange(e, id)}
                  className='w-12 p-1 border border-gray-300 rounded-md focus:outline-blue '
                />
                <div className='absolute text-xs text-red-500'>
                  {Number(dataKartonProcess[id]?.received) +
                    Number(dataKartonProcess[id]?.rejected) +
                    Number(dataKartonProcess[id]?.unsuitable) +
                    Number(dataKartonProcess[id]?.lost) ===
                  0
                    ? 'Data Kosong'
                    : Number(dataKartonProcess[id]?.received) +
                        Number(dataKartonProcess[id]?.rejected) +
                        Number(dataKartonProcess[id]?.unsuitable) +
                        Number(dataKartonProcess[id]?.lost) <
                      row.qty
                    ? 'Kurang Dari Jumlah Diterima'
                    : Number(dataKartonProcess[id]?.received) +
                        Number(dataKartonProcess[id]?.rejected) +
                        Number(dataKartonProcess[id]?.unsuitable) +
                        Number(dataKartonProcess[id]?.lost) >
                        row.qty && 'Melebihin Jumlah Diterima'}
                </div>
              </TableCell>
              <TableCell align='center' style={{ width: '12%' }}>
                <input
                  type='text'
                  name='rejected'
                  value={dataKartonProcess[id]?.rejected}
                  onChange={(e) => handleChange(e, id)}
                  className='w-12 p-1 border border-gray-300 rounded-md focus:outline-blue'
                />
              </TableCell>
              <TableCell align='center' style={{ width: '12%' }}>
                <input
                  type='text'
                  name='unsuitable'
                  value={dataKartonProcess[id]?.unsuitable}
                  onChange={(e) => handleChange(e, id)}
                  className='w-12 p-1 border border-gray-300 rounded-md focus:outline-blue'
                />
              </TableCell>
              <TableCell align='center' style={{ width: '12%' }}>
                <input
                  type='text'
                  name='lost'
                  value={dataKartonProcess[id]?.lost}
                  onChange={(e) => handleChange(e, id)}
                  className='w-12 p-1 border border-gray-300 rounded-md focus:outline-blue'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
