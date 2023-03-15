import { Redirect } from "react-router-dom";
import { useState,useRef,useEffect } from "react";
import Layout from 'components/Layout';
import { useHistory } from 'react-router-dom';
import { getData_Artikel_By_ID } from '../../../service/api';
import { update_artikel } from '../../../service/api';
import {useLocation} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { Editor } from "@tinymce/tinymce-react";
import { getData_Penulis } from '../../../service/api';
import { getData_Editor } from '../../../service/api';



const Edit = () => {
  
  const SUBROUTES = [
    { name: 'Artikel', pathname: '/masterdata/artikel' },
    { name: 'Kontak', pathname: '/masterdata/kontak' },

];

  const [inputid, setID] = useState('');
  const [inputtitle, setTitle] = useState('');
  const [inputdeskripsi, setDescription] = useState('');
  const [inputgambar, setGambar] = useState('');
  const [inputheadline, setHeadline] = useState('');
  const [inputslug, setSlug] = useState('');
  const [slugify, set_slug] = useState('');
  const [inputpenulis, setPenulis] = useState('');

    //deklarasi konten dan SEO

    const [inputkonten, setKonten] = useState('');
    const [inputtagname, setTagname] = useState('');
    const [inputmetatitle, setMetatitle] = useState('');
    const [inputmetadescription, setMetaDescription]= useState('');
    const [inputmetakeyword, setMetaKeyword]= useState('');

    const currentDescription = useRef('');
    const currentTagname = useRef('');
    const currentMetatitle = useRef('');
    const currentMetadescription = useRef('');
    const currentMetakeyword = useRef('');
  
    
  
  const [inputeditor, setEditor] = useState('');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [dataEditArtikelbySlug, setDataEditArtikel] = useState(null);
  const [update, setUpdate] = useState(false);
  const { search } = useLocation();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [pageInfo, setPageInfo] = useState({});
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const location = useLocation();
  const slug_id= location.pathname.split('/').slice(1);
  const [dataPenulis, setDataPenulis] = useState(null);
  const [dataEditor, setDataEditor] = useState(null);
  const [value, setValue] = useState('');
  const [text, setText] = useState('');
  


  const currentTitle = useRef('');
  const currentGamb = useRef('');
  const currentHead = useRef('');
  const currentPenulis = useRef('');



  const fetchOrderDataPenulis = async () => {

    const data_ = await getData_Penulis();
  
    if (data_.status === 200) {
      setDataPenulis(data_.Data)
    }
  
  // console.log("Lihat data:", dataPenulis);
  
    }

    
  const fetchOrderDataEditor = async () => {

    const data_ = await getData_Editor();
  
    if (data_.status === 200) {
      setDataEditor(data_.Data)
    }
  
  
    }
  
    useEffect(() => {
  
      if(!dataPenulis) {
        fetchOrderDataPenulis();
        fetchOrderDataEditor();
    
      }
  
    }, [dataPenulis,dataEditor]);
  
  


  const fetchOrderDataEditArtikel = async () => {
    setIsLoading(true);


     var id_art =(slug_id[3])
    
   

  const data_ = await getData_Artikel_By_ID(id_art);  
  
  

  if (data_.status === 200) {
    setDataEditArtikel(data_.Data)
   
  }


 

}


const id_=(slug_id[3])

//console.log("data all:",dataEditArtikelbySlug)


useEffect(() => {
    let id = '';
    if (search) {
      const query = new URLSearchParams(search);
      id = query.get('id');
    }
    fetchOrderDataEditArtikel();
  }, [search, update, limit, page]);


  
    //tombol back
     const BackToIndex=()=>{

    history.replace("/masterdata/artikel"); 


        }


        //fungsi update edit artikel
          // console.log("lihat title:",currentTitle.current.value)
          // console.log("lihat gambar:",currentGamb.current.value)
          // console.log("lihat head:",currentHead.current.value)
          // console.log("lihat penulis:",currentPenulis.current.value)

          // console.log("lihat title:",currentTagname.current.value)
          // console.log("lihat gambar:",currentMetatitle.current.value)
          // console.log("lihat head:",currentMetadescription.current.value)
          // console.log("lihat penulis:",currentMetakeyword.current.value)



          if(image!=''){

            var title=currentTitle.current.value
            var deskripsi=currentDescription.current.value
            var gambar=image
            var penulis=currentPenulis.current.value
            var status=currentHead.current.value
            var tagname=currentTagname.current.value
            var metatitle=currentMetatitle.current.value
            var metadescription=currentMetadescription.current.value
            var metakeyword=currentMetakeyword.current.value
            var gambar_edit_data=''


          }else{

            var title=currentTitle.current.value
            var deskripsi=currentDescription.current.value
            var gambar=''
            var penulis=currentPenulis.current.value
            var status=currentHead.current.value
            var tagname=currentTagname.current.value
            var metatitle=currentMetatitle.current.value
            var metadescription=currentMetadescription.current.value
            var metakeyword=currentMetakeyword.current.value
            var gambar_edit_data=currentGamb.current.value



          }
          
          


          
       
        const handleUpdateDataArtikel = async (e) => {
            e.preventDefault();

              //fungsi update form artikel
               
      
          try {

        
            var formdatarequest = new FormData();
        
            formdatarequest.append('id',Number(id_));
            formdatarequest.append('title',title);
            formdatarequest.append('picture_form',gambar_edit_data);
            formdatarequest.append('picture',gambar);  
            formdatarequest.append('description',deskripsi);
            formdatarequest.append('konten',text);
            formdatarequest.append('penulis',penulis);  
            formdatarequest.append('tag_name',tagname);
            formdatarequest.append('meta_title',metatitle);
            formdatarequest.append('meta_description',metadescription);
            formdatarequest.append('meta_keyword',metakeyword);
            formdatarequest.append('headline_id',Number(status));
            


      
              
                // const data_ = await update_artikel(formdatarequest);
                const URL = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/updateArtikel`;

                const response= await axios.put(
                    URL,  formdatarequest,
                    {
                      headers:{
                        "Content-Type": "multipart/form-data",
                      
                     },
                     
                     
                    }
                  )

         
    
                    swal({
                        title: "Are you sure?",
                        text: "Are you sure that you want to update this article?",
                        icon: "warning",
                        dangerMode: true,
                      })
                      .then(willDelete => {
                        if (willDelete) {
                          swal("Success!", "Your Data Has Been Updated!", "success");
                        }
                        window.location.href="/oms/master-data"
                      });


            

      
          } catch (err) {
            console.log(err);
          }
      
        }

        const uploadToClient = (event) => {
          if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
      
            setImage(i);
            setCreateObjectURL(URL.createObjectURL(i));
          }
        };


        
          const handleChangesTitle = (e) => {
           
            setTitle(e.target.value) 
         
           
          };

          const handleChangesHeadline = (e) => {
           
          
            setHeadline(e.target.value)
           
           
          };

          const handleChangesPenulis = (e) => {
           
          
           
            setPenulis(e.target.value)

           
          };


          //Current Value Data

         

          // console.log("lihat title:",currentTitle.current.value)
          // console.log("lihat gambar:",currentGamb.current.value)
          // console.log("lihat head:",currentHead.current.value)
          // console.log("lihat penulis:",currentPenulis.current.value)
         


  return (
    <Layout routes={SUBROUTES} title="Artikel">
      <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Edit Artikel
      </p>

      {dataEditArtikelbySlug?.map((artikel) => (


<>

      <form class="w-full" onSubmit={handleUpdateDataArtikel}>

    
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Title
      </label>
     
      <textarea defaultValue={artikel.title}  onChange={handleChangesTitle} ref={currentTitle}  maxLength="200"  class="w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 focus:bg-white" style={{height:'200px'}}  type="text" placeholder="Title" />
    
    </div>
    {/* <pre>{inputtitle}</pre> */}

    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Ringkasan
      </label>

      <textarea defaultValue={artikel.description} onChange={(e) => setDescription(e.target.value)} maxLength="100"  ref={currentDescription} class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" style={{height:'200px'}} type="text" placeholder="Title" />
    

      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Penulis
      </label>

      <input defaultValue={artikel.penulis} onChange={handleChangesPenulis}  ref={currentPenulis}  class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Penulis" />
  
   
  </div>
  

  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Konten
      </label>

    <Editor

    apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" 
    initialValue={artikel.konten}
    onInit={(evt, editor) => {
      setText(editor.getContent({format: 'content'}));
    }}
    onEditorChange={(newValue, editor) => {
      setValue(newValue);
      setText(editor.getContent({format: 'content'}));
    }}

    init={{
      plugins: [
       'lists link image paste help wordcount'
      ],
      toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
    }}

    />

<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Status
  </label>

  <select defaultValue={artikel.headline_id} onChange={handleChangesHeadline}  ref={currentHead}  id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option >--Pilih Status--</option>
        <option value="1" selected>Headline</option>
        <option value="0" selected>Harian</option>

    </select>

   
        
 {/* <pre>{text}</pre> */}

    </div>


    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Tag Name
      </label>
      <input defaultValue={artikel.tag_name} onChange={handleChangesPenulis}  ref={currentTagname}  class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Tag Name" />
  
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Meta Title
      </label>
      <input defaultValue={artikel.meta_title} onChange={handleChangesPenulis}  ref={currentMetatitle}  class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Meta Title" />
   
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Meta Description
      </label>
      <input defaultValue={artikel.meta_description} onChange={handleChangesPenulis}  ref={currentMetadescription}  class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Meta Description" />
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Meta Keyword
      </label>
      <input defaultValue={artikel.meta_keyword} onChange={handleChangesPenulis}  ref={currentMetakeyword}  class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Meta Keyword" />
  

      </div>
  
  
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">


    
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

   
    </div>

  
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">

    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Picture
      </label>
      <input type="hidden"  value={artikel.picture}  ref={currentGamb} />
      <input  onChange={uploadToClient}  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"></input>
    
    </div>


  <div class="w-full md:w-1/2 px-3">
    
 </div>

 </div>





<button  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right'   type="submit" ><label className='text-white fs-5 font-weight-bold'>Update</label></button>

</form>

</>


 ))} 

<div className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right" onClick={BackToIndex} >Back</div>


    </Layout>
  );
};

export default Edit;


