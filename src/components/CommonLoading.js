import React from 'react'
import { RingLoader } from 'react-spinners'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons';
import { THEME } from '../theme'
import { Spin } from 'antd';

export const CommonLoading = () => {
    return (
        <LoadingHolder>
            <RingLoader size={150} color={THEME.secondary_color_dark} />
        </LoadingHolder>
    )
}

const LoadingHolder = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
`


export const FormLoadingIndicator = ({ active }) => {
    return (
        // <Spin indicator={antIcon} />
        <SpinnerHolder active={active}>
            <Spin tip="Loading ..." size="large" >
                <div className="content" />
            </Spin>
        </SpinnerHolder>
    )
}

const SpinnerHolder = styled.div`
    position:absolute;
    width:100%;
    left:0;
    top:0;
    visibility:${props=>props.active ? 'visible' : 'hidden'};
    z-index:20;
    height:100%;
    background:${THEME.white};
    border-radius: 4px;

    & .ant-spin-nested-loading >div>.ant-spin {
        max-height: 100%;
    }

    & .ant-spin-lg .ant-spin-dot i {
        width:35px;
        height:35px;
    }
    & .ant-spin .ant-spin-dot {
        width:0;
        height:0;
    }
    & .ant-spin .ant-spin-dot-item {
        background:${THEME.secondary_color_dark};
    }
    & .ant-spin {
        color:red;
    }
    & .ant-spin-nested-loading >div>.ant-spin .ant-spin-text {
        font-size:1.7rem;
        letter-spacing:2px;
        font-weight:600;
    }
    & .ant-spin-nested-loading {
        height:100%;
    }
`