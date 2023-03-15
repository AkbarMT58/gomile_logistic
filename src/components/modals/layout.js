import { useEffect, useState } from 'react';
import styles from './Modals.module.css';
// import { InputText } from "../../formik/fields";
// import { Formik } from "formik";
// import * as Yup from "yup";

const ModalAddCategory = ({ children, closeModal }) => {
  const [categoryImage, setCategoryImage] = useState('/images/img-01.png');

  return (
    <div className={`${styles.modalWrapper}`}>
      <div className={`${styles.backDrop}`} onClick={() => closeModal()}></div>
      <div className={`${styles.modalBody} p-3 px-md-5`}>
        <div
          className={`${styles.closeText} fw-bold theme-secondary-color`}
          onClick={() => closeModal()}>
          close
        </div>
        <div className={`${styles.modalTitle}`}>
          <h5 className="m-0">Add Category</h5>
        </div>
        {Children}
      </div>
    </div>
  );
};

export default ModalAddCategory;
