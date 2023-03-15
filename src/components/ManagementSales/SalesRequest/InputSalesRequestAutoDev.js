import { useState, useEffect } from 'react';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Tooltip,
  Collapse,
} from '@mui/material';
import swal from 'sweetalert';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  inputSalesRequestData,
  getAutoFillDataLiveSearch,
  getChinaDetail,
} from 'service/api';
import { Skeleton } from '@mui/material';

const InputSalesRequestAutoDev = ({
  setUpdate,
  link,
  loading,
  setLoading,
  checkRequestLink,
}) => {
  const [fillCustomer, setFillCustomer] = useState([]);
  const [isNot2Variant, setIs2Variant] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [allVariant, setAllVariant] = useState({});
  const [searchInput, setSearchInput] = useState({ name: '', email: '' });
  const [selectedVariant, setSelectedVariant] = useState([]);

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
    if (searchInput.name.length > 0 && selectedVariant.length > 0) {
      const body = JSON.stringify({
        customer: searchInput.email ? searchInput.email : searchInput.name,
        link: link,
        title_indo: allVariant.title,
        img_product: allVariant.item_imgs[0],
        store: allVariant.type,
        num_iid: allVariant.num_iid,
        title_china: allVariant.title_china,
        product: selectedVariant,
      });
      const data = await inputSalesRequestData(body);
      if (data?.status === 200) {
        setFillCustomer([]);
        setSearchInput({ email: '', name: '' });
        swal('Request submitted successfully', {
          icon: 'success',
          button: false,
          timer: 1000,
        });
        if (setUpdate) {
          setUpdate((prev) => !prev);
        }
        if (checkRequestLink) {
          checkRequestLink(link);
        }
      }
      if (data?.status === 400) {
        swal('Oops', data.message, 'error');
      }
    } else {
      swal('Oops', 'Input not valid!', 'error');
    }
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

  const handleSelected = (type, id) => {
    const values = [...allVariant.PropSku];
    if (type === 'variant') {
      values[id].selected = !values[id].selected;
      values.forEach((varData) => {
        if (varData.properties !== values[id].properties) {
          varData.selected = false;
        }
      });
    }
    if (type === 'child') {
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
      swal('Oops', 'Choose Variant', 'error');
      return;
    }

    if (isNot2Variant) {
      const ids = selectedVariant.map((o) => o.sku_id);
      if (!ids.includes(values[0].children[0].sku_id)) {
        setSelectedVariant([
          ...selectedVariant,
          {
            note: '',
            variantCh: values[0].children[0].variant,
            variantId: values[0].children[0].variantIdn,
            sku_id: values[0].children[0].sku_id,
            img_variant:
              values[0].url.trim() !== ''
                ? values[0].url
                : allVariant.item_imgs[0],
            price: values[0].children[0].harga,
          },
        ]);
      }
    } else {
      const indexChild = values[0].children.find((child) => child.selected);
      if (!indexChild) {
        swal('Oops', 'Choose Variant 2', 'error');
        return;
      }
      const ids = selectedVariant.map((o) => o.sku_id);
      if (!ids.includes(indexChild.sku_id)) {
        setSelectedVariant([
          ...selectedVariant,
          {
            note: '',
            variantCh: `${values[0].value}__${indexChild.variant}`,
            variantId: `${values[0].valueidn}__${indexChild.variantIdn}`,
            sku_id: indexChild.sku_id,
            img_variant:
              values[0].url.trim() !== ''
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

  const handleRemoveVariant = (id) => {
    const newDataVariant = selectedVariant?.filter(
      (data) => data.sku_id !== id
    );
    setSelectedVariant(newDataVariant);
  };

  useEffect(() => {
    getAutoFillData(searchInput.name);
  }, [searchInput.name]);

  useEffect(() => {
    fetchDataVariant(link);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link]);

  return (
    <div className='bg-white rounded-md my-3 '>
      <TableContainer className='table-scroll'>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name / Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <div>
                  <input
                    type='text'
                    value={searchInput.name}
                    onChange={changeHandler}
                    // onBlur={() => setFillCustomer([])}
                    className='border border-gray-300 rounded-md p-1 focus:outline-blue'
                  />
                  {fillCustomer.length > 0 &&
                    searchInput.name.length > 0 &&
                    searchInput.email === '' && (
                      <div
                        className='bg-white p-5 absolute z-50 space-y-2 border border-gray-200 rounded-md overflow-y-scroll variant-scroll mt-2'
                        style={{ maxHeight: 200 }}>
                        {fillCustomer?.map((customer, id) => (
                          <p
                            key={id}
                            onClick={() =>
                              searchHandler(customer.value, customer.label)
                            }
                            className='cursor-pointer hover:text-blue-300'>
                            {customer.label}
                          </p>
                        ))}
                      </div>
                    )}
                </div>
              </TableCell>
              <TableCell>
                <input
                  value={searchInput.email}
                  className='border border-gray-300 rounded-md p-1 text-gray-400 w-32 focus:outline-blue'
                  disabled
                />
              </TableCell>
              <TableCell>
                <div className='flex flex-col space-y-2 relative'>
                  <input
                    type='text'
                    name='link'
                    defaultValue={link}
                    disabled={true}
                    className='border border-gray-300 rounded-md p-1 w-32 focus:outline-blue'
                  />
                  {allVariant.type && (
                    <em className='text-xs text-gray-300 absolute -bottom-4'>
                      Store:{' '}
                      <span className='text-orange-500 font-semibold'>
                        {allVariant.type}
                      </span>
                    </em>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {loading ? (
        <div>
          <Skeleton height={50} />
        </div>
      ) : (
        <div className='p-2 space-y-4'>
          <p className='text-sm'>Choose Variant 1</p>
          <div className='grid grid-cols-5 gap-5 mt-2'>
            {isNot2Variant
              ? allVariant?.PropSku?.map((variant, id) => (
                  <div
                    key={id}
                    onClick={() => handleSelected('variant', id)}
                    className={`${
                      variant.selected && 'ring ring-gray-300 border-gray-500'
                    } p-2 text-sm border border-gray-300 text-center cursor-pointer`}>
                    <img src={variant.url} alt='' />
                    <Tooltip title={variant.valueidn}>
                      <p className='line-clamp-1 capitalize'>
                        {variant.valueidn}
                      </p>
                    </Tooltip>
                  </div>
                ))
              : allVariant?.PropSku?.map((variant, id) => (
                  <div
                    key={id}
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
                ))}
          </div>
          {allVariant?.PropSku?.filter((variant) => variant.selected).length >
            0 &&
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
                      <img src='' alt='' />
                      <Tooltip title={child.variantIdn}>
                        <p className='line-clamp-1 capitalize'>
                          {child.variantIdn}
                        </p>
                      </Tooltip>
                    </div>
                  ))}
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
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button
              className='bg-blue-400 text-white py-2 px-5 rounded-md text-sm'
              onClick={submitRequestHandler}>
              Submit
            </button>
          </div>
          <Collapse in={collapse} timeout='auto' unmountOnExit>
            {selectedVariant.map((data) => (
              <div
                className='flex items-center min-w-96 max-w-xl justify-between border px-2 py-1 text-sm'
                key={data?.sku_id}>
                <p>{data?.variantId}</p>
                <IconButton onClick={() => handleRemoveVariant(data?.sku_id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default InputSalesRequestAutoDev;
