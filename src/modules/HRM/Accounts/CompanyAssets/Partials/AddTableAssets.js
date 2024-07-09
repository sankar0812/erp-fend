import { Card, Col, Form } from "antd";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomMultiSelect } from "../../../../../components/Form/CustomMultiSelect";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { CustomUpload2 } from "../../../../../components/Form/CustomUpload2";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import request from "../../../../../utils/request";
import { CustomDropSelect } from "../../../../../components/Form/CustomDropSelect";
import { CustomModal } from "../../../../../components/CustomModal";
import { AddBrand } from "./AddBrand";
import { getAccessories, getAssetsBrand, selectAllAccessories, selectAllAssetsBrand } from "../../AccountsSlice";
import { useSelector } from "react-redux";
import { AddAccessories } from "./AddAccessories";

export const AddTableAssets = ({
  UpdateTypeRecord,
  SetDynamicTable,
  SetDynamicEditTable,
  handleClose
}) => {
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formReset, setFormReset] = useState(0);

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

  const [vartrigger, setVarTrigger] = useState(0);
  const [defaultSelected, setDefaultSelected] = useState([]);
  const [allVar, setAllVar] = useState([]);

  const [imageUrl, setImageUrl] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const dispatch = useDispatch();

  const [form] = Form.useForm(); // ----- Define Form

  const [selectedBrand, setSelectedBrand] = useState([])
  const [selectedAccessories, setSelectedAccessories] = useState([])
  const [triggerforbrand,setTriggerforBrand] = useState(0)
  const [triggerforAccessories,setTriggerforAccessories] = useState(0)

  useEffect(() => {
    form.setFieldsValue({ brandId: selectedBrand?.brandId })
  }, [selectedBrand,triggerforbrand])

  useEffect(() => {
    form.setFieldsValue({ accessoriesId: selectedAccessories?.accessoriesId})
  }, [selectedAccessories,triggerforAccessories])

  useEffect(() => {
    form.setFieldsValue(UpdateTypeRecord)
  }, [UpdateTypeRecord])
  

  useEffect(() => {
    dispatch(getAssetsBrand());
  }, []);

  useEffect(() => {
    dispatch(getAccessories());
  }, []);

  const AllAssetsBrand = useSelector(selectAllAssetsBrand);
  const AllAccessories = useSelector(selectAllAccessories);

  const AssetsBrandOptions = AllAssetsBrand?.map((item) => ({
    label: item.brandName,
    value: item.brandName,
  }));

  const FormExternalClose = () => {
    handleOk();
  };

  const AssetsBrandModal = () => {
    setModalTitle("Add Assets Brand Here");
    setModalContent(
      <AddBrand FormExternalCloses={FormExternalClose} formname={"AddBrand"} />
    );

    showModal();
  };

  const AccessoriesOptions = AllAccessories?.map((item) => ({
    label: item.accessoriesName,
    value: item.accessoriesName,
  }));

  const AccessoriesModal = () => {
    setModalTitle("Add Accessories Here");
    setModalContent(
      <AddAccessories
        FormExternalCloses={FormExternalClose}
        formname={"AddAccessories"}
      />
    );

    showModal();
  };

  const handleOnChange = (value) => {
    const AllBrandDetails = AllAssetsBrand.find(item => item.brandName === value);
    setSelectedBrand(AllBrandDetails);
    setTriggerforBrand(triggerforbrand + 1)
  }

  const handleAccessoriesChange = (value) => {
    const AllAccessoriesDetails = AllAccessories.find(item => item.accessoriesName === value);
    setSelectedAccessories(AllAccessoriesDetails);
    setTriggerforAccessories(triggerforAccessories + 1)
  }

  const onFinish = (values) => {
    let result = {
        brandId: values?.brandId,
        brandName: values?.brandName,
        accessoriesName: values?.accessoriesName,
        accessoriesId: values?.accessoriesId,
        count: values?.count,
        key:values.key
    };

    if (UpdateTypeRecord) {
      SetDynamicEditTable(result);
      handleClose();
      setIscheck(false);
    }
     else {
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
              <CustomDropSelect
                options={AssetsBrandOptions}
                onButtonClick={AssetsBrandModal}
                showSearch={true}
                buttonLabel="Add Assets Brand"
                label={"Assets Brand"}
                name={"brandName"}
                placeholder={"Select Assets Brand"}
                onChange={handleOnChange}
                rules={[
                  {
                    required: true,
                    message: "Please Select Assets Brand!",
                  },
                ]}
              />
              <CustomInput name={'brandId'} display={'none'}/>
            </Col>

            <Col span={24} md={12}>
              <CustomDropSelect
                options={AccessoriesOptions}
                onButtonClick={AccessoriesModal}
                showSearch={true}
                buttonLabel="Add Accessories"
                label={"Accessories"}
                name={"accessoriesName"}
                placeholder={"Select Accessories"}
                onChange={handleAccessoriesChange}
                rules={[
                  {
                    required: true,
                    message: "Please Select Accessories!",
                  },
                ]}
              />
               <CustomInput name={'accessoriesId'} display={'none'} />
               <CustomInput name={'key'} display={'none'}/>
            </Col>

            <Col span={24} md={12}>
              <CustomInput
                label={"Count"}
                name={"count"}
                placeholder={"Count"}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Count !",
                  },
                ]}
              />
            </Col>
          </CustomRow>
          <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
            <Button.Success
              text={UpdateTypeRecord ? 'Update' : 'Add'}
            onClick={()=>{form.submit()}}
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
