import MaterialTable from "material-table";
import { CircularProgress, Box } from "@mui/material";
import tableIcons from "helpers/materialTableIcons";

const TrackingClickTable = ({ clickData, isLoading }) => {
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
        title="Tracking Click"
        columns={[
          {
            title: "Description",
            field: "objectClick",
            render: (rowData) => (
              <p className="break-words">{rowData.objectClick}</p>
            ),
          },
          {
            title: "Total Click",
            field: "totalClick",
          },
        ]}
        data={clickData}
        options={{
          exportButton: true,
          pageSizeOptions: [25, 50, 100],
          pageSize: 25,
          headerStyle: { fontSize: "16px" },
        }}
      />
    </>
  );
};

export default TrackingClickTable;
