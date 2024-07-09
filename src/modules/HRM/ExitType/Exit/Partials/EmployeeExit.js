import { Card, Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import dayjs from "dayjs";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import { CustomTextArea } from "../../../../../components/Form/CustomTextArea";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { toast } from "react-toastify";
import { getResignation } from "../../Resignation/ResignationSlice";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import {
  getDepartmentRole,
  selectAllDepartmentRole,
} from "../../../Recruitments/RecruitmentSlice";
import { BiReset } from "react-icons/bi";
import { getEmployee, getEmployeeExit, selectAllEmployee } from "./ExitSlice";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import {
  getDesignation,
  getInitialEmployee,
  selectAllDesignation,
  selectAllInitialEmployee,
} from "../../../EmployeeDetails/EmployeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import request from "../../../../../utils/request";
import { getEmployeesTrue, selectAllEmployeeTrue } from "./ExitSlice";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import { CustomModal } from "../../../../../components/CustomModal";
import { AssetsCount } from "./AssetsCount";
import { useNavigate } from "react-router";

const RemoveBtn = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  cursor: pointer;
  background: none;
  &:hover {
    transform: scale(1.1);
  }
`;

const EmployeeExit = ({ trigger, FormExternalCloseee, updateRecord }) => {

  useEffect(() => {
    form.resetFields();
  }, [trigger]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [fromDate, setSelectedfromDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formReset, setFormReset] = useState(0);
  const [modelwith, setModelwith] = useState(0);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [tooDate, setSelectedToDate] = useState(dayjs().format("YYYY-MM-DD"));

  const [exitType, setExitType] = useState("Resignations");

  const [emp, setEmp] = useState([]);

  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (updateRecord) {
      setEmpExit();
    }
  }, [updateRecord, trigger]);

  useEffect(() => {
    if (updateRecord?.CompanyProperty) {
      const tableData = updateRecord?.CompanyProperty.map((value, index) => ({
        ...value,
        key: index,
      }));

      setDataSource(tableData);
    }
  }, [updateRecord?.CompanyProperty]);

  const setEmpExit = () => {
    const ExitDate = new Date(updateRecord?.date);
    const dateFormat = "YYYY/MM/DD";
    const exitttDate = dayjs(ExitDate).format(dateFormat);

    form.setFieldsValue(updateRecord);
    form.setFieldsValue({
      date: dayjs(exitttDate, dateFormat),
    });
    form.setFieldsValue({ employeeName: updateRecord?.userName });
    form.setFieldsValue({ employeeId: updateRecord?.employee_id });
  };

  const AddExit = (values) => {
    request
      .post(`${APIURLS.POSTEMPLOYEEEXIT}`, values)
      .then(function (response) {
        toast.info("Employee Exit Successfully");
        dispatch(getEmployeeExit());
        // formExternalClose();
        navigate("/exit");
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  };

  const onFinish = (values) => {
    const newValues = {
      ...values,
      date: selectedDate,
      companyProperty: dataSource,
    };
    AddExit(newValues);
    console.log(newValues,'ll');
  };

  const onFinishFailed = () => {};

  const FormRest = () => {
    setFormReset(formReset + 1);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormRest();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleDate = (e) => {
    setSelectedDate(e);
  };

  const ExitType = [
    {
      label: "Resignation",
      value: "Resignations",
    },
    {
      label: "Termination",
      value: "termination",
    },
  ];

  const SetDynamicEditTable = (value, index) => {
    setDataSource((prev) => {
      if (!Array.isArray(prev)) {
        // If prev is not an array, create a new array with the current and new value
        return [{ ...value, key: 0 }];
      }

      const rowIndexToUpdate = dataSource.findIndex(
        (item) => item.brandId === value.brandId
      );
      // if (rowIndexToUpdate !== -1) {
      // Create a copy of the previous array
      const updatedDynamicTable = [...prev];

      // Update the values for the row at the specified index
      updatedDynamicTable[index] = { ...value };

      return updatedDynamicTable;
      // }

      // Find the index of the row to update based on the key

      // If the row doesn't exist, simply add it to the end of the array
      // const maxKey = Math.max(...prev.map((item) => item.key), 0);
      // return [...prev, { ...value, key: maxKey + 1 }];
    });
  };

  const formExternalClose = () => {
    handleOk();
  };

  const RemoveCount = (record, index) => {
    setUpdateTrigger(trigger + 1);
    setModelwith(800);
    setModalTitle("Reduce Assets Count");
    setModalContent(
      <AssetsCount
        trigger={updateTrigger}
        UpdateTypeRecord={record}
        SetDynamicEditTable={SetDynamicEditTable}
        formExternalClosee={formExternalClose}
        index={index}
      />
    );
    showModal();
  };

  const UpdateRemoveCount = (record, index) => {
    setUpdateTrigger(trigger + 1);
    setModelwith(800);
    setModalTitle("Reduce Assets Count");
    setModalContent(
      <AssetsCount
        triggerr={updateTrigger}
        updateEditRecord={record}
        SetDynamicEditTable={SetDynamicEditTable}
        formExternalClosee={formExternalClose}
        index={index}
      />
    );
    showModal();
  };

  const columns = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Brand Name",
      dataIndex: "brandName",
    },
    {
      title: "Accessories",
      dataIndex: "accessoriesName",
    },
    {
      title: "Serial No",
      dataIndex: "serialNumber",
    },
    {
      title: "Total Count",
      dataIndex: "count",
    },
    // {
    //   title: "Balance Count",
    //   dataIndex: "balanceCount",
    // },
    {
      title: "Return Count",
      dataIndex: "returnCount",
    },
    {
      title: "Action",
      render: (text, record, index) => {
        const maxCount = record.count;
        return (
          <Flex gap={"true"} center={"true"}>
            {/* {updateRecord ? (
              <RemoveBtn>
                <IoMdRemoveCircle
                  style={{ fontSize: "25px", color: "red" }}
                  onClick={() => UpdateRemoveCount(record, index)}
                />
              </RemoveBtn>
            ) : ( */}
              <RemoveBtn>
                <IoMdRemoveCircle
                  style={{ fontSize: "25px", color: "red" }}
                  onClick={() => RemoveCount(record, index)}
                />
              </RemoveBtn>
            {/* )} */}
          </Flex>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getEmployee());
  }, []);

  const AllDepartmentRole = useSelector(selectAllEmployee);

  console.log(AllDepartmentRole,'AllDepartmentRole');

  const DepartmentRoleOptions = AllDepartmentRole?.map((emp) => ({
    label: emp.departmentName,
    value: emp.departmentId,
  }));

  const [employeeOption, setEmployeeOption] = useState([]);
  const [employeeDetail, setEmployeeDetail] = useState([]);

  const handleDepartment = (e) => {
    form.setFieldsValue({ employeeName: null });
    form.setFieldsValue({ employeeId: null });

    const findObject = AllDepartmentRole.find(
      (item) => item.departmentId === e
    );
    setEmployeeDetail(findObject);
    const employeeOption = findObject?.employees?.map((value) => ({
      label: value.userName,
      value: value.employeeId,
    }));

    form.setFieldsValue({ departmentId: findObject.departmentId });
    setEmployeeOption(employeeOption);
  };

  const handleEmployeeChange = (value) => {
    form.setFieldsValue({ employeeId: value });

    const findObject = employeeDetail.employees.find(
      (item) => item.employeeId === value
    );

    setDataSource(findObject?.assets);

  };

  const onSubmit = () => {
    form.submit();
  };

  const rowKey = (dataSource) => dataSource?.assetsListId

  return (
    <Fragment>
      <Form
        form={form}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        name="product"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomRow space={[24, 24]}>
          <Col span={24} sm={24} md={24} lg={24}>
            <div style={{ margin: "20px 0px" }}>
              <h3 style={{ fontSize: "18px" }}>Employee</h3>
            </div>
            <Card>
              <CustomRow space={[24, 24]}>
                <Col span={24} md={12}>
                  <CustomDatePicker
                    label={"Date"}
                    placeholder={"Enter Date"}
                    onChange={handleDate}
                    name={"date"}
                    disabled={updateRecord}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Date ! ! !",
                      },
                    ]}
                  />
                </Col>
                <Col span={24} lg={12} md={24}>
                  <CustomSelect
                    onChange={handleDepartment}
                    label={"Employee Department"}
                    placeholder={"Employee Department"}
                    options={DepartmentRoleOptions}
                    disabled={updateRecord}
                    name={"departmentName"}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Employee Department ! ! !",
                      },
                    ]}
                  />
                  <CustomInput name={"departmentId"} display={'none'} />
                </Col>

                <Col span={24} md={12}>
                  <CustomSelect
                    onChange={handleEmployeeChange}
                    label={"Employee Name"}
                    placeholder={"Employee Name"}
                    options={employeeOption}
                    disabled={updateRecord}
                    name={"employeeName"}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Employee Name ! ! !",
                      },
                    ]}
                  />
                  <CustomInput name={"employeeId"} display={"none"} />
                </Col>

                <Col span={24} md={12}>
                  <CustomTextArea
                    label={"Description"}
                    placeholder={"Enter Description"}
                    disabled={updateRecord}
                    name={"description"}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Description ! ! !",
                      },
                    ]}
                  />
                </Col>
              </CustomRow>
            </Card>
          </Col>
          <Col span={24} sm={24} md={24} lg={24}>
            <div style={{ margin: "20px 0px" }}>
              <h3 style={{ fontSize: "18px" }}>Assets</h3>
            </div>
            <CustomStandardTable columns={columns} data={dataSource} rowKey={rowKey}/>

            {/* <AddAssigningTable
              SetDynamicTable={SetDynamicTable}
              Assetsrecord={dynamicTableData}
            /> */}
          </Col>
        </CustomRow>
      </Form>

      <br />

      {/* <CustomStandardTable columns={columns} data={dynamicTableData} /> */}
      {/* <FooterComponent /> */}
      {/* {Assetsrecord ? (
      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        <Button.Primary text={"Update"} onClick={() => onSubmit()} />
        <Button.Danger text={"Cancel"} onClick={() => Formcancel()} />
      </Flex>
    ) : ( */}
      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        <Button.Primary text={"Save"} onClick={() => onSubmit()} />
        <Button.Danger
          text={"Reset"}
          icon={<BiReset style={{ marginRight: "5px" }} />}
          onClick={() => onReset()}
        />
      </Flex>
      {/* )} */}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={modelwith}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};

export default EmployeeExit;
