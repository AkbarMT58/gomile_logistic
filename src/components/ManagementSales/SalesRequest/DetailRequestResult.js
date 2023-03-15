import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { getUser } from 'helpers/parseJWT';
import { useEffect, useState } from 'react';
import {
  cancelVolumeData,
  cancelVolumeDataAll,
  inputsalesVolumePIC,
} from 'service/api';
import swal from 'sweetalert';
import RestoreIcon from '@mui/icons-material/Restore';
import NumberFormat from 'react-number-format';
import pic from 'helpers/pic'

const DetailRequestResult = ({
  link,
  loading,
  setLoading,
  detailData,
  setUpdate,
  id_request,
  checkRequestLink,
}) => {
  const [simulationInput, setSimulationIput] = useState([]);
  const [selectedPic, setSelectedPic] = useState('');

  const rollBack = (id_request, id_product, link) => {
    swal({
      title: 'Are you sure?',
      text: 'You will rollback the data !',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willRollback) => {
      if (willRollback) {
        handleCancelVolume(id_request, id_product, link);
      } else {
        swal('You revert this change!');
      }
    });
  };

  const handleCancelVolume = async (id_request, id_product, link) => {
    setLoading(true);
    const body = JSON.stringify({ id_request, id_product });
    const data = await cancelVolumeData(body);
    if (data?.status === 200) {
      swal('Success', 'Rollback data success', 'success');
      setUpdate((prev) => !prev);
      checkRequestLink(link);
    }
    if (data?.status === 403) {
      swal('Oops', data?.message, 'error');
    }
    setLoading(false);
  };

  const handleInput = (e, id) => {
    const { value } = e.target;
    const values = [...simulationInput];
    values[id].value = value;
    setSimulationIput(values);
  };

  const handleSubmitPic = async () => {
    const body = JSON.stringify({ pic: selectedPic, link: link });

    if (selectedPic === '') {
      swal('warning', 'Selected Volume PIC Cannot be empty', 'warning');
      return;
    }

    const response = await inputsalesVolumePIC(body);
    if (response?.status === 201) {
      swal('Success', 'Submit PIC successfully', 'success');
      setUpdate((prev) => !prev);
    } else {
      swal(
        'Error',
        `Submit PIC failed, Error : ${response?.message}`,
        'error'
      );
    }
  };

  const handleRollbackAll = () => {
    const body = { id_request: id_request };

    swal({
      title: 'Are you sure?',
      text: 'You will rollback the All data !',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willRollback) => {
      if (willRollback) {
        const response = await cancelVolumeDataAll(JSON.stringify(body));
        if (response?.status === 201) {
          swal('Success', 'Rollback All Data Success', 'success');
          setUpdate((prev) => !prev);
          checkRequestLink(link);
        } else {
          swal('Oops', response?.message, 'error');
        }
      } else {
        swal('You revert this change!');
      }
    });
  };

  useEffect(() => {
    setSimulationIput(
      detailData.map((data) => {
        return { value: data.price };
      })
    );
  }, [detailData]);

  return (
    <div>
      <div className='flex items-center space-x-3'>
        <p>Check Details PIC : </p>
        <select
          name='select'
          value={selectedPic}
          onChange={(e) => setSelectedPic(e.target.value)}
          className='border border-gray-300 p-1 rounded-md focus-within:outline-blue capitalize'>
          <option value='' disabled>
            Select Volume PIC
          </option>
          {pic?.map((p) => (
            <option key={p.id} value={p.value}>{p.name}</option>
          ))}
        </select>
        <button
          onClick={handleSubmitPic}
          className='px-3 py-2 border-2 border-blue-500 hover:bg-blue-500 hover:text-white text-gray-700 rounded-md'>
          Submit PIC
        </button>
      </div>
      <TableContainer
        component={Paper}
        className='table-scroll variant-scroll'
        sx={{ maxHeight: 450 }}>
        {loading && <div>Test</div>}
        <Table
          stickyHeader
          sx={{ minWidth: 500 }}
          aria-label='custom pagination table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Variant</TableCell>
              <TableCell align='center'>Qty/Box</TableCell>
              <TableCell align='center'>Weight(Gram)</TableCell>
              <TableCell align='center'>Volume(CM/CM3)</TableCell>
              <TableCell align='center'>Length(CM)</TableCell>
              <TableCell align='center'>Width(CM)</TableCell>
              <TableCell align='center'>Height(CM)</TableCell>
              <TableCell align='center'>
                <div className='space-y-px'>
                  <p>status</p>
                  <div
                    className='p-1 space-x-1 bg-blue-300 w-24 text-white flex items-center rounded-md text-xs justify-center font-semibold cursor-pointer mt-1'
                    onClick={handleRollbackAll}>
                    <RestoreIcon style={{ fontSize: 20 }} />
                    <p className='text-center'>Rollback</p>
                  </div>
                </div>
              </TableCell>
              <TableCell align='center'>Category</TableCell>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Price/box</TableCell>
              <TableCell align='center'>Price/pcs</TableCell>
              <TableCell align='center'>Silver</TableCell>
              <TableCell align='center'>Gold</TableCell>
              <TableCell align='center'>Diamond</TableCell>
              <TableCell align='center'>Simulation(RMB)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detailData?.map((row, id) => (
              <TableRow key={id}>
                <TableCell align='center'>
                  {row.variant !== null ? (
                    <Tooltip title={row.variant}>
                      <p className='text-xs line-clamp-2 cursor-pointer'>
                        {row.variant}
                      </p>
                    </Tooltip>
                  ) : (
                    <p>-</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  {row.qty === 0 ? (
                    <p>-</p>
                  ) : (
                    <p className='text-xs'>{row.qty}</p>
                  )}
                </TableCell>
                <TableCell align='center'>
                  <p className='text-xs'>
                    {row?.weight !== 0 ? row.weight : '-'}
                  </p>
                </TableCell>
                <TableCell align='center'>
                  <p className='text-xs'>
                    {row?.volume !== 0 ? row.volume : '-'}
                  </p>
                </TableCell>
                <TableCell align='center'>
                  <p className='text-xs'>
                    {row?.length !== 0 ? row.length : '-'}
                  </p>
                </TableCell>
                <TableCell align='center'>
                  <p className='text-xs'>
                    {row?.width !== 0 ? row.width : '-'}
                  </p>
                </TableCell>
                <TableCell align='center'>
                  <p className='text-xs'>
                    {row?.height !== 0 ? row.height : '-'}
                  </p>
                </TableCell>
                <TableCell align='center'>
                  <div className='text-xs'>
                    <p
                      className={`
                          ${
                            row?.status === 'In Progress'
                              ? 'text-yellow-400'
                              : row.status === 'Completed'
                              ? 'text-green-600'
                              : 'text-red-500'
                          } rounded-md font-semibold `}>
                      {row?.status}
                    </p>
                    {row.reason && (
                      <p
                        className='text-xs text-black mt-2 line-clamp-1'
                        title={row.reason}>
                        Reason :
                        {row.reason === 'Not Response'
                          ? ' No Response'
                          : ' ' + row.reason}
                      </p>
                    )}
                    {row.status !== 'In Progress' && (
                      <div
                        className='p-1  space-x-1 bg-blue-300 w-24 text-white flex items-center rounded-md text-xs justify-center font-semibold cursor-pointer mt-1'
                        onClick={() => rollBack(id_request, row.id, link)}>
                        <RestoreIcon style={{ fontSize: 20 }} />
                        <p>Rollback</p>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell align='center'>
                  <NumberFormat
                    value={row?.category}
                    displayType={'text'}
                    className='text-xs'
                    thousandSeparator={true}
                    prefix={'IDR '}
                    decimalScale={2}
                  />
                </TableCell>
                <TableCell align='center'>
                  <div className='max-w-xl min-w-max'>
                    <p className='text-xs'>Ship</p>
                    <p className='text-xs'>Airplane</p>
                  </div>
                </TableCell>
                <TableCell align='center'>
                  <div className='max-w-xl min-w-max'>
                    <p className='text-xs'>
                      IDR{' '}
                      {row?.detailPrice?.sea?.pricePerBox !== 0
                        ? row?.detailPrice?.sea?.pricePerBox.toLocaleString(
                            'id-ID'
                          )
                        : '0'}
                    </p>
                    <p className='text-xs'>
                      IDR{' '}
                      {row?.detailPrice?.air?.pricePerBox !== 0
                        ? row?.detailPrice?.air?.pricePerBox.toLocaleString(
                            'id-ID'
                          )
                        : '0'}
                    </p>
                  </div>
                </TableCell>
                <TableCell align='center'>
                  <div className='max-w-xl min-w-max'>
                    <p className='text-xs'>
                      IDR{' '}
                      {row?.detailPrice?.sea?.pricePerPcs !== 0
                        ? row?.detailPrice?.sea?.pricePerPcs.toLocaleString(
                            'id-ID'
                          )
                        : '0'}
                    </p>
                    <p className='text-xs'>
                      IDR{' '}
                      {row?.detailPrice?.air?.pricePerPcs !== 0
                        ? row?.detailPrice?.air?.pricePerPcs.toLocaleString(
                            'id-ID'
                          )
                        : '0'}
                    </p>
                  </div>
                </TableCell>
                <TableCell align='center'>
                  <div className='max-w-xl min-w-max'>
                    <p className='text-xs'>
                      {`IDR ${(
                        row?.detailPrice?.sea?.simulation +
                        Number(
                          simulationInput[id]?.value *
                            1.15 *
                            getUser().tokenData.data.exchange
                        )
                      ).toLocaleString('id-ID')}`}
                    </p>
                    <p className='text-xs'>
                      {`IDR ${(
                        row?.detailPrice?.air?.simulation +
                        Number(
                          simulationInput[id]?.value *
                            1.15 *
                            getUser().tokenData.data.exchange
                        )
                      ).toLocaleString('id-ID')}`}
                    </p>
                  </div>
                </TableCell>
                <TableCell align='center'>
                  <div className='max-w-xl min-w-max'>
                    <p className='text-xs'>
                      {`IDR ${(
                        row?.detailPrice?.sea?.simulation +
                        Number(
                          simulationInput[id]?.value *
                            1.12 *
                            getUser().tokenData.data.exchange
                        )
                      ).toLocaleString('id-ID')}`}
                    </p>
                    <p className='text-xs'>
                      {`IDR ${(
                        row?.detailPrice?.air?.simulation +
                        Number(
                          simulationInput[id]?.value *
                            1.12 *
                            getUser().tokenData.data.exchange
                        )
                      ).toLocaleString('id-ID')}`}
                    </p>
                  </div>
                </TableCell>
                <TableCell align='center'>
                  <div className='max-w-xl min-w-max'>
                    <p className='text-xs'>
                      {`IDR ${(
                        row?.detailPrice?.sea?.simulation +
                        Number(
                          simulationInput[id]?.value *
                            1.07 *
                            getUser().tokenData.data.exchange
                        )
                      ).toLocaleString('id-ID')}`}
                    </p>
                    <p className='text-xs'>
                      {`IDR ${(
                        row?.detailPrice?.air?.simulation +
                        Number(
                          simulationInput[id]?.value *
                            1.07 *
                            getUser().tokenData.data.exchange
                        )
                      ).toLocaleString('id-ID')}`}
                    </p>
                  </div>
                </TableCell>
                <TableCell align='center'>
                  <input
                    type='number'
                    disabled={!row.beginPrice}
                    className='border text-xs border-gray-300 focus:outline-blue w-20 p-1 rounded-sm'
                    value={simulationInput[id]?.value}
                    onChange={(e) => handleInput(e, id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {detailData?.length === 0 && (
              <TableRow style={{ height: '30vh' }}>
                {loading ? (
                  <TableCell colSpan={13} align='center'>
                    <CircularProgress />
                  </TableCell>
                ) : (
                  <TableCell colSpan={13} align='center'>
                    No data available
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DetailRequestResult;
