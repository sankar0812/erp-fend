import { Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentId } from "../../../Auth/authSlice";
import { useSelector } from "react-redux";
import request, { base } from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { CustomTag } from "../../../../components/Form/CustomTag";
import { CustomPageTitle } from "../../../../components/CustomPageTitle";
import dayjs from "dayjs";
import { CustomRow } from "../../../../components/CustomRow";
import { Filter, MoveSlider } from "../Style";
import { BiFilterAlt } from "react-icons/bi";
import { CustomSelect } from "../../../../components/Form/CustomSelect";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import { CustomModal } from "../../../../components/CustomModal";
import Flex from "../../../../components/Flex";
import ButtonStandard from "../../../../components/Form/CustomStandardButton";

export const TraineeStatus = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]);

  const [modalWidth, setModalWidth] = useState(0);
  const [showdetailsON, setShowdetailsON] = useState(false);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  // ===== Modal Functions Start =====

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

  const DatesFilter = [
    { label: "Current Trainee", value: "started" },
    { label: "Move to Staff", value: "completed" },
    { label: "Exit Trainee", value: "cancelled" },
  ];

  const DateSearch = (values) => {
    request
      .post(`${APIURLS.POSTREPORTTRAINEESTATUS}`, values)
      .then(function (response) {
        setDataSource(response.data);
        if (response.data.length) {
          toast.success("Trainee Filter Search");
        } else {
          toast.warn("No Data");
        }
      })
      .catch(function (error) {
        toast.error("Failed");
        console.log(error, "hhhhhh");
      });
  };

  const handleChange = () => {
    setShowdetailsON(!showdetailsON);
  };
  //==========

  const onFinish = (values) => {
    DateSearch(values);
  };

  const onFinishFailed = (errorInfo) => {
    toast.warn("Please fill the details!");
  };

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "profile",
      render: (profile) => {
        return (
          <img
            src={`${base}${profile}`}
            alt="Staff"
            width="50"
            height="50"
            style={{ borderRadius: "50%", objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "User Id",
      dataIndex: "userId",
    },
    {
      title: "Trainee Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },
    {
      title: "Department",
      dataIndex: "departmentName",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];

  const rowKey = (dataSource) => dataSource?.traineeId;

  return (
    <Fragment>
      <CustomPageTitle Heading={"Trainee Status Report"} />
      <br />
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          from_date: dayjs(),
          to_date: dayjs(),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomRow space={[24, 24]}>
          <Col span={24} md={5}>
            <Filter onClick={handleChange}>
              <BiFilterAlt />
              &nbsp;&nbsp;Filter
            </Filter>
          </Col>
          <Col span={24} md={15}></Col>
          <Col span={24} md={4}></Col>
        </CustomRow>
        <MoveSlider showdetailsons={showdetailsON ? "true" : undefined}>
          <CustomRow
            space={[24, 24]}
            style={{ marginTop: "20px", flexWrap: "wrap" }}
          >
            <>
              <Col span={24} md={24} lg={3} style={{ marginTop: "10px" }}>
                <b>Choose</b>&nbsp;&nbsp;
              </Col>
              <Col span={24} md={24} lg={10}>
                <CustomSelect
                  options={DatesFilter}
                  name={"choose"}
                  placeholder={"Select"}
                  rules={[
                    { required: true, message: "Please Select the Month" },
                  ]}
                />
              </Col>

              <Flex>
                <ButtonStandard.Primary text={"Submit"} htmlType="submit" />
              </Flex>
            </>
          </CustomRow>
        </MoveSlider>
      </Form>

      {/* {content} */}

      <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey}/>

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={modalWidth}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
