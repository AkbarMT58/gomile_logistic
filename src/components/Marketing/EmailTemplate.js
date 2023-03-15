import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import RichEditor from 'components/Blog/RichEditor';
import Modal from '@mui/material/Modal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import swal from 'sweetalert';
import { createEmailTemplate, deleteEmailTemplate, updateEmailTemplate } from 'service/marketing';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width : "900px",
    borderRadius: 2,
    boxShadow: 24,
    pt: 4,
};

function EmailTemplate({emailTemplateData, _getEmailTemplate}) {
    const [selectedRow, setSelectedRow] = useState(null)
    const [preview, setPreview] = useState(null)
    const handleOpenModalEmailTemplate = (row) => {
        setSelectedRow(row)
    }
    const handleCloseModalEmailTemplate = () => {
        setSelectedRow(null)
    }

    const handleDeleteRow = async (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (willDelete) => {
            if (willDelete) {
                await deleteEmailTemplate(id)
                swal("the data has been deleted!", {
                    icon: "success",
                });
                _getEmailTemplate()
            } 
        });
    }
    const handlePreviewEmailTemplate = (row) => {
        setPreview(row)
    }
    const handleClosePreviewEmailTemplate = () => {
        setPreview(null)
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold mt-5 mb-4">Email Templates</h1>
                <div className="flex">
                    <button onClick={e => {handleOpenModalEmailTemplate({})}} className='px-4 py-2 text-black rounded-md bg-orange-500 font-medium hover:bg-orange-400'>Create Template</button>
                </div>
            </div>
            <div className="bg-white rounded-lg p-2 drop-shadow-md">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">No</th>
                                <th scope="col" className="px-6 py-3">Judul</th>
                                <th scope="col" className="px-6 py-3">Tanggal</th>
                                <th scope="col" className="px-6 py-3 w-56"></th></tr>
                        </thead>
                        <tbody>
                            {emailTemplateData.map((item, idx) => {
                                return <ItemRow 
                                    key={idx} 
                                    idx={idx} 
                                    item={item} 
                                    handleDeleteRow={handleDeleteRow}
                                    handlePreviewEmailTemplate={handlePreviewEmailTemplate}
                                    handleOpenModalEmailTemplate={handleOpenModalEmailTemplate}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModalEmailTemplate data={selectedRow} handleCloseModalEmailTemplate={handleCloseModalEmailTemplate} _getEmailTemplate={_getEmailTemplate}/>       
            <ModalPreviewEmailTemplate data={preview} handleClosePreviewEmailTemplate={handleClosePreviewEmailTemplate}/>       
        </div>
  )
}

const ItemRow = ({idx, item, handleDeleteRow, handleOpenModalEmailTemplate, handlePreviewEmailTemplate}) => {
    return (
        <tr key={item.id} className="bg-white dark:bg-gray-800">
            <td scope="row" className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <span>{idx + 1}</span>
            </td>
            <td className="px-6 py-4">
                <span>{item.judul}</span>
            </td>
            <td className="px-6 py-4">
                <span>{item.tanggal}</span>
            </td>
            <td className="px-6 py-4 " >
                <div>
                    <button onClick={e => handlePreviewEmailTemplate(item)} className="p-1 mr-3  hover:text-blue-500">
                        <VisibilityIcon className=''/>
                    </button>
                    <button onClick={e => handleOpenModalEmailTemplate(item)} className="p-1 mr-3  hover:text-orange-500">
                        <EditTwoToneIcon className=''/>
                    </button>
                    <button onClick={e => {handleDeleteRow(item.id)}} className="p-1 text-red-500 hover:text-red-600">
                        <DeleteIcon className=''/>
                    </button>
                </div>
            </td>
        </tr>
    )
}

const ModalEmailTemplate = ({data, handleCloseModalEmailTemplate, _getEmailTemplate}) => {
    const [judul, setJudul] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [template, setTemplate] = useState("")

    useEffect(() => {
        if (data) {
            setJudul(data.judul)
            setTanggal(data.tanggal)
            setTemplate(data.template)
        }
    }, [data])
    
    const handleSubmit = async () => {
        
        if (judul === ""){
            swal('Oops', 'Please input "Title" before submit !', 'error');
            return
        }
        if (tanggal === ""){
            swal('Oops', 'Please input "Date" before submit !', 'error');
            return
        }
        if (template === ""){
            swal('Oops', 'Please input "Template" before submit !', 'error');
            return
        }

        const payload = JSON.stringify({
            id: data.id,
            judul : judul,
            tanggal : tanggal,
            template : template,
        })

        let req 
        if (data.id == null) {
            req = await createEmailTemplate(payload);
        } else {
            req = await updateEmailTemplate(payload);
        }

        if (req?.status === 200) {
            swal('Submitted', 'Request submit succesfully', 'success');
            setJudul("");
            setTanggal("");
            setTemplate("");
            _getEmailTemplate()
            handleCloseModalEmailTemplate()
        } else {
            swal('Oops', 'Bad Request!', 'error');
        }

    }

    return (
        <Modal
            open={!!data}
            onClose={handleCloseModalEmailTemplate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {
                data && (
                    <Box sx={style} >
                        <Box sx={{maxHeight : 764}} className="overflow-y-scroll variant-scroll px-8">
                            <div className="md:flex flex-col mb-6">
                                <label className="block text-gray-500 font-bold mb-3" htmlFor="inline-full-name">
                                    *Title
                                </label>
                                <div className="w-full">                    
                                <input
                                    type='text'
                                    name='judul'
                                    pattern='https:.*'
                                    placeholder='Link'
                                    value={judul}
                                    onChange={e => { setJudul(e.target.value)}}
                                    className={`border-gray-400 focus:outline-blue border rounded-md p-3 outline-none w-full`}
                                />
                                </div>
                            </div>
                            <div className="md:flex flex-col mb-6">
                                <label className="block text-gray-500 font-bold mb-3" htmlFor="inline-full-name">
                                    *Date
                                </label>
                                <div className="w-full">                 
                                <input
                                    type='datetime-local'
                                    name='tanggal'
                                    placeholder='Date'
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    className='border border-gray-400 rounded-md p-3 focus:outline-blue w-full'
                                /> 
                                </div>
                            </div>
                            <div className="md:flex flex-col mb-6">
                                <label className="block text-gray-500 font-bold mb-3" htmlFor="inline-full-name">
                                    *Email Template
                                </label>
                                <div className="w-full">    
                                
                                <RichEditor
                                    initialValue={template}
                                    onChange={(evt, editor) =>
                                        setTemplate(editor.getContent())
                                    }
                                />
                                
                                </div>
                            </div>
                        </Box>
                        <div className='flex p-4'>
                            <div className='ml-auto'>
                                <button onClick={handleSubmit} className='px-4 py-2 rounded-md bg-orange-500 font-medium hover:bg-orange-400'>Submit</button>
                            </div>
                        </div>
                    </Box>
                )
            }
        </Modal> 
    )
}

const ModalPreviewEmailTemplate = ({data,handleClosePreviewEmailTemplate }) => {
    return (
        
        <Modal
            open={!!data}
            onClose={handleClosePreviewEmailTemplate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {
                data && (
                    <Box sx={style} >
                        <Box sx={{maxHeight : 764}} className="overflow-y-scroll variant-scroll px-8">
                            <div dangerouslySetInnerHTML={{ __html: data.template }} />
                        </Box>
                    </Box>
                )
            }
        </Modal> 
    )
}

export default EmailTemplate