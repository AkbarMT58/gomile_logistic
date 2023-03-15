import { useState, useEffect } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@mui/material";
import swal from "sweetalert";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { inputSalesRequestData, getAutoFillDataLiveSearch } from "service/api";

const InputSalesRequest = ({ setUpdate, checkRequestLink, link }) => {
  const [searchInput, setSearchInput] = useState({ name: "", email: "" });
  const [fillCustomer, setFillCustomer] = useState([]);
  const [inputFields, setInputFields] = useState([
    {
      variant: "",
      note: "",
    },
  ]);

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

  const changeHandler = (e) => {
    setSearchInput((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  const searchHandler = (email, name) => {
    setSearchInput({ email, name });
    setFillCustomer([]);
  };

  const getAutoFillData = (input) => {
    setTimeout(async () => {
      if (input.length > 0) {
        const data = await getAutoFillDataLiveSearch(input);
        if (data?.length > 0) {
          setFillCustomer(data);
        }
      }
    }, 500);
  };

  const submitRequestHandler = async () => {
    let error = [];
    inputFields.forEach((input) => {
      if (!link || !input.variant) {
        error.push(1);
      }
    });

    if (searchInput.name.length > 0 && error.length === 0) {
      const body = JSON.stringify({
        customer: searchInput.email ? searchInput.email : searchInput.name,
        link: link,
        store: "custom",
        product: inputFields.map((input) => {
          return { variant: input.variant, note: input.note };
        }),
      });

      const data = await inputSalesRequestData(body);
      if (data?.status === 200) {
        setFillCustomer([]);
        setSearchInput({ email: "", name: "" });
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
    setSearchInput({ email: "", name: "" });
    setFillCustomer([]);
  };

  useEffect(() => {
    getAutoFillData(searchInput.name);
  }, [searchInput.name]);

  return (
    <div className="bg-white  rounded-md my-3">
      <TableContainer className="table-scroll">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name / Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Variant</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <div>
                  <input
                    type="text"
                    value={searchInput.name}
                    onChange={changeHandler}
                    className="border border-gray-300 rounded-md p-1 focus:outline-blue"
                  />
                  {fillCustomer.length > 0 && searchInput.name.length > 0 && (
                    <div
                      className="bg-white p-5 absolute z-50 space-y-2 border border-gray-200 rounded-md overflow-y-scroll variant-scroll mt-2"
                      style={{ maxHeight: 200 }}
                    >
                      {fillCustomer?.map((customer, id) => (
                        <p
                          key={id}
                          onClick={() =>
                            searchHandler(customer.value, customer.label)
                          }
                          className="cursor-pointer hover:text-blue-300"
                        >
                          {customer.label}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <input
                  type="text"
                  value={searchInput.email}
                  className="border border-gray-300 rounded-md p-1 text-gray-400 w-32 focus:outline-blue"
                  disabled={true}
                />
              </TableCell>
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
            onClick={submitRequestHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputSalesRequest;
