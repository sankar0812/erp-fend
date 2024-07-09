import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Switch, Form } from 'antd';
import { THEME } from '../../theme';

const CustomSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CustomSwitchLabel = styled.span`
  margin: 0 8px;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;

  &.active {
    color: ${THEME.PRIMARY}
  }
`;

export const CustomSwitch = ({ disabled,leftLabel, rightLabel, checked, name, onChange, state, valuePropName, ...rest }) => {

  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    if (checked) {
      setIsChecked(checked)
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
    <Form.Item name={name} valuePropName={valuePropName} {...rest} style={{ margin: 'auto 0' }}>
      <CustomSwitchWrapper>
        <CustomSwitchLabel className={!isChecked ? 'active' : ''}>{leftLabel}</CustomSwitchLabel>
        <Switch onChange={(checked, extraProps) => handleChange(checked, extraProps)} checked={isChecked} disabled={disabled}/>
        <CustomSwitchLabel className={isChecked ? 'active' : ''}>{rightLabel}</CustomSwitchLabel>
      </CustomSwitchWrapper>
    </Form.Item>

  );
};

CustomSwitch.propTypes = {
  leftLabel: PropTypes.string.isRequired,
  rightLabel: PropTypes.string.isRequired,
};

// const Switch = ({ label2, label, name, onChange, state, valuePropName, ...rest }) => {

//     return (
//         <Form.Item name={name} valuePropName={valuePropName} {...rest} style={{ margin: 'auto 0' }}>
//             <FlexWrapper spacebetween="true">
//                 <LabelWrapper state={state}>{label}</LabelWrapper>
//                 <StyledSwitch onChange={onChange} {...rest} />
//                 <LabelWrapper state={state}>{label2}</LabelWrapper>
//             </FlexWrapper>
//         </Form.Item>
//     )
// }

{/* <CustomSwitch leftLabel="Yes" rightLabel="No" name='yesorNo' />          >>> FUTURE USE */ }

