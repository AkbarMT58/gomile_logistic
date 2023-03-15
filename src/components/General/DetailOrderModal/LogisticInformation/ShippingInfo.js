import React from "react";
import { Tab } from "@headlessui/react";
import DetailShippingIndo from "./DetailShippingIndo";
import ContainerTable from "./Container/ContainerTable";
const ShippingInfo = ({ shippingData }) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const { chIdn, idn, box } = shippingData;

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 mt-2">
        <div className="border border-gray-200 p-1 text-center text-xs">
          LOGISTIC CH-IDN
        </div>
        <div className="border border-gray-200 p-1 text-center text-xs">
          LOGISTIC IDN
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="border border-gray-200 p-1 text-xs space-y-3">
          <div className="grid grid-cols-2">
            <p>LOGITSTIC CHANNEL</p>
            <p>: {chIdn.logisticChannel}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>EXPEDITION</p>
            <p>: {chIdn.expedition}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>VOLUME (M<sup>3</sup>)</p>
            <p>: {chIdn.volume}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>NUMBER OF CARTONS</p>
            <p>: {chIdn.totalBox}</p>
          </div>
          <div className="grid grid-cols-2">
            <p>COST (IDR)</p>
            <p>: {chIdn.cost.toLocaleString("id-ID")}</p>
          </div>
        </div>

        <div className="w-full py-2 border border-gray-200">
          <Tab.Group>
            <Tab.List className="grid grid-cols-3 gap-2">
              {idn.map((po, id) => (
                <Tab
                  key={id}
                  className={({ selected }) =>
                    classNames(
                      "text-xs  p-1 px-2 rounded-sm border border-gray-200 ",
                      selected ? "bg-white" : "bg-gray-200 "
                    )
                  }
                >
                  {po.id_sj}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {idn.map((data, id) => (
                <Tab.Panel key={id}>
                  <DetailShippingIndo data={data} />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <div className="mt-2">
        <ContainerTable box={box} />
      </div>
    </div>
  );
};

export default ShippingInfo;
