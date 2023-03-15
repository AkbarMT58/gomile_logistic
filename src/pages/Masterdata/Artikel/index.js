import { Redirect } from "react-router-dom";
import Artikeltable from 'components/Masterdata/Artikel/Artikeltable';

import Layout from 'components/Layout';


const Artikel = () => {
  const SUBROUTES = [
    { name: 'Artikel', pathname: '/masterdata/artikel' },
    { name: 'Kontak', pathname: '/masterdata/kontak' },
 
  
  ];

  return (
    <Layout routes={SUBROUTES} title="Artikel">
      <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Artikel
      </p>


      <Artikeltable/>


   
    </Layout>
  );
};

export default Artikel;


