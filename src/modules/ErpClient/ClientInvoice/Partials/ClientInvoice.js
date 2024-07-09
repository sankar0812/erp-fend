import React from 'react'
import styled from 'styled-components';
import { ToWords } from 'to-words';
import { base } from '../../../../utils/request';

const BillTable = styled.div`

& table thead tr th{
    font-size:12px !important;
     padding: 10px;
}

& table tbody tr td{
    font-size:12px !important;
    padding:10px;
}

& table tbody tr:nth-child(even) td {
    background-color:#feefdf; 
  }

@media print {
    
}
table {
  width: 100%;
  // height: 200px;
  border-collapse: collapse;
  /* padding: 2px; */
  margin-bottom:20px !important;
  // border:1px solid #656565;

}

th {
  background-color:${'#fe7900'};
  color:#fff
}

td {
  text-align: center;
}
`;

export const ClientInvoice = ({ businessProfile, invoicerecord }) => {

    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: {
                name: 'Rupee',
                plural: 'Rupees',
                symbol: '₹',
                fractionalUnit: {
                    name: 'Paisa',
                    plural: 'Paise',
                    symbol: '',
                },
            }
        }
    });
    const formattedAmount = toWords.convert(invoicerecord?.amount, { currency: true });

    // const invoiceList = [
    //     {
    //         item_name: 'devil fruit',
    //         quantity: 10,
    //         rate: 100
    //     },
    //     {
    //         item_name: 'Cursed Object',
    //         quantity: 5,
    //         rate: 120
    //     }
    // ]

    const Header = () => {
        return (
            <div>
                <h1 style={{ fontSize: '22px', margin: "20px 0px", color: '#fe7900', textAlign: 'center' }}>Invoice</h1>

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <img src={`${base}${invoicerecord?.company}`} alt='signature' style={{ height: '70px', width: '70px' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '200px' }}>
                        <div style={{ flex: 0.5, }}>
                            <p style={{ paddingBottom: '15px' }}>Invoice No.</p>
                            <p>Invoice Date</p>
                        </div>
                        <div style={{ flex: 0.5, }}>
                            <p style={{ fontWeight: 'bolder', fontSize: '15px', color: '#000', paddingBottom: '15px' }}>{invoicerecord?.invoiceId}</p>
                            <p style={{ fontWeight: 'bolder', fontSize: '15px', color: '#000' }}>{invoicerecord?.invoiceDate}</p>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', margin: '20px 5px' }}>
                    <div style={{ flex: 0.5, backgroundColor: '#feefdf', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                        <h1 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: "10px", color: '#ffaf6d' }}>Invoice from</h1>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: "5px" }}>{invoicerecord?.companyName}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.companyAddress}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.location}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.companyState}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.country}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.pincode}</p>
                        {/* <p><span style={{ fontSize: '14px', fontWeight: 'bold' }}>GSTIN </span>33JH7FE7HFD6FF</p> */}
                    </div>
                    <div style={{ flex: 0.5, backgroundColor: '#feefdf', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                        <h1 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: "10px", color: '#ffaf6d' }}>Invoice to</h1>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: "5px" }}>{invoicerecord?.clientName}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.clientAddress}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.city}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.clientState}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.country}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.clientZipcode}</p>
                        <p style={{ marginBottom: "5px" }}>{invoicerecord?.clientPhoneNumber}</p>
                        {/* <p><span style={{ fontSize: '14px', fontWeight: 'bold' }}>Email Id </span>{invoicerecord?.email}</p> */}
                    </div>
                </div>

                <BillTable>
                    <table>
                        <thead>
                            <tr>
                                <th>SI.NO</th>
                                <th>ITEM NAME</th>
                                <th>QUANTITY</th>
                                <th>RATE</th>
                                <th>Dis %</th>
                                <th>Discount Amount</th>
                                <th>Tax % </th>
                                <th>Tax Amount</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                invoicerecord?.invoiceList.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item?.projectName}</td>
                                        <td>{item?.quantity}</td>
                                        <td>₹{item?.price}</td>
                                        <td>₹{item?.discountPercentage}</td>
                                        <td>₹{item?.discountAmount}</td>
                                        <td>₹{item?.gst}</td>
                                        <td>₹{item?.taxQuantityAmount}</td>
                                        <td>₹{item?.amount}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                {/* <td>{index + 1}</td>
                                <td>{invoicerecord?.item_name}</td>
                                <td>{invoicerecord?.quantity}</td>
                                <td>₹{invoicerecord?.rate}</td>
                                <td>₹{invoicerecord?.rate}</td> */}
                            </tr>
                        </tbody>
                    </table>
                </BillTable>

            </div>
        )
    }

    const Footer = () => {
        return (
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <div style={{ flex: 0.6, padding: '5px' }}>
                    {/* <h1 style={{ color: '#fe7900', fontSize: '16px', fontWeight: 'bolder', margin: '10px 0px' }}>Terms and Conditions</h1>
                    <p style={{ marginBottom: '5px' }}>1) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p>
                    <p style={{ marginBottom: '5px' }}>2) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p>
                    <h1 style={{ color: '#fe7900', fontSize: '16px', fontWeight: 'bolder', margin: '10px 0px' }}>Additional Notes</h1>
                    <p style={{ marginBottom: '5px' }}>1) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p>
                    <p style={{ marginBottom: '5px' }}>2) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p> */}

                    <p style={{ margin: '20px 0px' }}>For any enquiries, email us on <span style={{ fontWeight: 'bolder', fontSize: '15px', color: "red" }}>{invoicerecord?.companyEmail}</span> or <br /> call us on <span style={{ fontWeight: 'bolder', fontSize: '15px', color: 'red' }}>{invoicerecord?.phoneNumber1}</span></p>
                    <img src={`${base}${invoicerecord?.signature}`} alt='signature' style={{ height: '70px', width: '70px' }} />
                </div>
                <div style={{ flex: 0.4, padding: '5px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px', borderBottomStyle: 'dashed', borderBottomWidth: 1 }}>
                        <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px', color: '#01ae03' }}>Grand Total</p>
                        <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px', color: '#01ae03' }}>₹{invoicerecord?.amount}</p>
                    </div>
                    <div style={{ margin: '20px', borderBottomStyle: 'dashed', borderBottomWidth: 1 }}>
                        <p>Total in words</p>
                        <p style={{ fontWeight: 'bolder', color: '#000', margin: '10px 0px' }}>{formattedAmount}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <Footer />
        </div>
    )
}
