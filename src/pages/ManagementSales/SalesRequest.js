import Layout from 'components/Layout';
import InitRequest from 'components/ManagementSales/SalesRequest/InitRequest';
import { useState, useEffect } from 'react';
import { getSalesRequestData } from 'service/api';
import { Tooltip } from '@mui/material';
import SalesRequestTable from 'components/ManagementSales/SalesRequest/SalesRequestTable';
import { getUser } from 'helpers/parseJWT';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { SubRoutesManagementSales as SUBROUTES } from 'components/ManagementSales/SubRoutesManagementSales';

const SalesRequest = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState('');
  const [page, setPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const { obe: userOBE } = useSelector(selectAddData);

  // const SUBROUTES = [
  //   {
  //     name: `${
  //       userOBE?.includes(getUser().user) && getUser().role === 'sales'
  //         ? ''
  //         : 'Customer Management'
  //     }`,
  //     pathname: '/management-sales/customer-management',
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Sales Target' : ''}`,
  //     pathname: '/management-sales/sales-target',
  //   },
  //   {
  //     name: `${userOBE?.includes(getUser().user) ? 'New Customer' : ''}`,
  //     pathname: '/management-sales/New-customer',
  //   },
  //   {
  //     name: `${
  //       userOBE?.includes(getUser().user) ? 'Customer Management OBE' : ''
  //     }`,
  //     pathname: '/management-sales/obe',
  //   },

  //   // New From Presales
  //   {
  //     name: `${
  //       userOBE?.includes(getUser().user) && getUser().role === 'sales'
  //         ? ''
  //         : 'All Customer Request'
  //     }`,
  //     pathname: '/management-sales/all-customer-request',
  //   },
  //   {
  //     name: `${getUser().role === 'admin' ? 'Voucher Generator' : ''}`,
  //     pathname: '/management-sales/voucher-generator',
  //   },
  //   { name: 'Sales Request', pathname: '/management-sales/sales-request' },
  //   {
  //     name: 'All Orders',
  //     pathname: '/management-sales/all-orders',
  //   },
  // ];

  const fetchData = async (limit, page) => {
    const params = new URLSearchParams({ page, limit }).toString();
    setIsLoading(true);
    const data = await getSalesRequestData(params);
    if (data?.status === 200) {
      setData(data.data.data);
      setPageInfo({
        totalPage: data.data.totalPage,
        totalData: data.data.totalData,
        dataInPage: data.data.dataInPage,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(limit, page);
  }, [update, limit, page]);

  return (
    <Layout routes={SUBROUTES(userOBE)} title="CRM">
      <Tooltip title="Refresh table" placement="right">
        <p
          className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center"
          onClick={fetchData}>
          Seles Request
        </p>
      </Tooltip>
      <div className="flex justify-between items-center mb-2 bg-white p-2 rounded-md">
        <div className="flex items-center space-x-3">
          <InitRequest setUpdate={setUpdate} />
          {data.length !== 0 && (
            <p className="font-semibold px-2">
              Showing {pageInfo.dataInPage} of {pageInfo.totalData} data.
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3 ">
            <label>Limit:</label>
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="p-1 rounded-md focus:outline-blue border border-gray-300">
              <option value="" disabled>
                Select Limit
              </option>
              <option value="200">200</option>
              <option value="300">300</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <label>Page :{page}</label>
            <button
              disabled={page === 1}
              className={`flex text-sm p-2  text-white rounded-md cursor-pointer ${
                page === 1 ? ' bg-gray-200' : 'bg-blue-300'
              } `}
              onClick={() => {
                if (page > 1) {
                  setPage((prev) => prev - 1);
                }
              }}>
              <div>
                <ArrowBackIosIcon style={{ fontSize: '12px' }} />
              </div>
              <p>Prev</p>
            </button>
            <button
              disabled={page === pageInfo.totalPage}
              className={`flex text-sm p-2  text-white rounded-md cursor-pointer ${
                page === pageInfo.totalPage ? ' bg-gray-200' : 'bg-blue-300'
              } `}
              onClick={() => {
                setPage((prev) => prev + 1);
              }}>
              <p>Next</p>
              <div>
                <ArrowForwardIosIcon
                  style={{
                    fontSize: '12px',
                    marginLeft: '3px',
                    marginRight: '-3px',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      <SalesRequestTable
        dataTable={data}
        isLoading={isLoading}
        setUpdate={setUpdate}
        setIsLoading={setIsLoading}
      />
    </Layout>
  );
};

export default SalesRequest;
