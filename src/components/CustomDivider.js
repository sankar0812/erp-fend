import React from 'react'
import { Divider as AntdDivider } from 'antd';
import styled from 'styled-components';
import { THEME } from '../theme';

export const CustomDivider = ({ type }) => {

    return (
        <StyledDivider type={type} />
    )
}


const StyledDivider = styled(AntdDivider)`
    margin:0;
    /* background:${THEME.gray_dark}; */
`
