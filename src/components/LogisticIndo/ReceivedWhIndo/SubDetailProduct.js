import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import ImageUploadModal from "./ImageUploadModal";

export default function SubDetailProduct({
  dataOrder,
  index,
  newDataOrder,
  setNewDataOrder,
}) {
  const [imageUrl, setImageUrl] = useState([]);

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const values = [...newDataOrder];
    values[index].product[id][name] = value;
    setNewDataOrder(values);
  };

  useEffect(() => {
    const values = [...newDataOrder];
    values[index].image = imageUrl;
    setNewDataOrder(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll"
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Pic</TableCell>
            <TableCell align="center">ID Product</TableCell>
            <TableCell align="center">Product</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Received</TableCell>
            <TableCell align="center">Rejected</TableCell>
            <TableCell align="center">Unsuitable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataOrder.map((rowData, id) => {
            return (
              <TableRow key={id}>
                <TableCell align="center">
                  <img src={rowData.image} alt="" />
                </TableCell>
                <TableCell align="center">{rowData.id_product}</TableCell>
                <TableCell align="center">
                  <div className="flex flex-col">
                    <p className="line-clamp-1">{rowData.name}</p>
                    <input
                      type="text"
                      name="note"
                      value={newDataOrder[index].product[id].note}
                      onChange={(e) => handleChange(e, id)}
                      className="border-gray-300 w-16 p-1 rounded-md"
                    />
                  </div>
                </TableCell>
                <TableCell align="center">{rowData.qty}</TableCell>
                <TableCell align="center">
                  <input
                    type="text"
                    name="received"
                    value={newDataOrder[index].product[id].received}
                    onChange={(e) => handleChange(e, id)}
                    className="border border-gray-300 w-16 p-1 rounded-md"
                  />
                </TableCell>
                <TableCell align="center">
                  <input
                    type="text"
                    name="rejected"
                    value={newDataOrder[index].product[id].rejected}
                    onChange={(e) => handleChange(e, id)}
                    className="border border-gray-300 w-16 p-1 rounded-md"
                  />
                </TableCell>
                <TableCell align="center">
                  <input
                    type="text"
                    name="unsuitable"
                    value={newDataOrder[index].product[id].unsuitable}
                    onChange={(e) => handleChange(e, id)}
                    className="border border-gray-300 w-16 p-1 rounded-md"
                  />
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell colSpan={7}>
              <div className="flex  justify-end">
                <ImageUploadModal
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
