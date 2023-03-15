import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

const LoadingComponentDefault = (props) => {
  /*
    List Props : 
    - icon
    - sizeIcon
    - textLoading
    - children
  */

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(props.setIsLoading);
  }, [props.setIsLoading]);

  return (
    <>
      {isLoading ? (
        <div className='flex gap-2'>
          {props?.icon ?? <CircularProgress size={props?.sizeIcon ?? 25} />}
          <div className='animate-pulse duration-300 ease-in-out text-gray-500 font-medium'>
            {props?.textLoading ?? 'Loading Submit'}
          </div>
        </div>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

export { LoadingComponentDefault };
