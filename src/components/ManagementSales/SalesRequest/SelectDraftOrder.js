import { useState } from 'react';
import { Modal, Skeleton, Tooltip, Collapse } from '@mui/material';
import swal from 'sweetalert';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import { getChinaDetail, inputSalesRequestDraftOrders } from 'service/api';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  maxHeight: 600,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const SelectDraftOrder = ({ setUpdate, link, checkRequestLink }) => {
  const [open, setOpen] = useState(false);
  const [isNot2Variant, setIs2Variant] = useState(false);
  const [allVariant, setAllVariant] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState([]);
  const [isEmail, setIsEmail] = useState('');
  const [priceInput, setPriceInput] = useState(0);
  const [priceSelected, setPriceSelected] = useState(0);
  const [isInputQuantity, setisInputQuantity] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitRequestHandler = async () => {
    if (isEmail === '') {
      swal('waring', 'Please input email', 'warning');
      return;
    }

    if (Number(handleDataSelectedPrice().totalPrice * 2350) <= 1000000) {
      swal('info', 'Selected Produk Kurang dari 1.000.000,00-', 'info');
      return;
    }

    if (selectedVariant.length > 0) {
      const body = JSON.stringify({
        email: isEmail,
        page_id: allVariant.num_iid,
        produk: allVariant.title,
        produk_ch: allVariant.title_china,
        link: allVariant.detail_url,
        toko: allVariant.type,
        gambar: allVariant.item_imgs[0],
        variant: selectedVariant,
      });

      const data = await inputSalesRequestDraftOrders(body);
      if (data?.status === 200) {
        setAllVariant([]);
        swal('Draft Orders Submit successfully', {
          icon: 'success',
          button: false,
          timer: 2000,
        });
        handleClose();
        if (setUpdate) {
          setUpdate((prev) => !prev);
        }
        if (checkRequestLink) {
          checkRequestLink(link);
        }
      }
      if (data?.status >= 400) {
        swal('Oops', data.message, 'error');
      }
    } else {
      swal('Oops', 'Input not valid!', 'error');
    }
  };

  const handleDataSelectedPrice = () => {
    let totalPrice = 0;

    if (selectedVariant) {
      for (let i = 0; i < selectedVariant.length; i++) {
        totalPrice +=
          selectedVariant[i].harga_req * selectedVariant[i].kuantiti;
      }
    }

    return { totalPrice };
  };

  const handleSelected = (type, id) => {
    const values = [...allVariant.PropSku];

    if (type === 'variant') {
      values[id].selected = !values[id].selected;
      values.forEach((varData) => {
        if (varData.properties !== values[id].properties) {
          varData.selected = false;
          varData.qty = isInputQuantity;
        }
      });

      // Get Price
      let filterPriceSelected = values[id].children[0].harga;
      setPriceInput(filterPriceSelected === undefined && ' Rp.0,00-');
      setPriceSelected(
        ' Rp. ' +
          (filterPriceSelected ? filterPriceSelected * 2350 : 0).toLocaleString(
            'id-ID'
          ) +
          ',00-'
      );
    }

    if (type === 'child') {
      const indexVariant = values.findIndex((variant) => variant.selected);
      values[indexVariant].children[id].selected =
        !values[indexVariant].children[id].selected;
      values[indexVariant].children.forEach((child) => {
        if (child.properties !== values[indexVariant].children[id].properties) {
          child.selected = false;
          child.qty = isInputQuantity;
        }

        // Get Price
        let chindlerSelected = values[indexVariant]?.children?.filter(
          (i) => i.selected === true
        );

        setPriceInput(chindlerSelected[0]?.harga === undefined && ' Rp.0,00-');
        setPriceSelected(
          ' Rp. ' +
            (chindlerSelected[0]?.harga
              ? chindlerSelected[0]?.harga * 2350
              : 0
            ).toLocaleString('id-ID') +
            ',00-'
        );
      });
    }

    setisInputQuantity(0);
    setAllVariant({ ...allVariant, PropSku: values });
  };

  const handleQuantity = (type, value) => {
    const values = [...allVariant.PropSku];
    const validateChoice = [
      ...allVariant.PropSku.filter((data) => data.selected),
    ];

    if (type === 'variant') {
      if (validateChoice.length === 0) {
        swal('Oops', 'Choose Variant', 'error');
        return;
      } else {
        const indexVariant = values.findIndex((variant) => variant.selected);
        values[indexVariant].children.forEach((child) => {
          child.qty = value;
        });

        const selected = allVariant?.PropSku?.filter(
          (variant) => variant.selected === true
        );
        const selectedChildPrice = selected[0]?.children[0]?.harga;
        let Totalprice = selectedChildPrice * value;

        setPriceInput(
          ' Rp. ' + (Totalprice * 2350).toLocaleString('id-ID') + ',00-'
        );
      }
    }

    if (type === 'child') {
      const indexChild = validateChoice[0].children.find(
        (child) => child.selected
      );
      if (!indexChild) {
        swal('Oops', 'Choose Variant 2', 'error');
        return;
      } else {
        const indexVariant = values.findIndex((variant) => variant.selected);
        const indexChildren = values[indexVariant].children.findIndex(
          (children) => children.selected
        );
        values[indexVariant].children[indexChildren].qty = value;

        const selected = allVariant?.PropSku?.filter(
          (variant) => variant.selected === true
        );
        const selectedChild = selected[0]?.children?.filter(
          (variant) => variant.selected === true
        );

        let Totalprice = selectedChild[0]?.harga * value;
        setPriceInput(
          ' Rp. ' + (Totalprice * 2350).toLocaleString('id-ID') + ',00-'
        );
      }
    }

    setisInputQuantity(value);
    setAllVariant({ ...allVariant, PropSku: values });
  };

  const submitSelected = () => {
    const values = [...allVariant.PropSku.filter((data) => data.selected)];

    if (values.length === 0) {
      swal('Oops', 'Choose Variant', 'error');
      return;
    }

    if (isNot2Variant) {
      const ids = selectedVariant.map((o) => o.id_variant);
      if (!ids.includes(values[0].children[0].sku_id)) {
        if (values[0].children[0].qty > 0) {
          setSelectedVariant([
            ...selectedVariant,
            {
              id_variant: values[0].children[0].sku_id,
              variant: values[0].children[0].variantIdn,
              variant_ch: values[0].children[0].variant,
              kuantiti: Number(values[0].children[0].qty),
              harga_req: values[0].children[0].harga,
              gambar: values[0].url,
            },
          ]);
        } else {
          swal('Oops', 'Input quantity', 'error');
          return;
        }
      } else {
        swal('Oops', 'Variant already selected', 'error');
        return;
      }
    } else {
      const indexChild = values[0].children.find((child) => child.selected);
      if (!indexChild) {
        swal('Oops', 'Choose Variant 2', 'error');
        return;
      }

      const ids = selectedVariant.map((o) => o.id_variant);
      if (!ids.includes(indexChild.sku_id)) {
        if (Number(indexChild.qty) > 0) {
          const indexChild = values[0].children.findIndex(
            (child) => child.selected
          );

          setSelectedVariant([
            ...selectedVariant,
            {
              id_variant: values[0].children[indexChild].sku_id,
              variant: values[0].children[indexChild].variantIdn,
              variant_ch: values[0].children[indexChild].variant,
              kuantiti: Number(values[0].children[indexChild].qty),
              harga_req: values[0].children[indexChild].harga,
              gambar: values[0].url,
            },
          ]);
        } else {
          swal('Oops', 'Input quantity', 'error');
          return;
        }
      } else {
        swal('Oops', 'Variant already selected', 'error');
        return;
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
    if (link !== '') {
      const data = await getChinaDetail(body);
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
        swal('Oops', 'Variants for this link failed to load !', 'error');
      }
    }
    setLoading(false);
  };

  const handleRemoveVariant = (id) => {
    const newDataVariant = selectedVariant?.filter(
      (data) => data.id_variant !== id
    );
    setSelectedVariant(newDataVariant);
  };

  return (
    <>
      {/* <button
        onClick={() => {
          handleOpen();
          fetchDataVariant(link);
        }}
        className='text-blue-600 border border-blue-600 text-sm p-1 px-2 rounded-sm'>
        Draft Order
      </button> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style} className='overflow-y-scroll variant-scroll'>
          <div className='flex justify-end -mt-5'>
            <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className='px-2'>
            <p className='font-semibold text-xl'>Add Variant</p>
            <hr />
          </div>
          <div className='bg-white rounded-md my-3 '>
            {loading ? (
              <div>
                <Skeleton height={100} />
              </div>
            ) : (
              <div className='p-2 space-y-4'>
                <p className='text-sm'>Input Email</p>
                <div>
                  <input
                    type='email'
                    value={isEmail}
                    onChange={(e) => setIsEmail(e.target.value)}
                    className='border border-gray-400 w-2/4 px-2 py-1 focus:ring focus:ring-orange-300 focus:border-orange-500 focus:outline-none'
                  />
                  <p className='text-xs text-red-500'>
                    *Email yang menerima semua selected produk
                  </p>
                </div>
                <p className='text-sm'>Choose Variant 1</p>
                <div className='grid grid-cols-5 gap-5 mt-2'>
                  {isNot2Variant
                    ? allVariant?.PropSku?.map((variant, id) => (
                        <div key={id}>
                          <div
                            onClick={() => handleSelected('variant', id)}
                            className={`${
                              variant.selected &&
                              'ring ring-orange-300 border-orange-500'
                            } p-2 text-sm border border-gray-300 text-center cursor-pointer`}>
                            <img src={variant.url} alt='' />
                            <Tooltip title={variant.valueidn}>
                              <p className='line-clamp-1 capitalize'>
                                {variant.valueidn}
                              </p>
                            </Tooltip>
                          </div>
                        </div>
                      ))
                    : allVariant?.PropSku?.map((variant, id) => (
                        <div key={id}>
                          <div
                            onClick={() => handleSelected('variant', id)}
                            className={`${
                              variant.selected &&
                              'ring ring-orange-300 border-orange-500'
                            } p-2 text-sm border border-gray-300 text-center cursor-pointer`}>
                            <img src={variant.url} alt='' />
                            <Tooltip title={variant.valueidn}>
                              <p className='line-clamp-1 capitalize'>
                                {variant.valueidn}
                              </p>
                            </Tooltip>
                          </div>
                        </div>
                      ))}
                </div>

                {allVariant?.PropSku?.filter((variant) => variant.selected)
                  .length > 0 &&
                  !isNot2Variant && (
                    <>
                      <p className='text-sm'>Choose Variant 2</p>
                      <div className='grid grid-cols-5 gap-5 mt-2'>
                        {allVariant?.PropSku?.filter(
                          (variant) => variant.selected
                        )[0]?.children.map((child, id) => (
                          <div
                            key={id}
                            onClick={() => handleSelected('child', id)}
                            className={`${
                              child.selected &&
                              'ring ring-orange-300 border-orange-500'
                            } p-2 text-sm border border-gray-300 text-center cursor-pointer`}>
                            <Tooltip title={child.variantIdn}>
                              <p className='line-clamp-1 capitalize'>
                                {child.variantIdn}
                              </p>
                            </Tooltip>
                            <p className='line-clamp-1 capitalize'>
                              {' Rp. ' +
                                (child.harga * 2350).toLocaleString('id-ID') +
                                ',00-'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                {allVariant?.PropSku?.filter((variant) => variant.selected)
                  .length > 0 && (
                  <>
                    <div className='grid grid-cols-3 border border-blue-400 py-2'>
                      <div className='w-full text-lg '>
                        <div className='text-center text-gray-600 font-semibold w-full capitalize'>
                          Price 1 Item
                        </div>
                        <div className='text-center text-gray-600 font-semibold w-full'>
                          {priceSelected}
                        </div>
                      </div>

                      <div className='w-full text-lg flex flex-col'>
                        <div className='text-center text-gray-600 font-semibold w-full capitalize'>
                          Quantity
                        </div>
                        <input
                          type='number'
                          value={isInputQuantity}
                          onChange={(e) =>
                            isNot2Variant
                              ? handleQuantity('variant', e.target.value)
                              : handleQuantity('child', e.target.value)
                          }
                          className='border border-gray-400 text-center focus:ring focus:ring-orange-300 focus:border-orange-500 focus:outline-none'
                          placeholder='Input Quantity'
                        />
                      </div>

                      <div className='w-full text-lg'>
                        <div className='text-center text-gray-600 font-semibold w-full capitalize'>
                          Total Price
                        </div>
                        <div className='text-center text-gray-600 font-semibold w-full'>
                          {priceInput ? priceInput : 'Rp.0,00-'}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className='flex items-start justify-between'>
                  <div className='flex items-start space-x-3 '>
                    <button
                      className='bg-blue-500 py-2 px-3 rounded-md text-white text-sm'
                      onClick={submitSelected}>
                      Select Variant
                    </button>
                    {selectedVariant.length > 0 && (
                      <div className='flex items-start space-x-3'>
                        <div
                          className='flex cursor-pointer mb-2'
                          onClick={() => setCollapse(!collapse)}>
                          <div className='flex space-x-3 p-2 border border-gray-300 text-sm'>
                            <p>{selectedVariant.length} Variant selected</p>
                            <DoubleArrowSharpIcon
                              fontSize='small'
                              className={`text-blue-500 ${
                                collapse ? '-rotate-90 ' : 'rotate-90 '
                              } `}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <div className='border border-gray-300 text-sm p-2'>
                      Total Harga Selected :
                      {' Rp. ' +
                        (
                          handleDataSelectedPrice().totalPrice * 2350
                        ).toLocaleString('id-ID') +
                        ',00-'}
                    </div>
                  </div>

                  <button
                    className='bg-blue-400 text-white py-2 px-5 rounded-md text-sm'
                    onClick={submitRequestHandler}>
                    Submit
                  </button>
                </div>

                <Collapse in={collapse} timeout='auto' unmountOnExit>
                  <div className='flex flex-wrap w-full gap-4'>
                    {selectedVariant.map((data) => (
                      <div
                        className='border border-blue-500 rounded-md flex items-center justify-between p-2 w-2/5 h-[100px] '
                        key={data?.id_variant}>
                        <div className='flex w-full justify-start'>
                          <div className='w-24 h-24 p-2'>
                            <img
                              src={data?.gambar}
                              className='w-full h-full '
                              alt=''
                            />
                          </div>
                          <div className='ml-2 w-full'>
                            <div className='text-black text-base w-full line-clamp-1'>
                              {data?.variant}
                            </div>
                            <div className='text-black text-base w-full line-clamp-1'>
                              {data?.variant_ch}
                            </div>
                            <div className='text-black text-base w-full line-clamp-1'>
                              Rp.{' '}
                              {(data?.harga_req * 2350).toLocaleString(
                                'id-ID'
                              ) + ',00-'}
                            </div>
                            <div className='text-black text-base w-full line-clamp-1'>
                              Qty : {data?.kuantiti}
                            </div>
                          </div>
                        </div>
                        <IconButton
                          onClick={() => handleRemoveVariant(data?.id_variant)}>
                          <DeleteIcon className='hover:text-red-500 ' />
                        </IconButton>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SelectDraftOrder;
