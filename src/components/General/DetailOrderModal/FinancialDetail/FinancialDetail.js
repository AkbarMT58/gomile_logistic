import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function FinancialDetail({ financialData }) {
  const {
    income,
    expense,
    percentage,
    profit,
    percentage_request,
    percentage_whchina,
    profit_request,
    profit_whchina,
  } = financialData;

  return (
    <div className='mt-2'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2} align='center' />
              <TableCell colSpan={2} align='center'>
                <p className='font-semibold text-xs'>Forcast</p>
              </TableCell>
              <TableCell colSpan={2} align='center'>
                <p className='font-semibold text-xs'>Warehouse China</p>
              </TableCell>
              <TableCell colSpan={2} align='center'>
                <p className='font-semibold text-xs'>Warehouse Indo</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align='center' />
              <TableCell align='center'>
                <p className='font-semibold text-xs'>Income</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-xs'>Expenditure</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-xs'>Income</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-xs'>Expenditure</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-xs'>Income</p>
              </TableCell>
              <TableCell align='center'>
                <p className='font-semibold text-xs'>Expenditure</p>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                <div className='text-blue-400 font-semibold'>Income</div>
                <div className='px-2 space-y-2 text-xs'>
                  <p>Customer Payment</p>
                  <p>Local Shipping IDN</p>
                  <p>Shipping Process</p>
                  <p>Discount</p>
                  <p>Others</p>
                  <p className='font-semibold'>Total Income</p>
                </div>
              </TableCell>
              <TableCell colSpan={2} align='left'>
                <div className='space-y-7 -ml-6'>
                  <div />
                  <div className='flex'>
                    <div className='space-y-2 w-1/2 text-center text-xs'>
                      <p>{income.customerPayment.toLocaleString('id-ID')}</p>
                      <p>{income.shippingCustomer.toLocaleString('id-ID')}</p>
                      <p>{income.processing_fee.toLocaleString('id-ID')}</p>
                      <p>{income.discount.toLocaleString('id-ID')}</p>
                      <p>{income.others.toLocaleString('id-ID')}</p>
                      <p className='font-semibold'>
                        {(
                          income?.customerPayment +
                          income?.shippingCustomer +
                          income?.discount +
                          income?.others +
                          income.processing_fee
                        ).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className='w-1/2' />
                  </div>
                </div>
              </TableCell>
              <TableCell colSpan={2} align='left'>
                <div className='space-y-7 -ml-6'>
                  <div />
                  <div className='flex'>
                    <div className='space-y-2 w-1/2 text-center text-xs'>
                      <p>{income.customerPayment.toLocaleString('id-ID')}</p>
                      <p>{income.shippingCustomer.toLocaleString('id-ID')}</p>
                      <p>{income.processing_fee.toLocaleString('id-ID')}</p>
                      <p>{income.discount.toLocaleString('id-ID')}</p>
                      <p>{income.others.toLocaleString('id-ID')}</p>
                      <p className='font-semibold'>
                        {(
                          income?.customerPayment +
                          income?.shippingCustomer +
                          income?.discount +
                          income?.others +
                          income.processing_fee
                        ).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className='w-1/2' />
                  </div>
                </div>
              </TableCell>
              <TableCell colSpan={2} align='left '>
                <div className='space-y-7 -ml-6'>
                  <div />
                  <div className='flex'>
                    <div className='space-y-2 w-1/2 text-center text-xs'>
                      <p>{income.customerPayment.toLocaleString('id-ID')}</p>
                      <p>{income.shippingCustomer.toLocaleString('id-ID')}</p>
                      <p>{income.processing_fee.toLocaleString('id-ID')}</p>
                      <p>{income.discount.toLocaleString('id-ID')}</p>
                      <p>{income.others.toLocaleString('id-ID')}</p>
                      <p className='font-semibold'>
                        {(
                          income?.customerPayment +
                          income.shippingCustomer +
                          income?.discount +
                          income?.others +
                          income.processing_fee
                        ).toLocaleString('id-ID')}
                      </p>
                    </div>
                    <div className='w-1/2' />
                  </div>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2}>
                <div className='space-y-2'>
                  <div className='text-red-500 font-semibold'>Expense</div>
                  <div className='px-2 space-y-2 text-xs'>
                    <p>COGS</p>
                    <p>Shiping China To idn</p>
                    <p>Extra Shipping Charge (Repacking & etc)</p>
                    <p>Local Shipping IDN</p>
                    <p>Refund</p>
                    <p>Voucher</p>
                    <p>Others</p>
                    <p className='font-semibold'>Total Expense</p>
                    <p className='font-semibold'>Net Profit / Loss</p>
                    <p className='font-semibold'>Order Profit (%)</p>
                  </div>
                </div>
              </TableCell>

              <TableCell colSpan={2} align='right'>
                <div className='space-y-7'>
                  <div />
                  <div className='flex'>
                    <div className='w-1/2' />
                    <div className='space-y-2 w-1/2 text-center text-xs'>
                      <p>{expense.request_price.toLocaleString('id-ID')}</p>
                      <p>
                        {expense?.shipping_forecast_request.toLocaleString(
                          'id-ID'
                        )}
                      </p>
                      <p>-</p>
                      <p>{expense?.shippingCustomer.toLocaleString('id-ID')}</p>
                      <p>{expense?.refund.toLocaleString('id-ID')}</p>
                      <p>{expense?.voucher.toLocaleString('id-ID')}</p>
                      <p>{expense?.others.toLocaleString('id-ID')}</p>
                      <p className='font-semibold'>
                        {expense?.total_request.toLocaleString('id-ID')}
                      </p>
                      <p className='font-semibold'>
                        {profit_request.toLocaleString('id-ID')}
                      </p>
                      <p className='font-semibold'>
                        {percentage_request.toFixed(2)} %
                      </p>
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell colSpan={2} align='right'>
                <div className='space-y-7'>
                  <div />
                  <div className='flex'>
                    <div className='w-1/2' />
                    <div className='space-y-2 w-1/2 text-center text-xs'>
                      <p>{expense.cogs.toLocaleString('id-ID')}</p>
                      <p>
                        {expense?.shipping_forecast_whchina.toLocaleString(
                          'id-ID'
                        )}
                      </p>
                      <p>{expense?.shippingChIdn.toLocaleString('id-ID')}</p>
                      <p>{expense?.shippingCustomer.toLocaleString('id-ID')}</p>
                      <p>{expense?.refund.toLocaleString('id-ID')}</p>
                      <p>{expense?.voucher.toLocaleString('id-ID')}</p>
                      <p>{expense?.others.toLocaleString('id-ID')}</p>
                      <p className='font-semibold'>
                        {expense?.total_whchina.toLocaleString('id-ID')}
                      </p>
                      <p className='font-semibold'>
                        {profit_whchina.toLocaleString('id-ID')}
                      </p>
                      <p className='font-semibold'>
                        {percentage_whchina.toFixed(2)} %
                      </p>
                    </div>
                  </div>
                </div>
              </TableCell>

              <TableCell colSpan={2} align='right'>
                <div className='space-y-7'>
                  <div />
                  <div className='flex'>
                    <div className='w-1/2' />
                    <div className='space-y-2 w-1/2 text-center text-xs'>
                      <p>{expense.cogs.toLocaleString('id-ID')}</p>
                      <p>{expense.shipping_ch_idn.toLocaleString('id-ID')}</p>
                      <p>{expense?.shippingChIdn.toLocaleString('id-ID')}</p>

                      <p>{expense?.shippingCustomer.toLocaleString('id-ID')}</p>
                      <p>{expense?.refund.toLocaleString('id-ID')}</p>
                      <p>{expense?.voucher.toLocaleString('id-ID')}</p>
                      <p>{expense?.others.toLocaleString('id-ID')}</p>
                      <p className='font-semibold'>
                        {expense?.total.toLocaleString('id-ID')}
                      </p>
                      <p className='font-semibold'>
                        {profit.toLocaleString('id-ID')}
                      </p>
                      <p className='font-semibold'>{percentage.toFixed(2)} %</p>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
