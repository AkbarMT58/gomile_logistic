import { useEffect, useRef, useState } from 'react';
import styles from '../Modals.module.css';
import SubCategory from '../../Cms/CategoriesForm/SubCategory';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import { submit_new_category } from 'service/api';
import { handleBigIntResponse } from 'helpers/handleBigInt';

const ModalAddCategory = ({
  closeModal,
  notify,
  setShowModalAddCategory,
  setAllCategories,
}) => {
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [newCategoryPayload, setNewCategoryPayload] = useState({
    display_name: '',
    image: '',
    child: [],
  });
  const [clickedSubCategory, setClickedSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageUploadCategory = useRef(null);
  const imageUploadSubCategory = useRef([]);

  const editCategoryName = (value) => {
    setNewCategoryPayload((prevCat) => {
      return { ...prevCat, display_name: value };
    });
  };

  const editSubCategoryName = (value, id) => {
    let currentChild = [...newCategoryPayload.child];

    currentChild.map((cat) => {
      if (cat.id == id) {
        cat.display_name = value;
      }
    });

    setNewCategoryPayload((prevCat) => {
      return { ...prevCat, child: currentChild };
    });
  };

  const addSubCategory = () => {
    setShowSubCategory(true);
    let currentChild = [...newCategoryPayload.child];

    currentChild.push({
      id:
        currentChild.length == 0
          ? 0
          : currentChild[currentChild.length - 1].id + 1,
      display_name: '',
      image: '',
    });

    setNewCategoryPayload((prevCat) => {
      return { ...prevCat, child: currentChild };
    });
  };

  const removeSubCategory = (idx) => {
    let currentChild = [...newCategoryPayload.child];
    currentChild.splice(idx, 1);
    setNewCategoryPayload((prevCat) => {
      return { ...prevCat, child: currentChild };
    });
  };

  const handleChangeImages = async (event, id) => {
    let formData = new FormData();
    formData.append('gambar', event.target.files[0]);
    const response = await fetch(
      `${process.env.REACT_APP_URL_API_IMAGE_UPLOAD2}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    if (data?.status === 200) {
      if (id) {
        changeImageSubCategory(data, id);
      } else {
        changeImageCategory(data);
      }
    } else {
      swal('Oops', `Images ${data.message}`, 'error');
    }
  };

  const changeImageCategory = (data, id) => {
    setNewCategoryPayload((prev) => {
      return {
        ...prev,
        image: data?.file,
      };
    });
  };

  const changeImageSubCategory = (data, id) => {
    let currentChild = [...newCategoryPayload.child];

    currentChild.map((cat) => {
      if (cat.id == id) {
        cat.image = data?.file;
      }
    });

    setNewCategoryPayload((prevCat) => {
      return { ...prevCat, child: currentChild };
    });
  };

  const submitCategory = async () => {
    setLoading(true);
    const response = await submit_new_category(
      JSON.stringify(newCategoryPayload)
    );
    if (response.status === 200) {
      setShowModalAddCategory(false);
      const resultText = await response.text();
      const resultResponse = handleBigIntResponse(resultText);
      setAllCategories(resultResponse.data);
      notify('success', 'Successfully add new category');
    }
    setLoading(false);
  };


  return (
    <div className={`${styles.modalWrapper}`}>
      <div className={`${styles.backDrop}`} onClick={() => closeModal()}></div>
      <div className={`${styles.modalBody} p-3 px-md-5`}>
        <div
          className={`${styles.closeText} text-bold`}
          onClick={() => closeModal()}>
          close
        </div>
        <div className={`${styles.modalTitle}`}>
          <h5 className="m-0">Add Category</h5>

          <hr className="my-3" />

          <div className="flex pb-3">
            <div
              className={`${
                !newCategoryPayload.image && 'bg-gray-100'
              } w-40 shrink-0 h-40 relative mr-1`}>
              <img
                src={newCategoryPayload.image || '/images/img-placeholder.png'}
                alt=""
                className="w-full object-contain"
              />

              <label
                className={`${styles.inputFileLabel} absolute w-full h-full flex justify-center items-center cursor-pointer text-xs`}
                style={{
                  textShadow:
                    '1px 1px 0px white, -1px -1px 0 white, -1px 1px 0 white, 1px -1px 0 white',
                }}
                onClick={() => imageUploadCategory.current.click()}>
                {newCategoryPayload.image ? 'Change Image' : 'Add Image'}
              </label>
              <input
                name="input-category"
                onChange={(e) => handleChangeImages(e)}
                className="hidden"
                type="file"
                ref={imageUploadCategory}
              />
            </div>
            <div className="pl-3 flex flex-col justify-between w-full">
              <input
                type="text"
                value={newCategoryPayload.display_name}
                placeholder="Insert category name"
                className={`border-b-2 bg-white w-1/2 px-2`}
                onChange={(e) => editCategoryName(e.target.value)}
              />
              {newCategoryPayload.child.length == 0 && (
                <div
                  className="text-sm cursor-pointer hover:text-blue-700 w-fit"
                  onClick={() => addSubCategory()}>
                  Add Sub-Cagetory
                </div>
              )}
            </div>
          </div>

          {showSubCategory && newCategoryPayload.child.length !== 0 && (
            <div className="flex ">
              <div className="w-40 shrink-0 pt-3 border-t mr-1 text-sm text-right text-blue-500 font-semibold">
                Sub Category :
              </div>
              <div className="pl-3 pt-3 pb-5 border-t border-b border-l flex flex-col justify-between w-full max-h-80 overflow-auto">
                {newCategoryPayload.child.map((subCat, idx) => (
                  <div key={idx} className="flex pb-3 border-b mb-3 relative">
                    <div
                      className="absolute top-0 right-0"
                      onClick={() => removeSubCategory(idx)}>
                      <CloseIcon />
                    </div>

                    <div className="w-20 shrink-0 h-20 relative mr-1 bg-gray-100">
                      <img
                        src={subCat.image || '/images/img-placeholder.png'}
                        alt=""
                        className="w-full object-contain"
                      />

                      <label
                        className={`${styles.inputFileLabel} absolute w-full h-full flex justify-center items-center text-xs`}
                        style={{
                          textShadow:
                            '1px 1px 0px white, -1px -1px 0 white, -1px 1px 0 white, 1px -1px 0 white',
                        }}
                        onClick={() =>
                          imageUploadSubCategory.current[idx].click()
                        }>
                        {subCat.image ? 'Change Image' : 'Add Image'}
                      </label>
                      <input
                        name={`input-${subCat.id}`}
                        onChange={(e) =>
                          handleChangeImages(e, subCat.id.toString())
                        }
                        className="hidden"
                        type="file"
                        ref={(el) => (imageUploadSubCategory.current[idx] = el)}
                      />
                    </div>
                    <div className="pl-3 flex flex-col justify-between w-full">
                      <input
                        type="text"
                        value={subCat.display_name}
                        placeholder="Insert category name"
                        className={`border-b-2 bg-white w-1/2 px-2`}
                        onChange={(e) =>
                          editSubCategoryName(e.target.value, subCat.id)
                        }
                      />
                    </div>
                  </div>
                ))}

                <div
                  className="text-sm cursor-pointer hover:text-blue-700 w-fit mx-auto px-3 py-1 bg-green-600 text-white hover:text-white hover:bg-green-700 rounded-md"
                  onClick={() => addSubCategory()}>
                  Add New Sub-Cagetory
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`${styles.modalFooter}`}>
          <div
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-500 text-sm rounded-md cursor-pointer mr-3"
            onClick={() => closeModal()}>
            Cancel
          </div>
          <div
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md cursor-pointer"
            type="submit"
            onClick={submitCategory}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCategory;
