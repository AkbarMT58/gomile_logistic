import { Skeleton } from '@mui/material';
import ProductCard from './ProductCard';

const CatalogProducts = ({
  products,
  setProducts,
  setUpdate,
  setIsLoading,
  isLoading,
}) => {
  const handleChekedRow = (e, id) => {
    const { checked } = e.target;
    const values = [...products];
    values[id].isChecked = checked;
    setProducts(values);
  };

  const screenWidth = window.innerWidth;

  return (
    <>
      {isLoading && (
        <>
          <div className='flex justify-around -mt-20'>
            <Skeleton
              width={screenWidth > 1300 ? 400 : 250}
              height={screenWidth > 1300 ? 700 : 400}
            />
            <Skeleton
              width={screenWidth > 1300 ? 400 : 250}
              height={screenWidth > 1300 ? 700 : 400}
            />
            <Skeleton
              width={screenWidth > 1300 ? 400 : 250}
              height={screenWidth > 1300 ? 700 : 400}
            />
            <Skeleton
              width={screenWidth > 1300 ? 400 : 250}
              height={screenWidth > 1300 ? 700 : 400}
            />
          </div>
          <div className='flex justify-around -mt-20'>
            <Skeleton
              width={screenWidth > 1300 ? 400 : 250}
              height={screenWidth > 1300 ? 700 : 400}
            />
            <Skeleton
              width={screenWidth > 1300 ? 400 : 250}
              height={screenWidth > 1300 ? 700 : 400}
            />
            <Skeleton
              width={screenWidth > 1300 ? 400 : 250}
              height={screenWidth > 1300 ? 700 : 400}
            />
            <Skeleton
              width={screenWidth > 1300 ? 400 : 250}
              height={screenWidth > 1300 ? 700 : 400}
            />
          </div>
        </>
      )}

      {products?.map((data, index) => (
        <ProductCard data={data} setUpdate={setUpdate} key={index} />
      ))}
    </>
  );
};

export default CatalogProducts;
