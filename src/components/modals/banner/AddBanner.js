import { useEffect, useRef, useState } from 'react';
import styles from '../Modals.module.css';
import swal from 'sweetalert';

const ModalAddBanner = ({ closeModal, submitBanner, loading }) => {
  const [newBanner, setNewBanner] = useState({
    alt: '',
    link: '',
    image: '',
  });
  const [changed, setChanged] = useState(false);

  const imageUpload = useRef(null);

  useEffect(() => {
    if (
      newBanner.alt !== '' &&
      newBanner.link !== '' &&
      newBanner.image !== ''
    ) {
      setChanged(true);
    }
  }, [newBanner]);

  const editValue = (value, attr) => {
    setNewBanner((prevBann) => {
      return { ...prevBann, [attr]: value };
    });
  };

  const handleChangeImages = async (event) => {
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
      setNewBanner((prev) => {
        return { ...prev, image: data?.file };
      });
    } else {
      swal('Oops', `Images ${data.message}`, 'error');
    }
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
          <h5 className="m-0">Add Banner</h5>

          <hr className="my-3" />

          <div className="flex pb-3">
            <div className="w-40 shrink-0 h-40 relative mr-1 border rounded-lg">
              <img
                src={newBanner.image || '/default_image.png'}
                alt=""
                className={`${newBanner.image ? 'object-contain' : 'object-cover'} w-full h-full `}
              />
              <div
                className="absolute text-xs bottom-4 w-full text-center font-semibold cursor-pointer hover:font-bold"
                style={{
                  textShadow:
                    '1px 1px 0px white, -1px -1px 0 white, -1px 1px 0 white, 1px -1px 0 white',
                }}
                onClick={() => imageUpload.current.click()}>
                Add image
                <input
                  name={`input-${newBanner.id}`}
                  onChange={(e) => handleChangeImages(e)}
                  className="hidden"
                  type="file"
                  ref={imageUpload}
                />
              </div>
            </div>
            <div className="pl-3 flex flex-col justify-between w-full">
              <div>
                <div className="flex items-end mb-2">
                  <label
                    htmlFor="banner-alt"
                    className="mr-3 font-semibold w-10">
                    Alt :
                  </label>
                  <input
                    name="banner-alt"
                    type="text"
                    value={newBanner.alt}
                    className={`border-b-2 bg-white w-2/3`}
                    onChange={(e) => editValue(e.target.value, 'alt')}
                  />
                </div>
                <div className="flex items-end">
                  <label
                    htmlFor="banner-link"
                    className="mr-3 font-semibold w-10">
                    Link :
                  </label>
                  <input
                    name="banner-link"
                    type="text"
                    value={newBanner.link}
                    className={`border-b-2 bg-white w-2/3`}
                    onChange={(e) => editValue(e.target.value, 'link')}
                  />
                </div>
              </div>

              <div className="flex justify-end w-full">
                <div
                  className={`${
                    changed &&
                    !loading &&
                    newBanner.alt !== '' &&
                    newBanner.link !== '' &&
                    newBanner.image !== ''
                      ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                      : 'bg-gray-200'
                  } text-sm rounded-lg text-white font-semibold w-fit px-3 py-1 mr-3`}
                  onClick={() => {
                    if (
                      changed &&
                      !loading &&
                      newBanner.alt !== '' &&
                      newBanner.link !== '' &&
                      newBanner.image !== ''
                    ) {
                      submitBanner(newBanner);
                    }
                  }}>
                  Submit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddBanner;
