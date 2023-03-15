import React, { useRef } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from '@mui/material';
import swal from 'sweetalert';

export const InputData = ({
  rowData,
  box,
  setBox,
  newDataProduct,
  setNewDataProduct,
  boxIndex,
}) => {
  const inputRefs = useRef([]);
  
  const addProduct = () => {
    const values = [...box];
    values[boxIndex].box_product = [
      ...values[boxIndex].box_product,
      { qty: '', idProduct: '', qtyInput: '', avQty: '' },
    ];
    setBox(values);
  };

  const removeProduct = () => {
    const values = [...box];
    const index = values[boxIndex].box_product.length - 1;
    if (values[boxIndex].box_product.length > 1) {
      values[boxIndex].box_product.splice(index, 1);
      setBox(values);
    }
  };

  const handleSelect = (e, id) => {
    const { name, value } = e.target;
    const [qty, idProduct] = value.split(',');
    const values = [...box];
    const productValues = [...newDataProduct];
    const productIndex = newDataProduct.findIndex(
      (data) => data.idProduk === values[boxIndex].box_product[id].idProduct
    );
    const lastQty = values[boxIndex].box_product[id].qtyInput;
    if (name !== 'qtyInput') {
      const validateProduct = values[boxIndex].box_product.filter(
        (data) => data.idProduct === idProduct
      );
      if (validateProduct.length > 0) {
        swal('Oops', `You can't choose same product in this carton !`, 'error');

        const newData = values[boxIndex].box_product.filter(
          (data) => data.idProduct
        );
        values[boxIndex].box_product = newData;

        setBox(values);
        return;
      } else {
        if (values[boxIndex].box_product[id].idProduct) {
          if (values[boxIndex].box_product[id].idProduct !== idProduct) {
            productValues[productIndex].avQty =
              productValues[productIndex].qty + Number(lastQty);
            productValues[productIndex].qty = productValues[productIndex].avQty;
          }
          if (productValues[productIndex].avQty >= 0) {
            setNewDataProduct(productValues);
          } else {
            swal('Oops', 'Input higher than available Qty !', 'error');
          }
          values[boxIndex].box_product[id].qtyInput = '';
          values[boxIndex].box_product[id].qty = qty;
          values[boxIndex].box_product[id].idProduct = idProduct;
        } else {
          values[boxIndex].box_product[id].qty = qty;
          values[boxIndex].box_product[id].idProduct = idProduct;
        }
        setBox(values);
      }
    }
  };

  const handleInput = (e, id, nextTargetElem) => {
    const { name, value } = e.target;
    if (Number(value) < 0) {
      swal('Oops', 'Input not valid !', 'error');
      return;
    }

    const values = JSON.parse(JSON.stringify(box));
    const lastQty = values[boxIndex].box_product[id].qtyInput;
    values[boxIndex].box_product[id][name] = value;

    for (let i = 0; i < values.length; i++) {
      values[i].box_product[id].avQty = Number(values[i].box_product[id].qty) + Number(lastQty) - Number(value);
      values[i].box_product[id].qty = values[i].box_product[id].avQty;
    }
    
    if (values[boxIndex].box_product[id].avQty >= 0) {
      // FUNCTION TO AUTO JUMP INTO NEXT INPUT FIELD IF VALUE == avQty
      if(values[boxIndex].box_product[id].avQty === 0) {
        document.getElementById(nextTargetElem).focus()
      }
    } else {
      swal('Oops', 'Input higher than available Qty !', 'error');
    }
    setBox(values);
  };

  // FUNCTION TO JUMP INTO NEXT INPUT FIELD ON ENTER KEY PRESSED
  const handleKeyUp = (e, id, nextTargetElem) => {
    handleInput(e, id, nextTargetElem)
    
    // if (e.key === "Enter" && nextTargetElem) {
    //   document.getElementById(nextTargetElem).focus()
    // }
  };
  
  return (
    <div className="flex items-center">
      <div className="flex shrink-0 flex-col items-center space-y-2 w-24 px-1">
        {rowData.box_product.map((boxData, id) => {
          return (
            <div
              title={`${boxData.sku}-${boxData.name}`}
              key={id}
              className="w-full h-[30px] flex items-center">
                <div className="w-full text-xs overflow-ellipsis overflow-hidden whitespace-nowrap">{`${id+1}-${boxData.sku}-${boxData.name}`}</div>
            </div>
            // <select
            //   key={id}
            //   onChange={(e) => handleSelect(e, id)}
            //   className="w-24 border border-gray-300 p-1 rounded-md focus:outline-blue">
            //   <option value="">Select Product</option>
            //   {newDataProduct.map((data, index) => (
            //     <option
            //       key={index}
            //       value={`${data.qty},${data.idProduk}`}
            //       disabled={data.qty <= 0}>
            //       {data.sku}-{data.name}
            //     </option>
            //   ))}
            // </select>
          );
        })}
      </div>
      {/* <div className=" flex flex-col items-center w-1/7">
        <IconButton onClick={addProduct}>
          <AddIcon fontSize="small" />
        </IconButton>
        <IconButton fontSize="small" onClick={removeProduct}>
          <RemoveIcon />
        </IconButton>
      </div> */}
      <div className="flex shrink-0 flex-col space-y-2 items-center w-20 px-1">
        {rowData.box_product.map((data, id) => (
          <div 
            key={id} 
            className="h-[30px] flex items-center">
            <div className="text-xs">{data.orderedQty}</div>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 flex-col space-y-2 items-center w-20 px-1">
        {rowData.box_product.map((data, id) => (
          <div 
            key={id} 
            className="h-[30px] flex items-center">
            <div className="text-xs">{data.avQty}</div>
          </div>
        ))}
      </div>
      <div className="flex shrink-0 flex-col space-y-2 items-center w-16 px-1">
        {rowData.box_product.map((data, id) => (
          <div className="relative" key={id}>
            <input
              id={`${rowData.id_box}-${id}`}
              type="number"
              key={id}
              defaultValue={data.qtyInput}
              name="qtyInput"
              disabled={data.idProduct === '' || data.qty === 0 && data.qtyInput === "" || data.qty === undefined}
              className={`${data?.qty < 0 ? 'border-red-500 ring ring-red-300' : 'border-gray-300'} ${data?.qty === 0 ? 'border-green-500 ring ring-green-300' : 'border-gray-300' } text-center border  w-12 p-1 focus:outline-blue`}
              onChange={(e) => handleInput(e, id, `${id === rowData.box_product.length -1 ? rowData.id_box + "-repacking-0" : rowData.id_box + "-" + (id+1)}`)}
              
              // EVENT TO RUN FUNCTION TO JUMP INTO NEXT INPUT FIELD ON ENTER KEY PRESSED
              onKeyUp={(e) =>
                handleKeyUp(e, id, `${id === rowData.box_product.length -1 ? rowData.id_box + "-repacking-0" : rowData.id_box + "-" + (id+1)}`)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
