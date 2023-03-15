import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from 'react';
import swal from 'sweetalert';
import { handleBigIntPayload, handleBigIntResponse } from 'helpers/handleBigInt';
import { submit_new_subcategory } from 'service/api';

export default function SubCategory({
  subCategory,
  editing,
  set_Editing,
  editSubCategory,
  updateSubCategory,
  categoryParent,
  changed,
  handleChangeImages,
  imageUpload,
  confirmDeleteCategory,
  deleteSubCategory,
  setAllCategories
}) {


  return (
    <>
      {subCategory?.map((category, index) => (
        <div key={category.id} className="py-3 border-b relative">
          <div
            className="absolute top-0 right-0"
            onClick={() => set_Editing(category.id)}>
            {editing === category.id ? <CloseIcon /> : <EditTwoToneIcon />}
          </div>
          <div className="flex ">
            <div className="w-20 shrink-0 h-20 relative mr-1">
              <img
                src={category.image}
                alt=""
                className="w-full object-contain"
              />
              {editing === category.id && (
                <div
                  className="absolute text-xs bottom-4 w-full text-center font-semibold cursor-pointer hover:font-bold"
                  style={{
                    textShadow:
                      '1px 1px 0px white, -1px -1px 0 white, -1px 1px 0 white, 1px -1px 0 white',
                  }}
                  onClick={() => imageUpload.current.click()}>
                  Change image
                  <input
                    name={`input-${category.id}`}
                    onChange={(e) =>
                      handleChangeImages(e, category.id, categoryParent)
                    }
                    className="hidden"
                    type="file"
                    ref={imageUpload}
                  />
                </div>
              )}
            </div>
            <div className="pl-3 border-l flex flex-col justify-between w-full">
              <div className="font-bold text-sm">
                <input
                  type="text"
                  value={category.display_name}
                  name="display_name"
                  className={`${editing === category.id && 'border-b-2'
                    } bg-white`}
                  disabled={!editing || editing !== category.id}
                  onChange={(e) =>
                    editSubCategory(e, category.id, categoryParent)
                  }
                />
              </div>
              <div className="flex text-sm">
                <span>Material Index : </span>
                <input
                  type="number"
                  value={category.subcategory_material_id}
                  name="subcategory_material_id"
                  className={`${editing === category.id && 'border-b-2'
                    } bg-white`}
                  disabled={!editing || editing !== category.id}
                  onChange={(e) =>
                    editSubCategory(e, category.id, categoryParent)
                  }
                />
              </div>
              <div className="flex justify-start w-full">
                <div
                  className={`${changed.includes(category.id)
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-200'
                    } text-xs  rounded-lg text-white font-semibold w-fit px-3 py-1 mr-3 cursor-pointer`}
                  onClick={() =>
                    changed.includes(category.id) &&
                    updateSubCategory(category, categoryParent)
                  }>
                  Update
                </div>
                <div
                  className="text-xs bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold w-fit px-3 py-1 mr-3 cursor-pointer"
                  onClick={() =>
                    deleteSubCategory(category)
                  }>
                  Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <FormAddSubCategory categoryParent={categoryParent} setAllCategories={setAllCategories}/>
    </>
  );
}

const FormAddSubCategory = ({categoryParent,setAllCategories}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [inputs, setInputs] = useState({
    idmaincategory : categoryParent,
    image : "",
    display_name : "",
    subcategory_material_id : "",
  })
  const imageUpload = useRef(null)
  const [showModalAddSubcategory, setShowModalAddSubcategory] = useState(false)
  const resetForm = () => {setInputs({
    idmaincategory : categoryParent,
    image : "",
    display_name : "",
    subcategory_material_id : "",
  })}
  const handleChangeImages = (e) => {
    const imageInput = e.target.files[0];
    handleUploadImages(imageInput);
  };
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
      setInputs({...inputs, "image" : data?.file});
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
  
  const handleSubmit = async () => {
    setIsLoading(true);

    const newPayload = await handleBigIntPayload({
      ...inputs,
      subcategory_material_id : Number(inputs.subcategory_material_id)
    });
    const response = await submit_new_subcategory(newPayload);
    if (response.status === 200) {
      swal('Success', `Successfuly add subcategory`, 'success');
      resetForm()
      const resultText = await response.text();
      const resultResponse = handleBigIntResponse(resultText);
      setAllCategories(resultResponse.data)
      setShowModalAddSubcategory(false)
    }
    setIsLoading(false);
  }
  
  return (
    <div className='my-3'>
      {
          showModalAddSubcategory && (
            <form>
              <div className="py-3 relative">
                <div className="flex ">
                  <div className="w-20 shrink-0 h-20 relative mr-1">
                    <img
                      src={inputs.image || "/no-image.png"}
                      alt=""
                      className="w-full object-contain"
                    />
                    <div
                        className="absolute text-xs bottom-4 w-full text-center font-semibold cursor-pointer hover:font-bold"
                        style={{
                          textShadow:
                            '1px 1px 0px white, -1px -1px 0 white, -1px 1px 0 white, 1px -1px 0 white',
                        }}
                        onClick={() => imageUpload.current.click()}>
                          <div className="w-20 shrink-0 h-20"></div>
                        Upload image
                        <input
                          name={`image`}
                          onChange={(e) =>
                            handleChangeImages(e)
                          }
                          className="hidden"
                          type="file"
                          accept='image/*'
                          ref={imageUpload}
                        />
                    </div>
                  </div>
                  <div className="pl-3 border-l flex flex-col w-full ">
                    <div className="font-bold text-sm">
                      <span>Display Name : </span>
                      <input
                        type="text"
                        value={inputs.display_name}
                        name="display_name"
                        className={'border p-2 rounded bg-white'}
                        onChange={(e) => setInputs({...inputs,[e.target.name] : e.target.value})}
                      />
                    </div>
                    <div className="font-bold text-sm mt-2">
                      <span>Material Index : </span>
                      <input
                        type="number"
                        value={inputs.subcategory_material_id}
                        name="subcategory_material_id"
                        className={'border p-2 rounded bg-white'}
                        onChange={(e) => setInputs({...inputs,[e.target.name] : e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )
        }
        {
          showModalAddSubcategory ? (<div className='mt-2 flex'>
            
              <button className='px-4 py-1 bg-blue-500 text-white rounded-md hover:shadow '
                onClick={e => {setShowModalAddSubcategory(v => !v); resetForm()}}
              >Cancel</button>
              <button className='px-4 py-1 ml-2 bg-blue-500 text-white rounded-md hover:shadow '
                onClick={e => handleSubmit(v => !v)}
              >Submit</button>
          </div>
          ) : (
            <button className='px-4 py-1 bg-blue-500 text-white rounded-md hover:shadow '
              onClick={e => { setShowModalAddSubcategory(v => !v); }}
            >Add Subcategory</button>
          )
        }
        
      </div>
  )
}