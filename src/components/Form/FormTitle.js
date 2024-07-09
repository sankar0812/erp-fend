import React from 'react'
import styled from 'styled-components'
import { THEME } from '../../theme';

export const FoemTitle  = styled.div`
& h5 {
    font-size: 26px;
    color: var(--dark-color);
    font-weight: 500;
    text-transform:capitalize;
    margin-bottom:20px;
}
`;

export const StyledInvoiceTitle  = styled.div`
& h5 {
    font-size: 20px;
    color: var(--dark-color);
    font-weight: 500;
    text-transform:capitalize;
    margin-bottom:20px;
}
`;

export const FormTitle = ({Title}) => {
  return (
    <FoemTitle>
        <h5>{Title}</h5>
    </FoemTitle>
  )
}

export const InvoiceTitle = ({Title}) => {
  return (
    <StyledInvoiceTitle>
        <h5>{Title}</h5>
    </StyledInvoiceTitle>
  )
}

