import { Card, Col, Form } from "antd";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import request, { base } from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import Flex from "../../../../../components/Flex";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import styled from "styled-components";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";
import { CustomTable } from "../../../../../components/Form/CustomTable";
import Button from "../../../../../components/Form/CustomButton";
import { BiReset } from "react-icons/bi";
import { CustomModal } from "../../../../../components/CustomModal";
import { AddTableServer } from "./AddTableServer";
import { getServer } from "../../AccountsSlice";

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

export const AddServer = ({
  Formcancel,
  Trigger,
  ServerRecord,
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
    if (ServerRecord?.serverList) {
      const tableData = ServerRecord?.serverList.map((value, index) => ({
        ...value,
        key: index,
      }));

      setDynamicTableData(tableData);
    }
  }, [ServerRecord?.serverList]);

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
      .post(`${APIURLS.POSTSERVER}`, values)
      .then(function (response) {
        toast.success("Server Added Successfully");
        dispatch(getServer());
        navigate("/server");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updating = (values) => {
    request
      .put(`${APIURLS.PUTSERVER}${ServerRecord?.serverId}`, values)
      .then(function (response) {
        toast.success("Assets updated Successfully");
        dispatch(getServer());
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
          serverList: dynamicTableData,
          date: selectedDate,
          serverName: values.serverName,
        })
      : (Result = {
          ...values,
          serverList: dynamicTableData,
          date: selectedDate,
          serverTypeUrl: imageUrl[0],
        });
    if (ServerRecord) {
      updating(Result);
    } else {
      adding(Result);
    }
  };

  const onSubmit = () => {
    form.submit();
  };

  const settingTableData = () => {
    const tableData = ServerRecord?.serverList.map((value, index) => ({
      ...value,
      key: index,
    }));

    setDynamicTableData(tableData);
  };

  useEffect(() => {
    if (ServerRecord?.serverList) {
      settingTableData();
    }
  }, [ServerRecord]);

  useEffect(() => {
    if (ServerRecord) {
      form.setFieldsValue(ServerRecord);
      const dateFormat = "YYYY-MM-DD";
      const Dated = new Date(ServerRecord?.date);
      const Datee = dayjs(Dated).format(dateFormat);

      form.setFieldsValue({
        date: dayjs(Datee, dateFormat),
      });
      form.setFieldsValue({ serverTypeUrl: null });
    }
  }, [updateFormData, ServerRecord, Trigger]);

  useEffect(() => {
    if (ServerRecord?.serverTypeUrl) {
      setImageUrl([
        {
          uid: "1",
          name: "example.jpg",
          status: "done",
          url: `${base}${ServerRecord?.serverTypeUrl}`,
        },
      ]);
    } else {
      setImageUrl([]);
    }

    setUpdateFormData(ServerRecord);
  }, [ServerRecord]);

  const onFinishFailed = (errorInfo) => {};

  const onEditVariant = (record) => {
    setTrigger(trigger + 1);
    setModelwith(800);
    setModalTitle("Update Assets type");
    setModalContent(
      <AddTableServer
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
    if (ServerRecord?.serverList) {
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
      title: "Server Type",
      dataIndex: "serverTypeName",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Action",
      render: (text, record, index) => {
        return (
          <Flex gap={"true"} center={"true"}>
            {ServerRecord ? (
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
        img.fileList.map(async (value) => {
          // Assuming getBase64 returns a Promise
          const base64Result = await getBase64(value.originFileObj);
          // const SlicedimageUrl = base64Result.slice(
          //   "data:image/jpeg;base64".length
          // );
          const SlicedimageUrl = base64Result.slice(
            `data:${value.type};base64,`.length
          );
          // Now, you can use base64Result
          return SlicedimageUrl;
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
              <h3 style={{ fontSize: "18px" }}>Server</h3>
            </div>
            <Card>
              <CustomRow space={[24, 24]}>
                <Col span={24} md={12}>
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
                  <CustomInput
                    label={"Server Name"}
                    name={"serverName"}
                    placeholder={"Server Name"}
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Server Name !",
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
                    label={"Server Type Url"}
                    name={"serverTypeUrl"}
                    accept=".png,.jpeg,.jpg"
                    rules={[
                      {
                        required: true,
                        message: "Please Upload an Image!",
                      },
                    ]}
                  />
                </Col>
                {ServerRecord ? (
                  <Col span={24} md={12} style={{marginTop:"7px"}}>
                    <h1>Previous Image</h1>
                    <img
                      src={`${base}${ServerRecord?.serverTypeUrl}`}
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
            <h3 style={{ fontSize: "18px" }}>Server List</h3>
          </div>
          <AddTableServer
            SetDynamicTable={SetDynamicTable}
            ServerRecord={dynamicTableData}
          />
        </Col>
      </CustomRow>
      <br />

      <CustomTable
        columns={columns}
        data={dynamicTableData}
        searchText={"sellRatee"}
      />
      {/* <FooterComponent /> */}
      {ServerRecord ? (
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
