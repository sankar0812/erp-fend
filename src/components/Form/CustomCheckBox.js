
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Checkbox as AntdCheckbox, Form } from 'antd'

const StyledCheckbox = styled(AntdCheckbox)`
  & .ant-checkbox .ant-checkbox-inner {
    width: 18px;
    height: 18px;
    /* background: ${props => props.color || 'black'}; */

    &:hover {
      /* background: ${props => props.color || 'black'}; */
      /* border-color: ${props => props.color || 'black'}; */
    }
  }

  & .ant-checkbox .ant-checkbox-inner:after {
    inset-inline-start: 25%;
  }

  &.ant-checkbox-wrapper {
    align-items: center;
    height: 100%;
  }

  & .ant-checkbox-checked .ant-checkbox-inner {
    /* background-color: ${props => props.color || 'black'}; */
    /* border-color: ${props => props.color || 'black'}; */
  }
  
  .ant-checkbox + span {
    padding-left: 12px;
  }
`
const LabelWrapper = styled.div`
  font-size: 14px;
  line-height: 24px;
`

export const CustomCheckBox = ({ disabled,onChange, label, checked, name, color,  ...rest }) => {

  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (checked) {
      setIsChecked(true)
    } else{
      setIsChecked(false)
    }
  }, [checked])

  const handleChange = (checked, extraProps) => {
    if (!disabled) {
      setIsChecked(checked);
      onChange(checked, extraProps);
    }

    // console.log(checked,extraProps);
  };

   return (
    <Form.Item name={name} valuePropName="checked">
      <StyledCheckbox
        color={color}
        onChange={(checked, extraProps) => handleChange(checked, extraProps)} checked={isChecked} disabled={disabled}
        {...rest}
      >
        <LabelWrapper>{label}</LabelWrapper>
      </StyledCheckbox>
    </Form.Item>
  )
}