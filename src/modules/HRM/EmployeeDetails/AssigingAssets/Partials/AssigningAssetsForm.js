import { Card, Col, Form } from "antd";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import request from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import Flex from "../../../../../components/Flex";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";
import { AddAssigningTable } from "./AddAssigningTable";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import Button from "../../../../../components/Form/CustomButton";
import { CustomModal } from "../../../../../components/CustomModal";
import { BiReset } from "react-icons/bi";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { useSelector } from "react-redux";
import {
  getDepartmentRole,
  selectAllDepartmentRole,
} from "../../../Recruitments/RecruitmentSlice";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { toast } from "react-toastify";
import { getAssignAssets, getAssignAssetsView } from "../../../Accounts/AccountsSlice";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";

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

export const AssigningAssetsForm = ({
  Formcancel,
  Trigger,
  Assetsrecord,
  FormExternalClosess,
  FormExternalClosee
}) => {

  const [form] = Form.useForm();

  const [formUpdate, setFormUpdate] = useState(0);

  const [formUpdatebrand, setFormUpdatebrand] = useState(0);

  const [checked, setChecked] = useState(false);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);
  const [modelwith, setModelwith] = useState(0);
  const [imageUrl, setImageUrl] = useState();
  const [trigger, setTrigger] = useState(0);

  const [dynamicTableData, setDynamicTableData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Assetsrecord?.assets) {
      const tableData = Assetsrecord?.assets.map((value, index) => ({
        ...value,
        key: index,
      }));

      setDynamicTableData(tableData);
    }
  }, [Assetsrecord?.assets]);

  // For Showing on Table

  // const tableProducts = useSelector(getTableProducts)

  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
    // productdata(true)
  };

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

  const onReset = () => {
    form.resetFields();
    setDynamicTableData([]);
    setChecked(false);
  };

  const adding = (values) => {
    request
      .post(`${APIURLS.POSTASSIGNASSETS}`, values)
      .then(function (response) {
        toast.success("Assets Assigning Successfully");
        dispatch(getAssignAssetsView());
        navigate("/assigningAssets");
      })
      .catch(function (error) {
        toast.warning(error.response.data)
      });
  };

  const updating = (values) => {
    request
      .put(`${APIURLS.PUTASSIGNASSETS}${Assetsrecord?.assetsId}`, values)
      .then(function (response) {
        toast.success("Assets updated Successfully");
        dispatch(getAssignAssetsView());
        FormExternalClosee();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinish = (values) => {
    const newValues = {
      ...values,
      assets: dynamicTableData,
    };
    if (Assetsrecord) {
      updating(newValues);
    } else {
    adding(newValues);
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  const settingTableData = () => {
    const tableData = Assetsrecord?.assets.map((value, index) => ({
      ...value,
      key: index,
    }));

    setDynamicTableData(tableData);
  };

  useEffect(() => {
    if (Assetsrecord?.assets) {
      settingTableData();
    }
  }, [Assetsrecord]);

  useEffect(() => {
    if (Assetsrecord) {
      form.setFieldsValue(Assetsrecord);
      const dateFormat = "YYYY-MM-DD";
      const Dated = new Date(Assetsrecord?.date);
      const Datee = dayjs(Dated).format(dateFormat);

      form.setFieldsValue({
        date: dayjs(Datee, dateFormat),
      });
      form.setFieldsValue({ url: imageUrl });
    }
  }, [Assetsrecord, Trigger]);

  const onFinishFailed = (errorInfo) => {};

  const onEditVariant = (record) => {
    setTrigger(trigger + 1);
    setModelwith(800);
    setModalTitle("Update Assets");
    setModalContent(
      <AddAssigningTable
        handleOk={handleOk}
        SetDynamicEditTable={SetDynamicEditTable}
        SetDynamicTable={SetDynamicTable}
        handleClose={handleOk}
        formReset={FormReset}
        trigger={trigger}
        UpdateTypeRecord={record}
      />
    );
    showModal();
  };

  //   =========== unit =========

  const FormUpdateCall = () => {
    setFormUpdate(formUpdate + 1);
  };

  const FormReset = () => {
    setFormReset(formReset + 1);
  };

  // ---------- SET VALUE TO DYNAMIC DATA ------

  const SetDynamicTable = (value) => {
    setDynamicTableData((prev) => {
      if (!Array.isArray(prev)) {
        return [prev, { ...value, key: 0 }];
      }
      const maxKey = Math.max(...prev.map((item) => item.key), 0);
      return [...prev, { ...value, key: maxKey + 1 }];
    });
  };

  const SetDynamicEditTable = (value) => {
    setDynamicTableData((prev) => {
      if (!Array.isArray(prev)) {
        return [{ ...value, key: 0 }];
      }

      const rowIndexToUpdate = dynamicTableData.findIndex(
        (item) => item.key === value.key
      );

      if (rowIndexToUpdate !== -1) {
        // Create a copy of the previous array
        const updatedDynamicTable = [...prev];

        // Update the values for the row at the specified index
        updatedDynamicTable[rowIndexToUpdate] = { ...value };
        return updatedDynamicTable;
      }

      // Find the index of the row to update based on the key
      // If the row doesn't exist, simply add it to the end of the array
      const maxKey = Math.max(...prev.map((item) => item.key), 0);
      return [...prev, { ...value, key: maxKey + 1 }];
    });
  };

  const RowRemove = (index) => {
    const newArr = [];

    for (let i = 0; i < dynamicTableData.length; i++) {
      if (i !== index) {
        newArr.push(dynamicTableData[i]);
      }
    }
    if (Assetsrecord?.companyAssetsType) {
      setDynamicTableData(newArr);
    } else {
      setDynamicTableData(newArr);
    }
  };

  const columns = [
    {
      title: "Sl.No",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Assets Brand",
      dataIndex: "brandName",
    },
    {
      title: "Accessories",
      dataIndex: "accessoriesName",
    },
    {
      title: "Count",
      dataIndex: "count",
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <Flex gap={"true"} center={"true"}>
            {Assetsrecord ? (
              <RemoveBtn>
                <AiFillPlusCircle
                  style={{
                    fontSize: "23px",
                    marginRight: "10px",
                    color: "green",
                  }}
                  onClick={() => onEditVariant(record)}
                />
              </RemoveBtn>
            ) : null}

            <RemoveBtn>
              <IoMdRemoveCircle
                style={{ fontSize: "25px", color: "red" }}
                onClick={() => RowRemove(index)}
              />
            </RemoveBtn>
          </Flex>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getDepartmentRole());
  }, []);

  const AllDepartmentRole = useSelector(selectAllDepartmentRole);

  const DepartmentRoleOptions = AllDepartmentRole?.map((emp) => ({
    label: emp.departmentName,
    value: emp.departmentId,
  }));

  const [employeeOption, setEmployeeOption] = useState([]);

  const handleDepartment = (e) => {
    form.setFieldsValue({ employeeName: null });
    form.setFieldsValue({ employeeId: null });

    const findObject = AllDepartmentRole.find(
      (item) => item.departmentId === e
    );
    const employeeOption = findObject?.departmentDetails?.map((value) => ({
      label: value.userName,
      value: value.employeeId,
    }));
    form.setFieldsValue({ departmentId: findObject.departmentId });
    setEmployeeOption(employeeOption);
  };

  const handleInterviewChange = (value) => {
    form.setFieldsValue({ employeeId: value });
  };

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
        name="products"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomRow space={[24, 24]}>
          {!Assetsrecord && (
            <Col span={24} sm={24} md={24} lg={24}>
              <div style={{ margin: "20px 0px" }}>
                <h3 style={{ fontSize: "18px" }}>Company Assets</h3>
              </div>
              <Card>
                <CustomRow space={[24, 24]}>
                  <Col span={24} lg={12} md={24}>
                    <CustomSelect
                      onChange={handleDepartment}
                      label={"Employee Department"}
                      placeholder={"Employee Department"}
                      options={DepartmentRoleOptions}
                      name={"departmentName"}
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Employee Department ! ! !",
                        },
                      ]}
                    />
                    <CustomInput name={"departmentId"} display={"none"} />
                  </Col>

                  <Col span={24} md={12}>
                    <CustomSelect
                      onChange={handleInterviewChange}
                      label={"Employee Name"}
                      placeholder={"Employee Name"}
                      options={employeeOption}
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
                </CustomRow>
              </Card>
            </Col>
          )}
          
        </CustomRow>
      </Form>

      <Col span={24} sm={24} md={24} lg={24}>
            <div style={{ margin: "20px 0px" }}>
              <h3 style={{ fontSize: "18px" }}>Assets</h3>
            </div>
            <AddAssigningTable
              SetDynamicTable={SetDynamicTable}
              Assetsrecord={dynamicTableData}
            />
          </Col>

      <br />

      <CustomStandardTable
        columns={columns}
        data={dynamicTableData}
        searchText={"sellRatee"}
      />
      {/* <FooterComponent /> */}
      {Assetsrecord ? (
        <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
          <Button.Primary text={"Update"} onClick={() => onSubmit()} />
          <Button.Danger text={"Cancel"} onClick={() => Formcancel()} />
        </Flex>
      ) : (
        <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
          <Button.Primary text={"Save"} onClick={() => onSubmit()} />
          <Button.Danger
            text={"Reset"}
            icon={<BiReset style={{ marginRight: "5px" }} />}
            onClick={() => onReset()}
          />
        </Flex>
      )}
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
