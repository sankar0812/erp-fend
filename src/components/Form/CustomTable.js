import React, { useState } from "react";
import { Table as AntdTable, Pagination as AntdPagination } from "antd";
import styled from "styled-components";
import { THEME } from "../../theme";

export const CustomTable = ({
  columns,
  data,
  footer,
  components,
  rowKey,
  onRow,
  pagination
}) => {
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (current, Infinity) => {
    setPageSize(Infinity);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedData = data?.slice(startIndex, endIndex);
  const getRowClassName = (record, index) => {
    return index % 2 === 0 ? "even-row" : "odd-row";
  };
  const StyledPagination = styled.div`
    display: flex !important;
    justify-content: end !important;
    align-items: center;
    text-align: center;
    margin-top: 25px;
    padding-bottom: 25px;
    margin-left: 20px;
    .ant-pagination .ant-pagination-item a {
      display: contents !important;
    }
  `;
  return (
    <div style={{ maxWidth: "100%" }}>
      <div style={{ maxWidth: "100%", overflowX: "auto" }}>
        <StyledTable
          footer={footer}
          columns={columns}
          dataSource={displayedData}
          onRow={onRow}
          rowKey={rowKey}
          components={components}
          bordered={false}
          rowClassName={getRowClassName}
          onChange={(pagination, filters, sorter) => {
            const { columnKey, order } = sorter;
            // Update the data array based on the sorting criteria and direction
            const sortedData = [...data];
            sortedData.sort((a, b) => {
              const aValue = a[columnKey];
              const bValue = b[columnKey];
              if (typeof aValue === "string" && typeof bValue === "string") {
                return order === "ascend"
                  ? aValue.localeCompare(bValue)
                  : bValue.localeCompare(aValue);
              }
              // If the values are numeric, you can compare them as numbers
              return order === "ascend" ? aValue - bValue : bValue - aValue;
            });
          }}
        />
        {pagination && (
          <StyledPagination>
            <AntdPagination
              // showQuickJumper
              showSizeChanger
              itemRender={itemRender}
              pageSizeOptions={["10", "20", "50", "100"]} // Customize page size options
              total={data?.length} // Total number of items
              // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
              current={currentPage}
              pageSize={pageSize}
              onChange={handlePageChange}
              onShowSizeChange={handlePageSizeChange}
            />
          </StyledPagination>
        )}
      </div>
    </div>
  );
};
export const DeleteButtonWrapper = styled.div`
  opacity: 0;
  transition: 0.5s;
`;
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
  .ant-table-container {
    border-start-start-radius: 0px;
    border-start-end-radius: 0px;
    border-top: 0px solid #f0f0f0 !important;
  }
  /* .ant-table-container table {
    border-inline-end: 0px !important;
} */
  .ant-table-container table > thead > tr:first-child > *:first-child {
    border-start-start-radius: 0px;
  }
  .ant-table-container table > thead > tr:first-child > *:last-child {
    border-start-end-radius: 0px;
  }
  tr {
    transition: 0.5s;
    border-style: double;
  }
  tr:hover ${DeleteButtonWrapper} {
    opacity: 1;
  }
  .ant-table-thead {
    background: ${THEME.white} !important;
  }
  & .ant-table-thead > tr > th {
    color: ${THEME.table_head} !important;
    font-weight: 500;
    letter-spacing: 1px;
    color: #000;
    font-family: "Urbanist", sans-serif;
    background: transparent;
    text-align: center !important;
    font-size: 14px;
  }
  .ant-table-tbody > tr > td {
    cursor: pointer;
    /* border-style: double; */
    /* color: ${THEME.primary_color}; */
    font-family: "Urbanist", sans-serif;
    text-align: center !important;
    /* font-weight: 400; */
    font-size: 12px;
  }
  .ant-table-tbody > tr {
    color: ${THEME.table_content};
    background: #fff;
  }
  .ant-table-tbody > tr.even-row {
    background: ${THEME.white}; //Background color for even rows
  }
  .ant-table-tbody > tr.odd-row {
    /* background: ${THEME.table_nthchild}; Background color for odd rows */
    background: ${THEME.white}; /* Background color for even rows */
  }
  .ant-table-tbody > tr > td,
  :where(.css-dev-only-do-not-override-190m0jy).ant-table-wrapper
    tfoot
    > tr
    > th,
  :where(.css-dev-only-do-not-override-190m0jy).ant-table-wrapper
    tfoot
    > tr
    > td {
    position: relative;
    padding: 5px 12px !important;
    overflow-wrap: break-word;
  }
  .ant-table-content > table {
    border-top: 1px solid #e8e8e8;
    /* border-style: double; */
    /* border-color: ${THEME.primary_color} !important; */
  }
  .ant-pagination .ant-pagination-item a {
    display: contents !important;
  }
`;
