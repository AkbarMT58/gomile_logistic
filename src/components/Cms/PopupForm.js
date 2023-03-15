import { useRef, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { update_popup } from '../../service/api';
import swal from 'sweetalert';
// import 'react-toastify/dist/ReactToastify.css';

export default function PopupForm({ popup }) {
  const [popUp, setPopUp] = useState(popup);
  const [editing, setEditing] = useState(null);
  const [changed, setChanged] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageUpload = useRef(null);

  const editValue = (value, attr) => {
    setPopUp((prev) => {
      setChanged(true);
      return { ...prev, [attr]: value };
    });
  };

  const updatePopup = async () => {
    setLoading(true);
    const payload = {
      id: popUp.id,
      image: popUp.image,
      alt: popUp.alt,
      link: popUp.link,
      // types: popUp.types
    };

    const response = await update_popup(JSON.stringify(payload));
    if (response.status === 200) {
    setChanged(false);
    setEditing(null);
    notify('success', 'Successfully update popup banner');
    }
    setLoading(false);
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
      setPopUp((prev) => {
        setChanged(true);
        return { ...prev, image: data?.file };
      });
    } else {
      swal('Oops', `Images ${data.message}`, 'error');
    }
  };

  const notify = (status, message) => {
    swal(status, message, status)
  };

  return (
    <>
      <div>
        <h1 className="text-xl font-bold mt-5 mb-8">POPUP BANNER</h1>

        <div className="category-wrapper bg-white rounded-lg p-2 drop-shadow-md">
          <div className="py-3 relative">
            <div
              className="absolute top-0 right-0"
              onClick={() => setEditing(!editing)}>
              {editing ? <CloseIcon /> : <EditTwoToneIcon />}
            </div>
            <div className="flex">
              <div className="w-40 shrink-0 h-32 relative mr-1">
                <img
                  src={popUp.image || '/images/img-placeholder.png'}
                  alt=""
                  className="w-full object-contain max-h-full"
                />
                {editing && (
                  <div
                    className="absolute text-xs bottom-4 w-full text-center font-semibold cursor-pointer hover:font-bold"
                    style={{
                      textShadow:
                        '1px 1px 0px white, -1px -1px 0 white, -1px 1px 0 white, 1px -1px 0 white',
                    }}
                    onClick={() => imageUpload.current.click()}>
                    Change image
                    <input
                      name={`input-popup`}
                      onChange={(e) => handleChangeImages(e)}
                      className="hidden"
                      type="file"
                      ref={imageUpload}
                    />
                  </div>
                )}
              </div>
              <div className="pl-3 border-l flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-end mb-2">
                    <label
                      htmlFor="popup-alt"
                      className="mr-3 font-semibold w-10">
                      Alt :
                    </label>
                    <input
                      name="popup-alt"
                      type="text"
                      value={popUp.alt}
                      className={`${editing && 'border-b-2'} bg-white w-2/3`}
                      disabled={!editing}
                      onChange={(e) => editValue(e.target.value, 'alt')}
                    />
                  </div>
                  <div className="flex items-end">
                    <label
                      htmlFor="popup-link"
                      className="mr-3 font-semibold w-10">
                      Link :
                    </label>
                    <input
                      name="popup-link"
                      type="text"
                      value={popUp.link}
                      className={`${editing && 'border-b-2'} bg-white w-2/3`}
                      disabled={!editing}
                      onChange={(e) => editValue(e.target.value, 'link')}
                    />
                  </div>
                </div>

                <div className="flex justify-end w-full">
                  <div
                    className={`${
                      changed && !loading
                        ? 'bg-orange-600 hover:bg-orange-700 cursor-pointer'
                        : 'bg-gray-200'
                    } text-sm rounded-lg text-white font-semibold w-fit px-3 py-1 mr-3`}
                    onClick={() => {
                      if (changed && !loading) {
                        updatePopup();
                      }
                    }}>
                    Update
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
