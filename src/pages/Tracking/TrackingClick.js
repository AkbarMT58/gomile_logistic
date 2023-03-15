import { Tooltip } from "@mui/material";
import Layout from "components/Layout";
import FilterTracking from "components/Tracking/TrackingClick/FilterTracking";
import TrackingClickTable from "components/Tracking/TrackingClick/TrackingClickTable";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const TrackingClick = () => {
  const [clickData, setClickData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const SUBROUTES = [
    { name: "Tracking Click", pathname: "/tracking/tracking-click" },
  ];

  const getTrackingClickData = async (filterData) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams(filterData).toString();
      const res = await fetch(
        `${process.env.REACT_APP_URL_API_OMS_DEV}/tracking-analytics?${params}`,
        {
          headers: {
            key: "omsjaya",
            "x-role": "admin",
            "x-user": "randy",
          },
        }
      );
      if (res.status === 404) {
        setClickData([]);
        throw new Error("Data not found !");
      }
      const data = await res.json();
      if (data?.status === 200) {
        setClickData(data.data);
      }
    } catch (e) {
      swal("Oops", e.message, "error");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTrackingClickData(filterData);
  }, [filterData]);

  return (
    <Layout routes={SUBROUTES} title="Tracking">
      <Tooltip title="Refresh table" placement="right">
        <p
          onClick={() => getTrackingClickData()}
          className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center"
        >
          Tracking Click
        </p>
      </Tooltip>
      <FilterTracking setFilterData={setFilterData} />
      <TrackingClickTable clickData={clickData} isLoading={isLoading} />
    </Layout>
  );
};
export default TrackingClick;
