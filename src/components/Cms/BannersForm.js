import { useEffect, useRef, useState } from 'react';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import ModalAddBanner from '../modals/banner/AddBanner';
import ModalConfirmDelete from '../modals/ModalConfirmDelete';
import {
  add_banner,
  bulk_update_banner,
  remove_banner,
  update_banner,
} from 'service/api';

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

import { SortableItem } from '../sortable/SortableItem';
import swal from 'sweetalert';

export default function BannersForm({ banners, getAllBanners }) {
  const [allBanners, setAllBanners] = useState();
  const [editing, setEditing] = useState(null);
  const [showModalAddBanner, setShowModalAddBanner] = useState(false);
  const [changed, setChanged] = useState([]);
  const [showModalConfirmDeleteBanner, setShowModalConfirmDelete] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [PositionChanged, setPositionChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const imageUpload = useRef(null);

  useEffect(() => {
    if(banners) {
      setAllBanners(banners)
    }
  }, [banners])

  const editBanner = (e, id, attr) => {
    const newBanner = [...allBanners];
    newBanner.map((banner) => {
      if (banner.id == id) {
        banner[attr] = e.target.value;

        setChanged([...new Set([...changed, id])]);
      }
      return banner;
    });
    setAllBanners(newBanner);
  };

  const set_Editing = (id) => {
    setEditing((prev) => (!prev ? id : prev == id ? null : id));
  };

  const set_ShowModalAddBanner = () => {
    setShowModalAddBanner(true);
  };

  const updateBanner = async (banner) => {
    setLoading(true);
    const payload = {
      id: banner.id,
      image: banner.image,
      alt: banner.alt,
      link: banner.link,
      types: banner.types,
    };

    const response = await update_banner(JSON.stringify(payload));
    if (response.status === 200) {
      const newBanner = [...allBanners];
      newBanner.map((newBann) => {
        if (newBann.id == banner.id) {
          setChanged((prevChanged) =>
            prevChanged.filter((chgd) => chgd !== banner.id)
          );
          setEditing(null);
        }
        return newBann;
      });
      setAllBanners(newBanner);
    }
    setLoading(false);
  };

  const deleteBanner = async () => {
    setLoading(true);

    const response = await remove_banner(selectedBanner.id);
    if (response.status === 200) {
    setAllBanners(
      allBanners.filter((banner) => banner.id !== selectedBanner.id)
    );
    notify('success', 'Banner has been deleted');
    setShowModalConfirmDelete(false);
    }
    setLoading(false);
  };

  const confirmDeleteBanner = (banner) => {
    setSelectedBanner(banner);
    setShowModalConfirmDelete(true);
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
      const newBanners = [...allBanners];
      newBanners.map((banner) => {
        if (banner.id == id) {
          banner.image = data?.file;

          setChanged([...new Set([...changed, id])]);
        }
        return banner;
      });
      setAllBanners(newBanners);
    } else {
      swal('Oops', `Images ${data.message}`, 'error');
    }
  };

  const submitBanner = async (newBanner) => {
    setLoading(true);
    const payload = {
      image: newBanner.image,
      alt: newBanner.alt,
      link: newBanner.link,
    };

    const response = await add_banner(JSON.stringify(payload));
    if (response.status === 200) {
      setShowModalAddBanner(false);
      notify('success', 'Banner added successfully');
    }
    setLoading(false);
    getAllBanners()
  };

  // DRAGGABLE FUNCTIONS
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  function handleDragStart(event) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setAllBanners((items) => {
        const oldIndex = items.map((i) => {
            return i.id;
          }).indexOf(active.id);
        const newIndex = items.map((i) => {
            return i.id;
          }).indexOf(over.id);

        setPositionChanged(true);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  const changePosition = async () => {
    setLoading(true);
    const payload = [...allBanners];

    const response = await bulk_update_banner(JSON.stringify(payload));
    if (response.status === 200) {
      setPositionChanged(false);
      notify('success', 'Successfully updated');
    }
    setLoading(false);
  };

  const notify = (status, message) => {
    swal(status, message, status)
  };

  if(!allBanners) {
    return null
  }

  return (
    <div>
      <h1 className="text-xl font-bold mt-5 mb-8">BANNERS</h1>
      <div className='flex'>
        <div
          className="bg-green-600 rounded-lg text-white font-semibold w-fit px-3 py-1 ml-auto mb-3 cursor-pointer"
          onClick={() => set_ShowModalAddBanner()}>
          Add Banner
        </div>
      </div>

      <div className="category-wrapper bg-white rounded-lg p-2 drop-shadow-md">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}>
          <SortableContext
            items={allBanners}
            strategy={verticalListSortingStrategy}>
            {allBanners?.map((banner, idx) => (
              <SortableItem
                key={banner.id}
                id={banner.id}
                banner={banner}
                handle={true}
                value={banner.id}
                editing={editing}
                set_Editing={set_Editing}
                imageUpload={imageUpload}
                handleChangeImages={handleChangeImages}
                editBanner={editBanner}
                changed={changed}
                confirmDeleteBanner={confirmDeleteBanner}
                updateBanner={updateBanner}
              />
            ))}
          </SortableContext>
        </DndContext>
        
        {PositionChanged && (
          <div
            className="w-1/2 text-center rounded-lg mx-auto mt-3 px-4 py-2 bg-green-600 text-white cursor-pointer"
            onClick={changePosition}>
            {loading ? 'Loading...' : 'Submit Position Changes'}
          </div>
        )}
      </div>


      {/* MODAL ADD CATEGORY */}
      {showModalAddBanner && (
        <ModalAddBanner
          closeModal={() => setShowModalAddBanner(false)}
          submitBanner={submitBanner}
        />
      )}

      {/* MODAL CONFIRM DELETE */}
      {showModalConfirmDeleteBanner && (
        <ModalConfirmDelete
          closeModal={() => setShowModalConfirmDelete(false)}
          selected={selectedBanner.alt}
          action={deleteBanner}
          title="Banner"
        />
      )}
    </div>
  );
}
