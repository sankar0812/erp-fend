import React from 'react'
import { Tag as AntdTag } from 'antd'
import styled from 'styled-components'

const StyledTag = styled(AntdTag)`
    & h6{
        font-size:14px;
    }
`

export const CustomTag = ({ bordered, color, title ,onClick, style}) => {

    return (
        <StyledTag style={style} bordered={bordered} color={color} onClick={onClick}>
            <h6>
                {title}
            </h6>
        </StyledTag>
    )
}
