import { useState, useEffect, useRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import swal from 'sweetalert';
import { IconButton } from '@mui/material';
import { useDebounce } from 'hooks/useDebounce';

const styleModalSelectCategory = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  minWidth:900
};

function ModalProductCategory({ productCategoryData, selectProductCategory, handleChangeProductCategory }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
    };
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([])
    const [searchProductCategory, setSearchProductCategory] = useState("")
    const [searchProductCategoryL2, setSearchProductCategoryL2] = useState("")
  
    const handleSelectCategory = (idx,v) => {
      let n = selectedCategory.filter((v,i) => i < idx)
      n[idx] = v
      setSelectedCategory(n) 
    }
  
    const handleKonfirmasi = () => {
      
      if (selectedCategory.length < 2 || selectedCategory[0] == 0 || selectedCategory[1] == 0) {
        swal('Oops', 'Please choose category !', 'error');
        return;
      }
  
      handleChangeProductCategory(selectedCategory.map(v => v.id))
      handleClose()
    }
  
    useEffect(() => {
      if (productCategoryData) {
        const cat1 = productCategoryData.find(v => v.id === selectProductCategory[0])
        if (cat1) {
          const cat2 = cat1.child.find(v => v.id === selectProductCategory[1])
          setSelectedCategory([cat1,cat2])
        }
      } else {
        swal('Oops', 'Category Not Found !', 'error');
        handleClose()
      }
    }, [open])
  
    const selectedCategoryText = useMemo(
      () => {
        if (productCategoryData) {
          const cat1 = productCategoryData.find(v => v.id === selectProductCategory[0])
          if (cat1) {
            const cat2 = cat1.child.find(v => v.id === selectProductCategory[1])
            const text = cat1.display_name + " > " + cat2.display_name
            return text
          }
        }
      },
      [selectProductCategory]
    );

    const filterCategory = useMemo(() => {
      if (productCategoryData) {
        const filteredData =  productCategoryData.filter(v => {
          if (searchProductCategory != "") {
            return v.display_name.toLowerCase().includes(searchProductCategory.toLowerCase())
          } 
          return true
        }).filter(v => {
          return v.child.findIndex(w => w.display_name.toLowerCase().includes(searchProductCategoryL2.toLowerCase())) >= 0
        })
        if (filteredData.length > 0) {
          setSelectedCategory([filteredData[0],0])
        }
        return filteredData.map(v => v.id)
      }
    }, [searchProductCategory, searchProductCategoryL2])
    return (
      <div>
        <div
          onClick={handleOpen}
          className='border-gray-400 focus:outline-blue border rounded-md p-3 outline-none w-full h-12'  
        >
          {selectedCategoryText || <span className='text-gray-400'>Choose Category Product</span>}
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={styleModalSelectCategory} className="rounded">
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
              <div>
                <h1 className='text-xl py-4 px-6'>Choose Category</h1>
                
                <div className="flex">
                  <div className='px-3 py-4 w-96'>
                    <div className='relative w-full flex items-center'>
                      <input
                          type='text'
                          name='searchProductCategory'
                          placeholder='Type the product category'
                          value={searchProductCategory}
                          onChange={e => {
                            setSelectedCategory([])
                            setSearchProductCategory(e.target.value)
                          }}
                          className={`border-gray-400 focus:outline-blue border rounded-md py-2 px-3 pr-10 outline-none w-full`}
                        />
                        {
                          searchProductCategory !== "" ? (
                            <div className='absolute right-3 cursor-pointer' onClick={() => {setSearchProductCategory("")}}>
                              <CloseIcon />
                            </div>
                          ) : (
                            <div className='absolute right-3 cursor-pointer' onClick={() => {setSearchProductCategory("")}}>
                              <SearchIcon />
                            </div>
                          )
                        }
                    </div>
                  </div>
                  <div className='px-3 py-4 w-96'>
                    <div className='relative w-full flex items-center'>
                      <input
                          type='text'
                          name='searchProductCategory'
                          placeholder='Type the product category'
                          value={searchProductCategoryL2}
                          onChange={e => {
                            setSearchProductCategoryL2(e.target.value)
                          }}
                          className={`border-gray-400 focus:outline-blue border rounded-md py-2 px-3 pr-10 outline-none w-full`}
                        />
                        {
                          searchProductCategoryL2 !== "" ? (
                            <div className='absolute right-3 cursor-pointer' onClick={() => {setSearchProductCategoryL2("")}}>
                              <CloseIcon color='#00f'/>
                            </div>
                          ) : (
                            <div className='absolute right-3 cursor-pointer' onClick={() => {setSearchProductCategory("")}}>
                              <SearchIcon />
                            </div>
                          )
                        }
                    </div>
                  </div>
                </div>
                {
                  productCategoryData && (
                  <div className='flex'>
                    <div className="w-96 overflow-y-scroll border-r variant-scroll" style={{height : 400}}>
                      {
                        productCategoryData.filter(v => {
                          if (searchProductCategory != "") {
                            return filterCategory.includes(v.id) && v.display_name.toLowerCase().includes(searchProductCategory.toLowerCase())
                          } 
                          return filterCategory.includes(v.id) 
                        }).map(v => {
                          return (
                            <div key={v.id} className={"px-4 py-2 flex justify-between hover:bg-gray-100 cursor-pointer " + (v.id === selectedCategory[0]?.id && "font-bold text-orange-500")}
                              onClick={e => handleSelectCategory(0,v)}
                            ><div>{v.display_name}</div>
                              {v.child?.length >0 && <ChevronRightIcon/>}
                            </div>
                          )
                        })
                      }
                    </div>
                    
                    <div className="w-96 overflow-y-scroll border-r variant-scroll" style={{height : 400}}>
                      {
                        selectedCategory[0] ? selectedCategory[0].child?.filter(v => {
                          if (searchProductCategoryL2.length == 0){
                            return true
                          }
                          return v.display_name.toLowerCase().includes(searchProductCategoryL2.toLowerCase())
                        }).map((v, i) => {
                          return (
                            <div key={i} className={"px-4 py-2 flex justify-between hover:bg-gray-100 cursor-pointer "+ (v.id === selectedCategory[1]?.id && "font-bold text-orange-500")}
                              onClick={e => handleSelectCategory(1,v)}
                            >
                              <div>{v.display_name}</div>
                              {v.child?.length >0 && <ChevronRightIcon/>}
                            </div>
                          )
                        }) : ""
                      }
                    </div>
                    {/* <div className="w-72 overflow-y-scroll variant-scroll" style={{maxHeight : 400}}>
                    </div> */}
                  </div>
                  )
                }
                  
                <div className='p-4 flex justify-between items-center'>
                  <div><b className='flex justify-between items-center'>
                    <span className='text-gray-500'>Dipilih : </span> 
                    {selectedCategory.map((v,i) => {
                      return (<span key={i} className='inline-flex items-center'>{v.display_name} {i < selectedCategory.length - 1 ? <ChevronRightIcon/> : " "}</span> )
                    })}
                  </b></div>
                  <div>
                    <button className='border rounded px-3 py-1 font-medium text-lg' onClick={handleClose}>Cancel</button>
                    <button className='border rounded bg-orange-500 ml-2 text-white font-medium px-3 py-1 text-lg' onClick={handleKonfirmasi}>Confirm</button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

export default ModalProductCategory