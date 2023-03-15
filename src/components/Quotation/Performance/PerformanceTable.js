import MaterialTable from "material-table";
import { CircularProgress, Box } from "@mui/material";
import tableIcons from "helpers/materialTableIcons";

const PerformanceTable = ({ isLoading, performanceData }) => {
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
        icons={tableIcons}
        title="Performance Table"
        columns={[
          {
            title: "Photo",
            field: "image",
            render: (rowData) =>
              rowData.image ? (
                <div>
                  <img
                    src={rowData.image}
                    alt="user"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                </div>
              ) : (
                <img
                  src="/beard.png"
                  alt="sales"
                  className="w-24 rounded-full"
                />
              ),
          },
          {
            title: "User",
            field: "user",
            render: (rowData) => (
              <p className="capitalize text-sm">{rowData.user}</p>
            ),
          },
          {
            title: "Assigned Request",
            field: "assignedRequest",
            render: (rowData) => (
              <p className="capitalize text-sm">{rowData.assignedRequest}</p>
            ),
          },
          {
            title: "Checked Request",
            field: "checkedRequest",
            render: (rowData) => (
              <p className="capitalize text-sm">{rowData.checkedRequest}</p>
            ),
          },
          {
            title: "Unchecked Request",
            field: "uncheckedRequest",
            render: (rowData) => (
              <p className="capitalize text-sm">{rowData.uncheckedRequest}</p>
            ),
          },
        ]}
        data={performanceData}
        options={{
          exportButton: true,
          pageSizeOptions: [15, 20],
          pageSize: 15,
          searchFieldPlaceholder: "Search Table",
        }}
      />
    </>
  );
};

export default PerformanceTable;
