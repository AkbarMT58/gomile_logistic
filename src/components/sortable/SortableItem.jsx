import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // minHeight: 200,
  };

  return (
    <div ref={setNodeRef} style={style} className="py-3 border-b relative pl-8">
      <div
        {...listeners}
        {...attributes}
        className="absolute top-0 left-0 h-full hover:bg-gray-600 text-gray-300 hover:text-white transition duration-500 w-6 flex flex-col justify-center items-center">
        <KeyboardArrowUpIcon />
        <DragIndicatorIcon />
        <KeyboardArrowDownIcon />
      </div>
      <div
        className="absolute top-2 right-2"
        onClick={() => props.set_Editing(props.banner.id)}>
        {props.editing == props.banner.id ? <CloseIcon /> : <EditTwoToneIcon />}
      </div>
      <div className="flex pb-3">
        <div className="flex w-40 shrink-0 h-32 relative border border-gray-200 rounded-md mr-2">
          <img
            src={props.banner.image}
            alt=""
            className="w-full object-contain"
          />
          {props.editing == props.banner.id && (
            <div
              className="absolute text-xs bottom-4 w-full text-center font-semibold cursor-pointer hover:font-bold"
              style={{
                textShadow:
                  '1px 1px 0px white, -1px -1px 0 white, -1px 1px 0 white, 1px -1px 0 white',
              }}
              onClick={() => props.imageUpload.current.click()}>
              Change image
              <input
                name={`input-${props.banner.id}`}
                onChange={(e) => props.handleChangeImages(e, props.banner.id)}
                className="hidden"
                type="file"
                ref={props.imageUpload}
              />
            </div>
          )}
        </div>
        <div className="pl-3 border-l flex flex-col justify-between w-full">
          <div>
            <div className="flex items-end mb-2">
              <label htmlFor="banner-alt" className="mr-3 font-semibold w-10">
                Alt :
              </label>
              <input
                name="banner-alt"
                type="text"
                value={props.banner.alt}
                className={`${
                  props.editing == props.banner.id && 'border-b-2'
                } bg-white w-2/3`}
                disabled={!props.editing || props.editing !== props.banner.id}
                onChange={(e) => props.editBanner(e, props.banner.id, 'alt')}
              />
            </div>
            <div className="flex items-end">
              <label htmlFor="banner-link" className="mr-3 font-semibold w-10">
                Link :
              </label>
              <input
                name="banner-link"
                type="text"
                value={props.banner.link}
                className={`${
                  props.editing == props.banner.id && 'border-b-2'
                } bg-white w-2/3`}
                disabled={!props.editing || props.editing !== props.banner.id}
                onChange={(e) => props.editBanner(e, props.banner.id, 'link')}
              />
            </div>
          </div>

          <div className="flex justify-end w-full">
            <div
              className={`${
                props.changed.includes(props.banner.id)
                  ? 'bg-orange-600 hover:bg-orange-700 cursor-pointer'
                  : 'bg-gray-200'
              } text-sm  rounded-lg text-white font-semibold w-fit px-3 py-1 mr-3`}
              onClick={() => {
                if (props.changed.includes(props.banner.id)) {
                  props.updateBanner(props.banner);
                }
              }}>
              Update
            </div>
            {props.banner.child?.length !== 0 && (
              <div
                className="text-sm bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold w-fit px-3 py-1 mr-3 cursor-pointer"
                onClick={() => props.confirmDeleteBanner(props.banner)}>
                Delete
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
