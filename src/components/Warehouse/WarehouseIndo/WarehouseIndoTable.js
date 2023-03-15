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

import { getWarehouseIndoData } from "service/api";
import swal from "sweetalert";
import PaginationFilter from "../../General/PaginationFilter";

export default function WarehouseIndoTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrder, setDataOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  // const [pageInfo, setPageInfo] = useState({});

  const fetchOrderData = async (limit, page) => {
    setIsLoading(true);
    // const params = new URLSearchParams({ limit, page }).toString();
    const data = await getWarehouseIndoData(limit, page, search);

    if (data?.status === 200) {
      setDataOrder(data.data);
    }
    if (data?.status === 404) {
      setDataOrder([]);
      swal("Oops", "Data not found !", "error");
    }
    setIsLoading(false);
  };

  const searchData = async (limit, page, search) => {
    const data = await getWarehouseIndoData(limit, page, search);

    if (data?.status === 200) {
      setDataOrder(data.data);
    }
    if (data?.status === 404) {
      setDataOrder([]);
      swal("Oops", "Data not found !", "error");
    }
  };

  useEffect(() => {
    fetchOrderData(limit, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page]);

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

  const Row = ({ rowData }) => {
    const date = new Date(rowData.tanggal).getDate();
    const month = new Date(rowData.tanggal).getMonth();
    const year = new Date(rowData.tanggal).getFullYear();
    return (
      <TableRow>
        <TableCell>{rowData?.id_po}</TableCell>
        <TableCell>{rowData?.sku}</TableCell>
        <TableCell>{rowData?.image}</TableCell>
        <TableCell>{rowData?.produk}</TableCell>
        <TableCell>{rowData?.variant}</TableCell>
        <TableCell>{rowData?.kuantiti}</TableCell>
        <TableCell>
          {date}-{month + 1}-{year}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <>
      {renderLoading}
      <div className="flex items-center justify-between bg-white p-2 px-3 rounded-md my-2">
        <div className="font-semibold space-x-3">
          {/* {pageInfo?.dataInPage
            ? `Showing ${pageInfo?.dataInPage} data of ${pageInfo?.totalData}`
            : null} */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 p-1 rounded-md"
          />
          <button
            onClick={() => searchData(limit, page, search)}
            className="bg-blue-300 p-1 px-3 text-white rounded-md"
          >
            Search
          </button>
        </div>
        <PaginationFilter
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          // totalPage={pageInfo.totalPage}
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>PO Number</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Pic</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Variant</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataOrder.length > 0 ? (
              <>
                {dataOrder.map((row, id) => (
                  <Row rowData={row} key={id} />
                ))}

                {dataOrder.length <= 7 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                      style={{ height: "60vh" }}
                    ></TableCell>
                  </TableRow>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  align="center"
                  style={{ height: "70vh" }}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
