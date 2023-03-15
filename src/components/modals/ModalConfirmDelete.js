import styles from "./Modals.module.css";

const ModalConfirmDelete = ({ selected, action, closeModal, title }) => {

  return (
    <div className={`${styles.modalWrapper}`}>
      <div className={`${styles.backDrop}`} onClick={() => closeModal()}></div>
      <div className={`${styles.modalBody} p-3 px-md-5`}>
        {/* <div
          className={`${styles.closeText} text-bold`}
          onClick={() => closeModal()}
        >
          close
        </div> */}
        <div className={`${styles.modalTitle}`}>
          <h5 className="m-0">Delete {title}</h5>

          <hr className="my-3" />
          <p>
            Are you sure want to remove <span className="font-bold">{`"${selected}"`}</span>?
          </p>
        </div>

        <div className={`${styles.modalFooter}`}>
          <div
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-500 text-sm rounded-md cursor-pointer mr-3"
            onClick={() => closeModal()}
          >
            Cancel
          </div>
          <div
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md cursor-pointer"
            type="submit"
            onClick={action}
          >
            Yes
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmDelete;
