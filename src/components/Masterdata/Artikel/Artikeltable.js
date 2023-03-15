import React from "react";
import { useState,useRef,useEffect } from "react";

import { Redirect } from "react-router-dom";

import { useHistory } from 'react-router-dom';
import { getData_Artikel } from '../../../service/api';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { propTypes } from "react-barcode";
import Layout from 'components/Layout';

import Pagination from '../../../components/General/Pagination';




const Artikeltable = () => {

  

    const SUBROUTES = [
        { name: 'Artikel', pathname: '/masterdata/artikel' },
        { name: 'Kontak', pathname: '/masterdata/kontak' },
    
    ];

  
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [dataArtikel, setDataArtikel] = useState(null);
    const [update, setUpdate] = useState(false);
    const { search } = useLocation();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [pageInfo, setPageInfo] = useState({});
    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);// No of Records to be displayed on each page   
    const [recordsPerPage] = useState(5);
    const url_images = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/upload/`;
    const inputsearch = useRef('');
  
    
    const fetchOrderDataArtikel = async () => {

      const text_pencarian=inputsearch.current.value;
      var formdata_request = new FormData()
      formdata_request.append('search',text_pencarian)

  
      setIsLoading(true);

    const data_ = await getData_Artikel(formdata_request);

    const data_all= data_.data.Data


    if (data_.status === 200) {
      setDataArtikel(data_all)
    }

 

    }

    //console.log("Lihat data:", dataArtikel);
    const arr = dataArtikel || [];
    console.log("Lihat data artikel:", arr.length);

    const totaldata=  Number(arr.length);
    const nPages = Math.ceil(totaldata / recordsPerPage)
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = arr.slice(indexOfFirstRecord, indexOfLastRecord)


   

    useEffect(() => {
      let id = '';
      if (search) {
        const query = new URLSearchParams(search);
        id = query.get('id');
      }
      fetchOrderDataArtikel(limit, page, id);
    }, [search, update, limit, page]);

   

   

    const click_add_artikel=()=>{
      
        history.replace("/masterdata/artikel/add"); 

        //console.log("pindah ke form:");


    }


    //hapus artikel
    const hapusartikel= async (id_art) => {

      var id_artikel=id_art
      console.log("lihat id:",id_artikel)

    
           
     try {

      var formdataartikel = new FormData();

      formdataartikel.append('id',Number(id_artikel));
     

      const URL = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/deleteArtikel`;


    


      if(id_artikel!=''){

              
       
        axios.delete(
          URL,
          {
            headers:{
  
              "Content-Type": "multipart/form-data",
              //  'Access-Control-Allow-Origin':'*',
              //  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              //  'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
             
            },
            data:formdataartikel
           
           
          }
        )
        

      
        swal({
          title: "Are you sure?",
          text: "Are you sure that you want to delete this article?",
          icon: "warning",
          dangerMode: true,
        })
        .then(willDelete => {
          if (willDelete) {
            swal("Success!", "Your Data Has Been Deleted!", "success");
          }

          window.location.href="/oms/master-data"
        });

        



      }


   

} catch (err) {
  console.log(err);
}




    }


  return (
    <div>

    <div>
    
    <div className="flex flex-wrap -mx-3 mb-6">

      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

    <button type="button" onClick={click_add_artikel} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" style={{marginLeft:'0px'}}>
        
    Add +
    
    </button>

    </div>

    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

    <input  ref={inputsearch} onChange={fetchOrderDataArtikel} className="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Search" />
  

    </div>

    </div>


<div class="relative overflow-x-auto shadow-md sm:rounded-lg" >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{marginTop:'0px'}}>
        <thead class="text-xs text-black-700 uppercase dark:text-black-400 bg-orange-500">
            <tr>
                <th scope="col" class="px-6 py-3  text-white">
                    No.
                </th>
                <th scope="col" class="px-6 py-3 w-1/4 text-white">
                    Title
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Description
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Penulis
                </th>
              
                <th scope="col" class="px-6 py-3 text-white">
                    Picture
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Status
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Created Date
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

         
        {currentRecords?.map((artikel, index) => ( 

        <>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 text-black">
                {((recordsPerPage * currentPage )+index+1)-recordsPerPage}
             
                </th>
                <td class="px-6 py-4 text-black">
                    {artikel.title}
                </td>
                <td class="px-6 py-4  text-black">
                {artikel.description.length > 250 ?
                `${artikel.description.substring(0, 250)}...` : artikel.description}
                </td>
                <td class="px-6 py-4">
                  {artikel.penulis}
                </td>

                <td>
                  <div className="float-center">

                  <img className="w-1/2 h-1/2" src={url_images+artikel.picture} />

                  </div>
                </td>
                <td>
                  <div className="float-center">

                  {(artikel.headline_id ===1 ? (

                    "Headline News"

                        ) : "News"
                        )}

                  </div>
                </td>

                <td>
                  <div className="float-center">

                    {artikel.created_date.String}


                  </div>
                </td>

                <td>
                   <a type="button" href={'/masterdata/artikel/edit/'+ artikel.id} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right">
                  Edit
        
                  </a>

                 

                  <button type="button" onClick={() => hapusartikel(artikel.id)} class="text-white bg-red-500 hover:bg-red-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right">
                    Delete
                  </button>
    

                </td>


            </tr>
    
 
               </>
            ))}

          
        </tbody>
    </table> 


    <div className='container mt-5'>
          
         
            <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>

   
</div>



</div>

</div>


          
     
   
    

   
    
  );

                  
};

export default Artikeltable;
