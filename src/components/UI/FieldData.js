const FieldData = ({ asValue, value, children, width }) => {
  return (
    <div className='flex gap-2'>
      <div className={`w-1/6 min-w-[${width ? width : '80px'}] capitalize`}>
        {asValue}
      </div>
      <div>:</div>
      <div className='flex gap-2'>
        <div className='capitalize line-clamp-2'>{value}</div>
        {children}
      </div>
    </div>
  );
};

export { FieldData };
