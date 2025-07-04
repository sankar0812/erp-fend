import React, { Fragment } from 'react'
import { Input as AntdInput, Form } from 'antd'
import styled from 'styled-components'
import { THEME } from '../../theme'
import Label from './Label'

const { Item } = Form

const StyledItem = styled(Item)`
  > div {
    width: 100%;
    text-align: left;
  }

  border-radius: 0.4rem;
  margin-bottom: 5px !important;

  & .ant-form-item-label {
    display:block;
    width:100%;
    text-align:start;
  }

  & .ant-form-item-label > label > span {
    font-weight: 600 !important;
    position: relative;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0.03em;
   

  }
`
const AntdInputStyle = styled(AntdInput)`
  height: ${props => (props.height ? props.height : '40px')};
  border-radius: 0.4rem;
  box-shadow: none;
  border-color: ${props => (props.error ? 'red' : '#d9d9d9')};

  ::placeholder {
    font-size: 14px !important;
    font-weight: 500 !important;
  }
  
  :focus {
    border-color: #57a8e9;
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(87,168,233, .2);
    box-shadow: 0 0 0 2px rgba(87,168,233, .2);
  }

  :hover {
    border:1px solid #b3d8ff;
  }

  :not(.ant-input-affix-wrapper-disabled):hover {
    /* border:1px solid #b3d8ff !important; */
  }

  .ant-input-affix-wrapper-focused {
    box-shadow: none;
    border-right-width: 0px !important;
  }

  &.ant-input{
    font-weight:500 !important;
    padding: 8px 11px !important;
    color: black !important;
  }

  &.ant-input[disabled] {
    color: #545454;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    /* border: 1px solid gold; */
  }
`
export const CustomInputUnpaid = ({
    label,
    type,
    name,
    rules,
    step,
    onChange,
    placeholder,
    display,
    required,
    autoFocus,
    disabled,
    readOnly,
    width,
    height,
    marginRight,
    labelStyle,
    defaultValue,
    minwidth,
    value,
    optional,
    initialValue,
    noStyle = undefined,
    ...rest
}) => {

    return (
        <StyledItem
            style={{
                width: width,
                marginRight: marginRight,
                minwidth: minwidth,
                display: display,
            }}
            rules={rules}
            noStyle={noStyle}
            name={name}
            colon={false}
            required={false}
            initialValue={initialValue}
            label={
                label && (
                    <Fragment>
                        <Label required={required} labelStyle={labelStyle}>
                            {label} <span>{optional}</span>
                        </Label>
                    </Fragment>
                )
            }
        >
            <AntdInputStyle
                {...rest}
                defaultValue={defaultValue}
                type={type}
                autoFocus={autoFocus}
                readOnly={readOnly}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                height={height}
                step={step}
            />
        </StyledItem>
    )
}
