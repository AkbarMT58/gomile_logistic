import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import { getUser } from 'helpers/parseJWT';
import CategoryOciLogisticForm from 'components/Cms/CategoryOciLogisticForm/index';
import { getCategoryOciLogisticsData } from 'service/api';
import { SubRoutesCms as SUBROUTES } from 'components/Cms/SubRoutesCms';

const CategoryOciLogistic = () => {
    const [categoryOciLogistic, setCategoryOciLogistics] = useState();
    const [loading, setIsloading] = useState(false);
    // const { obe: userOBE } = useSelector(selectAddData);

    useEffect(() => {
        _getCategoryOciLogisticsData();

    }, []);

    const _getCategoryOciLogisticsData = async () => {
        const response = await getCategoryOciLogisticsData();
        if (response?.status === 200) {
            setCategoryOciLogistics(response.data);
            setIsloading(true);
        }
    };

    return (
        <Layout routes={SUBROUTES()} title="CMS">
            <CategoryOciLogisticForm categoryOciLogistic={categoryOciLogistic} _getCategoryOciLogisticsData={_getCategoryOciLogisticsData}/>
        </Layout>
    );
};

export default CategoryOciLogistic;
