import React, { useEffect, useState } from 'react';
import Layout from 'components/Layout';
import { getUser } from 'helpers/parseJWT';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import PerformanceTable from 'components/Quotation/Performance/PerformanceTable';
import { getPerformanceData } from 'service/api';
import CustomFilter from 'components/Quotation/Performance/CustomFilter';
import { SubRoutesQuotation as SUBROUTES } from 'components/Quotation/SubRoutesQuotation';

const Performance = () => {
  const { obe: userOBE } = useSelector(selectAddData);
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({});

  const fetchPerformanceData = async (filter) => {
    setIsLoading(true);

    const params = new URLSearchParams({
      ...filter,
    }).toString();

    const data = await getPerformanceData(params);
    if (data?.status === 200) {
      setPerformanceData(data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPerformanceData(filter);
  }, [filter]);

  return (
    <Layout routes={SUBROUTES(userOBE)} title="Quotation">
      <p className="my-4 bg-white w-28 p-2 rounded-md cursor-pointer text-center">
        Performance
      </p>
      <CustomFilter setFilter={setFilter} />
      <PerformanceTable
        performanceData={performanceData}
        isLoading={isLoading}
      />
    </Layout>
  );
};

export default Performance;
