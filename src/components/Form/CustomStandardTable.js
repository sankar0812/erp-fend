import React, { useState } from 'react'
import { Table as AntdTable, Pagination as AntdPagination } from 'antd';
import styled from 'styled-components';
import { THEME } from '../../theme';

export const CustomStandardTable = ({ columns, data, footer, components, pagination, rowKey,onRow,style }) => {

    const getRowClassName = (record, index) => {
        return index % 2 === 0 ? 'even-row' : 'odd-row';
    };

    return (
        <div style={{ maxWidth: '100%' }}>

            <StyTable style={style}>
                <StyledTable
                    onRow={onRow}
                    footer={footer}
                    columns={columns}
                    dataSource={data}
                    rowKey={rowKey}
                    components={components}
                    bordered={true}
                    pagination={pagination}
                    rowClassName={getRowClassName}
                />
            </StyTable>

        </div>
    )
}
export const DeleteButtonWrapper = styled.div`
  opacity: 0;
  transition:0.5s;
`;
const StyTable = styled.div`
max-width: 100%;
overflow-x: auto;
padding: 10px 0;
`
const StyledTable = styled(AntdTable)`
  /* box-shadow: '0px 2px 1px -1px rgba(0,0,0,.2), 0px 1px 1px 0px rgba(0,0,0,.14), 0px 1px 3px 0px rgba(0,0,0,.12)'  */
  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px; */
/* 
  table {
      table-layout: fixed;
    } */

    /* .ant-table-thead {
      position: sticky;
      top: 0;
      background: ${THEME.white};
      z-index: 1;
    } */
    /* ::-webkit-scrollbar-track {
    box-shadow: rgb(22, 119, 555) 0px 0px 5px inset;
    cursor: pointer;
    border-radius: 10px;
    } */
  tr{
    transition:0.5s;
    border-style: double;
    }
    tr:hover ${DeleteButtonWrapper} {
        opacity: 1;
    }
     .ant-table-thead {
        background: ${THEME.white} !important;
    }
    & .ant-table-thead > tr >th{
        color: ${THEME.table_head} !important;
        font-weight: 500; 
        letter-spacing: 1px;
        color: #000;
        font-family: 'Urbanist', sans-serif;
        background: transparent;
        text-align:left !important;
        cursor: pointer;
        font-size:  14px;
    }
    .ant-table-tbody >tr >td {
        /* border-style: double; */
        /* color: ${THEME.primary_color}; */
        font-family: 'Urbanist', sans-serif;
        text-align:left !important;
        /* font-weight: 400; */
        font-size:  12px;
    }
    .ant-table-tbody >tr  {
        color: ${THEME.table_content};
        background: #fff;
    }
    .ant-table-tbody > tr.even-row {
    background:${THEME.white}; /* Background color for even rows */
  }
  .ant-table-tbody > tr.odd-row {
    background: ${THEME.table_nthchild}; /* Background color for odd rows */
  }
    .ant-table-tbody>tr>td, :where(.css-dev-only-do-not-override-190m0jy).ant-table-wrapper tfoot>tr>th, :where(.css-dev-only-do-not-override-190m0jy).ant-table-wrapper tfoot>tr>td {
    position: relative;
    padding: 12px 12px !important;
    overflow-wrap: break-word;
}
    .ant-table-content >table {
        border-top:1px solid #E8E8E8;
        /* border-style: double; */
        /* border-color: ${THEME.primary_color} !important; */
    }
.ant-pagination .ant-pagination-item a {
        display: contents !important;
}


`;