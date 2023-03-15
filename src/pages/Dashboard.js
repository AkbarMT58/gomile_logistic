import React, { useEffect, useState } from "react";
import FilterMonth from "components/Dashboard/FilterMonth";
import Search from "components/Dashboard/Search";
import SalesCard from "components/Dashboard/SalesCard";
import SalesOfTheMonth from "components/Dashboard/SalesOfTheMonth";
import ProfitlLoss from "components/Dashboard/ProfitlLoss";
import ProductSold from "components/Dashboard/ProductSold";
import SalesAchievement from "components/Dashboard/SalesAchievement";
import Layout from "components/Layout";
import LineChart from "components/Dashboard/LineChart";
import { CircularProgress, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { getAnalyticsData } from "service/api";
import { getUser } from "helpers/parseJWT";

const Dashboard = () => {
  const [salesData, setSalesData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchDasboardData = async (subscribed) => {
    setIsLoading(true);

    const data = await getAnalyticsData();
    if (data?.status === 200) {
      if (subscribed) setSalesData(data.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let subscribed = true;
    fetchDasboardData(subscribed);
    return () => (subscribed = false);
  }, []);

  const {
    avgOrderValue,
    avgPL,
    cogs,
    percentagePL,
    refund,
    totalPL,
    totalSale,
    totalTarget,
    salesAchievement,
    salesOfTheMonth,
    topProductSold,
    PLsales,
    chart,
  } = salesData;

  const screenWidth = window.innerWidth;

  return (
    <Layout searchBar={false}>
      <div className="bg-gray-100 min-h-screen">
        <div className="py-5 px-10">
          <div className="text-center mb-5 text-2xl">Dashboard</div>
          <div className="grid md:grid-cols-2 gap-5">
            <Search />
            <FilterMonth />
          </div>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 2,
                borderRadius: 2,
                padding: 2,
              }}
            >
              <div className="flex flex-col">
                <CircularProgress />
                <p className="text-gray-500 text-sm mt-2">Loading ...</p>
              </div>
              <div className="flex justify-between w-full space-x-3 mt-5">
                <Skeleton
                  variant="rectangular"
                  width={screenWidth / 3 - 80}
                  height={100}
                  className="rounded-md"
                />
                <Skeleton
                  variant="rectangular"
                  width={screenWidth / 3 - 80}
                  height={100}
                  className="rounded-md"
                />
                <Skeleton
                  variant="rectangular"
                  width={screenWidth / 3 - 80}
                  height={100}
                  className="rounded-md"
                />
              </div>
              <div className="flex justify-between w-full space-x-3 mt-10">
                <Skeleton
                  variant="rectangular"
                  width={screenWidth / 2 - 100}
                  height={500}
                  className="rounded-md"
                />
                <Skeleton
                  variant="rectangular"
                  width={screenWidth / 2 - 100}
                  height={500}
                  className="rounded-md"
                />
              </div>
            </Box>
          ) : (
            <>
              <div
                className={`${
                  getUser().role !== "admin"
                    ? "md:grid-cols-3"
                    : "md:grid-cols-4"
                } grid gap-5 mt-10`}
              >
                <SalesCard data={totalTarget} />
                <SalesCard data={totalSale} />
                {getUser().role === "sales" && (
                  <SalesCard data={salesData?.gapValue} />
                )}
                {getUser().role === "admin" && <SalesCard data={refund} />}
                {getUser().role === "admin" && <SalesCard data={avgPL} />}
                {getUser().role === "admin" && <SalesCard data={totalPL} />}
                {getUser().role === "admin" && (
                  <SalesCard data={percentagePL} />
                )}
                {getUser().role === "admin" && <SalesCard data={cogs} />}
                {getUser().role === "admin" && (
                  <SalesCard data={avgOrderValue} />
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-5 grid-cols-1">
                <SalesOfTheMonth data={salesOfTheMonth} />
                <SalesAchievement data={salesAchievement} />
                {getUser().role === "admin" && (
                  <ProductSold
                    data={topProductSold}
                    screenWidth={screenWidth}
                  />
                )}
                {getUser().role === "admin" && <ProfitlLoss data={PLsales} />}
              </div>
              {getUser().role === "admin" && <LineChart chart={chart} />}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
