import { useState } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeliveryModalTable from "./DeliveryModalTable";
import {
  getCity,
  getListCourier,
  getProvince,
  getSubdistrict,
  sendProductToCustomer,
} from "service/api";
import swal from "sweetalert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  border: "1px solid lightgray",
  boxShadow: 24,
  borderRadius: "5px",
  p: 4,
};

export default function DeliveryModal({
  customerData,
  deliveryData,
  id_so,
  setUpdate,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [province, setProvince] = useState([]);
  const [city, setCity] = useState([]);
  const [courierData, setCourierData] = useState([]);
  const [subdistrict, setSubdistrict] = useState([]);
  let courier = ["jne", "tiki", "pos", "wahana", "sicepat", "sap", "ncs"];

  const [deliverySubmit, setDeliverySubmit] = useState({
    id_so,
    id_sj: `SJ/${id_so}/${new Date().getFullYear()}`,
    id_customer: customerData.id_customer,
    id_province: customerData.id_province,
    id_district: customerData.id_city,
    id_subdistrict: customerData.id_subdistrict,
    zip: customerData.zip,
    courier: "",
    courier_name: "",
    service: "",
    shipping_price: "",
    weight: "",
  });

  let data = [];
  for (let i = 0; i < deliveryData.length; i++) {
    data.push(...deliveryData[i].product);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "id_province") {
      setDeliverySubmit((prev) => {
        return {
          ...prev,
          id_district: "",
          courier: "",
          service: "",
          id_subdistrict: "",
          shipping_price: "",
          zip: "",
          [name]: value,
        };
      });
      initGetCity(value);
    } else if (name === "id_district") {
      setDeliverySubmit((prev) => {
        return {
          ...prev,
          courier: "",
          service: "",
          id_subdistrict: "",
          shipping_price: "",
          zip: "",
          [name]: value,
        };
      });
      setDeliverySubmit((prev) => {
        return { ...prev, zip: value.split(",")[1] };
      });
      initGetSubdistrict(value.split(",")[0]);
    } else if (name === "id_subdistrict") {
      setDeliverySubmit((prev) => {
        return {
          ...prev,
          courier: "",
          service: "",
          shipping_price: "",
          [name]: value,
        };
      });
    } else if (name === "weight") {
      setDeliverySubmit((prev) => {
        return {
          ...prev,
          courier: "",
          service: "",
          shipping_price: "",
          [name]: value,
        };
      });
    } else if (name === "courier") {
      if (value !== "custom") {
        initGetListCourier(
          deliverySubmit.id_subdistrict,
          value,
          deliverySubmit.weight
        );
      }
      setDeliverySubmit((prev) => {
        return {
          ...prev,
          service: "",
          courier_name: "",
          shipping_price: "",
          [name]: value,
        };
      });
    } else if (name === "service") {
      setDeliverySubmit((prev) => {
        return { ...prev, [name]: value };
      });
      setDeliverySubmit((prev) => {
        return { ...prev, shipping_price: value.split(",")[1] };
      });
    } else {
      setDeliverySubmit((prev) => {
        return { ...prev, [name]: value };
      });
    }
  };

  const initGetProvince = async () => {
    const data = await getProvince();
    if (data?.status === 200) {
      setProvince(data.data);
    }
  };

  const initGetCity = async (id) => {
    const data = await getCity(id);
    if (data?.status === 200) {
      setCity(data.data);
    }
  };

  const initGetSubdistrict = async (id) => {
    const data = await getSubdistrict(id);
    if (data?.status === 200) {
      setSubdistrict(data.data);
    }
  };

  const initGetListCourier = async (id, value, weight) => {
    const data = await getListCourier(id, value, weight);
    if (data?.status === 200) {
      setCourierData(data.data);
    }
  };

  const getProvinceData = () => {
    if (customerData.id_province === "") {
      initGetProvince();
    }
  };

  const submitSendData = async () => {
    const body = JSON.stringify({
      id_so: deliverySubmit.id_so,
      id_sj: deliverySubmit.id_sj,
      id_customer: deliverySubmit.id_customer,
      id_province: deliverySubmit.id_province,
      id_district:
        customerData.id_city !== ""
          ? deliverySubmit.id_district
          : deliverySubmit.id_district.split(",")[0],
      id_subdistrict: customerData.id_subdistrict
        ? deliverySubmit.id_subdistrict
        : deliverySubmit.id_subdistrict.split(",")[0],
      courier: deliverySubmit.courier,
      service: deliverySubmit.service.split(",")[0],
      shipping_price: deliverySubmit.shipping_price,
      weight: deliverySubmit.weight,
      courier_name: deliverySubmit.courier_name,
      box: deliveryData.map((data) => data.id_carton),
    });

    const {
      id_so,
      id_sj,
      id_customer,
      id_province,
      id_district,
      id_subdistrict,
      courier,
      service,
      shipping_price,
      weight,
    } = deliverySubmit;
    const data = await sendProductToCustomer(body);

    if (
      (id_so && id_sj && id_customer && id_district && id_province,
      id_subdistrict && courier && service && shipping_price && weight)
    ) {
      if (data?.status === 200) {
        setUpdate((prev) => !prev);
        swal("Success", "Delivery prodcut updated successfully !", "success");
      }
      if (data?.status === 400) {
        swal("Oops", "Input not valid !", "error");
      }
    }
  };

  return (
    <div>
      <button
        className="py-2 px-5 border text-blue-500  text-sm border-blue-500 rounded-md text-center "
        onClick={() => {
          handleOpen();
          getProvinceData();
        }}
        disabled={deliveryData.length === 0}
      >
        Send
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delivery
          </Typography>
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="space-y-1">
                  <label>Order Number*</label>
                  <input
                    type="text"
                    defaultValue={deliverySubmit.id_so}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label>Letter Number*</label>
                  <input
                    type="text"
                    defaultValue={deliverySubmit.id_sj}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label>Customer*</label>
                  <input
                    type="text"
                    defaultValue={customerData.name}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label>Email*</label>
                  <input
                    type="text"
                    defaultValue={customerData.email}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label>Telephone*</label>
                  <input
                    type="text"
                    defaultValue={customerData.phone}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label>Address*</label>
                  <input
                    type="text"
                    defaultValue={customerData.address}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label>Province*</label>
                  {customerData.id_province === "" ? (
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={deliverySubmit.id_province}
                      onChange={handleChange}
                      name="id_province"
                    >
                      <option value="" disabled>
                        Select province
                      </option>
                      {province?.map((data) => (
                        <option key={data.province_id} value={data.province_id}>
                          {data.province}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      defaultValue={customerData.name_province}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>
                {deliverySubmit.courier === "custom" && (
                  <div className="space-y-1">
                    <label>City*</label>
                    {customerData.name_city === "" ? (
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={deliverySubmit.id_district}
                        onChange={handleChange}
                        name="id_district"
                        disabled={deliverySubmit.id_province === ""}
                      >
                        <option value="" disabled>
                          Select City
                        </option>
                        {city?.map((data) => (
                          <option
                            key={data.id_city}
                            value={`${data.id_city},${data.postal_code}`}
                          >
                            {data.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        defaultValue={customerData.name_city}
                        disabled
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {deliverySubmit.courier !== "custom" && (
                  <div className="space-y-1">
                    <label>City*</label>
                    {customerData.name_city === "" ? (
                      <select
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={deliverySubmit.id_district}
                        onChange={handleChange}
                        name="id_district"
                        disabled={deliverySubmit.id_province === ""}
                      >
                        <option value="" disabled>
                          Select City
                        </option>
                        {city?.map((data) => (
                          <option
                            key={data.id_city}
                            value={`${data.id_city},${data.postal_code}`}
                          >
                            {data.type} {data.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        defaultValue={customerData.name_city}
                        disabled
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    )}
                  </div>
                )}
                <div className="space-y-1">
                  <label>Subsdistrict*</label>
                  {customerData.id_subdistrict === "" ? (
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={deliverySubmit.id_subdistrict}
                      onChange={handleChange}
                      name="id_subdistrict"
                      disabled={deliverySubmit.id_district === ""}
                    >
                      <option value="" disabled>
                        Select Subdistrict
                      </option>
                      {subdistrict.map((data) => (
                        <option
                          key={data.subdistrict_id}
                          value={data.subdistrict_id}
                        >
                          {data.subdistrict_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      defaultValue={customerData.name_subdistrict}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <label>Zip*</label>
                  <input
                    type="text"
                    value={deliverySubmit.zip}
                    onChange={handleChange}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label>Weight (Gram)*</label>
                  <input
                    type="text"
                    name="weight"
                    placeholder="Gram"
                    value={deliverySubmit.weight}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <label>Courier*</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={deliverySubmit.courier}
                    onChange={handleChange}
                    name="courier"
                    disabled={deliverySubmit?.weight === ""}
                  >
                    <option value="" disabled>
                      Select Courier
                    </option>
                    {courier.map((data) => (
                      <option key={data} value={data}>
                        {data.toUpperCase()}
                      </option>
                    ))}
                    <option value="custom">CUSTOM</option>
                  </select>
                </div>
                {deliverySubmit.courier !== "custom" ? (
                  <div className="space-y-1">
                    <label>Service*</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={deliverySubmit.service}
                      onChange={handleChange}
                      name="service"
                      disabled={deliverySubmit?.weight === ""}
                    >
                      <option value="" disabled>
                        Select Service
                      </option>
                      {courierData?.costs?.map((data, index) => (
                        <option
                          key={data.service}
                          value={`${data.service},${data.cost[0].value},`}
                        >
                          {data.service}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label>Couirer Name*</label>
                      <input
                        type="text"
                        name="courier_name"
                        value={deliverySubmit.courier_name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="space-y-1">
                      <label>Select Service*</label>
                      <input
                        type="text"
                        name="service"
                        value={deliverySubmit.service}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </>
                )}
                <div className="space-y-1">
                  <label>Shipping Cost*</label>
                  <input
                    type="number"
                    name="shipping_price"
                    value={deliverySubmit.shipping_price}
                    onChange={handleChange}
                    disabled={deliverySubmit.courier !== "custom"}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div>
              <DeliveryModalTable dataOrder={data} />
            </div>
            <div className="flex justify-end">
              <button
                onClick={submitSendData}
                className="text-white bg-blue-500 px-5 py-1 rounded-md"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
