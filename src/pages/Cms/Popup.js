import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { getUser } from 'helpers/parseJWT';
import { getPopUps } from 'service/api';
import PopupForm from 'components/Cms/PopupForm';
import { SubRoutesCms as SUBROUTES } from 'components/Cms/SubRoutesCms';

const Popup = () => {
  const [popup, setPopup] = useState(null);
  const [loading, setIsloading] = useState(false);
  // const { obe: userOBE } = useSelector(selectAddData);

  useEffect(() => {
    if (!loading) {
      _getPopUps();
    }
  }, [loading]);

  const _getPopUps = async () => {
    const response = await getPopUps();
    if (response?.status === 200) {
      setPopup(response?.data);
    }
  };

  return (
    <Layout routes={SUBROUTES()} title="CMS">
      {popup && <PopupForm popup={popup} />}
    </Layout>
  );
};

export default Popup;
