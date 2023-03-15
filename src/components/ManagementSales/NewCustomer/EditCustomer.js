import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip, Fade, Box, Backdrop, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getDetailsNewCustomerData } from 'service/api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CardAddNewSales from 'components/ManagementSales/NewCustomer/EditNewCustomer/CardAddNewSales';
import CardHistory from 'components/ManagementSales/NewCustomer/EditNewCustomer/CardHistory';
import ReleaseSales from 'components/ManagementSales/NewCustomer/EditNewCustomer/ReleaseSales';
import CardLastOrder from 'components/ManagementSales/NewCustomer/EditNewCustomer/CardLastOrder';
import CardCustomerDetails from 'components/ManagementSales/NewCustomer/EditNewCustomer/CardCustomerDetails';
import ButtonNewPassword from 'components/ManagementSales/NewCustomer/EditNewCustomer/ButtonNewPassword';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { getUser } from 'helpers/parseJWT';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  height: '95%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const EditCustomer = ({ email }) => {
  const [stateModal, setStateModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { obe: userOBE } = useSelector(selectAddData);
  const [dataEditNewCustomer, setDataEditNewCustomer] = useState({
    customer: {},
    history: {},
    last_order: [],
    obe: [],
    NewPassword: ``,
  });
  const handleCloseModal = () => setStateModal(false);
  const handleOpenModal = () => setStateModal(true);

  const getDataCustomer = React.useCallback(async () => {
    setIsLoading(true);
    const res = await getDetailsNewCustomerData(email);
    if (res?.status === 200) {
      setDataEditNewCustomer({
        ...dataEditNewCustomer,
        customer: res?.customer,
        history: res?.history,
        last_order: res?.last_order,
        obe: res?.obe,
        NewPassword: ``,
      });

      setIsLoading(false);
    }
    setIsLoading(false);
  }, [dataEditNewCustomer, email]);

  useEffect(() => {
      getDataCustomer();
  }, [dataUpdate]);

  return (
    <>
      <Tooltip title='Edit Customer'>
        <IconButton
          onClick={() => {
            handleOpenModal();
            getDataCustomer();
          }}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={stateModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={stateModal}>
          <Box sx={style}>
            <div style={{ fontFamily: 'Poppins' }}>
              <div className='flex justify-between items-center bg-white rounded-lg mb-5'>
                <IconButton
                  onClick={handleCloseModal}
                  className='flex items-center justify-center py-2 text-lg gap-2 font-bold my-2 px-0'>
                  <ArrowBackIcon
                    fontSize='large'
                    className='shadow-md text-black'
                  />
                  <div className='text-black'>Account Customers</div>
                </IconButton>
                {userOBE?.includes(getUser().user) && (
                  <ButtonNewPassword
                    dataEditNewCustomer={dataEditNewCustomer}
                    setDataEditNewCustomer={setDataEditNewCustomer}
                    email={email}
                  />
                )}
              </div>
              <CardHistory
                isLoading={isLoading}
                history={dataEditNewCustomer?.history}
              />
              <div className='flex mt-5 gap-2'>
                <CardCustomerDetails
                  loading={isLoading}
                  CustomerDetails={dataEditNewCustomer?.customer}
                  setDataUpdate={setDataUpdate}
                />
                <div className='w-96'>
                  <div className='flex flex-col gap-2 h-full'>
                    <CardAddNewSales
                      listSales={dataEditNewCustomer?.obe}
                      email={email}
                      initialSales={dataEditNewCustomer?.customer?.sales}
                      dataUpdate={dataUpdate}
                      setDataUpdate={setDataUpdate}
                    />
                    <ReleaseSales
                      id={dataEditNewCustomer?.customer?.id}
                      sales={dataEditNewCustomer?.customer?.sales}
                      setDataUpdate={setDataUpdate}
                    />
                  </div>
                </div>
              </div>
              <CardLastOrder lastOrder={dataEditNewCustomer?.last_order} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default EditCustomer;
