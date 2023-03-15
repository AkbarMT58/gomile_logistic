import ProductCard from './ProductCard';

const PoolProducts = ({ products, setUpdate }) => {
  return (
    <div className='space-y-3'>
      <div className='grid grid-cols-4 gap-8'>
        {products.map((data, index) => (
          <ProductCard key={index} data={data} setUpdate={setUpdate} />
        ))}
      </div>
    </div>
  );
};

export default PoolProducts;
