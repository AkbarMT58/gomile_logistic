import { useRef, useState } from 'react';
import SubCategory from './SubCategory';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import ModalAddCategory from 'components/modals/category/AddCategory';
import ModalConfirmDelete from 'components/modals/ModalConfirmDelete';
import { handleBigIntPayload } from 'helpers/handleBigInt';
import swal from 'sweetalert';
import {
  delete_category,
  delete_sub_category,
  // submit_new_category,
  update_category,
  update_sub_category,
} from 'service/api';
import { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import '/node_modules/react-toastify/dist/ReactToastify.css';

export default function CategoriesForm({ categories, updateData }) {
  const [allCategories, setAllCategories] = useState();
  const [showSubCategory, setShowSubCategory] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showModalAddCategory, setShowModalAddCategory] = useState(false);
  const [changed, setChanged] = useState([]);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryParent, setSelectedCategoryParent] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageUpload = useRef(null);

  const set_ShowSubCategory = (id) => {
    setShowSubCategory((prev) => (!prev ? id : prev == id ? null : id));
  };

  const set_Editing = (id) => {
    setEditing((prev) => (!prev ? id : prev == id ? null : id));
  };

  const editCategory = (e, id) => {
    const newCategory = [...allCategories];
    newCategory.map((category) => {
      if (category.id == id) {
        category.display_name = e.target.value;

        setChanged([...new Set([...changed, id])]);
      }
      return category;
    });
    setAllCategories(newCategory);
  };

  const editSubCategory = (e, id, categoryParent) => {
    const newCategory = [...allCategories];
    newCategory.map((category) => {
      if (category.id == categoryParent) {
        category.child.map((cat) => {
          if (cat.id == id) {
            const { value, name } = e.target
            cat[name] = value;

            setChanged([...new Set([...changed, id])]);
          }
        });
      }
      return category;
    });
    setAllCategories(newCategory);
  };

  const updateCategory = async (category) => {
    setLoading(true);
    const payload = {
      id: category.id,
      display_name: category.display_name,
      image: category.image,
    };

    const newPayload = await handleBigIntPayload(payload);
    const response = await update_category(newPayload);
    if (response.status === 201) {
      const newCategory = [...allCategories];
      await newCategory.map((newCat) => {
        if (newCat.id == category.id) {
          setChanged((prevChanged) =>
            prevChanged.filter((chgd) => chgd !== category.id)
          );
          setEditing(null);
        }
        return newCat;
      });
      setAllCategories(newCategory);
      notify('success', 'Successfully update category');
    }
    setLoading(false);
  };

  const updateSubCategory = async (category, categoryParent) => {
    setLoading(true);
    const payload = {
      id: category.id,
      idmaincategory: categoryParent,
      display_name: category.display_name,
      subcategory_material_id: Number(category.subcategory_material_id),
      image: category.image,
    };

    const newPayload = await handleBigIntPayload(payload);
    const response = await update_sub_category(newPayload);
    if (response.status === 201) {
      const newCategory = [...allCategories];
      newCategory.map((newCat) => {
        if (newCat.id == categoryParent) {
          newCat.child.map((cat) => {
            if (cat.id == category.id) {
              setChanged((prevChanged) =>
                prevChanged.filter((chgd) => chgd !== category.id)
              );
              setEditing(null);
            }
          });
        }
        return category;
      });
      setAllCategories(newCategory);
      notify('success', 'Successfully update category');
    }
    setLoading(false);
  };

  const set_ShowModalAddCategory = () => {
    setShowModalAddCategory(true);
  };

  const handleChangeImages = async (event, id, categoryParent) => {
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
      if (categoryParent) {
        changeImageSubCategory(data, id, categoryParent);
      } else {
        changeImageCategory(data, id);
      }
    } else {
      swal('Oops', `Images ${data.message}`, 'error');
    }
  };

  const changeImageCategory = (data, id) => {
    const newCategory = [...allCategories];
    newCategory.map((category) => {
      if (category.id == id) {
        category.image = data?.file;

        setChanged([...new Set([...changed, id])]);
      }
      return category;
    });
    setAllCategories(newCategory);
  };

  const changeImageSubCategory = (data, id, categoryParent) => {
    const newCategory = [...allCategories];
    newCategory.map((category) => {
      if (category.id == categoryParent) {
        category.child.map((cat) => {
          if (cat.id == id) {
            cat.image = data?.file;

            setChanged([...new Set([...changed, id])]);
          }
        });
      }
      return category;
    });
    setAllCategories(newCategory);
  };

  const confirmDeleteCategory = (category, categoryParent) => {
    if (categoryParent) {
      setSelectedCategoryParent(categoryParent);
    }
    setSelectedCategory(category);
    setShowModalConfirmDelete(true);
  };

  const deleteCategory = async (id) => {
    swal("Are you sure you want to do this?", {
      buttons: ["No!", "Yes!"],
    }).then(async (confirm) => {
      if (confirm) {
        setLoading(true);
        const response = await delete_category(id);
        if (response.status === 200) {
          setAllCategories(allCategories.filter((category) => category.id !== id));
          setShowModalConfirmDelete(false);
        }
        setLoading(false);
      }
    });
  };

  const deleteSubCategory = async (category) => {
    swal("Are you sure you want to do this?", {
      buttons: ["No!", "Yes!"],
    }).then(async (confirm) => {
      if (confirm) {
        setLoading(true);
        const response = await delete_sub_category(category.id);
        if (response.status === 200) {
          const newCategory = allCategories.map((newCat) => {
            if (newCat.id == category.idmaincategory) {
              newCat.child = newCat.child.filter((cat) => {
                return cat.id != category.id
              });
            }
            return newCat;
          });
          setAllCategories(newCategory);
          setShowModalConfirmDelete(false);
          setSelectedCategoryParent(null);
        }
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    setAllCategories(categories)
  }, [categories])
  

  const notify = (status, message) => {
    alert(message)
    // toast[status](message);
  };

  if (!allCategories) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mt-5 mb-8">CATEGORIES</h1>
      <div className="flex">
        <div
          className="bg-green-600 rounded-lg text-white font-semibold px-3 py-1 w-fit ml-auto mb-3 cursor-pointer"
          onClick={() => set_ShowModalAddCategory()}>
          Add Category
        </div>
      </div>

      <div className="category-wrapper bg-white rounded-lg p-2 drop-shadow-md">
        {allCategories?.map((category, idx) => (
          <div key={category.id} className="py-3 border-b relative">
            <div
              className="absolute top-0 right-0"
              onClick={() => set_Editing(category.id)}>
              {editing === category.id ? <CloseIcon /> : <EditTwoToneIcon />}
            </div>
            <div className="flex pb-3">
              <div className="w-40 shrink-0 h-40 relative mr-1">
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
                      onChange={(e) => handleChangeImages(e, category.id)}
                      className="hidden"
                      type="file"
                      ref={imageUpload}
                    />
                  </div>
                )}
              </div>
              <div className="pl-3 border-l flex flex-col justify-between w-full">
                <div className="font-bold text-lg">
                  <input
                    type="text"
                    value={category.display_name}
                    className={`${editing == category.id && 'border-b-2'
                      } bg-white w-2/3`}
                    disabled={!editing || editing !== category.id}
                    onChange={(e) => editCategory(e, category.id)}
                  />
                </div>
                <div className="flex justify-between items-end w-full">
                  <div
                    className="text-md cursor-pointer hover:text-blue-700"
                    onClick={() => set_ShowSubCategory(category.id)}>
                    {
                      showSubCategory == category.id
                        ? 'Close sub-category'
                        : 'View sub-category'
                    }
                  </div>

                  <div className="flex">
                    <div
                      className={`${changed.includes(category.id)
                        ? 'bg-yellow-600 hover:bg-yellow-700'
                        : 'bg-gray-200'
                        } text-sm  rounded-lg text-white font-semibold w-fit px-3 py-1 mr-3 cursor-pointer`}
                      onClick={() => {
                        if (changed.includes(category.id)) {
                          updateCategory(category);
                        }
                      }}>
                      Update
                    </div>
                    {(category.child?.length == 0 || category.child == null) && (
                      <div
                        className="text-sm bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold w-fit px-3 py-1 mr-3 cursor-pointer"
                        onClick={() => deleteCategory(category.id)}>
                        Delete
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {showSubCategory == category.id  && (
              <div key={category.id} className="flex ">
                <div className="w-40 shrink-0 pt-3 border-t mr-1 text-sm text-right text-blue-500 font-semibold">
                  Sub Category :
                </div>
                <div className="pl-3 pt-3 border-t border-b border-l flex flex-col justify-between w-full max-h-96 overflow-auto">
                  <SubCategory
                    subCategory={category.child}
                    editing={editing}
                    set_Editing={set_Editing}
                    editSubCategory={editSubCategory}
                    updateSubCategory={updateSubCategory}
                    categoryParent={category.id}
                    changed={changed}
                    handleChangeImages={handleChangeImages}
                    imageUpload={imageUpload}
                    confirmDeleteCategory={confirmDeleteCategory}
                    deleteSubCategory={deleteSubCategory}
                    setAllCategories={setAllCategories}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* NOTIFICATION TOASTER */}
      {/* <ToastContainer /> */}

      {/* MODAL ADD CATEGORY */}
      {showModalAddCategory && (
        <ModalAddCategory
          closeModal={() => setShowModalAddCategory(false)}
          setShowModalAddCategory={setShowModalAddCategory}
          setAllCategories={setAllCategories}
          notify={notify}
        />
      )}
      {showModalConfirmDelete && (
        <ModalConfirmDelete
          closeModal={() => setShowModalConfirmDelete(false)}
          selected={selectedCategory.display_name}
          action={() =>
            selectedCategoryParent ? deleteSubCategory() : deleteCategory()
          }
          title="Category"
        />
      )}
    </div>
  );
}
