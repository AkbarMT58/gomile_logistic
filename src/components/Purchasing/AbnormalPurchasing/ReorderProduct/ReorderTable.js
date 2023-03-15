import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ReorderTable({
  dataTable,
  additionalData,
  setAdditionalData,
  getTotal,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 300 }}
      className="variant-scroll tabele-scroll"
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>PIC</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Variant</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price/pcs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable.map((row, id) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <img src={row.image} alt="product" />
              </TableCell>
              <TableCell>
                <p className="font-semibold">{row.sku}</p>
              </TableCell>
              <TableCell>
                <p className="line-clamp-1 w-24">{row.name}</p>
              </TableCell>
              <TableCell>
                <p className="font-semibold">{row.variant}</p>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <p>{row.qty} pcs</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1">
                  <p>RMB {row.highestPrice}</p>
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}>
              <div className="space-y-4">
                <p>Shipping Cost</p>
                <p>Discount</p>
                <p>Total</p>
              </div>
            </TableCell>
            <TableCell colSpan={2} />
            <TableCell colSpan={1} align="right">
              <div className="flex flex-col space-y-2 items-end">
                <input
                  type="text"
                  name="shipping"
                  value={additionalData.shipping}
                  onChange={handleChange}
                  className="p-1 rounded-md w-24  border border-gray-300 focus:outline-blue"
                />
                <input
                  type="text"
                  name="discount"
                  value={additionalData.discount}
                  onChange={handleChange}
                  className="p-1 rounded-md w-24  border border-gray-300 focus:outline-blue"
                />
                <p>{getTotal()}</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
