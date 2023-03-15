import { getUser } from 'helpers/parseJWT';

export const SubRoutesCms = (userOBE) => [
  {
    name: `${getUser().role === 'admin' ? 'Categories' : ''}`,
    pathname: '/cms/categories',
  },
  {
    name: `${getUser().role === 'admin' ? 'Material' : ''}`,
    pathname: '/cms/materials',
  },
  {
    name: `${getUser().role === 'admin' ? 'Categories Oci Logistic' : ''}`,
    pathname: '/cms/category-oci-logistic',
  },
  {
    name: `${getUser().role === 'admin' ? 'Banner' : ''}`,
    pathname: '/cms/banner',
  },
  {
    name: `${getUser().role === 'admin' ? 'Popup' : ''}`,
    pathname: '/cms/popup',
  },
];