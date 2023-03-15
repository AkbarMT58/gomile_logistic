import { useEffect, useRef, useState } from 'react';
import { submitCustomProductVariant } from 'service/api';
import swal from 'sweetalert';

const useModuleCustomVariant = ({ link }) => {
  const imageUpload = useRef(null);
  const imageUploadVariant = useRef([]);
  const [inputs, setInputs] = useState({
    is_box: false,
    link: '',
    minQty: '',
    product: '',
    emailPenerima: '',
    category: '',
    image_product: '',
  });
  const [productVariant, setProductVariant] = useState([
    {
      idVariant: new Date().getTime(),
      variant: '',
      length: 0,
      height: 0,
      width: 0,
      weight: 0,
      price: 0,
      qty: 0,
      src: '',
    },
  ]);
  const [isBolean, setIsBolean] = useState({
    firstModal: false,
    isLoadingImage: false,
    isLoadingSubmit: false,
    isShowImage: false,
    isShowPreSubmit: false,
  });

  const handleOpenModal = (e) => {
    const { name } = e.target;

    setIsBolean({
      ...isBolean,
      [name]: true,
    });
  };

  const handleCloseAllModal = () => {
    setIsBolean({
      ...isBolean,
      firstModal: false,
      isShowImage: false,
    });
    setInputs({
      ...inputs,
      is_box: false,
      minQty: '',
      product: '',
      category: '',
      image_product: '',
    });
    setProductVariant([
      {
        variant: '',
        length: 0,
        height: 0,
        width: 0,
        weight: 0,
        price: 0.0,
        qty: 0,
      },
    ]);
  };

  const handleChange = (e, variantIndex) => {
    const { name } = e.target;

    if (variantIndex === undefined) {
      if (name !== 'category') {
        let replaceValue = e.target.value.replaceAll('-', '');
        e.target.value = replaceValue;
      }
      setInputs({
        ...inputs,
        [name]: e.target.value,
      });
    } else {
      const clonedVariant = [...productVariant];

      if (name === 'price') {
        let parsedPrice = Number(parseFloat(e.target.value));
        clonedVariant[variantIndex]['price'] = parsedPrice;
        setProductVariant(clonedVariant);
        return;
      }

      clonedVariant[variantIndex][name] = e.target.value;
      setProductVariant(clonedVariant);
    }
  };

  const handleChangeMesh = (e) => {
    const { name, value } = e.target;

    const resultMeshChange = productVariant.map((data) => {
      return {
        ...data,
        [name]: name !== 'variant' ? Number(value) : value,
      };
    });

    setProductVariant(resultMeshChange);
  };

  const handleAddVariant = (e) => {
    setProductVariant([
      ...productVariant,
      {
        idVariant: new Date().getTime(),
        variant: '',
        length: 0,
        height: 0,
        width: 0,
        weight: 0,
        price: 0.0,
        qty: 0,
        src: '',
      },
    ]);
  };

  const handleDeleteVariant = (e, variantData) => {
    if (productVariant.length === 1) {
      return;
    }

    const newArry = productVariant.filter(
      (obj) => obj.idVariant !== variantData?.idVariant
    );

    setProductVariant(newArry);
  };

  const handleChangeImages = (e, indexVariant) => {
    const { name } = e.target;
    e.preventDefault();

    if (name === 'input') {
      const imageInput = e.target.files[0];
      handleUploadImages(imageInput);
      return;
    } else {
      const imageInputVariant = e.target.files[0];
      if (imageInputVariant !== undefined) {
        handleUploadImages(imageInputVariant, indexVariant);
      }
    }
  };

  const handleDeleteImage = (indexVariant) => {
    if (indexVariant === undefined) {
      setInputs({
        ...inputs,
        image_product: '',
      });
      return;
    }

    if (indexVariant !== undefined) {
      const cloneDataVariant = [...productVariant];
      cloneDataVariant[indexVariant].src = '';
      setProductVariant(cloneDataVariant);
      return;
    }
  };

  const handleUploadImages = async (image, indexVariant) => {
    if (indexVariant === undefined) {
      setIsBolean({
        ...isBolean,
        isLoadingImage: true,
      });
    }

    let formData = new FormData();
    formData.append('gambar', image);
    const response = await fetch(
      `${process.env.REACT_APP_URL_API_IMAGE_UPLOAD2}`,
      {
        method: 'POST',
        body: formData,
      }
    );
    const resultResponse = await response.json();
    if (resultResponse?.status === 200) {
      if (indexVariant === undefined) {
        setInputs({
          ...inputs,
          image_product: resultResponse?.file,
        });
      } else {
        const cloneDataVariant = [...productVariant];
        cloneDataVariant[indexVariant]['src'] = resultResponse.file;
        setProductVariant(cloneDataVariant);
      }
    } else {
      swal('Oops', `${resultResponse?.message}`, 'error');
    }

    if (indexVariant === undefined) {
      setIsBolean({
        ...isBolean,
        isLoadingImage: false,
      });
    }
  };

  const handleSubmitCustomVariant = async () => {
    const emailPatern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const bodyVariant = productVariant.map((obj) => {
      return {
        ...obj,
        qty: Number(obj.qty),
        weight: Number(obj.weight),
        length: Number(obj.length),
        height: Number(obj.height),
        width: Number(obj.length),
      };
    });

    const body = {
      emailPenerima: inputs?.emailPenerima,
      is_box: inputs?.is_box,
      link: inputs?.link,
      minQty: Number(inputs?.minQty),
      product: inputs?.product,
      category: inputs?.category,
      image_product: inputs?.image_product,
      product_variant: bodyVariant,
    };

    if (body?.emailPenerima === '') {
      swal('Oops', `Email Penerima tidak dapat kosong`, 'warning');
      return;
    }

    if (!emailPatern.test(body?.emailPenerima)) {
      swal('Oops', `Format Email Tidak Benar`, 'warning');
      return;
    }

    if (body?.product === '') {
      swal('Oops', `Nama Product tidak dapat kosong`, 'warning');
      return;
    }

    if (body?.minQty === 0) {
      swal('Oops', `Minimal quantity tidak dapat kosong`, 'warning');
      return;
    }

    if (body?.category === '') {
      swal('Oops', `category tidak dapat kosong`, 'warning');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'Please check your form before submit',
      icon: 'warning',
      buttons: true,
    }).then(async (submit) => {
      if (submit) {
        setIsBolean({
          ...isBolean,
          isLoadingSubmit: true,
        });

        const response = await submitCustomProductVariant(JSON.stringify(body));
        if (response?.status === 200) {
          setIsBolean({
            ...isBolean,
            isLoadingSubmit: false,
          });
          setInputs({
            is_box: false,
            link: '',
            minQty: '',
            product: '',
            emailPenerima: '',
            category: '',
            image_product: '',
          });
          setProductVariant({
            idVariant: new Date().getTime(),
            variant: '',
            length: 0,
            height: 0,
            width: 0,
            weight: 0,
            price: 0,
            qty: 0,
            src: '',
          });
          swal('Oops', `Succesfully`, 'success');
        } else {
          swal('Oops', `${response?.status}`, 'error');
          setIsBolean({
            ...isBolean,
            isLoadingSubmit: false,
          });
        }
      }
    });
  };

  useEffect(() => {
    setInputs({
      ...inputs,
      link: link,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    inputs,
    isBolean,
    imageUpload,
    productVariant,
    imageUploadVariant,
    setInputs,
    setIsBolean,
    handleChange,
    handleOpenModal,
    handleChangeMesh,
    handleAddVariant,
    handleDeleteImage,
    setProductVariant,
    handleChangeImages,
    handleDeleteVariant,
    handleCloseAllModal,
    handleSubmitCustomVariant,
  };
};

export { useModuleCustomVariant };
