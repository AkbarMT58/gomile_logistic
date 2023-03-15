import { useState } from "react";
import { Modal, Skeleton, Tooltip, Collapse } from "@mui/material";
import swal from "sweetalert";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { getChinaDetail, getChinaRawDetail, inputSalesRequestData } from "service/api";
import CloseIcon from "@mui/icons-material/Close";
import { GetDataFromLink } from "../../../helpers/BindOcistockLinks"
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

const AddVariantAutoDev = ({
  link,
  email,
  getVariantData,
  id_request,
  linkChange,
  store,
  setUpdate,
}) => {
  const [open, setOpen] = useState(false);
  const [isNot2Variant, setIs2Variant] = useState(false);
  const [allVariant, setAllVariant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedVariant, setSelectedVariant] = useState([]);

  const submitRequestHandler = async () => {
    if (selectedVariant.length > 0) {
      const body = JSON.stringify({
        customer: email,
        link: link,
        title_indo: allVariant.title,
        img_product: allVariant.item_imgs[0],
        store: "custom-auto",
        num_iid: allVariant.num_iid,
        title_china: allVariant.title_china,
        product: selectedVariant,
      });
      const data = await inputSalesRequestData(body);
      if (data?.status === 200) {
        setAllVariant([]);
        setSelectedVariant([])
        swal("Request submitted successfully", {
          icon: "success",
          button: false,
          timer: 1000,
        });
        handleClose();
        if (setUpdate) {
          // setUpdate((prev) => !prev);
        }
        getVariantData(id_request, false);
      }
      if (data?.status === 400) {
        swal("Oops", data.message, "error");
      }
    } else {
      swal("Oops", "Input not valid!", "error");
    }
  };

  const handleSelected = (type, id) => {
    const values = [...allVariant.PropSku];
    if (type === "variant") {
      values[id].selected = !values[id].selected;
      values.forEach((varData) => {
        if (varData.properties !== values[id].properties) {
          varData.selected = false;
        }
      });
    }
    if (type === "child") {
      const indexVariant = values.findIndex((variant) => variant.selected);
      values[indexVariant].children[id].selected =
        !values[indexVariant].children[id].selected;
      values[indexVariant].children.forEach((child) => {
        if (child.properties !== values[indexVariant].children[id].properties) {
          child.selected = false;
        }
      });
    }
    setAllVariant({ ...allVariant, PropSku: values });
  };

  const submitSelected = () => {
    const values = [...allVariant.PropSku.filter((data) => data.selected)];
    if (values.length === 0) {
      swal("Oops", "Choose Variant", "error");
      return;
    }

    if (isNot2Variant) {
      const ids = selectedVariant.map((o) => o.sku_id);
      if (!ids.includes(values[0].children[0].sku_id)) {
        setSelectedVariant([
          ...selectedVariant,
          {
            id_request,
            note: "",
            variantCh: values[0].children[0].variant,
            variantId: values[0].children[0].variantIdn,
            sku_id: values[0].children[0].sku_id,
            img_variant:
              values[0].url.trim() !== ""
                ? values[0].url
                : allVariant.item_imgs[0],
            price: values[0].children[0].harga,
          },
        ]);
      }
    } else {
      const indexChild = values[0].children.find((child) => child.selected);
      if (!indexChild) {
        swal("Oops", "Choose Variant 2", "error");
        return;
      }
      const ids = selectedVariant.map((o) => o.sku_id);
      if (!ids.includes(indexChild.sku_id)) {
        setSelectedVariant([
          ...selectedVariant,
          {
            id_request,
            note: "",
            variantCh: `${values[0].value}__${indexChild.variant}`,
            variantId: `${values[0].valueidn}__${indexChild.variantIdn}`,
            sku_id: indexChild.sku_id,
            img_variant:
              values[0].url.trim() !== ""
                ? values[0].url
                : allVariant.item_imgs[0],
            price: indexChild.harga,
          },
        ]);
      }
    }
    setAllVariant({
      ...allVariant,
      PropSku: allVariant.PropSku.map((varSku) => {
        return {
          ...varSku,
          selected: false,
          children: varSku.children.map((child) => {
            return { ...child, selected: false };
          }),
        };
      }),
    });
  };

  const fetchDataVariant = async (link) => {
    setLoading(true);
    const body = JSON.stringify({ url: link });
    if (link !== "") {
      const {toko, id } = GetDataFromLink(link)
      if (toko === null) {
        swal("Oops", "The Product link is not read as a URL", "error");
        return
      }
      const data = await getChinaRawDetail(toko, id);
      if (data?.status === 200) {
        if (data.variant.length === 1) {
          setIs2Variant(true);
        } else {
          setIs2Variant(false);
        }
        setAllVariant({
          ...data,
          PropSku: data.PropSku.map((varSku) => {
            return {
              ...varSku,
              selected: false,
              children: varSku.children.map((child) => {
                return { ...child, selected: false };
              }),
            };
          }),
        });
      }
      if (data?.status === 404) {
        swal("Oops", "Variants for this link failed to load !", "error");
      }
    }
    setLoading(false);
  };

  const handleRemoveVariant = (id) => {
    const newDataVariant = selectedVariant?.filter(
      (data) => data.sku_id !== id
    );
    setSelectedVariant(newDataVariant);
  };

  return (
    <>
      <button
        disabled={!linkChange}
        onClick={() => {
          handleOpen();
          fetchDataVariant(link);
        }}
        className={`${
          !linkChange ? "bg-gray-400" : "bg-blue-500"
        } text-white  text-sm p-2 rounded-md`}
      >
        Add auto variant
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
          <div className="px-2">
            <p className="font-semibold text-xl">Add Variant</p>
            <hr />
          </div>
          <div className="bg-white rounded-md my-3 ">
            {loading ? (
              <div className="flex">
                <Skeleton height={285} width={165} className={"mr-4"}/>
                <Skeleton height={285} width={165} className={"mx-4"}/>
                <Skeleton height={285} width={165} className={"mx-4"}/>
                <Skeleton height={285} width={165} className={"mx-4"}/>
                <Skeleton height={285} width={165} className={"ml-4"}/>
              </div>
            ) : (
              <div className="p-2 space-y-4">
                <p className="text-sm">Choose Variant 1</p>
                <div className="grid grid-cols-5 gap-5 mt-2">
                  {isNot2Variant
                    ? allVariant?.PropSku?.map((variant, id) => (
                        <div
                          key={id}
                          onClick={() => handleSelected("variant", id)}
                          className={`${
                            variant.selected &&
                            "ring ring-orange-300 border-orange-500"
                          } p-2 text-sm border border-gray-300 text-center cursor-pointer`}
                        >
                          <img src={variant.url} alt="" />
                          <Tooltip title={variant.value}>
                            <p className="line-clamp-1 capitalize">
                              {variant.value}
                            </p>
                          </Tooltip>
                        </div>
                      ))
                    : allVariant?.PropSku?.map((variant, id) => (
                        <div
                          key={id}
                          onClick={() => handleSelected("variant", id)}
                          className={`${
                            variant.selected &&
                            "ring ring-orange-300 border-orange-500"
                          } p-2 text-sm border border-gray-300 text-center cursor-pointer`}
                        >
                          <img src={variant.url} alt="" />
                          <Tooltip title={variant.value}>
                            <p className="line-clamp-1 capitalize">
                              {variant.value}
                            </p>
                          </Tooltip>
                        </div>
                      ))}
                </div>
                {allVariant?.PropSku?.filter((variant) => variant.selected)
                  .length > 0 &&
                  !isNot2Variant && (
                    <>
                      <p className="text-sm">Choose Variant 2</p>
                      <div className="grid grid-cols-5 gap-5 mt-2">
                        {allVariant?.PropSku?.filter(
                          (variant) => variant.selected
                        )[0]?.children.map((child, id) => (
                          <div
                            key={id}
                            onClick={() => handleSelected("child", id)}
                            className={`${
                              child.selected &&
                              "ring ring-orange-300 border-orange-500"
                            } p-2 text-sm border border-gray-300 text-center cursor-pointer`}
                          >
                            <img src="" alt="" />
                            <Tooltip title={child.variant}>
                              <p className="line-clamp-1 capitalize">
                                {child.variant}
                              </p>
                            </Tooltip>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 ">
                    <button
                      className="bg-blue-500 py-2 px-3 rounded-md text-white text-sm"
                      onClick={submitSelected}
                    >
                      Select Variant
                    </button>
                    {selectedVariant.length > 0 && (
                      <div className="flex items-start space-x-3">
                        <div
                          className="flex cursor-pointer mb-2"
                          onClick={() => setCollapse(!collapse)}
                        >
                          <div className="flex space-x-3 p-2 border border-gray-300 text-sm">
                            <p>{selectedVariant.length} Variant selected</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="bg-blue-400 text-white py-2 px-5 rounded-md text-sm"
                    onClick={submitRequestHandler}
                  >
                    Submit
                  </button>
                </div>
                <Collapse in={collapse} timeout="auto" unmountOnExit>
                  {selectedVariant.map((data) => (
                    <div
                      className="flex items-center min-w-96 max-w-xl justify-between border px-2 py-1 text-sm"
                      key={data?.sku_id}
                    >
                      <p>{data?.variantCh}</p>
                      <IconButton
                        onClick={() => handleRemoveVariant(data?.sku_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </Collapse>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AddVariantAutoDev;
