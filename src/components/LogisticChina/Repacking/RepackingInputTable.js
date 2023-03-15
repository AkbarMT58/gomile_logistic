import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from '@mui/material';
import { height } from '@mui/system';
import React, { useState } from 'react';
import { InputData } from './InputData';
import Lightbox from 'react-image-lightbox';

export default function RepackingInputTable({
  box,
  setBox,
  setUpdate,
  products,
  newDataProduct,
  setNewDataProduct,
}) {
  const [massUpdate, setMassUpdate] = useState({
    panjang: '',
    width: '',
    height: '',
    weight: '',
  });
  const [openLightbox, setOpenLightbox] = useState(false);

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const values = [...box];
    if (i !== undefined) {
      values[i][name] = value;
      setBox(values);
    } else {
      setMassUpdate((prev) => {
        return { ...prev, [name]: value };
      });
      setBox(
        box.map((prev) => {
          return { ...prev, [name]: value };
        })
      );
    }
  };

  // FUNCTION TO JUMP INTO NEXT INPUT FIELD ON ENTER KEY PRESSED
  // const handleKeyUp = (e, targetElem) => {
  //   if (targetElem !== 'null' && e.key === "Enter") {
  //     document.getElementById(targetElem).focus()
  //   }
  // };
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 600 }}
      className="variant-scroll">
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Carton Number</TableCell>
            <TableCell align="center" colSpan={4}>
              <div className="flex">
                <p className="shrink-0 w-24 px-1">Product Name</p>
                {/* <p className="shrink-0 w-1/7">Option</p> */}
                <p className="shrink-0 w-20 px-1">ordered Qty</p>
                <p className="shrink-0 w-20 px-1">Available Qty</p>
                <p className="shrink-0 w-16 px-1">QTY</p>
              </div>
            </TableCell>
            <TableCell align="center">
              <p>Width (cm)</p>
              <div className="flex flex-col text-blue-600 items-center">
                <p>Mass Update</p>
                <input
                  type="number"
                  name="width"
                  value={massUpdate.width}
                  onChange={handleChange}
                  className="border border-blue-600 w-20 px-1 focus:outline-blue"
                />
              </div>
            </TableCell>
            <TableCell align="center">
              <div>
                <p>Length (cm)</p>
                <div className="flex flex-col text-blue-600 items-center">
                  <p>Mass Update</p>
                  <input
                    name="panjang"
                    value={massUpdate.panjang}
                    type="number"
                    onChange={handleChange}
                    className="border border-blue-600 w-20 px-1 focus:outline-blue"
                  />
                </div>
              </div>
            </TableCell>
            <TableCell align="center">
              <div>
                <p>Height (cm)</p>
                <div className="flex flex-col text-blue-600 items-center">
                  <p>Mass Update</p>
                  <input
                    name="height"
                    value={massUpdate.height}
                    type="number"
                    onChange={handleChange}
                    className="border border-blue-600 w-20 px-1 focus:outline-blue"
                  />
                </div>
              </div>
            </TableCell>
            <TableCell align="center">
              <div>
                <p>Weight (g)</p>
                <div className="flex flex-col text-blue-600 items-center">
                  <p>Mass Update</p>
                  <input
                    name="weight"
                    value={massUpdate.weight}
                    type="number"
                    onChange={handleChange}
                    className="border border-blue-600 w-20 px-1 focus:outline-blue"
                  />
                </div>
              </div>
            </TableCell>
            <TableCell align="center" style={{ width: '11%' }}>PIC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {box.map((rowData, i) => (
            <TableRow key={i}>
              <TableCell style={{ width: '10%' }} align="center">
                {rowData.id_box}
              </TableCell>
              <TableCell colSpan={4}>
                <InputData
                  rowData={rowData}
                  boxIndex={i}
                  box={box}
                  setBox={setBox}
                  products={products}
                  setUpdate={setUpdate}
                  newDataProduct={newDataProduct}
                  setNewDataProduct={setNewDataProduct}
                />
              </TableCell>
              <TableCell align="center" style={{ width: '13%' }}>
                <input
                  id={`${rowData.id_box}-repacking-0`}
                  name="width"
                  className="w-20 border border-gray-300 p-1 focus:outline-blue"
                  onChange={(e) => handleChange(e, i)}
                  // onKeyUp={(e) => handleKeyUp(e, rowData.id_box + "-repacking-1")}
                  value={box[i]?.width}
                />
              </TableCell>
              <TableCell align="center" style={{ width: '13%' }}>
                <input
                  id={`${rowData.id_box}-repacking-1`}
                  name="panjang"
                  value={box[i]?.panjang}
                  className="w-20 border border-gray-300 p-1 focus:outline-blue"
                  // onKeyUp={(e) => handleKeyUp(e, rowData.id_box + "-repacking-2")}
                  onChange={(e) => handleChange(e, i)}
                />
              </TableCell>
              <TableCell align="center" style={{ width: '13%' }}>
                <input
                  id={`${rowData.id_box}-repacking-2`}
                  className="w-20 border border-gray-300 p-1 focus:outline-blue"
                  // onKeyUp={(e) => handleKeyUp(e, rowData.id_box + "-repacking-3")}
                  onChange={(e) => handleChange(e, i)}
                  name="height"
                  value={box[i]?.height}
                />
              </TableCell>
              <TableCell align="center" style={{ width: '13%' }}>
                <input
                  id={`${rowData.id_box}-repacking-3`}
                  className="w-20 border border-gray-300 p-1 focus:outline-blue"
                  // onKeyUp={(e) => handleKeyUp(e, `${i === box.length - 1 ? null : box[i+1].id_box + "-0"}`)}
                  onChange={(e) => handleChange(e, i)}
                  name="weight"
                  value={box[i]?.weight}
                />
              </TableCell>
              <TableCell align="center" style={{ width: '11%' }}>
                <div className="flex shrink-0 flex-col items-center space-y-2 w-12 px-1">
                  {rowData.box_product.map((boxData, id) => {
                    return (
                      <div key={id}>
                      <img
                        key={id}
                        src={boxData.image}
                        className="w-full h-[30px] object-contain"
                        onClick={() => setOpenLightbox(boxData.idProduct)}
                        />
                        
                        {openLightbox === boxData.idProduct && (
                          <Lightbox
                            mainSrc={boxData.image}
                            onCloseRequest={() => setOpenLightbox(false)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
