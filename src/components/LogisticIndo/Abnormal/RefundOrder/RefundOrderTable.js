import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function RefundOrderTable({ refundData, setRefundData }) {
  const handleSelectStatus = (e, id) => {
    const { value } = e.target;
    const values = [...refundData];
    values[id].status = value;
    setRefundData(values);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ maxHeight: 400 }}
      className="overflow-y-scroll variant-scroll"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>PIC</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Variant</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {refundData.map((row, id) => (
            <TableRow key={id}>
              <TableCell style={{ width: "10%" }}>
                <img src={row.image} alt="" />
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                <p>{row.sku}</p>
              </TableCell>
              <TableCell style={{ width: "25%" }}>
                <p className="line-clamp-1 break-words">{row.name}</p>
              </TableCell>
              <TableCell style={{ width: "15%" }}>
                <p>{row.variant}</p>
              </TableCell>
              <TableCell style={{ width: "15%" }}>
                <p>IDR {row.price.toLocaleString("id-ID")}</p>
              </TableCell>
              <TableCell style={{ width: "15%" }}>
                <p>{row.qty} pcs</p>
              </TableCell>
              <TableCell style={{ width: "10%" }}>
                <select
                  value={row.status}
                  onChange={(e) => handleSelectStatus(e, id)}
                  className="border border-gray-300 p-1 rounded-md"
                >
                  <option disabled value="">
                    Select status
                  </option>
                  <option value="Masuk Gudang">Masuk Gudang</option>
                  <option value="Belum Masuk Gudang">Belum Masuk Gudang</option>
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
