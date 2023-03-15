import { useRef, useState } from "react";
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
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { inputSalesRequestData } from "service/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxHeight: 600,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

const AddVariant = ({
  link,
  email,
  getVariantData,
  id_request,
  linkChange,
  store,
  setUpdate,
}) => {
  const imageUpload = useRef([])
  const [open, setOpen] = useState(false);
  const [inputFields, setInputFields] = useState([
    {
      variant: "",
      note: "",
    },
  ]);

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

  const submitRequestHandler = async (link, store) => {
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
        store: "custom-manual",
        id_request,
        product: inputFields.map((input) => {
          return { variantId: input.variant, note: input.note, id_request, img_variant : input.gambar };
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
        // setUpdate((prev) => !prev);
        handleClose();
        getVariantData(id_request, false);
      }

      if (data?.status === 400) {
        swal("Oops", data.message, "error");
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

  
  const handleChangeImages = (e,id) => {
    const { name } = e.target;
    e.preventDefault();
    const imageInput = e.target.files[0];
    handleUploadImages(imageInput, id, name);
  };

  const handleUploadImages = async (image, id, name) => {
    let formData = new FormData();
    formData.append('gambar', image);
    const response = await fetch(
      `${process.env.REACT_APP_URL_API_IMAGE_UPLOAD2}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    if (data?.status === 200) {
      const values = [...inputFields];
      values[id][name] = data?.file;
      setInputFields(values);
    } else {
      swal('Oops', `Images ${data.message}`, 'error');
    }
  };
  return (
    <>
      <button
        disabled={!linkChange}
        onClick={() => {
          handleOpen();
        }}
        className={`${
          !linkChange ? "bg-gray-400" : "bg-blue-500"
        } text-white  text-sm p-2 rounded-md`}
      >
        Add custom variant
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
                    <TableCell>Image</TableCell>
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
                            {/* <img
                              className='w-52 h-52 rounded-md mt-2 border-2 border-dashed border-gray-300 object-contain mr-3'
                              src={input.gambar ? input.gambar : '/no-image.png'}
                              alt='Featured_Image_Post'
                              onClick={e => imageUpload.current[id].click()}
                            /> */}
                            <input
                              name='gambar'
                              className="border border-gray-300 rounded-md p-1 focus:outline-blue h-9"
                              onChange={e => handleChangeImages(e,id)}
                              type='file'
                              accept="image/*"
                              ref={el => imageUpload.current[id] = el}
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
                              name="variant"
                              value={input.variant}
                              onChange={(e) => inputHandlerChange(e, id)}
                              className="border border-gray-300 rounded-md p-1 w-32 focus:outline-blue h-9"
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
                              className="border border-gray-300 rounded-md p-1 w-32 focus:outline-blue h-9"
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

export default AddVariant;
