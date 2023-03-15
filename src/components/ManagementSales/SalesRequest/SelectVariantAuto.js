import { useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Modal,
} from "@mui/material";
import swal from "sweetalert";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { getChinaDetail, inputSalesRequestData } from "service/api";
import Cookies from "js-cookie";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  maxHeight: 600,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

const SelectVariantAuto = ({ setUpdate, link, checkRequestLink, email }) => {
  const [open, setOpen] = useState(false);
  const tokenCookies = Cookies.get("oms_token");
  const [isNot2Variant, setIs2Variant] = useState(false);
  const [allVariant, setAllVariant] = useState([]);
  const [notes, setNotes] = useState([{ note: "" }]);
  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState([
    {
      variant1: "",
      variant2: "",
    },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const inputHandlerChange = (e, id) => {
    const { name, value } = e.target;
    const values = [...inputFields];
    if (values[id].variant2.trim() !== "") {
      values[id].variant2 = "";
    } else {
      values[id][name] = value;
    }
    setInputFields(values);
  };

  const notesChangeHandler = (e, id) => {
    const { name, value } = e.target;
    const values = [...notes];
    values[id][name] = value;
    setNotes(values);
  };

  const addFieldsHandler = () => {
    setInputFields([
      ...inputFields,
      {
        variant1: "",
        variant2: "",
      },
    ]);
    setNotes([...notes, { note: "" }]);
  };

  const removeFieldsHandler = () => {
    const index = inputFields.length - 1;
    if (inputFields.length > 1) {
      inputFields.splice(index, 1);
      setInputFields([...inputFields]);
    }

    if (notes.length > 1) {
      notes.splice(index, 1);
      setNotes([...notes]);
    }
  };

  const handleCancel = () => {
    setInputFields([
      {
        variant1: "",
        variant2: "",
      },
    ]);
    setNotes([{ note: "" }]);
    setAllVariant([]);
  };

  const submitRequestHandler = async () => {
    let error = [];
    inputFields.forEach((input) => {
      if (!link || !input.variant1) {
        error.push(1);
      }
    });
    if (error.length === 0) {
      const body = JSON.stringify({
        customer: email ? email : "catalog",
        link: link,
        title_indo: allVariant.title,
        img_product: allVariant.item_imgs[0],
        store: allVariant.type,
        num_iid: allVariant.num_iid,
        title_china: allVariant.title_china,
        product: inputFields.map((input, id) => {
          let sku_id = "";
          let price = "";
          const { variant1, variant2 } = input;
          const [variantCh1] = variant1.split(":&:");
          const [variantCh2] = variant2.split(":&:");
          const [, variantId1] = variant1.split(":&:");
          const [, variantId2] = variant2.split(":&:");
          const [, , img_variant] = variant1.split(":&:");

          if (!isNot2Variant) {
            const [, , id] = variant2.split(":&:");
            const [, , , price2] = variant2.split(":&:");
            sku_id = id;
            price = Number(price2);
          } else {
            const [var1] = variant1.split(":&:");
            const [id] = allVariant.PropSku.filter(
              (data) => data.value === var1
            );
            sku_id = id.children[0].sku_id;
            price = Number(id.children[0].harga);
          }

          return {
            note: notes[id].note,
            variantCh: isNot2Variant
              ? `${variantCh1}`
              : `${variantCh1}__${variantCh2}`,
            variantId: isNot2Variant
              ? `${variantId1}`
              : `${variantId1}__${variantId2}`,
            sku_id: Number(sku_id),
            img_variant,
            price,
          };
        }),
      });

      const data = await inputSalesRequestData(body);
      if (data?.status === 200) {
        setInputFields([
          {
            variant1: "",
            variant2: "",
          },
        ]);
        setNotes([
          {
            note: "",
          },
        ]);
        setAllVariant([]);
        swal("Request submitted successfully", {
          icon: "success",
          button: false,
          timer: 1000,
        });
        handleClose();
        if (setUpdate) {
          setUpdate((prev) => !prev);
        }
        if (checkRequestLink) {
          checkRequestLink(link);
        }
      }
      if (data?.status === 400) {
        swal("Oops", data.message, "error");
      }
    } else {
      swal("Oops", "Input not valid!", "error");
    }
  };

  const fetchDataVariant = async (url) => {
    const body = JSON.stringify({ url });
    setLoading(true);
    if (url !== "") {
      const data = await getChinaDetail(body);
      if (data?.status === 200) {
        if (data.variant.length === 1) {
          setIs2Variant(true);
        } else {
          setIs2Variant(false);
        }
        setAllVariant(data);
      }
      if (data?.status === 404) {
        swal("Oops", "Variants for this link failed to load !", "error");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => {
          handleOpen();
          fetchDataVariant(link, tokenCookies);
        }}
        className="text-white bg-blue-500 text-sm p-1 px-2 rounded-sm"
      >
        Add variant
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="overflow-y-scroll variant-scroll">
          <div className="flex justify-end -mt-5">
            <IconButton onClick={handleClose} style={{ textAlign: "right" }}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="bg-white rounded-md my-3 ">
            <TableContainer className="table-scroll">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Variant 1</TableCell>
                    <TableCell>Variant 2</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Option</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex flex-col space-y-3 relative">
                        {inputFields.map((input, id) => (
                          <div className="space-x-6" key={id}>
                            <select
                              className="border border-gray-300 rounded-md p-1 w-32 focus:outline-blue"
                              name="variant1"
                              value={input.variant1}
                              onChange={(e) => inputHandlerChange(e, id)}
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              {allVariant?.PropSku?.map((data, i) => (
                                <option
                                  title={data?.valueidn}
                                  className="line-clamp-1 w-20"
                                  key={i}
                                  value={`${data?.value}:&:${data?.valueidn}:&:${data?.url}:&:${data?.harga}`}
                                >
                                  {data?.valueidn
                                    ? data?.valueidn?.slice(0, 20)
                                    : data.value}
                                  ...
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                        {loading && (
                          <em className="text-xs text-gray-300 absolute -bottom-5">
                            Loading variant ...
                          </em>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-3">
                        {inputFields.map((input, id) => (
                          <div className="space-x-6" key={id}>
                            <select
                              name="variant2"
                              className="border border-gray-300 rounded-md p-1 w-32 focus:outline-blue"
                              value={input.variant2}
                              disabled={isNot2Variant}
                              onChange={(e) => inputHandlerChange(e, id)}
                            >
                              <option
                                value=""
                                disabled
                                className="text-gray-800"
                              >
                                Select
                              </option>
                              {allVariant?.PropSku?.filter((data) => {
                                const [test] =
                                  inputFields[id].variant1.split(":&:");
                                return data.value === test;
                              }).map((t) =>
                                t?.children?.map((child, i) => {
                                  return (
                                    <option
                                      key={i}
                                      value={`${child.variant}:&:${child.variantIdn}:&:${child.sku_id}:&:${child.harga} `}
                                    >
                                      {child.variantIdn}
                                    </option>
                                  );
                                })
                              )}
                            </select>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-3">
                        {notes.map((input, id) => (
                          <div className="space-x-6" key={id}>
                            <input
                              type="text"
                              name="note"
                              value={input.note}
                              onChange={(e) => notesChangeHandler(e, id)}
                              className="border border-gray-300 rounded-md p-1 w-32 focus:outline-blue"
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex">
                        <IconButton onClick={addFieldsHandler}>
                          <AddIcon />
                        </IconButton>
                        <IconButton onClick={removeFieldsHandler}>
                          <RemoveIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className="flex items-center justify-end">
              <div className="text-right my-2 space-x-2">
                <button
                  className="bg-gray-600 text-white py-2 px-5 rounded-md text-sm"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-400 text-white py-2 px-5 rounded-md text-sm"
                  onClick={submitRequestHandler}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SelectVariantAuto;
