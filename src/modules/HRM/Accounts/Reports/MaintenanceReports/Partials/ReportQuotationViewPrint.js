import { Card, Col } from 'antd';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import styled from 'styled-components';
import { ToWords } from 'to-words';
import { CustomRow } from '../../../../../../components/CustomRow';
import Flex from '../../../../../../components/Flex';
import Button from '../../../../../../components/Form/CustomButton';
import { PrintHolder, PrintSubTitle, PrintTableFooterHolders, PrintTitle, PrintViewTitle, PrintViewValue, PrintWrapper, SignImageHolder } from '../../../../../../components/Form/Styled';
import { base } from '../../../../../../utils/request';
import { getBusinessProfile, selectAllBusinessProfile } from '../../../../../BusinessProfile/BusinessSlice';
import { getMaintenance, getMaintianInvoices } from '../../../Invoice/invoiceSlice';

const BillTable = styled.div`
overflow-x:auto !important;

& table thead tr th{
    font-size:12px !important;
     padding: 10px;
}

& table tbody tr td{
    font-size:12px !important;
    padding:10px;
}

& table tbody tr:nth-child(even) td {
  background-color:#f3f8f9; 
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
  background-color:#ce3024;
  color:#fff
}

td {
  text-align: center;
}
`;


export const ReportMaintenanceViewPrint = ({ record }) => {
console.log(record,'record');
    const [recordData, setRecordData] = useState([])
    const dispatch = useDispatch()
    const componentRef = useRef();

    const toWords = new ToWords({
        localeCode: 'en-IN',
        converterOptions: {
            currency: true,
            ignoreDecimal: false,
            ignoreZeroCurrency: false,
            doNotAddOnly: false,
            currencyOptions: { // can be used to override defaults for the selected locale
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

    // ========Company profile =============//

    useEffect(() => {
        dispatch(getBusinessProfile())
    }, [])

    const profdetails = useSelector(selectAllBusinessProfile)


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })


    //==========

    const AllMaintenanceViews = useSelector(getMaintianInvoices)

    useEffect(() => {
        dispatch(getMaintenance())
    }, [])

    useEffect(() => {
        setRecordData(record)
    }, [record])

    const formattedAmount = toWords.convert(record?.total, { currency: true });
     
    //==========Term & conditions ,additionalnotes==================//

    const TermData = recordData?.quotationList
    const TotalTermDAta = TermData?.map((item) => {
        return {
            termsAndCondition: item.termsAndCondition,
            additionalNotes: item.additionalNotes,
        }
    })
    //=================

    const Header = () => {
        return (
            <PrintWrapper>
                <PrintHolder ref={componentRef}>
                <h1 style={{ fontSize: '22px', color: '#fe7900', textAlign: 'center' }}>Maintenance Invoice</h1>
                    <Flex spacebetween="true" aligncenter style={{paddingBottom: '10px'}} >
                        <div>
                            <Flex aligncenter={'true'} >
                                <img src={`${base}${profdetails?.url}`} alt='signature' style={{ height: '50px', width: '50px' }} />&nbsp;&nbsp;
                                <h2 style={{ fontSize: '20px', color: 'blue' }}>{profdetails?.companyName}</h2>
                            </Flex>
                        </div>
                        <div >
                            <Flex aligncenter={'true'}  >
                                <p style={{ paddingBottom: '15px' }}>Maintenance Invoice No :</p>
                                <p style={{ fontWeight: 'bolder', fontSize: '15px', color: '#000', paddingBottom: '15px' }}>{recordData?.maintenanceInvoiceId}</p>
                            </Flex>
                            <Flex>
                                <p>Date :</p>
                                <p style={{ fontWeight: 'bolder', fontSize: '15px', color: '#000' }}>{recordData?.invoiceDate}</p>
                            </Flex>
                        </div>
                    </Flex>


                    <div style={{ margin: '10px 0px' }}>
                        <CustomRow space={[12, 12]}>
                            <Col span={24} md={12}>
                                <div style={{ backgroundColor: '#f4433624', display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <h1 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: "10px", color: '#ffaf6d' }}>Invoice from</h1>
                                    <p style={{ marginBottom: "5px"}}>{recordData?.companyAddress}</p>
                                    <p style={{ marginBottom: "5px" }}>Email:{recordData?.companyEmail}</p>
                                    <p style={{ marginBottom: "5px" }}>Contact No:{recordData?.companyPhoneNumber}, {recordData?.companyMobileNumber}</p>
                                    <p><span style={{ fontSize: '14px', fontWeight: 'bold' }}>GSTIN :</span>{profdetails?.gstNo}</p>
                                </div>
                            </Col>
                            <Col span={24} md={12} style={{ backgroundColor: '#f4433624' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}>
                                    <h1 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: "10px", color: '#ffaf6d' }}>Invoice to</h1>
                                    <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: "5px" }}>{recordData?.clientName}</p>
                                    <p style={{ marginBottom: "5px" }}>{recordData?.address},{recordData?.country}</p>
                                    <p>Email :{recordData?.email},</p>
                                    <p>Conatct :{recordData?.phoneNumber}</p>
                                </div>
                            </Col>
                        </CustomRow>
                    </div>

                    <BillTable>
                        <table>
                            <thead>
                                <tr>
                                    <th>SI.NO</th>
                                    <th>Project Name</th>
                                    <th>Description</th>
                                    <th>RATE</th>
                                    <th>TAX AMT</th>
                                    <th>TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    recordData?.maintenanceList?.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item?.projectName}</td>
                                            <td>{item?.description}</td>
                                            <td>{item?.price}</td>
                                            <td>{item?.taxAmount === 0 ? '-':item?.taxAmount}</td>
                                            <td>{item?.subTotal}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </BillTable>
                    <PrintTableFooterHolders>
                        <Flex gap={'5px'} alignend={'true'}>
                            <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px', }}></p> Total Amount In Words&nbsp;&nbsp;
                            <h1>:</h1>
                            <PrintViewValue>
                                <h4 style={{ textTransform: 'uppercase', fontSize: '12px' }}>{formattedAmount}</h4>

                            </PrintViewValue>
                        </Flex><br />

                        <CustomRow space={[12, 12]}>
                            <Col span={18} md={16}>
                            </Col>
                            <Col span={18} md={8} style={{ textAlign: 'end' }}>
                                {/* <Flex flexend={'true'}> */}
                                <CustomRow space={[2, 2]} >
                                    <Col span={24} sm={12} md={12}>
                                        <Flex gap={'5px'} spacebetween="true" >
                                            <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px', color: '#01ae03' }}>Grand Total</p>
                                            <h1>:</h1>
                                        </Flex>
                                    </Col>
                                    <Col span={24} sm={12} md={12}>
                                        <Flex >
                                            <PrintViewValue>
                                                <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px', color: '#01ae03' }}>₹&nbsp;{recordData?.total}</p>
                                            </PrintViewValue>
                                        </Flex>
                                    </Col>
                                </CustomRow>
                                {/* </Flex> */}
                            </Col>
                        </CustomRow>
                    </PrintTableFooterHolders>

                    <CustomRow space={[12, 12]}>
                        <Col span={24} md={24}>
                            <Flex gap={'5px'} spacebetween="true">
                                <h1 style={{ color: '#ce3024', fontSize: '16px', fontWeight: 'bolder', margin: '10px 0px' }}>{recordData?.title} :</h1>
                            </Flex>
                        </Col>
                        <Col span={24} md={24}>
                            {/* <Flex >
                                <PrintViewValue>
                                    {TotalTermDAta?.map((item, index) => {
                                        return (
                                            <>
                                                <Col span={24}>
                                                    <Flex> */}
                                                     <p style={{ marginBottom: '5px' }}>&nbsp;{recordData?.terms}</p>

                                                    {/* </Flex>
                                                </Col>
                                            </>
                                        );
                                    })}
                                </PrintViewValue>
                            </Flex> */}
                        </Col>
                        {/* <Col span={24} md={24}>
                            <Flex gap={'5px'} spacebetween="true" >
                                <h1 style={{ color: '#ce3024', fontSize: '16px', fontWeight: 'bolder', margin: '10px 0px' }}>Additional Notes :</h1>
                                <h1>:</h1>
                            </Flex>
                        </Col>
                        <Col span={24} md={24}>
                            <Flex >
                                <PrintViewValue>
                                    {TotalTermDAta?.map((item, index) => {
                                        return (
                                            <>
                                                <Col span={24}>
                                                    <Flex>
                                                        <p style={{ marginBottom: '5px' }}>{index + 1})&nbsp;{item.additionalNotes}</p>

                                                    </Flex>
                                                </Col>
                                            </>
                                        );
                                    })}
                                </PrintViewValue>
                            </Flex>
                        </Col> */}
                    </CustomRow>


                    <div style={{ pageBreakInside: 'avoid', margin: '10px 10px' }}>
                        <CustomRow gutter={[24, 24]}>
                            <Col span={24} md={24}><PrintSubTitle Under Size={'12px'} Weight={'600'}>Declaration :</PrintSubTitle>
                                <PrintTitle Size={'12px'} >We declare that this invoice shows the actual price of the
                                    goods described and that all particulars are true and correct.</PrintTitle>
                            </Col>
                        </CustomRow>
                        <div style={{ border: '1px solid', padding: '2px 10px', marginTop: '8px' }}>
                            <CustomRow>
                                <Col span={12}><PrintSubTitle Size={'12px'} Weight={'600'}>Customer's Seal and Signature</PrintSubTitle></Col>
                                <Col span={12} style={{ textAlign: 'end' }}><b>for</b><PrintSubTitle Size={'14px'} Weight={'600'} UPPER> {profdetails.companyName}</PrintSubTitle></Col>
                            </CustomRow>
                            <PrintTitle Size={'14px'} TextAlign={'end'} MT={'30px'}>Authorised Signatory  </PrintTitle>
                            <Flex flexend={'true'}>
                                {/* <SignImageHolder >
                                    {activePro.signature ? (
                                        <img src={activePro.signature} alt="signature" />
                                    ) : null}
                                </SignImageHolder> */}
                            </Flex>
                        </div>
                        <PrintTitle Size={'14px'} TextAlign={'center'}>This is a Computer Generated Invoice</PrintTitle>
                    </div>
                </PrintHolder>
            </PrintWrapper>
        )
    }

    // const Footer = () => {
    //     return (
    //         <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
    //             <div style={{ flex: 0.6, padding: '5px' }}>
    //                 <h1 style={{ color: '#fe7900', fontSize: '16px', fontWeight: 'bolder', margin: '10px 0px' }}>Terms and Conditions</h1>
    //                 <p style={{ marginBottom: '5px' }}>1) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p>
    //                 <p style={{ marginBottom: '5px' }}>2) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p>
    //                 <h1 style={{ color: '#fe7900', fontSize: '16px', fontWeight: 'bolder', margin: '10px 0px' }}>Additional Notes</h1>
    //                 <p style={{ marginBottom: '5px' }}>1) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p>
    //                 <p style={{ marginBottom: '5px' }}>2) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p>

    //                 <p style={{ margin: '20px 0px' }}>For any enquiries, email us on <span style={{ fontWeight: 'bolder', fontSize: '15px' }}>{businessProfile?.email}</span> or <br /> call us on <span style={{ fontWeight: 'bolder', fontSize: '15px' }}>{businessProfile?.phoneNumber1}</span></p>
    //             </div>
    //             <div style={{ flex: 0.4, padding: '5px' }}>
    //                 <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px', borderBottomStyle: 'dashed', borderBottomWidth: 1 }}>
    //                     <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px', color: '#01ae03' }}>Grand Total</p>
    //                     <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px', color: '#01ae03' }}>₹20000</p>
    //                 </div>
    //                 <div style={{ margin: '20px', borderBottomStyle: 'dashed', borderBottomWidth: 1 }}>
    //                     <p>Total in words</p>
    //                     <p style={{ fontWeight: 'bolder', color: '#000', margin: '10px 0px' }}>{formattedAmount}</p>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    return (
        <div>
            <Button.Primary text={<AiFillPrinter style={{ fontSize: '30px' }} />} onClick={handlePrint} />
            <Header />
            {/* <Footer /> */}
        </div>
    )
}
