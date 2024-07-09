import { Card, Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomRow } from "../../../../../components/CustomRow";
import Flex from "../../../../../components/Flex";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import Button from "../../../../../components/Form/CustomButton";
import { BiReset } from "react-icons/bi";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";
import request, { base } from "../../../../../utils/request";
import { AddTableAssets } from "./AddTableAssets";
import styled from "styled-components";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { getAssets } from "../../AccountsSlice";
import { useNavigate } from "react-router-dom";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
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

export const AddAssets = ({
  Formcancel,
  Trigger,
  Assetsrecord,
  FormExternalClosess,
}) => {
  const [form] = Form.useForm();

  const [selectSubcatery, setSelectSubcatery] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

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
  const [updateFormData, setUpdateFormData] = useState({});

  const [initialTrigger, setInitialTrigger] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Assetsrecord?.companyAssetsType) {
      const tableData = Assetsrecord?.companyAssetsType?.map((value, index) => ({
        ...value,
        key: index,
      }));

      setDynamicTableData(tableData);
    }
  }, [Assetsrecord?.companyAssetsType]);

  // For Showing on Table
  const [dynamicTableData, setDynamicTableData] = useState([]);

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
      .post(`${APIURLS.POSTASSETS}`, values)
      .then(function (response) {
        toast.success("Assets Added Successfully");
        dispatch(getAssets());
        navigate("/viewAssets");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updating = (values) => {
    request
      .put(`${APIURLS.PUTASSETS}${Assetsrecord?.companyAssetsId}`, values)
      .then(function (response) {
        toast.success("Assets updated Successfully");
        dispatch(getAssets());
        FormExternalClosess();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinish = (values) => {
    let Result = {};
    imageUrl[0].name
      ? (Result = {
          companyAssetsType: dynamicTableData,
          date: selectedDate,
          assetValues: values.assetValues,
        })
      : (Result = {
          ...values,
          companyAssetsType: dynamicTableData,
          date: selectedDate,
          url: imageUrl[0],
        });
        
    if (Assetsrecord) {
      updating(Result);
      console.log(Result,'Result');
    } else {
      console.log(Result,'kkk');
      adding(Result);
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  const settingTableData = () => {
    const tableData = Assetsrecord?.companyAssetsType?.map((value, index) => ({
      ...value,
      key: index,
    }));

    setDynamicTableData(tableData);
  };

  useEffect(() => {
    if (Assetsrecord?.companyAssetsType) {
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
      form.setFieldsValue({ url: null });
    }
  }, [updateFormData, Assetsrecord, Trigger]);

  useEffect(() => {
    if (Assetsrecord?.url) {
      setImageUrl([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${Assetsrecord?.url}`,
        },
      ]);
    } else {
      setImageUrl([]);
    }

    setUpdateFormData(Assetsrecord);
  }, [Assetsrecord]);

  const onFinishFailed = (errorInfo) => {};

  const onEditVariant = (record) => {
    setTrigger(trigger + 1);
    setModelwith(800);
    setModalTitle("Update Assets type");
    setModalContent(
      <AddTableAssets
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
    // }
  };

  // }

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

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });

  const handleBillImage = async (img) => {
    if (img.fileList.length > 0) {
      const ImageObj = await Promise.all(
        img.fileList?.map(async (value) => {
          // Assuming getBase64 returns a Promise
          const base64Result = await getBase64(value.originFileObj);
          // const SlicedimageUrl = base64Result.slice(
          //   "data:image/jpeg;base64,".length
          // );
          const slicedImageUrl = base64Result.slice(`data:${value.type};base64,`.length);
          // Now, you can use base64Result
          return slicedImageUrl;
        })
      );

      setImageUrl(ImageObj);
    }
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <Fragment>
      <CustomRow space={[24, 24]}>
        <Col span={24} sm={24} md={24} lg={12}>
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
            <div style={{ margin: "20px 0px" }}>
              <h3 style={{ fontSize: "18px" }}>Company Assets</h3>
            </div>
            <Card>
              <CustomRow space={[24, 24]}>
                <Col span={24} lg={12} md={24}>
                  <CustomDatePicker
                    label={"Date"}
                    name={"date"}
                    placeholder={"Date"}
                    onChange={handleDate}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Date !",
                      },
                    ]}
                  />
                </Col>

                <Col span={24} md={12}>
                  <CustomInputNumber
                    label={"Assets Value"}
                    name={"assetValues"}
                    placeholder={"Assets Value"}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Assets Value in numbers !",
                      },
                    ]}
                  />
                </Col>

                <Col span={24} md={12}>
                  <CustomUpload
                    onChange={handleBillImage}
                    form={form}
                    maxCount={1}
                    listType="picture-card"
                    // initialValue={imageUrl}
                    label={"Bill"}
                    name={"url"}
                    accept=".png,.jpeg,.jpg"
                    rules={[
                      {
                        required: true,
                        message: "Please Upload Bill !",
                      },
                    ]}
                  />
                </Col>
                {Assetsrecord ? (
                  <Col span={24} md={12} style={{marginTop:"7px"}}>
                    <h1>Previous Image</h1>
                    <img
                      src={`${base}${Assetsrecord?.url}`}
                      alt=""
                      width={"100px"}
                      height={"100px"}
                      style={{ objectFit: "cover", borderRadius:"10px",marginTop:"10px" }}
                    />
                  </Col>
                ) : null}
              </CustomRow>
            </Card>
          
      </Form>
          </Col>

      <Col span={24} sm={24} md={24} lg={12}>
            <div style={{ margin: "20px 0px" }}>
              <h3 style={{ fontSize: "18px" }}>Company Asset Type</h3>
            </div>
            <AddTableAssets
              SetDynamicTable={SetDynamicTable}
              Assetsrecord={dynamicTableData}
            />
          </Col>
          </CustomRow>

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
