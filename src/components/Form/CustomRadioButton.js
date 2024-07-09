/* eslint-disable */
import React, { useState } from 'react'
import { Radio as AntdRadio, Form } from 'antd'
import { THEME } from '../../theme'
import styled from 'styled-components'

const StyledRadio = styled(AntdRadio)`
  width: 100%;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${THEME.HEADING};
  
  .ant-radio-input:focus + .ant-radio-inner {
    box-shadow: none !important;
  }
`

export const CustomRadioButton = ({ onChange, data, rules,options,checked, name, label, disabled, ...rest }) => {

    // const [checked, setChecked] = useState(data[0].value)

    // const handleOnChange = (e) => {
    //     onChange(e)
    //     setChecked(e.target.value)
    // }

    // console.log(checked, 'checked')

    return (

        <Form.Item name={name} rules={rules} style={{ marginBottom: '0' }} label={label}>
            <StyledRadio.Group onChange={onChange} disabled={disabled} >
                {options.map((option) => (
                    <StyledRadio key={option.value} value={option.value} checked={checked}>
                        {option.label}
                    </StyledRadio>
                ))}
            </StyledRadio.Group>
        </Form.Item>
    )
}
