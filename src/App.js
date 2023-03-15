import { useEffect } from "react";
import Routes from "components/Routes";
import { getUserObe } from "service/api";
import { setAdditonalData } from "redux/addDataSlice";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getDataObe = async () => {
      const response = await getUserObe();
      if (response?.status === 200) {
        dispatch(
          setAdditonalData({ category: response.category, obe: response.data })
        );
      }
    };

    getDataObe();
  }, [dispatch]);

  return <Routes />;
}

export default App;
