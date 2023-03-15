import React, { useEffect, useState } from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { CircularProgress } from "@mui/material";
import GppBadIcon from "@mui/icons-material/GppBad";
import { Box } from "@mui/system";
import MaterialTable from "material-table";
import tableIcons from "helpers/materialTableIcons";
import NotesModal from "./NotesModal";
import ViewModal from "./ViewModal";
import WhatsAppDetail from "./WhatsAppDetail";
import { FormatDate } from "helpers/ConvertTime";
import EditCustomer from "./EditCustomer";

const NewCustomerTable = ({
  dataNewCustomer,
  setChangeData,
  userOBE,
  isLoading,
  isLimit,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [isLoading]);

  const renderLoading = loading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        padding: "10px",
        borderRadius: 2,
        backgroundColor: "white",
        marginBottom: 1,
      }}>
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
        isLoading={loading}
        icons={tableIcons}
        title="New Customer Table"
        columns={[
          {
            title: "Nama",
            field: "nama_lengkap",
            render: (rowData) => (
              <div>
                <div className="text-xs">{rowData.nama_lengkap}</div>
              </div>
            ),
          },
          {
            title: "Email",
            field: "email",
            render: (rowData) => (
              <div>
                <div className="text-xs">{rowData.email}</div>
              </div>
            ),
          },
          {
            title: "Telepon",
            field: "telepon",
            render: (rowData) => (
              <div>
                <div className="text-xs">{rowData.telepon}</div>
              </div>
            ),
          },
          {
            title: "Sales",
            field: "sales",
            render: (rowData) => (
              <div>
                <div className="text-xs">
                  {rowData.sales === ""
                    ? "Belum Memiliki Sales"
                    : rowData.sales}
                </div>
              </div>
            ),
          },
          {
            title: "Tanggal",
            field: "tanggal",
            render: (rowData) => (
              <div>
                <div className="text-xs">{FormatDate(rowData.tanggal)}</div>
              </div>
            ),
          },
          {
            title: "Verified",
            field: "is_verified",
            render: (rowData) => (
              <>
                {rowData.is_verified ? (
                  <div className="flex gap-1 items-center">
                    <VerifiedUserIcon color="success" />
                    <div className="text-xs ">Verified</div>
                  </div>
                ) : (
                  <div className="flex gap-1 items-center">
                    <GppBadIcon color="error" />
                    <div className="text-xs ">Not Verified</div>
                  </div>
                )}
              </>
            ),
          },
          {
            title: "Action",
            field: "action",
            render: (rowData) => (
              <div className="flex">
                <EditCustomer email={rowData.email} />
                <NotesModal
                  email={rowData.email}
                  customer={rowData.name}
                  phone={rowData.rawPhone}
                  setChangeData={setChangeData}
                  notesData={rowData.notes}
                />
                <ViewModal email={rowData.email} />
                <WhatsAppDetail phoneNumber={rowData.telepon} />
              </div>
            ),
          },
        ]}
        data={dataNewCustomer}
        options={{
          exportButton: true,
          pageSizeOptions: [],
          pageSize: Number(isLimit),
          searchFieldPlaceholder: "Search Table",
          isLoading: true,
        }}
      />
    </>
  );
};

export default NewCustomerTable;
