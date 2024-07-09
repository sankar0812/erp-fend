import { Fragment } from 'react';
import { Select as AntdSelect, Form } from 'antd';
import Label from './Label';
import Button from './CustomButton';
import { PlusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';
const { Item } = Form;
const { Option } = AntdSelect;
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
    font-size: 15px;
    line-height: 1.3 !important;
    letter-spacing: 0.03em;
  }
`
const ButtonContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
`;
const AntdSelectStyle = styled(AntdSelect)`
  margin-bottom: 5px;
  border-top-left-radius: 6px;
  height: ${props => (props.height ? props.height : '40px')};
  box-shadow: none;
  border-color: ${props => (props.error ? 'red' : '#D9D9D9')};
  :where(.css-dev-only-do-not-override-190m0jy).ant-select-single .ant-select-selector {
    box-sizing: border-box;
    margin: 0;
    padding: 2;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    display: flex;
    /* border-radius: 6px; */
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius:0.4rem;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  ::placeholder {
    font-size: 14px;
  }
  :focus {
    border-color: #E9E9E9;
    box-shadow: none;
  }
  :hover {
    /* border-color: #E9E9E9; */
  }
  & .ant-select-selector {
    height: 100% !important;
    & input {
      height: 100% !important;
    }
  }
  &.ant-input[disabled] {
    color: #545454;
    font-size: 1rem;
    font-weight: 500;
    text-align: left;
    border: 1px solid #D9D9D9;
  }
  & .ant-select-selection-item {
    margin: auto;
    font-size: 1rem;
    font-weight: 500;
  }
  & .ant-select-selection-placeholder {
    margin: auto;
  }
`;
export const CustomAddSelect = ({
  initialValue,
  label,
  type,
  name,
  buttonLabel,
  onButtonClick,
  rules,
  onChange,
  placeholder,
  required,
  disabled,
  options,
  width,
  minwidth,
  height,
  onSearch,
  searchText,
  notFoundContent,
  value,
  showSearch,
  marginRight,
  labelStyle,
  defaultValue,
  optional,
  noStyle = undefined,
  ...rest
}) => {
  const isSelectDisabled = document.querySelector('.ant-select-selection-item')?.getAttribute('disabled');
  return (
    <StyledItem
      style={{
        width: width,
        marginRight: marginRight,
        minwidth: minwidth
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
      <ButtonContainer>
        <AntdSelectStyle
          notFoundContent={notFoundContent}
          placeholder={placeholder}
          showSearch={true}
          value={value}
          disabled={disabled}
          onChange={onChange}
          name={name}
          defaultValue={defaultValue}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </AntdSelectStyle>
        <Button
          style={{
            top: '-2px',
            height: '40px',
            backgroundColor: 'white',
            color: '#0958D9',
            borderTopRightRadius: '0.4rem',
            borderBottomRightRadius: '0.4rem',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
          }}
          // disabled={disabled || isSelectDisabled}
          onClick={onButtonClick}
        >
          <PlusCircleOutlined />
        </Button>
      </ButtonContainer>
    </StyledItem>
  );
};