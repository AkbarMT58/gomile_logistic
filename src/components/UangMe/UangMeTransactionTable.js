import MaterialTable from "material-table";
import { CircularProgress, Box } from "@mui/material";
import tableIcons from "helpers/materialTableIcons";

const UangMeTransactionTable = ({ isLoading, data }) => {
  const renderLoading = isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        padding: "10px",
        borderRadius: 2,
        backgroundColor: "white",
        marginBottom: 2,
      }}
    >
      <div className="flex space-x-3 items-center w-full bg-blue-100 p-4 rounded-md">
        <CircularProgress size={20} />
        <p className="text-gray-500 text-sm ">Updating data ...</p>
      </div>
    </Box>
  ) : null;
  return (
    <>
      {renderLoading}
      <MaterialTable
        isLoading={isLoading}
        localization={{
          toolbar: {
            searchPlaceholder: "Search Table",
          },
        }}
        icons={tableIcons}
        title="UangMe Table"
        columns={[
          {
            title: "Merchant ID",
            field: "merchant_order_id",
          },
          {
            title: "Loan ID",
            field: "loan_id",
          },
          {
            title: "Amount",
            field: "amount",
            render: (rowData) => (
              <p>IDR {rowData.amount.toLocaleString("id-ID")}</p>
            ),
          },
          {
            title: "User",
            field: "user_name",
          },
          {
            title: "Status",
            field: "status",
            render: (rowData) => {
              return (
                <p
                  className={`text-md text-white p-1 w-24 border text-center rounded-lg  ${
                    rowData.status === "success"
                      ? "border-yellow-500 bg-yellow-300 "
                      : rowData.status === "settled"
                      ? "bg-green-300 border-green-500"
                      : "border-gray-600 bg-gray-400"
                  }`}
                >
                  {rowData.status}
                </p>
              );
            },
          },
          {
            title: "Payment Date",
            field: "pay_time",
            render: (rowData) => {
              const date = new Date(rowData.pay_time);
              const formatDate = `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`;
              return <p>{formatDate}</p>;
            },
          },
        ]}
        data={[]}
        options={{
          exportButton: true,
          pageSizeOptions: [10, 20],
          pageSize: 10,
          sorting: true,
        }}
      />
    </>
  );
};

export default UangMeTransactionTable;
