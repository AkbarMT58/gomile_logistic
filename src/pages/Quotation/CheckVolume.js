import { useState, useEffect } from 'react';
import { getVolumeData, getVolumeDataAssign, getCategoryData,getMaterialsData } from 'service/api';
import { Tooltip } from '@mui/material';
import CheckVolumeTable from 'components/Quotation/CheckVolume/CheckVolumeTable';
import Layout from 'components/Layout';
import { getUser } from 'helpers/parseJWT';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { handleBigIntResponse } from 'helpers/handleBigInt';
import { SubRoutesQuotation as SUBROUTES } from 'components/Quotation/SubRoutesQuotation';

const CheckVolume = () => {
  const { obe: userOBE } = useSelector(selectAddData);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [productCategoryData, setProductCategoryData] = useState([]);
  const [materialData, setMaterialData] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await getVolumeData();
    if (response?.status === 200) {
      setData(response.data);
    } else if (response?.status === 403) {
      swal('Oops', `${response?.message}`, 'error');
    }
    setIsLoading(false);
  };

  const fetchProductCategoryData = async () => {
    setIsLoading(true);
    const response = await getCategoryData();
    if (response?.status === 200) {
      const resultText = await response.text();
      const resultResponse = handleBigIntResponse(resultText);
      setProductCategoryData(resultResponse.data);
    } else if (response?.status === 403) {
      swal('Oops', `${response?.message}`, 'error');
    }
    setIsLoading(false);
  };
  const fetchMaterialData = async () => {
    setIsLoading(true);
    const response = await getMaterialsData();
    if (response?.status === 200) {
      setMaterialData(response.data);
    } else if (response?.status === 403) {
      swal('Oops', `${response?.message}`, 'error');
    }
    setIsLoading(false);
  };
  
  const fetchDataAssign = async () => {
    if (data.canAssign) {
      setIsLoading(true);
      const response = await getVolumeDataAssign();
      if (response?.status === 200) {
        fetchData();
      } else if (response?.status === 403) {
        swal('Oops', `${response?.message}`, 'error');
      }
      setIsLoading(false);
    } else {
      swal(
        'Oops',
        `You Have Over ${data.limit} Pending Request, Finish The Request First!`,
        'error'
      );
    }
  };

  useEffect(() => {
    fetchData();
    fetchProductCategoryData();
    fetchMaterialData()
  }, [update]);

  return (
    <Layout routes={SUBROUTES(userOBE)} title="Quotation">
      <Tooltip title="Refresh table" placement="right">
        <p
          className="my-4 bg-white w-32 p-2  rounded-md cursor-pointer text-center"
          onClick={fetchData}>
          Check Details
        </p>
      </Tooltip>
      <div className="flex bg-white p-2 items-center rounded-md my-2 space-x-2">
        <button
          onClick={fetchDataAssign}
          className={`${
            data.remaining === 0 ? 'bg-gray-200' : 'bg-blue-500'
          } p-2 px-3 text-white rounded-md cursor-pointer`}
          disabled={data.remaining === 0}>
          Assign
        </button>
        <p className="text-sm">
          Not assigned request:{' '}
          <span className="font-bold">{data.remaining ?? 0} </span>
          data.
        </p>
      </div>
      <CheckVolumeTable
        dataTable={data.data}
        setUpdate={setUpdate}
        isLoading={isLoading}
        productCategoryData={productCategoryData}
        materialData={materialData}
      />
    </Layout>
  );
};

export default CheckVolume;
