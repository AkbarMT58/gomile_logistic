import MaterialTable from "material-table";
import { CircularProgress, Box } from "@mui/material";
import tableIcons from "helpers/materialTableIcons";

const ListVoucherTable = ({ voucherData, isLoading }) => {
  let number = 0;
  const newData = voucherData?.map((prev) => {
    number++;
    return {
      number,
      ...prev,
    };
  });

  const renderLoading = isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        padding: "10px",
        borderRadius: 2,
        backgroundColor: "white",
        marginBottom: 1,
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
        localization={{
          toolbar: {
            searchPlaceholder: "Search Table",
          },
        }}
        isLoading={isLoading}
        icons={tableIcons}
        title="Voucher Table"
        columns={[
          {
            title: "No.",
            field: "number",
          },
          {
            title: "Voucher Code",
            field: "code",
          },
          {
            title: "Description",
            field: "keterangan",
            width: "50%",
          },
          {
            title: "User",
            field: "user",
            render: (rowData) => (
              <p>
                {rowData.user.slice(0, 1).toUpperCase() + rowData.user.slice(1)}
              </p>
            ),
          },

          {
            title: "Date",
            field: "date",
            render: (rowData) => <p>{rowData.date}</p>,
          },
        ]}
        data={newData}
        options={{
          exportButton: true,
          pageSizeOptions: [25, 50, 100],
          pageSize: 25,
          searchFieldPlaceholder: "Search Table",
        }}
      />
    </>
  );
};

export default ListVoucherTable;
