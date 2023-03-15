import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from '@mui/material';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import { useState } from 'react';
// import axios from 'axios';
import EditDetailModal from './EditDetailModal';
import { deleteContainerSingle } from 'service/api';

export default function DetailProductTable({
  dataContainer,
  totalVolume,
  containerNumber,
  setUpdate,
  containerList
}) {
  const [editModal, setEditModal] = useState(false);
  const openEditModal = (idCarton) => {
    setEditModal(idCarton);
  };
    
  const handleDelete = (idCarton) => {
    swal({
      title: "Are you sure?",
      text: `Id Carton Number ${idCarton} will be deleted.`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeCarton(idCarton);
      } else {
        swal("You revert this change!");
      }
    });
  };

  const removeCarton = async (idCarton) => {
    const data = await deleteContainerSingle(idCarton);
    if (data?.status === 200) {
      swal("Success", `Delete container successfully`, "success");
      setUpdate((prev) => !prev);
    }
  }

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 600 }}
        className='variant-scroll'>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Order Number</TableCell>
              <TableCell align='center'>Carton</TableCell>
              <TableCell align='center'>Volume</TableCell>
              <TableCell align='center'>Action</TableCell>
              <TableCell align='center'>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataContainer?.map((row, id) => (
              <>
                <TableRow key={id}>
                  <TableCell align='center'>{row.id_so}</TableCell>
                  <TableCell align='center'>{row.id_carton}</TableCell>
                  <TableCell align='center'>{(row.volume / 1000000).toFixed(4)} M<sup>3</sup></TableCell>
                  <TableCell align='center'>
                    <div className='flex justify-center items-center gap-3'>
                      <Button
                        variant='contained'
                        color='success'
                        onClick={() => openEditModal(row.id_carton)}>
                        Edit
                      </Button>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => handleDelete(row.id_carton)}>
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell align='center'>{row.status}</TableCell>
                </TableRow>
                <EditDetailModal
                  open={editModal === row.id_carton}
                  close={() => setEditModal(false)}
                  containerNumber={containerNumber}
                  idCarton={row.id_carton}
                  setUpdate={setUpdate}
                  containerList={containerList}
                />
              </>
            ))}
            <TableRow>
              <TableCell align='center'>Total Volume</TableCell>
              <TableCell align='center' />
              <TableCell align='center'>{totalVolume} M<sup>3</sup></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
