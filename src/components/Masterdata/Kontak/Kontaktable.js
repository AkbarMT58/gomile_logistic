import React from "react";
import { useState,useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useHistory } from 'react-router-dom';
import { getData_Kontak } from '../../../service/api';
import { useLocation } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";


const Kontaktable = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [dataKontak, setDataKontak] = useState(null);
  const [update, setUpdate] = useState(false);
  const { search } = useLocation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pageInfo, setPageInfo] = useState({});


  const fetchOrderDataKontak = async (limit, page, id) => {
    setIsLoading(true);

  const data_ = await getData_Kontak();

  if (data_.status === 200) {
    setDataKontak(data_.Data)
  }

  // if (data_) {
  //   const newFormat = [];
  //   for (let i = 0; i < data_.length; i++) {
  //     const title = data_[i].title;
  //     const slug=data_[i].slug;
  //     const description = data_[i].description;
  //     const headline_id = data_[i].headline_id;
  //     const picture = data_[i].picture;
  //     newFormat.push({ title, description,headline_id, picture });
  //   }
  //   setDataArtikel(newFormat);
  //   setPageInfo({
    
  //     totalData: data_.length,
     
  //   });
  // }
  // setIsLoading(false);

// console.log("Lihat data kontak:", dataKontak);

  }

  useEffect(() => {
    let id = '';
    if (search) {
      const query = new URLSearchParams(search);
      id = query.get('id');
    }
    fetchOrderDataKontak(limit, page, id);
  }, [search, update, limit, page]);


    const click_add_kontak=()=>{

        history.replace("/masterdata/kontak/add"); 

    }


  return (
    <>
 <div>
    
<div class="relative overflow-x-auto shadow-md sm:rounded-lg" >
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{marginTop:'100px'}}>
        <thead class="text-xs uppercase bg-orange-500">
            <tr>
                <th scope="col" class="px-6 py-3 text-white">
                    No.
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Nama
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Phone Number
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Email
                </th>
                <th scope="col" class="px-6 py-3 text-white">
                    Pesan
                </th>
               
              
            </tr>
        </thead>
        <tbody>

         
        {dataKontak?.map((kontak, index) => ( 
        
        <>
            <tr class="border-b border-gray-200 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                  {index+1}
                </th>
                <td class="px-6 py-4 text-black">
                {kontak.nama}
                </td>
                <td class="px-6 py-4 text-black">
                {kontak.phone_number}
             
                </td>
                <td class="px-6 py-4 text-black">
                {kontak.email}
                </td>

                <td class="px-6 py-4 text-black">
                {kontak.pesan}
                </td>

               
               


            </tr>
    
 
               </>
            ))}

          
        </tbody>
    </table> 
</div>



</div>
          
    </>
  );
};

export default Kontaktable;
