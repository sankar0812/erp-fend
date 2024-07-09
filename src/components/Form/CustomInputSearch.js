import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import { Input as AntdInput, Space } from "antd";
import styled from "styled-components";
const CustomInputSearch = ({ style, value, onChange, placeholder,defaultValue,type,autoFocus,readOnly,onSearch,disabled,height,step,...rest }) => (
  //   <Space direction="vertical" size="middle">
  <StyledInput
    addonBefore={<SearchOutlined />}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    {...rest}
    defaultValue={defaultValue}
    type={type}
    autoFocus={autoFocus}
    readOnly={readOnly}
    onSearch={onSearch}
    disabled={disabled}
    height={height}
    step={step}
    style={style}
  
  />
  //   </Space>
);

const StyledInput = styled(AntdInput)`
  .ant-input-group .ant-input-group-addon {
    background-color: #fff;
    border: 0px;
    border-radius: 0px;
    padding: 12px 12px;
  }
  .ant-input {
    border-width: 0px;
    border-radius: 0px;
    padding: 8px 11px;
    background-color: #fff;
  }
  .ant-input:hover {
    border-color: #fff;
    background-color: #fff;
  }
`;

export default CustomInputSearch;
