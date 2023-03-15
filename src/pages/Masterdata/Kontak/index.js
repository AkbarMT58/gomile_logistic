import { Redirect } from "react-router-dom";

import Layout from 'components/Layout';
import Kontaktable from 'components/Masterdata/Kontak/Kontaktable';

const Artikel = () => {
  const SUBROUTES = [
    { name: 'Artikel', pathname: '/masterdata/artikel' },
    { name: 'Kontak', pathname: '/masterdata/kontak' },
 
  
  ];

  return (
    <Layout routes={SUBROUTES} title="Artikel">
      <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Kontak
      </p>


      <Kontaktable/>


   
    </Layout>
  );
};

export default Artikel;


