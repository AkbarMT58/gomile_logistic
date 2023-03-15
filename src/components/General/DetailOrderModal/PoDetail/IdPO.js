import React from 'react';
import { Tab } from '@headlessui/react';
import DataPo from './DataPo';
import DataPoTable from './DataPoTable';

const IdPO = ({ detailPo }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className='w-full py-2'>
      <Tab.Group>
        <Tab.List className='grid grid-cols-5 gap-2'>
          {detailPo?.map((po, id) => (
            <Tab
              key={id}
              className={({ selected }) =>
                classNames(
                  'text-xs  p-1 px-2 rounded-sm border border-gray-200 ',
                  selected ? 'bg-white' : 'bg-gray-200 '
                )
              }>
              {po.id_po}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {detailPo?.map((po, id) => (
            <Tab.Panel key={id}>
              <DataPo data={po} />
              <DataPoTable data={po} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default IdPO;
