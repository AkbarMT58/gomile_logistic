import React from 'react';
import StarsIcon from '@mui/icons-material/Stars';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import GenerateLabel from './GenerateLabel';

const CustomerDetail = ({
  id_group,
  customerData,
  statusHistory,
  orderData,
  shippingData,
}) => {
  const [isLoadingInvoices, setisLoadingInvoices] = useState(false);

  // const handleDownloadInvoices = (id) => {
  //   setisLoadingInvoices(true);
  //   const URL_DOWNLOAD = `https://gateway.ocistok.co.id/oci/download/invoices`;
  //   const tokenCookies = Cookies.get('oms_token');
  //   let formData = new FormData();
  //   formData.append('url', `https://ocistok.com/invoices/${id}`);

  //   fetch(URL_DOWNLOAD, {
  //     method: 'POST',
  //     responseType: 'blob',
  //     body: formData,
  //     headers: {
  //       Authorization: `Bearer ${tokenCookies}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         return response.blob();
  //       } else {
  //         console.log(`failed Download Invoices : ${response?.status}`);
  //       }
  //     })
  //     .then((data) => {
  //       var a = document.createElement('a');
  //       a.href = window.URL.createObjectURL(data);
  //       a.download = `INVOICES_${id}`;
  //       a.click();

  //       setisLoadingInvoices(false);
  //     });
  // };

  return (
    <div className='flex justify-between mt-2 text-sm'>
      <div className='w-8/12 space-y-2'>
        <div className='flex justify-between'>
          <p className='w-3/12'>Name</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.name}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>Telephone</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.phone}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>Email</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.email}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>Province</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.province}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>City</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.city}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>Subsdistrict</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.subdistrict}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>Address</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.address}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>Member</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.level}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>Sales</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.sales ?? '-'}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>Courier</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.courier ?? '-'}</p>
        </div>
        <div className='flex justify-between'>
          <p className='w-3/12'>Service</p>
          <p className='w-1/12'>:</p>
          <p className='w-8/12'>{customerData?.service ?? '-'}</p>
        </div>
        <div className='flex items-center'>
          <p className='w-3/12'>Invoices</p>
          <p className='w-1/12'>:</p>
          {statusHistory?.status === 'paid' ? (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={`https://ocistok.com/report/${statusHistory?.id_so}`}
              className=' text-white bg-blue-600 hover:bg-blue-900 px-3 py-2 rounded-md'
              // disabled={isLoadingInvoices ? true : false}
              // onClick={() => handleDownloadInvoices(statusHistory?.id_so)}
              >
              {!isLoadingInvoices ? (
                'Download invoices'
              ) : (
                <div className='flex items-center justify-center gap-x-2'>
                  <CircularProgress
                    color='warning'
                    thickness={8.0}
                    size={20}
                    className='text-xs'
                  />
                  Downloading Invoices
                </div>
              )}
            </a>
          ) : (
            <button
              disabled
              className=' text-white bg-gray-300 hover:bg-gray-500  px-3 py-2 rounded-md'>
              Invoices not yet available
            </button>
          )}
          {statusHistory?.status === 'paid' && (
            <a
              target='_blank'
              rel='noopener noreferrer'
              className='ml-2 border-2 border-blue-500 px-3 py-2 rounded-md font-medium text-gray-800'
              href={`https://ocistok.com/invoices/${statusHistory?.id_so}?from=oms`}>
              View Invoices
            </a>
          )}
        </div>
        <div className='flex items-center'>
          <p className='w-3/12'>Print Label</p>
          <p className='w-1/12'>:</p>
          <GenerateLabel
            customerData={customerData}
            id_group={id_group}
            id_so={statusHistory?.id_so}
            orderData={orderData}
            shippingData={shippingData}
          />
        </div>
      </div>

      <div className='flex flex-col  items-center w-2/12 font-semibold'>
        <StarsIcon
          style={{ fontSize: 100 }}
          className={`${
            customerData?.level === 'SILVER'
              ? 'text-gray-300'
              : customerData?.level === 'GOLD'
              ? 'text-yellow-500'
              : 'text-blue-300'
          }`}
        />
        <p>{customerData?.level}</p>
      </div>
    </div>
  );
};

export default CustomerDetail;
