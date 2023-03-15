import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppDetail = ({ phoneNumber }) => {
  return (
    <>
      <div className='flex justify-center items-center'>
        {phoneNumber && (
          <a
            className='cursor-pointer'
            href={phoneNumber ? 'https://api.whatsapp.com/send?phone=62' + phoneNumber.slice(phoneNumber.indexOf('8')) : false}
            target='_blank'
            rel='noreferrer'
            >
              <WhatsAppIcon className={`${phoneNumber ? 'text-green-500' : 'text-gray-500'}`} />
          </a>
        )}
      </div>
    </>
  );
};

export default WhatsAppDetail;
