import { Redirect } from "react-router-dom";
import { useState,useEffect } from "react";
import swal from 'sweetalert';
import axios from 'axios';
import Layout from 'components/Layout';
import { useHistory } from 'react-router-dom';



const AddEditor = () => {
  const SUBROUTES = [
    { name: 'Artikel', pathname: '/masterdata/artikel' },
    { name: 'Kontak', pathname: '/masterdata/kontak' },
    { name: 'Penulis', pathname: '/masterdata/penulis' },
    { name: 'Editor', pathname: '/masterdata/editor' },
];

  const history = useHistory();
  const [inputeditor, setEditor] = useState('');


      //fungsi insert form data editor
      const handleInsertDataEditor = async (e) => {
        e.preventDefault();
  
        var formdatarequest = new FormData();
  
        formdatarequest.append('nama_editor',inputeditor);
  
  
        
        try {
    
        
    
          const URL = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/insertEditor`;
  
          const response= await axios.post(
              URL,  formdatarequest,
              {
                headers:{
                   "Content-Type": "multipart/form-data",
                 
                },
               
               
              }
            )
  
              swal({
                  title: "Are you sure?",
                  text: "Are you sure that you want to insert this editor?",
                  icon: "warning",
                  dangerMode: true,
                })
                .then(willDelete => {
                  if (willDelete) {
                    swal("Success!", "Your Data Has Been Inserted!", "success");
                  }
                  window.location.href="/oms/masterdata/editor"
                });
  
    } catch (err) {
      console.log(err);
    }
  
    
  
      }
  
  


  
    //tombol back
     const BackToIndex=()=>{

    history.replace("/masterdata/editor"); 


        }

     



  return (
    <Layout routes={SUBROUTES} title="Editor">
      <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Add Editor
      </p>


      <form class="w-full" onClick={handleInsertDataEditor}>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Nama Editor
      </label>
      <input  value={inputeditor} onChange={(e) => setEditor(e.target.value)}  class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Title" />
    
    </div>
  

  </div>






  <button  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right'   type="submit" ><label className='text-white fs-5 font-weight-bold'>Save</label></button>

</form>


<div className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right" onClick={BackToIndex} >Back</div>



   

   
    </Layout>
  );
};

export default AddEditor;


