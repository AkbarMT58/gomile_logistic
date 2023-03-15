import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import RichEditor from 'components/Blog/RichEditor';
import Modal from '@mui/material/Modal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import swal from 'sweetalert';
import { getEmailTemplate, sendBlastEmail } from 'service/marketing';
import { useMemo } from 'react';

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

function BlastEmail({}) {
    const [selectedRow, setSelectedRow] = useState(null)
    const [selectedCustomerType, setSelectedCustomerType] = useState('all')
    
    const [emailTemplateData, setEmailTemplatedata] = useState(null);
    const [loading, setIsloading] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    
    useEffect(() => {
        if (!loading) {
        _getEmailTemplate();
        }
    }, [loading]);

    const _getEmailTemplate = async () => {
        const response = await getEmailTemplate();
        if (response?.status === 200) {
        setEmailTemplatedata(response?.data);
        }
    };
    const template = useMemo(() => emailTemplateData && emailTemplateData[selectedTemplate], [selectedTemplate])
    const sendEmail = async () => {
        swal({
            title: "Send Confirmation",
            text: "Are you sure you want to blast this email template!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then(async (isConfirm) => {
            if (isConfirm) {
                if (selectedTemplate == "" || selectedTemplate == null){
                    swal('Oops', 'Please input "Template" before submit !', 'error');
                    return
                }
                 
                const payload = JSON.stringify({
                    customer_type : selectedCustomerType,
                    id_template : emailTemplateData[selectedTemplate].id
                })
        
                let req 
                req = await sendBlastEmail(payload);
        
                if (req?.status === 200) {
                    swal('Success', `Succesfully blast email to ${selectedCustomerType} customer`, 'success');
                } else {
                    swal('Oops', 'Bad Request!', 'error');
                }
            } 
        });

       
    }
    return (
        <div>
            <h1 className="text-xl font-bold mt-5 mb-4">Blast Email</h1>
            <div className="bg-white rounded-lg p-4 drop-shadow-md flex">
                <div className="w-1/3 pr-3">
                    <div className="md:flex flex-col mb-6">
                        <label className="block text-gray-500 font-bold mb-3" htmlFor="inline-full-name">
                            Customer Type
                        </label>
                        <div className="w-full">                    
                            <select
                                name="select"
                                value={selectedCustomerType}
                                onChange={(e) => setSelectedCustomerType(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled>
                                    Select Customer Type
                                </option>
                                <option value="all">All</option>
                                <option value="new">New</option>
                                <option value="existing">Existing</option>
                            </select>
                        </div>
                    </div>
                    <div className="md:flex flex-col mb-6">
                        <label className="block text-gray-500 font-bold mb-3" htmlFor="inline-full-name">
                            Email Template
                        </label>
                        <div className="w-full">   
                            <select
                                    name="selectedTemplate"
                                    value={selectedTemplate}
                                    onChange={(e) => setSelectedTemplate(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option>
                                        Select Customer Type
                                    </option>
                                    {
                                        emailTemplateData && emailTemplateData.map((item,i) => (
                                            <option key={i} value={i}>{(i+1) + " - "+item.judul}</option>
                                        ))
                                    }
                            </select>  
                        </div>
                    </div>
                    <button onClick={e => {sendEmail()}} className='px-4 py-2 text-black rounded-md bg-orange-500 font-medium hover:bg-orange-400'>Send Email</button>
                </div>
                <div className="w-2/3">
                    {
                        template && (
                            <div dangerouslySetInnerHTML={{ __html: template.template }} />
                        )
                    }
                </div>
            </div>
        </div>
  )
}


export default BlastEmail