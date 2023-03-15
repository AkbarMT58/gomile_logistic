import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Tooltip } from "@mui/material";
import { useState } from "react";

export default function ReceivedManualTable({
  dataOrder,
  receivedData,
  setReceivedData,
}) {
  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const values = [...receivedData];
    if (id !== undefined) {
      values[id][name] = value;
      setReceivedData(values);
    } else {
      setMassUpdate((prev) => {
        return { ...prev, [name]: value };
      });
      setReceivedData(
        receivedData.map((prev) => {
          return { ...prev, [name]: value };
        })
      );
    }
  };

  const handleChecked = (e, id) => {
    const { name, checked } = e.target;
    const values = [...receivedData];
    if (id !== undefined) {
      values[id][name] = checked;
      setReceivedData(values);
      const checkAll = receivedData.filter((data) => data.isChecked === false);
      if (checkAll.length > 0) {
        setMassUpdate((prev) => {
          return { ...prev, [name]: false };
        });
      } else {
        setMassUpdate((prev) => {
          return { ...prev, [name]: true };
        });
      }
    } else {
      setMassUpdate((prev) => {
        return { ...prev, [name]: checked };
      });
      setReceivedData(
        receivedData.map((prev) => {
          return { ...prev, [name]: checked };
        })
      );
    }
  };

  const [massUpdate, setMassUpdate] = useState({
    received: "",
    defect: "",
    unsuitable: "",
    isChecked: false,
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 420, marginTop: 2 }}
      className="variant-scroll table-scroll"
    >
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <input
                type="checkbox"
                name="isChecked"
                onChange={handleChecked}
                checked={massUpdate.isChecked}
                className="mt-2"
                style={{ width: "16px", height: "16px" }}
              />
            </TableCell>
            <TableCell align="center">PIC</TableCell>
            <TableCell align="center">PO Number</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Variant</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">
              <div>
                <p>Received</p>
                <input
                  type="text"
                  name="received"
                  onChange={handleChange}
                  value={massUpdate.received}
                  className="w-14 border border-blue-400 rounded-md"
                />
              </div>
            </TableCell>
            <TableCell align="center">
              <div>
                <p>Defect</p>
                <input
                  type="text"
                  name="defect"
                  onChange={handleChange}
                  value={massUpdate.defect}
                  className="w-14 border border-blue-400 rounded-md"
                />
              </div>
            </TableCell>
            <TableCell align="center">
              <div>
                <p>Unsuitable</p>
                <input
                  type="text"
                  name="unsuitable"
                  onChange={handleChange}
                  value={massUpdate.unsuitable}
                  className="w-14 border border-blue-400 rounded-md"
                />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder.map((row, id) => (
            <TableRow
              key={id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                position: "relative",
              }}
            >
              <TableCell>
                <input
                  type="checkbox"
                  name="isChecked"
                  checked={receivedData[id].isChecked}
                  onChange={(e) => handleChecked(e, id)}
                  className="mt-2"
                  style={{ width: "16px", height: "16px" }}
                />
              </TableCell>
              <TableCell align="center">
                <img src={row.image} alt="product" className="w-36" />
              </TableCell>
              <TableCell align="center">
                <p>{row.id_po}</p>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={row.name}>
                  <p className="line-clamp-1">{row.name}</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title={row.variant}>
                  <p className="line-clamp-1">{row.variant}</p>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <p>{row.qty}</p>
              </TableCell>
              <TableCell align="center" style={{ width: "12%" }}>
                <input
                  type="text"
                  name="received"
                  value={receivedData[id]?.received}
                  onChange={(e) => handleChange(e, id)}
                  className="w-12 p-1 border border-gray-300 rounded-md focus:outline-blue "
                />
                <div className="absolute text-xs  text-red-500">
                  {Number(receivedData[id]?.received) +
                    Number(receivedData[id]?.defect) +
                    Number(receivedData[id]?.unsuitable) ===
                  0
                    ? "Empty field data !"
                    : Number(receivedData[id]?.received) +
                        Number(receivedData[id]?.defect) +
                        Number(receivedData[id]?.unsuitable) <
                      row.qty
                    ? "Lower quantity !"
                    : Number(receivedData[id]?.received) +
                        Number(receivedData[id]?.defect) +
                        Number(receivedData[id]?.unsuitable) >
                        row.qty && "Over quantity !"}
                </div>
              </TableCell>
              <TableCell align="center">
                <input
                  type="text"
                  name="defect"
                  value={receivedData[id]?.defect}
                  onChange={(e) => handleChange(e, id)}
                  className="w-12 p-1 border border-gray-300 rounded-md focus:outline-blue"
                />
              </TableCell>
              <TableCell align="center">
                <input
                  type="text"
                  name="unsuitable"
                  value={receivedData[id]?.unsuitable}
                  onChange={(e) => handleChange(e, id)}
                  className="w-12 p-1 border border-gray-300 rounded-md focus:outline-blue"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
