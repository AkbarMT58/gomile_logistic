import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichEditor = ({ onChange, initialValue }) => {
  const configEditor = {
    selector: 'textarea',
    plugins: [
      'preview',
      'importcss',
      'searchreplace',
      'codesample',
      'autolink',
      'autosave',
      'save',
      'directionality',
      'code',
      'visualblocks',
      'visualchars',
      'fullscreen',
      'image',
      'link',
      'media',
      'template',
      'codesample',
      'table',
      'charmap',
      'pagebreak',
      'nonbreaking',
      'anchor',
      'insertdatetime',
      'advlist',
      'lists',
      'wordcount',
      'help',
      'charmap',
      'quickbars',
      'emoticons',
    ],
    menubar: 'file edit view insert format tools table help',
    toolbar:
      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',

    //More Configuration
    imagetools_cors_hosts: ['picsum.photos'],
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    image_advtab: true,
    link_list: [{ title: 'Ocistok.com', value: 'https://ocistok.com' }],
    importcss_append: true,

    // Image Upload Local
    images_upload_url: process.env.REACT_APP_URL_API_IMAGE_UPLOAD2,
    images_upload_base_path: 'https://ocistok.co.id/control-panel/foto/',
    images_upload_handler: (blobInfo, progress) =>
      new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', process.env.REACT_APP_URL_API_IMAGE_UPLOAD2);

        xhr.upload.onprogress = (e) => {
          progress((e.loaded / e.total) * 100);
        };

        xhr.onload = () => {
          const response = JSON.parse(xhr.responseText);

          if (response.status === 403) {
            reject({ message: 'HTTP Error: ' + xhr.status, remove: true });
            return;
          }

          if (response.status < 200 || response.status >= 300) {
            reject('HTTP Error: ' + response.status);
            return;
          }

          const json = JSON.parse(xhr.responseText);

          if (!json || typeof json.file != 'string') {
            reject('Invalid JSON: ' + xhr.responseText);
            return;
          }

          resolve(json.file);
        };

        xhr.onerror = () => {
          reject(
            'Image upload failed due to a XHR Transport error. Code: ' +
              xhr.status
          );
        };

        const formData = new FormData();
        formData.append('gambar', blobInfo.blob());

        xhr.send(formData);
      }),

    // Templates Config
    templates: [
      {
        title: 'Apa itu OCISTOK ?',
        description: 'OCISTOK.COM adalah',
        content:
          'OCISTOK.COM adalah platform belanja import China, dimana Customer bisa langsung mencari dan memilih barang dari Pabrik & Supplier China Tangan Pertama di website OCISTOK.COM',
      },
      {
        title: 'Template Table',
        description: 'creates a new table',
        content:
          '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
      },
      {
        title: 'Ocistok.com Redirect',
        description: 'Banner Redirect Ocistok.com',
        content:
          '<a href="https://api.whatsapp.com/send?text=https://ocistok.com/%20Hi%20OCISTOK.com,%20Bisa%20bantu%20saya%20untuk%20menemukan%20produk%20import%20untuk%20usaha?&amp;phone=6281210001808"><img src="https://cdn.shopify.com/s/files/1/0268/7480/6307/files/jdn_ea5be18a-c2e7-4ef1-87a1-9f45cc4b0d94_480x480.png?v=1649474047" alt=""></a>',
      },
    ],

    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar:
      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; max-width: 609px; margin: 0 auto; }',
  };

  return (
    <>
      <Editor
        apiKey='2t3qx3ounbosjo8h7fri0ya9kl0gfzwwc7xpbryn48fe0zhx'
        value={initialValue}
        onEditorChange={onChange}
        init={configEditor}
      />
    </>
  );
};

export default RichEditor;
