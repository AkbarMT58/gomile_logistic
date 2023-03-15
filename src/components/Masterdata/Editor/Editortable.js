import React from "react";
import { useState,useEffect } from "react";

import { Redirect } from "react-router-dom";
import {
    CircularProgress,
    Box,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    Paper,
    TableCell,
    IconButton,
    Collapse,
    Typography,
  } from '@mui/material';
  import { useHistory } from 'react-router-dom';
  import { getData_Editor } from '../../../service/api';


  

const Editortable = () => {
    const history = useHistory();
    
  const [dataEditor, setDataEditor] = useState(null);


    const click_add_editor=()=>{

        history.replace("/masterdata/editor/add"); 
        //console.log("pindah ke form:");



    }


    
  const fetchOrderDataEditor = async () => {

    const data_ = await getData_Editor();
  
    if (data_.status === 200) {
      setDataEditor(data_.Data)
    }
  
  
    }

    

  useEffect(() => {

    if(!dataEditor) {
      fetchOrderDataEditor();
   
  
    }

  }, [dataEditor]);


  return (
    <>

    <div className="">

    <button type="button" onClick={click_add_editor} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right">
        
    Add +
    
    </button>

    </div>


    <div class="relative overflow-x-auto shadow-md sm:rounded-lg" >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{marginTop:'100px'}}>
        <thead class="text-xs  uppercase bg-orange-500">
            <tr>
                <th scope="col" class="px-6 py-3 text-white">
                    No.
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Nama
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Created Date
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Update Date
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Action
                </th>
               
               
               
              
            </tr>
        </thead>
        <tbody>

         
        {dataEditor?.map((editor, index) => (  
        
        <>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  {index+1} 
                </th>
                <td class="px-6 py-4 text-black">
                {editor.Nama_editor}
                </td>
                <td class="px-6 py-4 text-black">
                {editor.created_date.String}
            
                </td>
                <td class="px-6 py-4 text-black">
                {editor.updated_date.String}
            
                </td>
                <td>     
                <a type="button" href={'/masterdata/editor/edit/'+ editor.id} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right">
        
                 Edit
        
                 </a>

               </td>

            </tr>
    
 
               </>
            ))} 

          
        </tbody>
    </table> 
</div>


          
     
   
    

   
    </>
  );
};

export default Editortable;
