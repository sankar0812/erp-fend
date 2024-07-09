import React, { useEffect, useState } from 'react'
import { THEME } from '../../../../theme'
import styled from 'styled-components';
import { ToWords } from 'to-words';
import { base } from '../../../../utils/request';
import { useSelector } from 'react-redux';
import { getBusinessProfile, selectAllBusinessProfile } from '../../../BusinessProfile/BusinessSlice';
import { useDispatch } from 'react-redux';

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
  background-color:${'#7e2ee1'};
  color:#fff
}

td {
  text-align: center;
}
`;

export const AddClientQuotation = ({ FormExternalClose, handleOk, quotationrecord, }) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getBusinessProfile())
  }, [])
  
  const businessProfile = useSelector(selectAllBusinessProfile)

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
  const formattedAmount = toWords.convert(quotationrecord?.totalAmount, { currency: true });

  // const quotationList = [
  //   {
  //     item_name: 'devil fruit',
  //     quantity: 10,
  //     rate: 100
  //   },
  //   {
  //     item_name: 'Cursed Object',
  //     quantity: 5,
  //     rate: 120
  //   }
  // ]


  const Header = () => {
    return (
      <div>
        <h1 style={{ fontSize: '22px', margin: "20px 0px", color: '#7e2ee1' }}>Quotation</h1>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 0.7, }}>
            {/* <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', }}>
              <p style={{ flex: 0.25, }}>Quotation No.</p>
              <p style={{ flex: 0.7, fontWeight: 'bolder', fontSize: '15px', color: '#000' }}>001</p>
            </div> */}
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '25px' }}>
              <p style={{ flex: 0.25, }}>Quotation Date</p>
              <p style={{ flex: 0.7, fontWeight: 'bolder', fontSize: '15px', color: '#000' }}>25-10-2000</p>
            </div>
          </div>
          <div style={{ flex: 0.3, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <img src={`${base}${businessProfile?.url}`} alt='signature' style={{ height: '70px', width: '70px' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', margin: '20px 5px' }}>
          <div style={{ flex: 0.5, backgroundColor: '#f3f8f9', display: 'flex', flexDirection: 'row', padding: '10px' }}>
            <div style={{ flex: 0.4 }}>
              <p style={{ marginBottom: '10px' }}>Quotation by</p>
              <p style={{ marginBottom: '10px' }}>Address</p>
            </div>
            <div style={{ flex: 0.6 }}>
              <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px' }}>{businessProfile?.companyName}</p>
              <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px' }}>{businessProfile?.address}</p>
            </div>
          </div>
          <div style={{ flex: 0.5, backgroundColor: '#f3f8f9', display: 'flex', flexDirection: 'row', padding: '10px' }}>
            <div style={{ flex: 0.4 }}>
              <p style={{ marginBottom: '10px' }}>Quotation to</p>
              <p style={{ marginBottom: '10px' }}>Address</p>
            </div>
            <div style={{ flex: 0.6 }}>
              <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px' }}>{quotationrecord?.clientName}</p>
              <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px' }}>{quotationrecord?.address}</p>
            </div>
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
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {
                quotationrecord?.quotationList.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item?.projectName}</td>
                    <td>{item?.quantity}</td>
                    <td>₹{item?.rate}</td>
                    <td>₹{item?.amount}</td>
                  </tr>
                ))
              }

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
          {/* <p style={{ marginBottom: '5px' }}>2) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p> */}
          <h1 style={{ color: '#7e2ee1', fontSize: '16px', fontWeight: 'bolder', margin: '10px 0px' }}>Additional Notes</h1>
          <p style={{ marginBottom: '5px' }}>1) {quotationrecord?.quotationList[0]?.additionalNotes} </p>
          {/* <p style={{ marginBottom: '5px' }}>2) This clause is a stipulation usually employed in legal contracts.employed in legal contracts.</p> */}
          <h1 style={{ color: '#7e2ee1', fontSize: '16px', fontWeight: 'bolder', margin: '10px 0px' }}>Description</h1>
          <p style={{ marginBottom: '5px' }}>1) {quotationrecord?.quotationList[0]?.description} </p>
          <h1 style={{ color: '#7e2ee1', fontSize: '16px', fontWeight: 'bolder', margin: '10px 0px' }}>Terms and Conditions</h1>
          <p style={{ marginBottom: '5px' }}>1) {quotationrecord?.quotationList[0]?.termsAndCondition} </p>

          <p style={{ margin: '20px 0px' }}>For any enquiries, email us on <span style={{ fontWeight: 'bolder', fontSize: '15px' ,color : "red"}}>{businessProfile?.email}</span> or <br /> call us on <span style={{ fontWeight: 'bolder', fontSize: '15px' ,color : 'red'}}>{businessProfile?.phoneNumber1}</span></p>
        </div>
        <div style={{ flex: 0.4, padding: '5px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '20px', borderBottomStyle: 'dashed', borderBottomWidth: 1 }}>
            <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px', color: '#01ae03' }}>Grand Total</p>
            <p style={{ fontWeight: 'bolder', color: '#000', marginBottom: '10px', color: '#01ae03' }}>₹{quotationrecord?.totalAmount}</p>
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
