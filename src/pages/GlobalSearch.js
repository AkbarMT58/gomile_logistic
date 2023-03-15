import { useState, useEffect } from 'react';
import GlobalSearchTable from 'components/GlobalSearch/GlobalSearchTable';
import HistoryOrder from 'components/GlobalSearch/HistoryOrder';
import Navbar from 'components/Layout/Navbar';
import SearchBar from 'components/Layout/SearchBar';
import { useLocation, useHistory } from 'react-router-dom';
import { searchGlobalData } from 'service/api';

const GlobalSearch = () => {
  const [detailHistory, setDetailHistory] = useState();
  const [dataSearch, setDataSearch] = useState({
    order: [],
    header: [],
  });
  const history = useHistory();
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const query = new URLSearchParams(search);

  const _getSearch = async () => {
    setLoading(true);
    if (
      query.get('type').trim().length === 0 ||
      query.get('value').trim().length === 0
    ) {
      history.push('/404');
    }

    const response = await searchGlobalData(
      query.get('type'),
      query.get('value')
    );

    if (response?.status === 200) {
      setDataSearch(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      _getSearch();
    } else {
      history.push('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="bg-gray-200 h-full">
      <Navbar />
      <div className="flex" style={{ minHeight: '100vh' }}>
        <HistoryOrder detailHistory={detailHistory} />
        <div className="flex-grow p-3 space-y-5">
          <SearchBar />
          {/* <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
            Global Search
          </p> */}
          <GlobalSearchTable
            dataTable={dataSearch?.order}
            header={dataSearch?.header}
            loading={loading}
            setDetailHistory={setDetailHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
