import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TableIconHolder } from "../../../../../../components/CommonStyled";
import Flex from "../../../../../../components/Flex";
import { FiEdit, FiPlus } from "react-icons/fi";
import { CustomPopconfirm } from "../../../../../../components/CustomPopConfirm";
import { MdDelete, MdOutlineNotificationsActive } from "react-icons/md";
import { THEME } from "../../../../../../theme";
import { CustomStandardTable } from "../../../../../../components/Form/CustomStandardTable";
import { CustomPageTitle } from "../../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../../components/CustomRow";
import { Col } from "antd";
import { CustomDateRangePicker } from "../../../../../../components/Form/CustomDateRangePicker";
import ButtonStandard from "../../../../../../components/Form/CustomStandardButton";
import Button from "../../../../../../components/Form/CustomButton";
import { CustomModal } from "../../../../../../components/CustomModal";
import {
  getMaintainInvoicesError,
  getMaintainInvoicesStatus,
  getMaintenance,
  getMaintianInvoices,
} from "../../../Invoice/invoiceSlice";
import { CommonLoading } from "../../../../../../components/CommonLoading";
import { useSelector } from "react-redux";
import { AddMaintainInvoice } from "./AddMaintainInvoice";
import request from "../../../../../../utils/request";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { AiOutlineEye } from "react-icons/ai";
import { CustomTag } from "../../../../../../components/Form/CustomTag";
import { BsBellFill, BsBellSlashFill, BsThreeDots } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa";
import { ViewPrint } from "./ViewPrint";

export const ViewMaintainInvoice = () => {
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]); // Search bar

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const [dateRange, setDateRange] = useState([]); // Search Date filter

  const dispatch = useDispatch();

  const Allinvoiceview = useSelector(getMaintianInvoices);
  const ViewInvoiceStatus = useSelector(getMaintainInvoicesStatus);
  const ViewInvoiceError = useSelector(getMaintainInvoicesError);

  // ===== Modal Functions Start =====
  console.log(Allinvoiceview, 'Allinvoiceview');
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  useEffect(() => {
    setDataSource(Allinvoiceview);
  }, [Allinvoiceview]);

  useEffect(() => {
    dispatch(getMaintenance());
  }, []);

  // Delete invoice bill

  //=======================Post Date filter =====================================

  const SearchReportdate = (values) => {
    request
      .post(`${APIURLS.FILTER_MAINTENANCE}`, values)
      .then(function (response) {
        toast.success("Date Search");
        // form.resetFields();
        setDataSource(response.data);
      })
      .catch(function (error) {
        toast.error("Failed");
      });
  };

  const handleDatepost = () => {
    const Datevalues = {
      startDate: dateRange?.start_date,
      endDate: dateRange?.end_date,
    };
    console.log(Datevalues,'Datevalues');
    SearchReportdate(Datevalues);
  };

  const handleDateRangeChange = (date) => {
    setDateRange(date);
  };

  const FormExternalClose = () => {
    handleOk();
    dispatch(getMaintenance());
  };

  const EditInvoice = (record) => {  // -> Bill Edit
    setTrigger(trigger + 1);
    setModalTitle("Update Maintenance Invoices");
    setModalContent(
      <AddMaintainInvoice
        formname={"AddMaintenanceInvoices"}
        FormExternalClosee={FormExternalClose}
        formReset={formReset}
        mainRecord={record}
        ViewEditTrigger={trigger}
      />
    );
    showModal();
  };

  const ViewInvoice = (record) => {  // -> Bill View
    setTrigger(trigger + 1);
    setModalTitle("View Maintenance Invoices");
    setModalContent(
      <ViewPrint
        formname={"ViewMaintenanceInvoices"}
        FormExternalClosee={FormExternalClose}
        record={record}
      />
    );
    showModal();
  };

  const handlenavigate = (record) => {
    navigate(`/AddMaintainInvoice`);
  };

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Date",
      dataIndex: "invoiceDate",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.clientName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.clientName).includes(value.toUpperCase())
        );
      },
    },
    // {
    //     title: "Project Name",
    //     dataIndex: "projectName",

    // },
    {
      title: "Bill No",
      dataIndex: "maintenanceInvoiceId",
    },
    {
      title: "Bill Amount",
      dataIndex: "total",
    },
    {
      title: "Action",
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={"10px"}>

            {
              record?.status === true ? (
                <>
                  <TableIconHolder
                    color={THEME.blue}
                    size={"22px"}
                    onClick={() => EditInvoice(record)}
                  >
                    <FiEdit />
                  </TableIconHolder>
                </>
              ) : null
            }

            <TableIconHolder
              color={THEME.red}
              size={"22px"}
              onClick={() => ViewInvoice(record)}
            >
              <FaFilePdf />
            </TableIconHolder>

            {/* <CustomPopconfirm
                            record={record}
                            confirm={handleConfirm}
                            // cancel={handlePopConfrmCancel}
                            title={"Delete the invoices"}
                            description={"Are you sure to delete this Invoice bill?"}>
                            <TableIconHolder color={THEME.red} size={'22px'}>
                                <MdDelete />
                            </TableIconHolder>
                        </CustomPopconfirm> */}
          </Flex>
        );
      },
    },
  ];

  let content;

  console.log(dataSource, 'dataSourceeee');
  if (ViewInvoiceStatus === "loading") {
    content = <CommonLoading />;
  } else if (ViewInvoiceStatus === "succeeded") {
    const rowKey = (dataSource) => dataSource.maintenanceInvoiceId;
    content = (
      <CustomStandardTable
        columns={columns}
        data={dataSource}
        rowKey={rowKey}
        onRow={(record) => ({})}
      />
    );
  } else if (ViewInvoiceStatus === "failed") {
    content = <h2>{ViewInvoiceError}</h2>;
  }

  return (
    <Fragment>
      <CustomRow
        space={[24, 24]}
        style={{ background: "#dae1f3", paddingTop: "12px" }}
      >
        <Col span={24} md={10} style={{ display: "flex", gap: "10px" }}>
          <CustomDateRangePicker
            onChange={handleDateRangeChange}
            name={"range"}
            value={dateRange}
            rules={[{ required: true, message: "Please Select the Date" }]}
          />
          <ButtonStandard.Primary
            text={"search"}
            onClick={() => handleDatepost()}
          />
        </Col>
        <Col span={24} md={14}>
          <CustomRow space={[24, 24]}>
            <Col span={24} md={16}></Col>
            <Col span={24} md={8} style={{ float: "right" }}>
              <Flex style={{ marginRight: "-30px", justifyContent: "end" }}>
                <Button.Primary
                  style={{ borderRadius: "6px" }}
                  icon={<FiPlus style={{ fontSize: "20px" }} />}
                  text={"Add"}
                  onClick={handlenavigate}
                />
              </Flex>
            </Col>
          </CustomRow>
        </Col>
      </CustomRow>

      {content}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={1200}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
