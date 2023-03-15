import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { getUser } from 'helpers/parseJWT';
import CategoriesForm from 'components/Cms/CategoriesForm/index';
import { getCategoryDataIndo } from 'service/api';
import { handleBigIntResponse } from 'helpers/handleBigInt';
import { SubRoutesCms as SUBROUTES } from 'components/Cms/SubRoutesCms';

const Categories = () => {
  const [categories, setCategories] = useState();
  const [loading, setIsloading] = useState(false);
  // const { obe: userOBE } = useSelector(selectAddData);

  useEffect(() => {
    if (!loading) {
      _getCategoryData();
    }
  }, [loading]);

  const _getCategoryData = async () => {
    const response = await getCategoryDataIndo();
    if (response?.status === 200) {
      const resultText = await response.text();
      const resultResponse = handleBigIntResponse(resultText);
      setCategories(resultResponse.data);
      setIsloading(true);
    }
  };

  return (
    <Layout routes={SUBROUTES()} title="CMS">
      {categories && <CategoriesForm categories={categories} updateData={_getCategoryData}/>}
    </Layout>
  );
};

export default Categories;
