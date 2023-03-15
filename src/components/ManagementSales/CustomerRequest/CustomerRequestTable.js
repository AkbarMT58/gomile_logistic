import MaterialTable from "material-table";
import { CircularProgress, Box } from "@mui/material";
import tableIcons from "helpers/materialTableIcons";
import OptionsModal from "./OptionsModal";

const CustomerRequestTable = ({ requestData, isLoading, setUpdate }) => {
  const data = [...requestData];
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
        title="Customer Request Table"
        columns={[
          {
            title: "ID",
            field: "id_request",
          },
          {
            title: "Customer",
            field: "customer",
            render: (rowData) => (
              <div className="flex flex-col text-sm">
                <span>{rowData.customer.name}</span>
                <span>{rowData.customer.email}</span>
                <span>{rowData.customer.phone}</span>
              </div>
            ),
          },
          {
            title: "Product",
            field: "product",
            width: "50%",
            render: (rowData) => (
              <p className="text-sm line-clamp-3 2xl:line-clamp-2">
                {rowData.product.name}
              </p>
            ),
          },
          {
            title: "Notes",
            field: "notes",
            render: (rowData) => (
              <div className="text-sm">
                {rowData.keterangan !== null ? (
                  rowData.keterangan
                ) : (
                  <em>null</em>
                )}
              </div>
            ),
          },
          {
            title: "Image",
            field: "image",
            render: (rowData) => (
              <div>
                <img
                  src={rowData.product.image}
                  alt="product"
                  className="w-24 h-24 rounded-md object-cover"
                />
              </div>
            ),
          },
          {
            title: "Marketplace",
            field: "marketplace",
            render: (rowData) => (
              <div className="flex flex-col space-y-3">
                <p>{rowData.product.toko}</p>
                <a
                  href={`https://wa.me/${rowData.customer.phone}`}
                  className="text-green-500 flex items-center space-x-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/whatsapp.png" alt="" className="w-6" />
                  <span className="text-sm">Whatsapp</span>
                </a>
              </div>
            ),
          },

          {
            title: "Options",
            field: "option",
            render: (rowData) => (
              <div className="flex flex-col items-center w-20 space-y-3">
                <OptionsModal
                  id_request={rowData.id_request}
                  link={rowData.product.link}
                  name={rowData.customer.name}
                  email={rowData.customer.email}
                  product={rowData.product.name}
                  notesProduct={rowData.keterangan}
                  id_detail={rowData.id_detail}
                  setUpdate={setUpdate}
                />

                <a
                  href={rowData.product.link}
                  className="bg-blue-200 p-1 text-white rounded-md text-sm w-full text-center"
                  target="_blank"
                  rel="noreferrer"
                >
                  LINK
                </a>
              </div>
            ),
          },
          {
            title: "Sales",
            field: "sales",
            render: (rowData) => (
              <div className="text-sm">
                {rowData.sales !== null ? (
                  rowData.sales
                ) : (
                  <em>Not Assignment</em>
                )}
              </div>
            ),
          },
          {
            title: "Date",
            field: "date",
            render: (rowData) => <p className="text-sm">{rowData.date}</p>,
          },
        ]}
        data={data}
        options={{
          exportButton: true,
          pageSizeOptions: [10, 20],
          tableLayout: "auto",
          pageSize: 10,
        }}
      />
    </>
  );
};

export default CustomerRequestTable;
