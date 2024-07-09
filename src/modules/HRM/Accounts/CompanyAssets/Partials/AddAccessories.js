import { useForm } from "antd/es/form/Form";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import request, { base } from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { Col, ColorPicker, Form, message } from "antd";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import Flex from "../../../../../components/Flex";
import Button from "../../../../../components/Form/CustomButton";
import { getAccessories } from "../../AccountsSlice";
import Label from "../../../../../components/Form/Label";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomUpload } from "../../../../../components/Form/CustomUpload";

export const AddAccessories = ({
  formname,
  FormExternalCloses,
  Accessoriesrecord,
  Trigger,
}) => {
  const [form] = useForm();
  const [ImageInitialValue, setImageInitialValue] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    Accessoriesrecord
      ? form.setFieldsValue(Accessoriesrecord)
      : form.setFieldsValue({ accessoriesName: null });

    Accessoriesrecord?.color == null
      ? setColorHex("#fff")
      : setColorHex(Accessoriesrecord?.color);

      form.setFieldsValue({ 'image': ImageInitialValue })
  }, [Accessoriesrecord, Trigger]);

  useEffect(() => {

    if (Accessoriesrecord?.image?.length > 0) {
      setImageInitialValue([
        {
          uid: '1',
          name: 'example.jpg',
          status: 'done',
          url: `${base}${Accessoriesrecord?.image}`,
        },
      ])
    }
    else {
      setImageInitialValue([]);
    }

    // setUpdateFormData(Accessoriesrecord)
  }, [Accessoriesrecord])

  const [colorHex, setColorHex] = useState("#fff");
  const [formatHex, setFormatHex] = useState("hex");

  const hexString = useMemo(
    () => (typeof colorHex === "string" ? colorHex : colorHex.toHexString()),
    [colorHex]
  );

  // const hexString = useMemo(() => {
  //   return Accessoriesrecord ? Accessoriesrecord.color : typeof colorHex === "string" ? colorHex : colorHex.toHexString();
  // }, [Accessoriesrecord, colorHex]);

  const AddAccessories = (value) => {
    request
      .post(`${APIURLS.POSTASSETACCESSORIES}`, value)
      .then(function (response) {
        toast.success("Accessories Added Successfully");
        FormExternalCloses();
        dispatch(getAccessories());
        form.resetFields();
      })
      .catch((error) => {});
  };

  const UpdateAccessories = (value) => {
    request
      .put(
        `${APIURLS.PUTASSETACCESSORIES}${Accessoriesrecord?.accessoriesId}`,
        value
      )
      .then(function (response) {
        toast.success("Accessories Updated Successfully");
        FormExternalCloses();
        dispatch(getAccessories());
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  const onFinish = (values) => {

    // const newValue = {
    //   ...values,
    //   color: hexString,
    // };
    if (Accessoriesrecord) {
      const formData = new FormData();
      formData.append("accessoriesName", values.accessoriesName);
      formData.append("color", hexString);

      if (values?.image[0].originFileObj) {
        values.image.forEach((file) => {
          formData.append(`image`, file.originFileObj);
        });
      }

      UpdateAccessories(formData);
    } else {
      const formData = new FormData();
      formData.append("accessoriesName", values.accessoriesName);
      formData.append("color", hexString);

      if (values?.image && values.image.length > 0) {
        values.image.forEach((file) => {
          formData.append(`image`, file.originFileObj);
        });
      }

      AddAccessories(formData);
    }
  };
  const onFinishFailed = (value) => {};

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      wrapperCol={{ span: 24 }}
      labelCol={{ span: 24 }}
      form={form}
      name={formname}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <CustomRow space={[12, 12]}>
        <Col span={24} md={24}>
          <CustomInput
            label={"Accessories"}
            placeholder={"Add Accessories"}
            name={"accessoriesName"}
            rules={[
              {
                required: true,
                message: "Please Enter Accessories !!!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomUpload
            form={form}
            label={"Upload Photo"}
            name={"image"}
            listType="picture-card"
            maxCount={1}
            initialValue={ImageInitialValue}
            rules={[
              {
                required: true,
                message: "Please Upload an Image!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <Label>Select Colour </Label>
          <br />
          <ColorPicker
            format={formatHex}
            value={colorHex}
            onChange={setColorHex}
            onFormatChange={setFormatHex}
          />
          &nbsp; HEX: <span>{hexString}</span>
        </Col>
      </CustomRow>

      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {Accessoriesrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalCloses()}
            />
          </>
        ) : (
          <>
            <Button.Success text={"Submit"} htmlType={"submit"} />
            <Button.Danger text={"Reset"} onClick={() => onReset()} />
          </>
        )}
      </Flex>
    </Form>
  );
};
