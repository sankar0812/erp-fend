import { Card, Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomDropSelect } from "../../../../../components/Form/CustomDropSelect";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import {
  getAccessories,
  getAssetsBrand,
  getAssignAssets,
  selectAllAccessories,
  selectAllAssetsBrand,
  selectAllAssignAssets,
} from "../../../Accounts/AccountsSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";

export const AddAssigningTable = ({
  UpdateTypeRecord,
  SetDynamicTable,
  SetDynamicEditTable,
  handleClose,
  trigger
}) => {
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formReset, setFormReset] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [availCount, setavailCount] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  
  const [selectedVar, setSelectedVar] = useState([]);
  const [ischeck, setIscheck] = useState(false);

  const dispatch = useDispatch();

  const [form] = Form.useForm(); // ----- Define Form

  const [selectedBrand, setSelectedBrand] = useState([]);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  // useEffect(() => {
  //   form.setFieldsValue({ brandId: selectedBrand })
  // }, [selectedBrand])

  // useEffect(() => {
  //   form.setFieldsValue({ accessoriesId: selectedAccessories })
  // }, [selectedAccessories])

  useEffect(() => {

    if (UpdateTypeRecord) {
      form.setFieldsValue(UpdateTypeRecord);
    form.setFieldsValue({
      brandId: UpdateTypeRecord?.brandName,
      brandName: UpdateTypeRecord?.brandId,
      accessoriesId: UpdateTypeRecord?.accessoriesName,
      accessoriesName: UpdateTypeRecord?.accessoriesId,
    });
    setAvailableCount(UpdateTypeRecord?.balanceCount);
    setavailCount(UpdateTypeRecord?.balanceCount + UpdateTypeRecord?.count);
    }
    
  }, [UpdateTypeRecord,trigger]);

  useEffect(() => {
    dispatch(getAssignAssets());
  }, []);

  const AllAssetsBrand = useSelector(selectAllAssignAssets);

  const AssetsBrandOptions = AllAssetsBrand?.map((item) => ({
    label: item.brandName,
    value: item.brandId,
  }));

  const FormExternalClose = () => {
    handleOk();
  };

  // const handleOnChange = (value) => {
  //   const AllBrandDetails = AllAssetsBrand.find(item => item.brandName === value);
  //   setSelectedBrand(AllBrandDetails?.brandId);
  // }

  const handleOnChange = (e) => {
    form.setFieldsValue({ accessoriesName: null });
    form.setFieldsValue({ accessoriesId: null });

    const findObject = AllAssetsBrand.find((item) => item.brandId === e);
    const selectedBrand = findObject?.assetsDetails.map((value) => ({
      label: value.accessoriesName,
      value: value.accessoriesId,
    }));
    form.setFieldsValue({ brandName: findObject.brandName });

    setSelectedBrand(selectedBrand);
  };

  const handleAccessoriesChange = (value) => {
    const brand_id = form.getFieldValue("brandId");
    form.setFieldsValue({ accessoriesId: value });
    const findObject = AllAssetsBrand.find((item) => item.brandId === brand_id);
    const findAccessoriesName = findObject?.assetsDetails.find(
      (item) => item.accessoriesId === value
    );
    setAvailableCount(findAccessoriesName?.count);
    setavailCount(findAccessoriesName?.count);
    form.setFieldsValue({
      accessoriesName: findAccessoriesName?.accessoriesName,
    });
  };

  const onFinish = (values) => {
    let result = {
      brandId: values?.brandId,
      brandName: values?.brandName,
      accessoriesName: values?.accessoriesName,
      accessoriesId: values?.accessoriesId,
      count: values?.count,
      serialNumber: values?.serialNumber,
      key: values.key,
    };

    if (UpdateTypeRecord) {
      let results = {
        brandId: values?.brandName,
        brandName: values?.brandId,
        accessoriesName: values?.accessoriesId,
        accessoriesId: values?.accessoriesName,
        balanceCount:availableCount,
        count: values?.count,
        serialNumber: values?.serialNumber,
        key: values.key,
      };
      SetDynamicEditTable(results);
      handleClose();
      setIscheck(false);
    } else {
      SetDynamicTable(result);
      form.resetFields();
      setIscheck(false);
    }
    setSelectedVar([]);
  };

  const onFinishFailed = (errorInfo) => {};

  const onReset = () => {
    if (UpdateTypeRecord) {
      handleOk();
    } else {
      form.resetFields();
    }
  };

  const handleCount = (e) => {
    if (UpdateTypeRecord) {
      if (e > availCount) {
        toast.warning("Count cannot be greater than available count");
        form.setFieldsValue({ count: null });
        setAvailableCount(availCount);
      } else {
        const bal = availCount - e;
        setAvailableCount(bal)
      }
    } else {
      if (e > availCount) {
        toast.warning("Count cannot be greater than available count");
        form.setFieldsValue({ count: null });
        setAvailableCount(availCount);
      } else {
        const count = availCount - e;
        setAvailableCount(count);
      }
    }
  };

  return (
    <Fragment>
      <Card>
        <Form
          form={form}
          name={"productAdd"}
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <CustomRow space={[24, 24]}>
            <Col span={24} md={12}>
              {/* <CustomSelect
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
                  <CustomInput name={"departmentId"} display={"none"} /> */}
              <CustomSelect
                onChange={handleOnChange}
                label={"Assets Brand"}
                placeholder={"Select Assets Brand"}
                options={AssetsBrandOptions}
                name={"brandId"}
                rules={[
                  {
                    required: true,
                    message: "Please Select Assets Brand!",
                  },
                ]}
              />
              <CustomInput name={"brandName"} display={"none"} />
            </Col>

            <Col span={24} md={12}>
              <CustomSelect
                options={selectedBrand}
                showSearch={true}
                buttonLabel="Accessories"
                label={"Accessories"}
                name={"accessoriesId"}
                placeholder={"Select Accessories"}
                onChange={handleAccessoriesChange}
                rules={[
                  {
                    required: true,
                    message: "Please Select Accessories!",
                  },
                ]}
              />
              <CustomInput name={"accessoriesName"} display={"none"} />
              <CustomInput name={"key"} display={"none"} />
            </Col>
            <Col span={24} md={24}>
              <p>Available Count: {availableCount}</p>
            </Col>
            <Col span={24} md={12}>
              <CustomInputNumber
                label={"Count"}
                name={"count"}
                placeholder={"Count"}
                onChange={handleCount}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Count !",
                  },
                ]}
              />
            </Col>

            <Col span={24} md={12}>
              <CustomInput
                label={"Serial Number"}
                name={"serialNumber"}
                placeholder={"Serial Number"}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Serial Number !",
                  },
                ]}
              />
            </Col>
          </CustomRow>
          <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
            <Button.Success
              text={UpdateTypeRecord ? "Update" : "Add"}
              onClick={() => {
                form.submit();
              }}
            />
            <Button.Danger text={"Cancel"} onClick={() => onReset()} />
          </Flex>

          <CustomModal
            isVisible={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            modalTitle={modalTitle}
            modalContent={modalContent}
          />
        </Form>
      </Card>
    </Fragment>
  );
};
