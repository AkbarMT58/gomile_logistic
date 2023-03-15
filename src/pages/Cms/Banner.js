import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { getAllBanners } from 'service/api';
import BannersForm from 'components/Cms/BannersForm';
import { SubRoutesCms as SUBROUTES } from 'components/Cms/SubRoutesCms';

const Categories = () => {
  const [banners, setBanners] = useState(null);
  const [loading, setIsloading] = useState(false);
  // const { obe: userOBE } = useSelector(selectAddData);

  useEffect(() => {
    if (!loading) {
      _getAllBanners();
    }
  }, [loading]);

  const _getAllBanners = async () => {
    const response = await getAllBanners();
    if (response?.status === 200) {
      setBanners(response?.data);
    }
  };

  return (
    <Layout routes={SUBROUTES()} title="CMS">
      {banners && <BannersForm banners={banners} getAllBanners={_getAllBanners} />}
    </Layout>
  );
};

export default Categories;
