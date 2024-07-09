import { createGlobalStyle } from 'styled-components'
import { THEME } from '.'
// import NoirMediumFont from '../../src/fonts/Noir_medium.woff';

const GlobalStyle = createGlobalStyle`
    * {
        margin:0;
        padding: 0;
        box-sizing:border-box;
        font-family: 'Urbanist', sans-serif;
        font-weight: 600 !important;
        font-size: 14px;
        letter-spacing: 0.03em;
        font-feature-settings: 'tnum';
        font-variant: tabular-nums;
        line-height: 1.3;
    } 
  body {
        margin: 0;
        padding: 0;
        font-family: 'Urbanist', sans-serif;
        width:100%;
        font-weight: 500 !important;
        font-size: 14px;
        color: #545454;
        font-variant: tabular-nums;
        /* user-select: none; */
     } 
   
  & .ant-menu-item-icon {
    font-size: 23px !important;
   }
   .ant-drawer .ant-drawer-body {
    padding: 0% !important;
    overflow: hidden !important;
   }
   .scroll {
    overflow-y: scroll;
   }

   .ant-form-item .ant-form-item-label >label {
   /* height: 1px !important; */
   /* margin-top: 12px !important; */
   }

    ::-webkit-scrollbar {
    width: 0px;
    height: 10px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #1677ff; 
        cursor: pointer;
        border-radius: 10px;

    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgb(3 108 255 / 43%);
        border-radius: 10px;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgb(3 108 255 / 43%);
        visibility: visible;
    }
    .ant-form-item {
        margin-bottom: 6px !important;
    }

    .ant-pagination .ant-pagination-item-active a {
    color: #1677ff;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
}
    

`

export default GlobalStyle
