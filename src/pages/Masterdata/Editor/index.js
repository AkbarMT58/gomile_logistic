import { Redirect } from "react-router-dom";

import Layout from 'components/Layout';
import Editortable from 'components/Masterdata/Editor/Editortable';

const Editor = () => {
  const SUBROUTES = [
    { name: 'Artikel', pathname: '/masterdata/artikel' },
    { name: 'Kontak', pathname: '/masterdata/kontak' },
    { name: 'Penulis', pathname: '/masterdata/penulis' },
    { name: 'Editor', pathname: '/masterdata/editor' },
  
  ];

  return (
    <Layout routes={SUBROUTES} title="Editor">
      <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
       Editor
      </p>


      <Editortable/>


   
    </Layout>
  );
};

export default Editor;


