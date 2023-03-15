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
import { inputSalesRequestData } from "service/api";
import Box from "@mui/material/Box";
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

const SelectVariant = ({ setUpdate, link, checkRequestLink, email }) => {
  const [inputFields, setInputFields] = useState([
    {
      variant: "",
      note: "",
    },
  ]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inputHandlerChange = (e, id) => {
    const { name, value } = e.target;
    const values = [...inputFields];
    values[id][name] = value;
    setInputFields(values);
  };

  const addFieldsHandler = () => {
    setInputFields([
      ...inputFields,
      {
        variant: "",
        note: "",
      },
    ]);
  };

  const removeFieldsHandler = () => {
    const index = inputFields.length - 1;
    if (inputFields.length > 1) {
      inputFields.splice(index, 1);
      setInputFields([...inputFields]);
    }
  };

  const submitRequestHandler = async (link, email) => {
    let error = [];
    inputFields.forEach((input) => {
      if (!link || !input.variant) {
        error.push(1);
      }
    });

    if (error.length === 0) {
      const body = JSON.stringify({
        customer: email,
        link: link,
        store: "custom",
        product: inputFields.map((input) => {
          return { variant: input.variant, note: input.note };
        }),
      });

      const data = await inputSalesRequestData(body);
      if (data?.status === 200) {
        setInputFields([
          {
            variant: "",
            note: "",
          },
        ]);
        swal("Request submitted successfully", {
          icon: "success",
          button: false,
          timer: 1000,
        });
        setUpdate((prev) => !prev);
        handleClose();
        checkRequestLink(link);
      }
    } else {
      swal("Oops", "Input not valid!", "error");
    }
  };

  const handleCancel = () => {
    setInputFields([
      {
        variant: "",
        note: "",
      },
    ]);
  };

  return (
    <>
      <button
        onClick={() => {
          handleOpen();
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
          <div className="bg-white  rounded-md my-3">
            <TableContainer className="table-scroll">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Link</TableCell>
                    <TableCell>Variant</TableCell>
                    <TableCell>Note</TableCell>
                    <TableCell>Option</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex flex-col space-y-3">
                        <div className="space-x-6">
                          <input
                            type="text"
                            name="link"
                            defaultValue={link}
                            disabled={true}
                            className="border border-gray-300 rounded-md p-1 w-32 focus:outline-blue"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-3">
                        {inputFields.map((input, id) => (
                          <div className="space-x-6" key={id}>
                            <input
                              type="text"
                              name="variant"
                              value={input.variant}
                              onChange={(e) => inputHandlerChange(e, id)}
                              className="border border-gray-300 rounded-md p-1 w-32 focus:outline-blue"
                            />
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-3">
                        {inputFields.map((input, id) => (
                          <div className="space-x-6" key={id}>
                            <input
                              type="text"
                              name="note"
                              value={input.note}
                              onChange={(e) => inputHandlerChange(e, id)}
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
                  onClick={() => submitRequestHandler(link, email)}
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

export default SelectVariant;
