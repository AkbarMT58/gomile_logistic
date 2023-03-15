import { Redirect } from "react-router-dom";
import { useState,useEffect } from "react";
import Layout from 'components/Layout';
import { useHistory } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import swal from 'sweetalert';
import axios from 'axios';
import { getData_Penulis } from '../../../service/api';
import { getData_Editor } from '../../../service/api';
import e from "cors";


const Add = () => {
  const SUBROUTES = [
    { name: 'Artikel', pathname: '/masterdata/artikel' },
    { name: 'Kontak', pathname: '/masterdata/kontak' },

];

  const history = useHistory();
  const [inputid, setID] = useState('');
  const [inputtitle, setTitle] = useState('');
  const [inputdeskripsi, setDescription] = useState('');
  const [inputgambar, setGambar] = useState('');
  const [inputheadline, setHeadline] = useState('');
  const [inputslug, setSlug] = useState('');
  const [inputpenulis, setPenulis] = useState('');

  //deklarasi konten dan SEO

  const [inputkonten, setKonten] = useState('');
  const [inputtagname, setTagname] = useState('');
  const [inputmetatitle, setMetatitle] = useState('');
  const [inputmetadescription, setMetaDescription]= useState('');
  const [inputmetakeyword, setMetaKeyword]= useState('');
  

  const [inputeditor, setEditor] = useState('');
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [dataPenulis, setDataPenulis] = useState(null);
  const [dataEditor, setDataEditor] = useState(null);

  const [value, setValue] = useState('');
  const [text, setText] = useState('');



 


  const fetchOrderDataPenulis = async () => {

  const data_ = await getData_Penulis();

  if (data_.status === 200) {
    setDataPenulis(data_.Data)
  }


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

  
// console.log("Lihat data penulis:", dataPenulis);

 //console.log("Lihat data editor:", dataEditor);

    //tombol back
     const BackToIndex=()=>{

    history.replace("/masterdata/artikel"); 


        }

   
    //fungsi insert form data
    const handleInsertDataArtikel = async (e) => {
      e.preventDefault();

      var formdatarequest = new FormData();

   
      formdatarequest.append('title',inputtitle);
      formdatarequest.append('description',inputdeskripsi);
      formdatarequest.append('konten',text);
      formdatarequest.append('headline_id',Number(inputheadline));
      formdatarequest.append('picture',image);  
      formdatarequest.append('penulis',inputpenulis);  
      formdatarequest.append('tag_name',inputtagname);  
      formdatarequest.append('meta_title',inputmetatitle);  
      formdatarequest.append('meta_description',inputmetadescription);  
      formdatarequest.append('meta_keyword',inputmetakeyword);  

 

      try {
  
      
     
        const URL = `${process.env.REACT_APP__URL_API_GATEWAY_LOKAL}/insertArtikel`;

        const response= await axios.post(
            URL,  formdatarequest,
            {
              headers:{
                 "Content-Type": "multipart/form-data",
                //  'Access-Control-Allow-Origin':'*',
                //  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                //  'Access-Control-Allow-Header':"Cache-Control, Content-Type,Xid"
               
              },
             
             
            }
          )

            swal({
                title: "Are you sure?",
                text: "Are you sure that you want to insert this article?",
                icon: "warning",
                dangerMode: true,
              })
              .then(willDelete => {
                if (willDelete) {
                  swal("Success!", "Your Data Has Been Inserted!", "success");
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


    const handleChange=(content, editor)=> {
      this.setState({content});
    }

    const onChange = (content) => {
      console.log(content);
    }



     



  return (
    <Layout routes={SUBROUTES} title="Artikel">
      <p className="my-4 bg-white w-32 p-2 rounded-md cursor-pointer text-center">
        Add Artikel
      </p>


      <form class="w-full" onSubmit={handleInsertDataArtikel}>
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Title
      </label>
      <textarea value={inputtitle} onChange={(e) => setTitle(e.target.value)} maxlength="200"  class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" style={{height:'200px'}} type="text" placeholder="Title" />
    
    </div>

   
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
      Ringkasan
      </label>

      <textarea value={inputdeskripsi} onChange={(e) => setDescription(e.target.value)} maxLength="150" id="description" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a description..." required></textarea>
      
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Penulis
      </label>

      <input value={inputpenulis} onChange={(e) => setPenulis(e.target.value)} class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Penulis" />
    
  </div>
  

  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Konten
      </label>
   

    <Editor

apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" 
value={value}

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
    

    </div>
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Tag Name
      </label>
      
      <input value={inputtagname} onChange={(e) => setTagname(e.target.value)} class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Tag Name" />


      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Meta Title
      </label>
      
      <input value={inputmetatitle} onChange={(e) => setMetatitle(e.target.value)} class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Meta Title" />
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Meta Description
      </label>
      
      <input value={inputmetadescription} onChange={(e) => setMetaDescription(e.target.value)} class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Meta Description" />
    
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Meta Keyword
      </label>
      
      <input value={inputmetakeyword} onChange={(e) => setMetaKeyword(e.target.value)} class="appearance-none block w-full bg-white-200 text-white-700 border border-grey-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Meta Keyword" />
    
  
      </div>

  
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
 

<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Status
      </label>

      
     <select value={inputheadline} onChange={(e) => setHeadline(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>--Pilih Status--</option>
        <option value="1">Headline</option>
        <option value="0">Harian</option>

        </select>
    
     
    </div>

    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

   
    </div>


   
  
  </div>

  <div class="flex flex-wrap -mx-3 mb-6">

    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        Picture
      </label>
      <input onChange={uploadToClient}   class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"></input>
    


    </div>


  <div class="w-full md:w-1/2 px-3">
    
 </div>

 </div>


 <button  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right'   type="submit" ><label className='text-white fs-5 font-weight-bold'>Save</label></button>

</form>


<div className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right" onClick={BackToIndex} >Back</div>



   

   
    </Layout>
  );
};

export default Add;


