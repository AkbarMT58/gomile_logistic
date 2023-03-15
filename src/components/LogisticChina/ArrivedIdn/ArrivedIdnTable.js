import {
  CircularProgress,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  TableCell,
} from "@mui/material";
import { useState, useEffect } from "react";
import { confirmArrivedIdnContainer, getArrivedIdnData } from "service/api";
import swal from "sweetalert";
import Notes from "../../General/Notes";
import PaginationFilter from "../../General/PaginationFilter";
import DetailContainerModal from "./DetailContainer/DetailContainerModal";

export default function ArrivedIdnTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pageInfo, setPageInfo] = useState({});
  const [update, setUpdate] = useState(false);

  const fetchOrderData = async (limit, page) => {
    setIsLoading(true);
    const params = new URLSearchParams({ limit, page }).toString();
    const data = await getArrivedIdnData(params);
    if (data?.status === 200) {
      setDataOrder(data.data.data);
      setPageInfo({
        dataInPage: data.data.dataInPage,
        totalData: data.data.totalData,
        totalPage: data.data.totalPage,
      });
    }
    setIsLoading(false);
  };

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
      <div className="flex space-x-3 items-center w-full bg-blue-100 p-3 rounded-md">
        <CircularProgress size={20} />
        <p className="text-gray-500 text-sm ">Updating data ...</p>
      </div>
    </Box>
  ) : null;

  const confirmArrived = async (container_number) => {
    const body = JSON.stringify({ container_number });
    const data = await confirmArrivedIdnContainer(body);
    if (data?.status === 200) {
      swal("Success", "Confirm arrived customer successfully !", "success");
      setUpdate(!update);
    }
  };

  const confirmArrivedSubmit = (container_number) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to revert this change!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willPosted) => {
      if (willPosted) {
        confirmArrived(container_number);
      } else {
        swal("Action canceled!");
      }
    });
  };
  useEffect(() => {
    fetchOrderData(limit, page);
  }, [update, limit, page]);

  const Row = ({ rowData }) => {
    return (
      <TableRow>
        <TableCell align="center">
          <div className="flex flex-col items-center space-y-3">
            <p className="font-semibold">{rowData.container_number}</p>
          </div>
        </TableCell>
        <TableCell align='center'>{(rowData.volume / 1000000).toFixed(2)} M<sup>3</sup></TableCell>
        {/* <TableCell align="center">
          IDR {rowData.shipping?.toLocaleString("id-ID")}
        </TableCell> */}
        {/* <TableCell align="center">
          IDR {rowData.cogs?.toLocaleString("id-ID")}
        </TableCell> */}
        {/* <TableCell align="center">
          IDR {rowData.order_value?.toLocaleString("id-ID")}
        </TableCell> */}
        {/* <TableCell align="center">
          IDR {rowData.profit?.toLocaleString("id-ID")}
        </TableCell> */}
        {/* <TableCell align="center">{rowData.date}</TableCell> */}
        <TableCell align="center">
          <div className="flex flex-col space-y-2">
            <button
              className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center w-full"
              onClick={() => confirmArrivedSubmit(rowData.container_number)}
            >
              Set Custom Clearance
            </button>

            <DetailContainerModal container_number={rowData.container_number} />
            <Notes id={rowData.container_number} setUpdate={setUpdate} />
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      {renderLoading}
      <div className="flex items-center justify-between bg-white p-2 px-3 rounded-md my-2">
        <div className="text-sm font-semibold">
          {pageInfo?.dataInPage
            ? `Showing ${pageInfo?.dataInPage} data of ${pageInfo?.totalData}`
            : null}
        </div>
        <PaginationFilter
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalPage={pageInfo.totalPage}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Container Number</TableCell>
              <TableCell align="center">Total Volume</TableCell>
              {/* <TableCell align="center">Estimasi Ongkir</TableCell>
              <TableCell align="center">Total COGS Value</TableCell>
              <TableCell align="center">Total Order Value</TableCell>
              <TableCell align="center">Profit</TableCell> */}
              {/* <TableCell align="center">Payment Date</TableCell> */}
              <TableCell align="center">Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataOrder.length > 0 ? (
              <>
                {dataOrder?.map((row, id) => (
                  <Row rowData={row} key={id} />
                ))}

                {dataOrder.length <= 3 && (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      align="center"
                      style={{ height: "50vh" }}
                    ></TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <>
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    style={{ height: "70vh" }}
                  >
                    No data available
                  </TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
