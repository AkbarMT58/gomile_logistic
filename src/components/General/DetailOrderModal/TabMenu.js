import { Tab } from '@headlessui/react';
import AdjustmentTable from './Adjustment/AdjustmentTable';
import CustomerDetail from './CustomerDetail/CustomerDetail';
import FinancialDetail from './FinancialDetail/FinancialDetail';
import ShippingInfo from './LogisticInformation/ShippingInfo';
import OrderDetail from './OrderDetail/OrderDetail';
import PoDetail from './PoDetail/PoDetail';
import StatusHistory from './StatusHistory/StatusHistory';

export default function TableMenu({
  idSo,
  detailOrder,
  id_group,
  closeOrderDetail,
}) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  return (
    <div className="w-full py-5">
      <Tab.Group>
        <Tab.List className="w-full flex  border border-gray-200">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-6/12 text-xs py-2',
                selected ? 'bg-blue-600 text-white' : 'bg-white '
              )
            }>
            Customer Detail
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-6/12 text-xs py-2',
                selected ? 'bg-blue-600 text-white' : 'bg-white '
              )
            }>
            Order Detail
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-6/12 text-xs py-2',
                selected ? 'bg-blue-600 text-white' : 'bg-white '
              )
            }>
            PO Detail
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-6/12 text-xs py-2',
                selected ? 'bg-blue-600 text-white' : 'bg-white '
              )
            }>
            Logistic Information
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-6/12 text-xs py-2',
                selected ? 'bg-blue-600 text-white' : 'bg-white '
              )
            }>
            Financial Information
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-6/12 text-xs py-2',
                selected ? 'bg-blue-600 text-white' : 'bg-white '
              )
            }>
            Status History
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-6/12 text-xs py-2',
                selected ? 'bg-blue-600 text-white' : 'bg-white '
              )
            }>
            Adjustment
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <CustomerDetail
              idSo={idSo}
              id_group={id_group}
              statusHistory={detailOrder?.statusHistory}
              customerData={detailOrder?.customerDetail}
            />
          </Tab.Panel>
          <Tab.Panel>
            <OrderDetail
              id_group={id_group}
              orderData={detailOrder?.orderDetail}
              closeOrderDetail={closeOrderDetail}
              financialData={detailOrder?.financialInformation}
            />
          </Tab.Panel>
          <Tab.Panel>
            <PoDetail detailPo={detailOrder?.poDetails} />
          </Tab.Panel>
          <Tab.Panel>
            <ShippingInfo shippingData={detailOrder?.logisticInformation} />
          </Tab.Panel>
          <Tab.Panel>
            <FinancialDetail
              financialData={detailOrder?.financialInformation}
            />
          </Tab.Panel>
          <Tab.Panel>
            <StatusHistory historyData={detailOrder?.statusHistory} />
          </Tab.Panel>
          <Tab.Panel>
            <AdjustmentTable history={detailOrder?.adjustment} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
