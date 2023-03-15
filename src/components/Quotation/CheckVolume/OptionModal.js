import { useState, useEffect, useRef, useMemo } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import RichEditor from 'components/Blog/RichEditor';
import swal from 'sweetalert';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { getVariants, inputVolumeData,getCategoryData, getChinaRawDetail } from 'service/api';
import UpdateModal from './UpdateModal';
import AddVariant from './AddVariant';
import ModalProductCategory from './ModalProductCategory';
// import AddVariantAuto from "./AddVariantAuto";
import AddVariantAutoDev from './AddVariantAutoDev';
import { useSelector } from 'react-redux';
import { selectAddData } from 'redux/addDataSlice';
import { handleBigIntPayload } from 'helpers/handleBigInt';
import { GetDataFromLink } from 'helpers/BindOcistockLinks';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: 900,
  bgcolor: 'background.paper',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

const styleModalImage = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
};

const styleModalSelectCategory = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  minWidth:900
};

export default function OptionModal({
  id,
  link,
  setUpdate,
  boxValue,
  category,
  addData,
  dataQty,
  imageProduct,
  productName,
  rowData,
  productCategoryData,
  materialData
}) {
  
  const imageUpload = useRef(null);
  const { category: Category } = useSelector(selectAddData);
  const [open, setOpen] = useState(false);
  const [box, setBox] = useState(boxValue);
  const [volume, setVolume] = useState([]);
  const [selectCategory, setSelectCategory] = useState(category ? category : 0);
  const [dataLink, setDataLink] = useState('');
  const [supplierLink, setSupplierLink] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [minQty, setMinQty] = useState(dataQty ?? '');
  const [productNameCN, setProductNameCN] = useState('');
  const [productNameID, setProductNameID] = useState('');
  const [selectProductCategory, setSelectProductCategory] = useState([rowData.productCategory, rowData.productSubcategory]);
  const [expiryDate, setExpiryDate] = useState('');
  const [selectMaterial, setSelectMaterial] = useState(0);
  const [material, setMaterial] = useState('');
  const [isLoading, setIsLoading] = useState({
    image: false,
  });
  const [productGambar, setProductGambar] = useState('');
  const [linkChange, setLinkChange] = useState(false);
  const [variantData, setVariantData] = useState([]);
  const [updateAll, setUpdateAll] = useState({
    quantity: '',
    width: '',
    leth: '',
    height: '',
    weight: '',
    price: '',
    min_purchase: '',
    customize_logo: '',
    hscode: '',
    price: '',
    isChecked: false,
    shippingfee:'',
  });
  const [discount, setDiscount] = useState([]);
  const [getAddData, setGetAddData] = useState({});
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectChange = (e) => {
    setSelectCategory(e.target.value);
  };
  
  const handleChangeProductCategory = (val) => {
    setSelectProductCategory(val);
    setSelectMaterial(0)
  };

  const getVariantData = async (id, isOpen) => {
    const response = await getVariants(id);
    if (response?.status === 200) {
      setVariantData(response?.data?.data);
      setDiscount(response?.data?.discount);
      if (isOpen){
        const {toko, id } = GetDataFromLink(link)
        const response2 = await getChinaRawDetail(toko,id);
        if (response2?.status === 200) {
          setDeskripsi(response2.desc)
        }
      }
    }
  };

  const handleChangeImages = (e) => {
    const { name } = e.target;
    e.preventDefault();
    if (name === 'gambar') {
      const imageInput = e.target.files[0];
      handleUploadImages(imageInput);
    }
  };

  const handleInputChange = (e, i, type) => {
    let { name, value } = e.target;

    if (type === 'discount') {
      const values = [...discount];
      values[i][name] = value;
      setDiscount(values);
    }

    if (i === undefined) {
      setUpdateAll((prev) => {
        return { ...prev, [name]: value };
      });
      setVolume(
        volume.map((data) => {
          return { ...data, [name]: value };
        })
      );
    } else {
      const values = [...volume];
      values[i][name] = value;
      setVolume(values);
    }
  };

  const handleLinkChange = (e) => {
    setDataLink(e.target.value);
  };
  const handleSupplierLinkChange = (e) => {
    setSupplierLink(e.target.value);
  };
  
  const submitRequest = async () => {

    if (!selectCategory) {
      swal('Oops', 'Please select category before submit !', 'error');
      return;
    }

    if (productGambar === ""){
      swal('Oops', 'Please select image before submit !', 'error');
      return
    }
    if (!selectProductCategory[1]){
      swal('Oops', 'Please select product category before submit !', 'error');
      return
    }
    if (deskripsi === ""){
      swal('Oops', 'Please input product description before submit !', 'error');
      return
    }
    
    const validateChecked = volume.filter((data) => data.isChecked === true);

    if (validateChecked.length === 0) {
      swal('Oops', 'Please choose at least 1 data before submit !', 'error');
      return;
    }

    for(let i = 0; i < validateChecked.length; i++){
      if(validateChecked[i].price === ""){
        swal('Oops',`Please fill valid "Price" data in row ${i+1} before submit !`,'error');
        return
      }
      if(validateChecked[i].qty === ""){
        swal('Oops',`Please fill valid "Qty" data in row ${i+1} before submit !`,'error');
        return
      }
      if(validateChecked[i].weight === ""){
        swal('Oops',`Please fill valid "Weight" data in row ${i+1} before submit !`,'error');
        return
      }
      if(validateChecked[i].width === ""){
        swal('Oops',`Please fill valid "Width" data in row ${i+1} before submit !`,'error');
        return
      }
      if(validateChecked[i].leth === ""){
        swal('Oops',`Please fill valid "Length" data in row ${i+1} before submit !`,'error');
        return
      }
      if(validateChecked[i].height === ""){
        swal('Oops',`Please fill valid "Height" data in row ${i+1} before submit !`,'error');
        return
      }
    } 

    const body = handleBigIntPayload({
      id_request: id,
      category: Number(selectCategory),
      product_category: selectProductCategory[0],
      product_subcategory: selectProductCategory[1],
      gambar: productGambar,
      link: link,
      product_name_cn: productNameCN,
      product_name_id: productNameID,
      supplier_link: supplierLink,
      product_description: deskripsi,
      expiring_date: expiryDate,
      material: selectMaterial == 0 ? material : selectMaterial,
      box,
      minQty: Number(minQty),
      discount: discount?.map((data) => {
        return {
          ...data,
          value: Number(data.value),
          minQty: Number(data.minQty),
        };
      }),
      product: validateChecked.map((data) => {
        return {
          id_product: data.id_product,
          min_purchase: Number(data.min_purchase == "" || data.min_purchase == null ? 0 : data.min_purchase),
          customize_logo: data.customize_logo,
          hscode: Number(data.hscode == "" || data.hscode == null ? 0 : data.hscode),
          length: Number(data.leth == "" || data.leth == null ? 0 : data.leth),
          height: Number(data.height == "" || data.height == null ? 0 : data.height),
          width: Number(data.width == "" || data.width == null ? 0 : data.width),
          weight: Number(data.weight == "" || data.weight == null ? 0 : data.weight),
          price: Number(data.price == "" || data.price == null ? 0 : data.price),
          qty: Number(data.quantity == "" || data.quantity == null ? 0 : data.quantity),
          shippingfee: Number(data.shippingfee == "" || data.shippingfee == null ? 0 : data.shippingfee),
        };
      }),
    });
    setIsLoadingButton(true);
    const data = await inputVolumeData(body);
    if (data?.status === 200) {
      swal('Submitted', ' Request submit succesfully', 'success');
      setVolume(
        variantData.map(() => {
          return {
            quantity: '',
            width: '',
            leth: '',
            height: '',
            weight: '',
            min_purchase: '',
            hscode: '',
            isChecked: false,
            customize_logo: false,
          };
        })
      );
      setUpdateAll({
        quantity: '',
        width: '',
        leth: '',
        height: '',
        weight: '',
        min_purchase: '',
        hscode: '',
        isChecked: false,
        customize_logo: false,
      });
      setSelectCategory('');
      setSelectProductCategory([0,0])
      setDataLink('');
      setProductNameCN("");
      setProductNameID("");
      setProductGambar("");
      setSupplierLink("")
      setDeskripsi("")
      setExpiryDate("");
      setMaterial("");
      setBox(false)
      handleClose();
      setUpdate((prev) => !prev);
      setIsLoadingButton(false);
    }
    if (data?.status === 400) {
      swal('Oops', data.message, 'error');
      setIsLoadingButton(false);
    }

    setIsLoadingButton(false);
  };

  const handleChecked = (e, id) => {
    const { name, checked } = e.target;
    if (id !== undefined) {
      const values = [...volume];
      values[id][name] = checked;
      setVolume(values);
      const checkAll = values.filter((data) => data[name] === false);
      if (checkAll.length > 0) {
        setUpdateAll((prev) => {
          return { ...prev, [name]: false };
        });
      } else {
        setUpdateAll((prev) => {
          return { ...prev, [name]: true };
        });
      }
    } else {
      setUpdateAll((prev) => {
        return { ...prev, [name]: checked };
      });
      setVolume(
        volume.map((data) => {
          return { ...data, [name]: checked };
        })
      );
    }
  };

  useEffect(() => {
    if (
      dataLink.match(/1688/) ||
      dataLink.match(/taobao/) ||
      dataLink.match(/tmall/)
    ) {
      setLinkChange(true);
    } else {
      setLinkChange(false);
    }
  }, [dataLink]);

  useEffect(() => {
    setDataLink(link);
    setSupplierLink(rowData.supplierLink)
    setDeskripsi(rowData.deskripsi)
    setProductNameCN(productName);
    setProductNameID(rowData.product_indo);
    setProductGambar(imageProduct);
    setSelectCategory(category ?? '');
    setMinQty(dataQty);
    setUpdateAll({
      quantity: '',
      width: '',
      leth: '',
      height: '',
      weight: '',
      min_purchase: '',
      hscode: '',
      isChecked: false,
      customize_logo: false,
    });
    setVolume(
      variantData
        ?.filter((data) => data?.status === 'open')
        .map((data) => {
          return {
            variant: data.variant,
            image: data.image,
            id_product: data.id_product,
            quantity: data.quantity === 0 ? '' : data.quantity,
            price: data.price === 0 ? '' : data.price,
            width: '',
            min_purchase:'',
            leth: '',
            height: '',
            weight: '',
            customize_logo: false,
            hscode: '',
            isChecked: false,
          };
        })
    );
    setGetAddData(addData);
  }, [link, category, addData, variantData, dataQty]);

  
  const handleUploadImages = async (image) => {
    setIsLoading({
      ...isLoading,
      image: true,
    });
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
      setProductGambar(data?.file);
      setIsLoading({
        ...isLoading,
        image: false,
      });
      
    } else {
      swal('Oops', `Images ${data.message}`, 'error');
      setIsLoading({
        ...isLoading,
        image: false,
      });
    }
  };

  const materialDropdownData = useMemo(() => {
    if (productCategoryData) {
      const cat1 = productCategoryData.find(v => v.id === selectProductCategory[0])
      if (cat1) {
        const cat2 = cat1.child.find(v => v.id === selectProductCategory[1])
        return materialData?.filter(v => v.subcategory_material_ids.find(v => v == cat2.subcategory_material_id))
      }
    } else {
      return []
    }
  }, [selectProductCategory])

  return (
    <>
      <div
        className='bg-blue-500  cursor-pointer text-xs p-2 uppercase rounded-md text-white text-center'
        onClick={() => {
          handleOpen();
          getVariantData(id, true);
        }}>
        Input Details
      </div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style} className='overflow-y-scroll variant-scroll'>
            <div className='flex justify-end -mt-5'>
              <IconButton onClick={handleClose} style={{ textAlign: 'right' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Form Input Details
            </Typography>
            <div className='space-y-4 mt-5'>
              <div className='flex flex-col space-y-3'>
                <div>
                  <h3 className='text-lg text-orange-500 font-bold mb-6'>Product Information</h3>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        *Product Name (CN)
                      </label>
                    </div>
                    <div className="md:w-full">                    
                      <input
                        type='text'
                        name='productName'
                        // disabled={dataQty}
                        placeholder='Product Name (CN)'
                        value={productNameCN}
                        onChange={(e) => setProductNameCN(e.target.value)}
                        className='border border-gray-400 rounded-md p-3 focus:outline-blue w-full'
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        *Product Name (ID)
                      </label>
                    </div>
                    <div className="w-full">                    
                      <input
                        type='text'
                        name='productName'
                        placeholder='Product Name (ID)'
                        value={productNameID}
                        onChange={(e) => setProductNameID(e.target.value)}
                        className='border border-gray-400 rounded-md p-3 focus:outline-blue w-full'
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        *Product Link
                      </label>
                    </div>
                    <div className="w-full">                    
                      <input
                        type='text'
                        name='link'
                        pattern='https:.*'
                        placeholder='Link'
                        value={dataLink}
                        onChange={handleLinkChange}
                        className={`border-gray-400 focus:outline-blue border rounded-md p-3 outline-none w-full`}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Supplier Link
                      </label>
                    </div>
                    <div className="w-full">                    
                      <input
                        type='text'
                        name='supplierLink'
                        pattern='https:.*'
                        placeholder='Link'
                        value={supplierLink}
                        onChange={handleSupplierLinkChange}
                        className={`border-gray-400 focus:outline-blue border rounded-md p-3 outline-none w-full`}
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        *Logistics Category
                      </label>
                    </div>
                    <div className="w-full">                    
                      <select
                        // disabled={category}
                        className='border border-gray-400 rounded-md p-3 focus:outline-blue w-full'
                        onChange={handleSelectChange}
                        value={selectCategory}>
                        <option value={0} disabled>
                          Choose Category
                        </option>
                        {Category?.map((cat, index) => (
                          <option key={index} value={cat.value}>
                            {cat.category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        *Product Category
                      </label>
                    </div>
                    <div className="w-full">  
                      <ModalProductCategory productCategoryData={productCategoryData} selectProductCategory={selectProductCategory} handleChangeProductCategory={handleChangeProductCategory}/>           
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        *Product Image
                      </label>
                    </div>
                    <div className="w-full flex items-center">
                      <div className='w-52 mr-2'>
                        <ModalImage image={productGambar}/>
                      </div>
                      <button onClick={e => imageUpload.current.click()} className="py-2 px-3 border rounded hover:shadow">Update</button>
                      <input
                        name='gambar'
                        onChange={handleChangeImages}
                        className="hidden"
                        type='file'
                        ref={imageUpload}
                        accept="image/*"
                      />
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        *Product Description
                      </label>
                    </div>
                    <div className="w-full">    
                    
                      <RichEditor
                        initialValue={deskripsi}
                        onChange={(evt, editor) =>
                          setDeskripsi(editor.getContent())
                        }
                      />
                      
                    </div>
                  </div>

                  <h3 className='text-lg text-orange-500 font-bold mb-6'>Specification</h3>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Expiring Date
                      </label>
                    </div>
                    <div className="w-full">            
                      <input
                        type='date'
                        name='expiryDate'
                        placeholder='Expiry Date'
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className='border border-gray-400 rounded-md p-3 focus:outline-blue w-full'
                      /> 
                    </div>
                  </div>
                  <div className="md:flex md:items-center mb-6">
                    <div className="w-1/3">
                      <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                        Material
                      </label>
                    </div>
                    <div className="w-full flex">       
                      <div className="w-72">
                        <select
                          // disabled={material}
                          className='border border-gray-400 rounded-md p-3 focus:outline-blue w-full'
                          onChange={e => setSelectMaterial(e.target.value)}
                          value={selectMaterial}>
                          <option value={0}>
                            Others
                          </option>
                          {materialDropdownData?.map((item, index) => (
                            <option key={index} value={item.display_name}>
                              {item.display_name}
                            </option>
                          ))}
                        </select>
                      </div>             
                      <div className="w-72 ml-3">
                        {
                          selectMaterial == 0  && (
                            <input
                              type='text'
                              name='material'
                              placeholder='Material'
                              value={material}
                              onChange={(e) => setMaterial(e.target.value)}
                              className='border border-gray-400 rounded-md p-3 focus:outline-blue w-full'
                            />
                          )
                        }
                      </div>             
                    </div>
                  </div>
                </div>
                <h3 className='text-lg text-orange-500 font-bold'>Sales & Shipping Information</h3>


                {discount?.length > 0 && (
                  <div className='grid grid-cols-3 gap-5 text-sm'>
                    {Array(3)
                      .fill()
                      .map((_, id) => (
                        <div key={id} className='flex items-center space-x-2'>
                          <div>
                            <p>Discount Price: </p>
                            <input
                              disabled={!discount[id]?.value}
                              onChange={(e) =>
                                handleInputChange(e, id, 'discount')
                              }
                              value={discount[id]?.value}
                              name='value'
                              className='border border-gray-300 p-1 w-full focus:outline-blue'
                            />
                          </div>
                          <div>
                            <p>Min. Quantity : </p>
                            <input
                              disabled={!discount[id]?.minQty}
                              onChange={(e) =>
                                handleInputChange(e, id, 'discount')
                              }
                              value={discount[id]?.minQty}
                              name='minQty'
                              className='border border-gray-300 p-1 w-full focus:outline-blue'
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                <div className='p-5 border border-gray-300 rounded-md overflow-y-scroll max-h-96 variant-scroll'>
                  <div>
                    <div className='flex items-center justify-between'>
                      <p
                        className={` ${
                          variantData?.length === 0
                            ? 'text-red-500'
                            : linkChange && variantData?.length === 0
                            ? 'text-orange-500'
                            : 'text-black-500'
                        } font-semibold text-sm`}>
                        {variantData?.length !== 0
                          ? 'Mass Update'
                          : linkChange && variantData?.length === 0
                          ? 'Please add variant'
                          : 'Please Update link before add variants !'}
                      </p>
                      <div className='flex items-center space-x-2'>
                        <AddVariant
                          link={dataLink}
                          linkChange={
                            getAddData.store === 'custom' ? linkChange : true
                          }
                          store={getAddData.store}
                          email={getAddData.email}
                          setUpdate={setUpdate}
                          getVariantData={getVariantData}
                          id_request={id}
                        />
                        {getAddData.type === 'auto' && (
                          <AddVariantAutoDev
                            link={dataLink}
                            linkChange={
                              getAddData.store === 'custom' ? linkChange : true
                            }
                            store={getAddData.store}
                            email={getAddData.email}
                            setUpdate={setUpdate}
                            getVariantData={getVariantData}
                            id_request={id}
                          />
                        )}
                      </div>
                    </div>
                    
                    <div className='flex items-center justify-between mt-3'>
                      <div className='w-6'></div>
                      <div className='w-32'>*Price</div>
                      <div className='w-32'>Customize Logo</div>
                      <div className='w-32'>Min. Purchase</div>
                      <div className='w-32'>*Qty/carton</div>
                      <div className='w-32'>*Weight</div>
                      <div className='w-32'>*Width</div>
                      <div className='w-32'>*Length</div>
                      <div className='w-32'>*Height</div>
                      <div className='w-32'>HS-Code</div>
                      <div className='w-32'>Shipping fee/kg</div>
                    </div>
                    {variantData?.length !== 0 && (
                      <div className='flex items-center justify-between mt-3'>
                        <input
                          type='checkbox'
                          name='isChecked'
                          style={{ width: 20, height: 20 }}
                          checked={updateAll.isChecked}
                          onChange={handleChecked}
                        />
                        <input
                          type='number'
                          name='price'
                          value={updateAll.price}
                          placeholder='RMB/pcs'
                          className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (!/[0-9]|\./.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <div className="w-32 flex justify-center">
                          {/* <input
                            type='checkbox'
                            name='customize_logo'
                            style={{ width: 20, height: 20 }}
                            checked={updateAll.customize_logo}
                            onChange={handleChecked}
                          /> */}
                          <ToggleComp
                            name='customize_logo'
                            checked={updateAll.customize_logo}
                            onChange={handleChecked}
                          />
                        </div>
                        <input
                          type='number'
                          name='min_purchase'
                          value={updateAll.min_purchase}
                          placeholder='Min Purchase'
                          className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <input
                          type='number'
                          name='quantity'
                          value={updateAll.quantity}
                          placeholder='Qty/Carton'
                          className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <input
                          type='number'
                          name='weight'
                          value={updateAll.weight}
                          placeholder='Weight (Gram)'
                          className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (!/[0-9]|\./.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <input
                          type='number'
                          name='width'
                          value={updateAll.width}
                          placeholder='Width (CM)'
                          className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (!/[0-9]|\./.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <input
                          type='number'
                          name='leth'
                          value={updateAll.leth}
                          placeholder='Length (CM)'
                          className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                          onChange={handleInputChange}
                          onKeyPress={(e) => {
                            if (!/[0-9]|\./.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                        <input
                          type='number'
                          name='height'
                          value={updateAll.height}
                          placeholder='Height (CM)'
                          className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                          onKeyPress={(e) => {
                            if (!/[0-9]|\./.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onChange={handleInputChange}
                        />
                        <input
                          type='number'
                          name='hscode'
                          value={updateAll.hscode}
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          placeholder='HS-Code'
                          className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                          onChange={handleInputChange}
                        />
                        <input
                          type='number'
                          name='shippingfee'
                          onKeyPress={(e) => {
                            if (!/[0-9]|\./.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          value={updateAll.shippingfee}
                          placeholder='RMB'
                          className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue'
                          onChange={handleInputChange}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {volume?.map((t, i) => (
                      <div key={i} className='bg-gray-200 p-2 mt-2 rounded-md'>
                        <div className='ml-10 flex space-x-2 items-center'>
                          <div className='w-10'>
                            <img
                              src={`${t.image ? t.image : '/no-image.png'} `}
                              alt='product'
                              className='rounded-md w-full object-cover'
                            />
                          </div>
                          <Tooltip title={t.variant}>
                            <p className='font-semibold text-sm line-clamp-1 cursor-pointer'>
                              {t.variant}
                            </p>
                          </Tooltip>
                        </div>

                        <div className='flex items-center justify-between mt-2'>
                          <input
                            type='checkbox'
                            name='isChecked'
                            style={{ width: 20, height: 20 }}
                            checked={volume[i]?.isChecked}
                            onChange={(e) => handleChecked(e, i)}
                          />
                          <input
                            type='number'
                            name='price'
                            value={volume[i]?.price}
                            onKeyPress={(e) => {
                              if (!/[0-9]|\./.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder='RMB'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue mx-2'
                            onChange={(e) => handleInputChange(e, i, 'variant')}
                          />
                          <div className='w-32 flex justify-center'>
                            {/* <input
                              type='checkbox'
                              name='customize_logo'
                              style={{ width: 20, height: 20 }}
                              checked={volume[i]?.customize_logo}
                              onChange={(e) => handleChecked(e, i)}
                            /> */}
                            
                            <ToggleComp
                              name='customize_logo'
                              checked={volume[i]?.customize_logo}
                              onChange={(e) => handleChecked(e, i)}
                            /> 
                           
                          </div>
                          <input
                            type='number'
                            name='min_purchase'
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            value={volume[i]?.min_purchase}
                            placeholder='Min Purchase'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue mx-2'
                            onChange={(e) => handleInputChange(e, i, 'variant')}
                          />
                          <input
                            type='number'
                            name='quantity'
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            value={volume[i]?.quantity}
                            placeholder='Qty/Carton'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue mx-2'
                            onChange={(e) => handleInputChange(e, i, 'variant')}
                          />
                          
                          <input
                            type='number'
                            name='weight'
                            value={volume[i]?.weight}
                            onKeyPress={(e) => {
                              if (!/[0-9]|\./.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder='Weight (Gram)'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue mx-2'
                            onChange={(e) => handleInputChange(e, i, 'variant')}
                          />
                          <input
                            type='number'
                            name='width'
                            value={volume[i]?.width}
                            onKeyPress={(e) => {
                              if (!/[0-9]|\./.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder='Width (CM)'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue mx-2'
                            onChange={(e) => handleInputChange(e, i, 'variant')}
                          />
                          <input
                            type='number'
                            name='leth'
                            value={volume[i]?.leth}
                            onKeyPress={(e) => {
                              if (!/[0-9]|\./.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder='Length (CM)'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue mx-2 my-2'
                            onChange={(e) => handleInputChange(e, i, 'variant')}
                          />
                          <input
                            type='number'
                            name='height'
                            value={volume[i]?.height}
                            onKeyPress={(e) => {
                              if (!/[0-9]|\./.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder='Height (CM)'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue mx-2'
                            onChange={(e) => handleInputChange(e, i, 'variant')}
                          />
                          <input
                            type='number'
                            name='hscode'
                            value={volume[i]?.hscode}
                            onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            placeholder='HS-Code'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue mx-2'
                            onChange={(e) => handleInputChange(e, i, 'variant')}
                          />
                          <input
                            type='number'
                            name='shippingfee'
                            onKeyPress={(e) => {
                              if (!/[0-9]|\./.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                            value={volume[i]?.shippingfee}
                            placeholder='RMB'
                            className='border border-gray-400 rounded-md p-2 w-32 focus:outline-blue mx-2'
                            onChange={(e) => handleInputChange(e, i, 'variant')}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center space-x-2'>
                  <input
                    disabled={boxValue}
                    type='checkbox'
                    style={{ width: 20, height: 20 }}
                    checked={box}
                    onChange={() => setBox(!box)}
                  />
                  <label className='font-semibold'>
                    Customer is required to buy per box
                  </label>
                </div>
                <UpdateModal
                  id={id}
                  link={link}
                  setUpdate={setUpdate}
                  variantsUpdate={variantData
                    ?.filter((data) => data?.status !== 'open')
                    .map((data) => {
                      return {
                        variant: data.variant,
                        status: data.status,
                        reason: data.reason,
                        image: data.image,
                        id_product: data.id_product,
                        quantity: data.quantity,
                        width: data.width ?? '',
                        leth: data.length ?? '',
                        height: data.height ?? '',
                        weight: data.weight ?? '',
                        price: data.price ?? '',
                        isChecked: false,
                      };
                    })}
                  minQty={minQty}
                  boxValue={boxValue}
                  category={category}
                />
              </div>
              <div className='text-center'>
                {isLoadingButton ? (
                  <div className='inline-flex items-center justify-center gap-x-2 bg-blue-400 text-white  rounded-md py-2 px-6'>
                    <CircularProgress size={20} className='text-white' />
                  </div>
                ) : (
                  <button
                    className='bg-blue-400 text-white  rounded-md py-2 px-6'
                    onClick={submitRequest}>
                    Submit
                  </button>
                )}
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

function ModalImage({ image }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>
        <img
          src={image ? image : '/no-image.png'}
          alt='product'
          className='w-full rounded-t-md'
        />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={styleModalImage}>
          <div className='w-full h-full relative'>
            <IconButton
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                color: 'red',
              }}>
              <CloseIcon />
            </IconButton>
            <img
              src={image ? image : '/no-image.png'}
              alt='product'
              className='object-contain'
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

function ToggleComp({checked, name, onChange}){
  const inpRef = useRef(null)
  return (
    <div>
      <input type="checkbox" checked={checked} name={name} onChange={onChange} className={"hidden"} style={{appearance : "none"}} ref={inpRef}/>
      <div className={'rounded-full border border-gray-400 cursor-pointer transition '+ (checked ? "bg-green-500" : "bg-gray-200")} onClick={e => {
        inpRef.current.click()
      }} style={{width : "calc(4rem)"}}>
        <div className={'w-8 h-8 bg-white shadow rounded-full transition ' + (checked && "translate-x-full")}></div>
      </div>
    </div>
  )
}
