import React, { Fragment } from 'react'
import { SearchOutlined } from '@ant-design/icons';
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
  border: none; /* Remove the border */
  border-radius: 0.4rem;
  box-shadow: none;
  background-color: rgba(250, 250, 250, 0.1);

  .gKQrKH:where(.css-dev-only-do-not-override-190m0jy).ant-input:focus, .gKQrKH:where(.css-dev-only-do-not-override-190m0jy).ant-input-focused {
    outline: 0px;
}

:where(.css-dev-only-do-not-override-190m0jy).ant-input-affix-wrapper >input.ant-input {
    font-size: 14px !important;
    padding: 11px;
    border: none;
    border-radius: 0;
    outline: none;
    background-color: rgba(250, 250, 250, 0.1);

}

.gx-search-bar input[type="search"] {
    padding-right: 35px;
    background: rgba(250, 250, 250, 0.1);
}

  ::placeholder {
    font-size: 14px !important;
    font-weight: 700 !important;
  }

  &.ant-input {
    font-weight: 500 !important;
    padding: 8px 11px !important;
    background-color: rgba(250, 250, 250, 0.1);
  }

  &.ant-input[disabled] {
    color: #545454;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    border: none; /* Remove the border for disabled state */
  }
`;
export const CustomSearchBar = ({
    label,
    type,
    prefix,
    SearchOutlined,
    name,
    icon,
    rules,
    addonBefore,
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
                addonBefore={addonBefore}
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
                icon={icon}
                prefix={prefix}
            />
        </StyledItem>
    )
}
