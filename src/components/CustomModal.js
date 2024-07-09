import React from 'react'
import { Modal as AntdModal } from 'antd';
import styled from 'styled-components';
import { THEME } from '../theme';

export const CustomModal = ({ modalTitle, modalContent, isVisible, handleOk, handleCancel, width, centered }) => {

    return (
        <StyledModal
            title={modalTitle}
            open={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={width}
            maskClosable={false}
            centered={centered}
            footer={false}
            >

            {modalContent}
        </StyledModal>
    )
}


const StyledModal = styled(AntdModal)`

    & .ant-modal-title{
        font-size:1.5rem;
        text-transform:capitalize;
        border-bottom:1px solid rgb(235 226 226);
        color:${THEME.black};
        padding: 10px;
    }

    & .ant-modal-body{
        margin-top:20px;
    }
    

  /* &.ant-modal {
    transition: transform .3s ease-out;
    transform: translateY(-50px);

    &.ant-modal-open {
        transition: transform .3s ease-out;
    transform: translateY(-50px);
    }
  } */


`;