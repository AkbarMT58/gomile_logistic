import { getUser } from 'helpers/parseJWT';

export const SubRoutesMarketing = (userOBE) => [
  {
    name: `${getUser().role === 'admin' ? 'Blast Email' : ''}`,
    pathname: '/marketing/blast-email',
  },
  {
    name: `${getUser().role === 'admin' ? 'Email Template' : ''}`,
    pathname: '/marketing/email-template',
  },
];