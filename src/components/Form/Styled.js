import styled from "styled-components";
import { THEME } from "../../theme";

export const WelcomeWrapper = styled.div`
    background:${THEME.white};
    height:600px;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:6px;
    box-shadow:${THEME.form_box_shadow};
    flex-direction:column;
    gap:30px;
    color:${THEME.grey};
    & h2{
        font-size:1rem;
    }
`

export const SvgWrapper = styled.div`
    width:220px;
    height:168px;
    position:relative;
    & img{
        position: absolute;
        inset: 0;
        width: 100%;
        margin: auto;
    }
`

export const PrintSubTitle = styled.span`
font-size:${props => props.Size || '12px'};
text-transform:${props => props.UPPER ? 'uppercase' : 'none'};
font-weight:${props => props.Weight || '500'};
text-align:${props => props.TextAlign};
letter-spacing:.5px;
text-decoration:${props => props.Under};
`;

export const PrintTitle = styled.h5`
font-size:${props => props.Size || '12px'};
text-transform:${props => props.UPPER ? 'uppercase' : 'none'};
font-weight:${props => props.Weight || '500'};
text-align:${props => props.TextAlign};
margin-top:${props => props.MT};
`;


export const TableIconHolder = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;

    & svg{
        font-size:${props => props.size || '15px'};
        color:${props => props.color || 'black'};
        cursor: pointer;
    }
`

export const PrintViewTitle = styled.h1`
    /* color:black; */
    /* font-family: Arial, Helvetica, sans-serif;-+ */
    text-transform:uppercase;
    letter-spacing:1px;
    font-weight:600;
    font-size:12px;
    line-height: 1.6;

`
export const PrintViewValues = styled.h1`
    letter-spacing:1px;
    font-weight:600;
    font-size:12px;
    padding-left:5px;
    white-space: break-spaces !important;

 & pre{
  @media (max-width:1100px){
        white-space: break-spaces !important;
      }

 }

    
`
export const PrintViewValue = styled.h1`
    letter-spacing:1px;
    font-weight:600;
    font-size:12px;
    padding-left:5px;
 /* white-space: break-spaces !important; */

 & pre{
    font-size:12px;
     white-space: break-spaces !important;
     overflow:hidden;
  @media (max-width:1100px){
        /* white-space: break-spaces !important; */
        
      }

 } 
 /* & h4{
        text-transform: capitalize;
 } */

    
`

export const PrintHolder = styled.div`
    /* width:100%;
    margin:auto;
    background:green; */
    padding: 10px 10px;
    @media print{     
        width:100%;
        margin:auto;
        padding: 0px 10px;
    }
`

export const PrintWrapper = styled.div`
    width:100%;
    /* padding: 50px 50px; */
`

export const TableHolder = styled.div`
    margin-top:15px;   
    & table{
        width:100%;
        border:1px solid;
        border-collapse:collapse;
    } 
    & table thead tr th{
        border:1px solid;
        font-size:10px;
        padding: 0 5px;
    }

     & table tbody tr td{
        border:1px solid;
        font-size:12px;
        padding: 10px 5px;
    }
    & table tfoot tr th {
    border: 1px solid;
    font-size: 12px; 
    padding: 1px 5px; 
    /* text-align: center;  */
  }
  & table tfoot  td  {
    font-size: 12px ;
    font-weight: 500;
 
  }


    @media print {
         /* & table {
            page-break-before: always
        } */
         & table tbody tr td{
            /* page-break-inside: avoid;  */
           page-break-after: auto;
        } 
        /* & table tbody tr:nth-child(5n + 1) {
          page-break-before: always;
        } */
    }
`

export const ProfileHeader = styled.h1`
    font-size:18px;
    color:${THEME.primary};
    text-align:center;
`

export const ProfileSubTitle = styled.h1`
    font-size:16px;
    color:${THEME.gray_dark};
    text-align:center;
    margin:10px;
    border-bottom:2px solid;
    /* width:100%; */
    display:inline-block;
`

export const FooterTitle = styled.span`
    display:inline-block;
    font-size:14px;
    color:${THEME.gray_dark};
    text-align:left;
    margin:10px;
    border-bottom:1px solid ${THEME.gray_dark};
`

export const AuthersiedBox = styled.div`
    margin:20px 0;
    border:1px solid;
    /* padding:10px 0; */

    & span{
        font-size:12px;
        font-weight:600;
        color:${THEME.gray_dark};
    }
`

export const ProfileAddress = styled.p`
    font-size:12px;
    letter-spacing:1px;
    font-weight:600;
    color:${THEME.primary_color_dark};
    text-align:center;
`
export const PrintTableFooterHolders = styled.div`
    @media print {
        page-break-inside:auto;
        /* background:red; */
    }
`

export const PrintTableFooterHolder = styled.div`
    @media print {
        page-break-inside:avoid;
        /* background:red; */
    }
`

export const SignImageHolder = styled.div`
    margin-right:10px;
    width:250px;
    height:70px;
    /* border:1px solid; */
    position:relative;
     
     & img{
        position:absolute;
        height: 100%;
        width: 100%;
        object-fit:contain;
     }
`

export const BetweenHolder = styled.div`
    background:gray;
    display: none;
    align-items: center;
    padding: 0 10px;
    font-weight: 600;
    color: ${THEME.white};
    letter-spacing: 1px;

    @media ${THEME.MOBILEL} {
        display:flex;
    }
`
