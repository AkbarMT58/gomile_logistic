import React from 'react';
import RefundModal from '../RefundModal';
import OrderDetailHeader from './OrderDetailHeader';
import OrderDetailTable from './OrderDetailTable';
import { getUser } from 'helpers/parseJWT';

const OrderDetail = ({ orderData, id_group, closeOrderDetail, financialData }) => {
  return (
    <>
      <OrderDetailHeader id_group={id_group} orderData={orderData} financialData={financialData} />
      <OrderDetailTable orderData={orderData} />

      {orderData.status === 'paid' && orderData.refundStatus !== 'submitted' ? (
        getUser().user === 'saskia' || getUser().user === 'hendryaf' || getUser().user === 'wulandari' ? (
          <RefundModal
            orderData={orderData}
            id_group={id_group}
            closeOrderDetail={closeOrderDetail}
          />
        ) : null
      ) : null}
    </>
  );
};

export default OrderDetail;