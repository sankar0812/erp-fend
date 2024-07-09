import styled from "styled-components";

export const CustomHolder = styled.div`
    background:#fff;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    max-width:${props=>props.width ? props.width : '100%'};
    border-radius:10px;
    padding:20px;
    margin:auto;
    margin-top:${props=>props.mt ? props.mt : '0'};
`