import { Tooltip } from "@mui/material";
import Layout from "components/Layout";

import UangMeTransactionTable from "components/UangMe/UangMeTransactionTable";
import { useEffect, useState } from "react";

const UangMeTransaction = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const SUBROUTES = [
    {
      name: "Tracking Payment",
      pathname: "/uangme-dashboard/tracking-payment",
    },
    {
      name: "UangMe Transaction",
      pathname: "/uangme-dashboard/uangme-transaction",
    },
  ];
  const fetchDataUangMe = () => {
    setIsLoading(true);
    fetch("https://mocki.io/v1/5a4113ff-ecac-4f07-a908-b8db758d1d18")
      .then((res) => res.json())
      .then((data) => setData(data.data.list));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDataUangMe();
  }, []);
  return (
    <Layout routes={SUBROUTES} title="Uang Me">
      <Tooltip title="Refresh table" placement="right">
        <p
          className="my-4 bg-white w-48 p-2 rounded-md cursor-pointer text-center "
          onClick={fetchDataUangMe}
        >
          Tracking Payment
        </p>
      </Tooltip>
      <UangMeTransactionTable data={data} isLoading={isLoading} />
    </Layout>
  );
};

export default UangMeTransaction;
