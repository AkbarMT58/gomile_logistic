import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { getUser } from 'helpers/parseJWT';
import MaterialForm from 'components/Cms/MaterialForm/index';
import { getMaterialsData } from 'service/api';
import { SubRoutesCms as SUBROUTES } from 'components/Cms/SubRoutesCms';

const Material = () => {
    const [materials, setMaterials] = useState();
    const [loading, setIsloading] = useState(false);
    // const { obe: userOBE } = useSelector(selectAddData);

    useEffect(() => {
        _getMaterialsData();

    }, []);

    const _getMaterialsData = async () => {
        const response = await getMaterialsData();
        if (response?.status === 200) {
            setMaterials(response.data);
            setIsloading(true);
        }
    };

    return (
        <Layout routes={SUBROUTES()} title="CMS">
            {materials && <MaterialForm materials={materials} />}
        </Layout>
    );
};

export default Material;
