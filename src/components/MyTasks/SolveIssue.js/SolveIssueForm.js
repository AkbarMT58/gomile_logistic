import React, { useState } from 'react'
import NumberFormat from 'react-number-format'
import { solveIssue } from 'service/api'
import swal from 'sweetalert';

export default function SolveIssueForm({ data, id, handleClose, setUpdate }) {
    const [dirty, setDirty] = useState([])
    const [payload, setPayload] = useState({
        id_so: id,
        id_group: data.id_group,
        type: data.type,
        actual_total: data.actual_total,
        actual_shipping_cost: data.actual_shipping_cost,
        status: '',
        additional_payment: '',
    })

    const handleOnChange = (e) => {
        if (e.target.name === 'status' && e.target.value === "Don't need adjustment") {
            setPayload(prev => {return {...prev, [e.target.name]: e.target.value, additional_payment: ''}})
        } else {
            setPayload(prev => {return {...prev, [e.target.name]: e.target.value}})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(dirty.length === 0) {
            setDirty(['status', 'additional_payment'])
            return;
        } else {
            if(payload.status !== '') {
                const finalPayload = {...payload}
                if (payload.status === 'Need adjustment') {
                    finalPayload.additional_payment = parseInt(finalPayload.additional_payment.replaceAll('.', ''))
                }
                
                const response = await solveIssue(JSON.stringify(finalPayload))
                if(response?.status === 200) {
                    swal('', `Send Solve Issue Data Successfully`, 'success').then(() => {
                        setUpdate((prev) => !prev);
                        handleClose()
                    })
                } else {
                    swal('Oops', `Failed to send Solve Issue Data`, 'error');
                }
            }
        }
    }
  return (
    <form 
    onSubmit={handleSubmit}
    className='space-y-2'>
        <div className='w-max'>
            <div className="flex items-center">
                <div className="w-[15rem]">Type of issue</div>
                <select 
                name='status' 
                value={payload.status}
                onChange={handleOnChange}
                onBlur={(e) => setDirty([...new Set([...dirty, e.target.name])])}
                className='border w-[20rem] rounded-md px-2'>
                    <option value="">Select status of issue</option>
                    <option value="Need adjustment">Need adjustment</option>
                    <option value="Don't need adjustment">Don't need adjustment</option>
                </select>
            </div>
            {dirty.indexOf('status') >= 0 && payload.status === '' &&
                <div className="text-right text-xs text-red-600">Required</div>
            }
        </div>
        {payload.status !== "Don't need adjustment" &&
            <div className='w-max'>
                <div className="flex items-center">
                    <div className="w-[15rem]">Additional payment needed</div>
                    <NumberFormat
                    name='additional_payment' 
                    value={payload.additional_payment}
                    className='border w-[20rem] rounded-md outline-none px-2'
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    decimalScale={2}
                    // prefix={'Rp. '}
                    onChange={handleOnChange}
                    onBlur={(e) => setDirty([...new Set([...dirty, e.target.name])])}
                    />
                </div>
                {dirty.indexOf('additional_payment') >= 0 && payload.additional_payment === '' &&
                    <div className="text-right text-xs text-red-600">Required</div>
                }
            </div>
        }
        <button
            type="submit"
            className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md cursor-pointer">
            Submit
        </button>
    </form>
  )
}
