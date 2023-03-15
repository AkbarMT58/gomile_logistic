import React, { Fragment, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { sendReport } from 'service/api'
import swal from 'sweetalert'
import {
Table,
TableContainer,
TableHead,
TableCell,
TableRow,
TableBody,
Paper,
Tooltip,
} from '@mui/material';

export default function ReportIssueForm({ id, id_group, endpoint, handleClose, setUpdate, isLoading, setIsLoading, dataOrder }) {
    const [dirty, setDirty] = useState([])
    const [payloadReportIssue, setPayloadReportIssue] = useState({
        id_so: id,
        id_group: id_group,
        type: '',
        actual_total: '',
        actual_shipping_cost: '',
        endpoint: endpoint,
    })
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(dataOrder) {
            let tempDataOrder = JSON.parse(JSON.stringify(dataOrder))
            for (let i = 0; i < tempDataOrder.length; i++) {
                tempDataOrder[i].qty_available = tempDataOrder[i].qty
            }
            setProducts(tempDataOrder)
        }
    }, [dataOrder])
    
    const handleOnChange = (e) => {
        if (e.target.name === 'type' && e.target.value === 'No stock') {
            setPayloadReportIssue(prev => {return {...prev, [e.target.name]: e.target.value, actual_total: '', actual_shipping_cost: ''}})
        } else {
            setPayloadReportIssue(prev => {return {...prev, [e.target.name]: e.target.value}})
        }
    }

    const handleChangeQty = (e, index) => {
        if(e.target.value >= 0) {
            let tempProducts = JSON.parse(JSON.stringify(products))
            tempProducts[index].qty_available = parseInt(e.target.value)
            setProducts(tempProducts)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(dirty.length === 0) {
            setDirty(['type', 'actual_total', 'actual_shipping_cost'])
            return;
        } else {
            setIsLoading(true)
            const finalPayload = {...payloadReportIssue}
            if(payloadReportIssue.type === 'No stock' ) {
                let productPayload = []
                products?.map((product) => {
                    productPayload.push({
                        id_product: product.idProduk,
                        product: product.name,
                        qty: product.qty_available,
                        link: product.link,
                        variant: product.variant,
                        price: product.highestPrice,
                        pic: product.image,
                    })
                })
                finalPayload.actual_total = 0
                finalPayload.actual_shipping_cost = 0
                finalPayload.product = productPayload
                
                send_Report(finalPayload)
            }

            if(payloadReportIssue.type !== 'No stock' && payloadReportIssue.actual_total !== '' && payloadReportIssue.actual_shipping_cost !== '') {
                finalPayload.actual_total = parseInt(finalPayload.actual_total.replaceAll('.', ''))
                finalPayload.actual_shipping_cost = parseInt(finalPayload.actual_shipping_cost.replaceAll('.', ''))

                send_Report(finalPayload)
            }
        }
    }

    const send_Report = async (finalPayload) => {
        const response = await sendReport(JSON.stringify(finalPayload))
        if(response?.status === 200) {
            setUpdate((prev) => !prev);
            swal('Success', 'Report berhasil di-submit!').then(() => {
                handleClose()
            })
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
                name='type' 
                value={payloadReportIssue.type}
                onChange={handleOnChange}
                onBlur={(e) => setDirty([...new Set([...dirty, e.target.name])])}
                className='border w-[20rem] rounded-md px-2'>
                    <option value="">Select type of issue</option>
                    <option value="Loss money (shipping cost)">Loss money (shipping cost)</option>
                    <option value="Loss money (different price)">Loss money (different price)</option>
                    {endpoint === "new_orders" &&
                        <option value="No stock">No stock</option>
                    }
                </select>
            </div>
            {dirty.indexOf('type') >= 0 && payloadReportIssue.type === '' &&
                <div className="text-right text-xs text-red-600">Required</div>
            }
        </div>

        {payloadReportIssue.type === 'No stock' && endpoint === "new_orders" &&
            <TableContainer
                component={Paper}
                sx={{ maxHeight: "20rem" }}
                className='variant-scroll text-sm'>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>PIC</TableCell>
                            <TableCell>SKU</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Link</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>QTY Ordered</TableCell>
                            <TableCell sx={{textAlign: 'center'}}>QTY Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((rowData, id) => {
                        return (
                        <Fragment key={id}>
                            <TableRow>
                            <TableCell>
                                <div>
                                {rowData.image && (
                                    <img
                                    src={rowData.image}
                                    alt='product'
                                    className='w-10 rounded-md'
                                    />
                                )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className=''>
                                    <Tooltip title={rowData.sku}>
                                        <p
                                            className={`uppercase line-clamp-1`}>
                                            {rowData.sku}
                                        </p>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='w-48'>
                                    <Tooltip title={rowData.name}>
                                        <p
                                            className={`uppercase line-clamp-1`}>
                                            {rowData.name}
                                        </p>
                                    </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                <Tooltip title={rowData.link}>
                                    <a
                                    href={rowData.link}
                                    target='_blank'
                                    tabIndex={999}
                                    className={`line-clamp-1 w-40 font-semibold hover:text-blue-400  transition-all duration-300 ${
                                        rowData.qty === 0 && 'text-gray-400'
                                    }`}
                                    rel='noreferrer'>
                                    {rowData.link}
                                    </a>
                                </Tooltip>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='w-48 text-center'>
                                    {rowData.qty}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='flex justify-center'>
                                    <input
                                        name='quantity'
                                        value={rowData.qty_available}
                                        onChange={(e) => handleChangeQty(e, id)}
                                        type='number'
                                        className='w-16 rounded-md border border-gray-300 p-1 focus:outline-blue text-center'
                                    />
                                </div>
                            </TableCell>
                            </TableRow>
                        </Fragment>
                        );
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        }

        {payloadReportIssue.type !== 'No stock' &&
            <div className='w-max'>
                <div className="flex items-center">
                    <div className="w-[15rem]">Actual Total*</div>
                    <NumberFormat
                    name='actual_total' 
                    value={payloadReportIssue.actual_total}
                    className='border w-[20rem] rounded-md outline-none px-2'
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    decimalScale={2}
                    // prefix={'Rp. '}
                    onChange={handleOnChange}
                    onBlur={(e) => setDirty([...new Set([...dirty, e.target.name])])}
                    />
                </div>
                {payloadReportIssue.type !== 'No stock' && dirty.indexOf('actual_total') >= 0 && payloadReportIssue.actual_total === '' &&
                    <div className="text-right text-xs text-red-600">Required</div>
                }
            </div>
        }
            
            <div className="flex justify-between">
                {payloadReportIssue.type !== 'No stock' &&
                    <div className='w-max'>
                        <div className="flex items-center">
                            <div className="w-[15rem]">Actual Shipping Cost*</div>
                            <NumberFormat
                            name='actual_shipping_cost' 
                            value={payloadReportIssue.actual_shipping_cost}
                            className='border w-[20rem] rounded-md outline-none px-2'
                            thousandSeparator={'.'}
                            decimalSeparator={','}
                            decimalScale={2}
                            // prefix={'Rp. '}
                            onChange={handleOnChange}
                            onBlur={(e) => setDirty([...new Set([...dirty, e.target.name])])}
                            />
                        </div>
                        {payloadReportIssue.type !== 'No stock' && dirty.indexOf('actual_shipping_cost') >= 0 && payloadReportIssue.actual_shipping_cost === '' &&
                            <div className="text-right text-xs text-red-600">Required</div>
                        }
                    </div>
                }
                <div className="ml-auto">
                <button
                    type="submit"
                    className="p-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md cursor-pointer"
                    disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Report'}
                </button>
                </div>
            </div>
        {/* <div className='text-xs font-semibold italic'>*Kosongkan apabila karena no stock</div> */}
    </form>
  )
}
