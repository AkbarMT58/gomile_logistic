import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useModuleCustomVariant } from 'hooks/use-ModuleCustomVariant';
import { LoadingComponentDefault } from 'components/UI/LoadingComponent';

const styleCustomVariant = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

const ModuleCustomVariant = ({ link }) => {
  const {
    imageUpload,
    imageUploadVariant,
    isBolean,
    productVariant,
    inputs,
    setInputs,
    setIsBolean,
    handleChange,
    handleOpenModal,
    handleChangeMesh,
    handleAddVariant,
    handleDeleteImage,
    setProductVariant,
    handleChangeImages,
    handleDeleteVariant,
    handleCloseAllModal,
    handleSubmitCustomVariant,
  } = useModuleCustomVariant({ link });

  return (
    <>
      {/* <button
        name='firstModal'
        onClick={(e) => handleOpenModal(e)}
        className='bg-blue-500 text-white font-base px-3 py-1 rounded-sm hover:bg-blue-700'>
        Module Custom Variant
      </button> */}

      <Modal open={isBolean?.firstModal} onClose={handleCloseAllModal}>
        <Box
          sx={styleCustomVariant}
          className='overflow-y-scroll variant-scroll'>
          <div className='flex justify-end  sticky -top-8 bg-white'>
            <IconButton
              onClick={handleCloseAllModal}
              style={{ textAlign: 'right' }}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className='w-full h-auto p-3'>
            <div className='flex items-center gap-5'>
              <div className='w-[25%] h-[250px] hover:cursor-pointer  hover:bg-gray-100 border-2 border-dashed relative'>
                <div
                  onClick={() => imageUpload.current.click()}
                  className='w-full h-full flex items-center justify-center '>
                  {inputs?.image_product ? (
                    <>
                      <button
                        onClick={handleDeleteImage}
                        className='absolute -top-4 -right-3'>
                        <HighlightOffIcon
                          fontSize='large'
                          className='text-red-500 bg-red-100 rounded-full hover:scale-125'
                        />
                      </button>
                      <img
                        onClick={(e) =>
                          setIsBolean({ ...isBolean, isShowImage: true })
                        }
                        src={`${inputs?.image_product}`}
                        alt='inputs?.image_product'
                        className='w-full h-5 overflow-hidden'
                      />
                    </>
                  ) : isBolean?.isLoadingImage ? (
                    <div className='text-gray-500 font-medium animate-pulse flex'>
                      Loading Image . . .
                    </div>
                  ) : (
                    <div className='text-gray-500 font-medium animate-pulse'>
                      Upload Gambar
                    </div>
                  )}
                </div>
                <input
                  name='input'
                  onChange={handleChangeImages}
                  className='hidden'
                  type='file'
                  ref={imageUpload}
                />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                <input
                  className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                  type='email'
                  name='emailPenerima'
                  placeholder='Email Penerima'
                  value={inputs?.emailPenerima}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                  type='text'
                  name='product'
                  placeholder='Nama Produk'
                  value={inputs?.product}
                  onChange={(e) => handleChange(e)}
                />
                <input
                  className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                  type='text'
                  name='link'
                  placeholder='Link Product'
                  value={inputs?.link}
                  onChange={(e) => e}
                  disabled
                />
                <select
                  className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                  name='category'
                  value={inputs?.category}
                  onChange={(e) => handleChange(e)}>
                  <option value='' disabled>
                    Choose your destination account
                  </option>
                  <option value='category-A'>Category A Rp.2.300.000</option>
                  <option value='category-B'>Category B Rp.3.500.000</option>
                  <option value='category-C'>Category C Rp.5.000.000</option>
                </select>
                <input
                  className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                  type='number'
                  name='minQty'
                  value={inputs?.minQty}
                  onChange={(e) => handleChange(e)}
                  placeholder='minimal Quantity'
                />
              </div>
            </div>

            <div className='w-full mt-10 border-2 rounded-lg p-5'>
              <div className='w-full flex items-center justify-between'>
                <button
                  onClick={(e) => setProductVariant([])}
                  className='bg-red-500 text-sm mb-2 text-white px-2 py-1 rounded-md'>
                  Remove All Variant (Tidak Memiliki Variant)
                </button>
                <IconButton
                  onClick={(e) => handleAddVariant(e)}
                  style={{ textAlign: 'right' }}
                  className='flex items-center justify-center gap-2'>
                  <div className='text-xs uppercase text-blue-500'>
                    Add New Variant
                  </div>
                  <AddIcon
                    fontSize='medium'
                    className='text-blue-500 m-0 p-0'
                  />
                </IconButton>
              </div>

              <div className='border-2-b pb-4'>
                <div className='text-gray-700 font-semibold'>Mass Input</div>
                <div className='flex items-center justify-center gap-5'>
                  <input
                    className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                    type='number'
                    name='qty'
                    placeholder='Quantity/Box'
                    onChange={(e) => handleChangeMesh(e)}
                  />
                  <input
                    className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                    type='number'
                    name='width'
                    placeholder='Lebar'
                    onChange={(e) => handleChangeMesh(e)}
                  />
                  <input
                    className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                    type='number'
                    name='length'
                    placeholder='Panjang'
                    onChange={(e) => handleChangeMesh(e)}
                  />
                  <input
                    className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                    type='number'
                    name='height'
                    placeholder='Tinggi'
                    onChange={(e) => handleChangeMesh(e)}
                  />
                  <input
                    className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                    type='number'
                    name='weight'
                    placeholder='Berat'
                    onChange={(e) => handleChangeMesh(e)}
                  />
                  <input
                    className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                    type='number'
                    name='price'
                    placeholder='RMB'
                    onChange={(e) => handleChangeMesh(e)}
                  />
                </div>
              </div>
              <div className='text-gray-700 font-semibold pt-4'>Unik Input</div>
              <div className='divide-y-2 divide-blue-400 '>
                {productVariant.map((variantData, variantIndex) => (
                  <div key={variantIndex} className='space-y-2 py-2'>
                    <div className='flex gap-5 w-full'>
                      <div className='w-48 h-[110px] hover:cursor-pointer  hover:bg-gray-100 border-2-2 border-2 border-dashed relative'>
                        <div
                          onClick={() =>
                            imageUploadVariant.current[variantIndex].click()
                          }
                          className='w-full h-full flex items-center justify-center '>
                          {variantData?.src ? (
                            <>
                              <button
                                onClick={(e) => handleDeleteImage(variantIndex)}
                                className='absolute -top-4 -right-3'>
                                <HighlightOffIcon
                                  fontSize='large'
                                  className='text-red-500 bg-red-100 rounded-full hover:scale-125'
                                />
                              </button>
                              <img
                                src={`${variantData?.src}`}
                                alt={`${variantData?.src}`}
                                className='w-full h-full object-contain'
                              />
                            </>
                          ) : (
                            <div className='text-gray-500 font-medium animate-pulse'>
                              Upload Gambar
                            </div>
                          )}
                        </div>
                        <input
                          ref={(el) =>
                            (imageUploadVariant.current[variantIndex] = el)
                          }
                          onChange={(e) => handleChangeImages(e, variantIndex)}
                          name='inputVariant'
                          className='hidden'
                          type='file'
                        />
                      </div>
                      <div className='w-full'>
                        <div className='flex gap-2'>
                          <input
                            className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                            type='text'
                            name='variant'
                            placeholder='Nama Variant'
                            value={variantData?.variant}
                            onChange={(e) => handleChange(e, variantIndex)}
                          />
                          <IconButton
                            onClick={(e) => handleDeleteVariant(e, variantData)}
                            style={{ textAlign: 'right' }}>
                            <DeleteOutlineIcon
                              fontSize='medium'
                              className='text-blue-500 hover:text-red-500'
                            />
                          </IconButton>
                        </div>
                        <div className='space-x-2 flex mt-3'>
                          <input
                            className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                            type='number'
                            name='qty'
                            placeholder='Quantity/Box'
                            value={variantData?.qty}
                            onChange={(e) => handleChange(e, variantIndex)}
                          />
                          <input
                            className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                            type='number'
                            name='width'
                            placeholder='Lebar'
                            value={variantData?.width}
                            onChange={(e) => handleChange(e, variantIndex)}
                          />
                          <input
                            className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                            type='number'
                            name='length'
                            placeholder='Panjang'
                            value={variantData?.length}
                            onChange={(e) => handleChange(e, variantIndex)}
                          />
                          <input
                            className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                            type='number'
                            name='height'
                            placeholder='Tinggi'
                            value={variantData?.height}
                            onChange={(e) => handleChange(e, variantIndex)}
                          />
                          <input
                            className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                            type='number'
                            name='weight'
                            placeholder='Berat'
                            value={variantData?.weight}
                            onChange={(e) => handleChange(e, variantIndex)}
                          />
                          <input
                            className='border-2 text-gray-500 w-full rounded-md px-2 py-2 focus:outline-blue'
                            type='number'
                            name='price'
                            placeholder='RMB'
                            value={variantData?.price}
                            onChange={(e) => handleChange(e, variantIndex)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='flex justify-between items-center mt-5'>
              <div className='flex items-center justify-center gap-5'>
                <label>Customer Required to buy per Box</label>
                <input
                  className='border-2 w-5 h-5'
                  type='checkbox'
                  name='is_box '
                  onChange={(e) =>
                    setInputs({
                      ...inputs,
                      is_box: e.target.checked,
                    })
                  }
                  checked={inputs?.is_box}
                />
              </div>
              <LoadingComponentDefault setIsLoading={isBolean?.isLoadingSubmit}>
                <button
                  onClick={(e) => handleSubmitCustomVariant(e)}
                  className='bg-blue-500 hover:bg-blue-700 text-white px-3 py-2'>
                  Submit Custom Variant
                </button>
              </LoadingComponentDefault>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export { ModuleCustomVariant };
