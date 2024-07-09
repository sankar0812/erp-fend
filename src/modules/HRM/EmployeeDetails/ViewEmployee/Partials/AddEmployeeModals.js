import React, { useEffect, useMemo, useState } from "react";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import { Col, ColorPicker, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { useDispatch } from "react-redux";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { CustomRow } from "../../../../../components/CustomRow";
import {
  getDepartment,
  getDepartmentinTable,
  getDesignation,
  getShift,
} from "../../EmployeeSlice";
import { CustomTimePicker } from "../../../../../components/Form/CustomTimePicker";
import dayjs from "dayjs";
import Label from "../../../../../components/Form/Label";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";

export const AddDesignationModal = ({
  FormExternalCloses,
  FormExternalClosee,
  designationrecord,
  updatetrigger,
  formname,
}) => {
  // ----- Define Form
  const [form] = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    form.resetFields();
  }, [form, updatetrigger]);

  useEffect(() => {
    form.setFieldsValue(designationrecord);
  }, [designationrecord, updatetrigger, form]);

  const UpdateDesignation = (values) => {
    request
      .put(
        `${APIURLS.PUTDESIGNATION}${designationrecord?.designationId}`,
        values
      )
      .then(function (response) {
        toast.info("Designation Details Updated Successfully");
        dispatch(getDesignation());
        FormExternalClosee();
      })
      .catch((error) => {});
  };

  const AddDesignation = (value) => {
    request
      .post(`${APIURLS.POSTDESIGNATION}`, value)
      .then(function (response) {
        toast.success("Designation Added Successfully");
        FormExternalCloses();
        dispatch(getDesignation());
        form.resetFields();
      })
      .catch((error) => {});
  };
  const onFinish = (values) => {
    if (designationrecord) {
      UpdateDesignation(values);
    } else {
      AddDesignation(values);
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
      <div style={{ margin: "30px 0px" }}>
        <CustomInput
          label={"Designation"}
          placeholder={"Add Designation"}
          name={"designationName"}
          rules={[
            {
              required: true,
              message: "Please Enter Designation !!!",
            },
          ]}
        />
        <CustomInput name={"designationId"} display={"none"} />
      </div>
      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {designationrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClosee()}
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

export const AddDepartmentModal = ({
  FormExternalCloses,
  FormExternalClosee,
  formReset,
  departmentrecord,
  updatetrigger,
  formname,
}) => {
  // ----- Define Form
  const [form] = useForm();

  const dispatch = useDispatch();
  //   const [selectedColor, setSelectedColor] = useState("#fff");
  const [colorHex, setColorHex] = useState("#fff");
  const [formatHex, setFormatHex] = useState("hex");

  // const hexString = useMemo(
  //   () => (typeof colorHex === "string" ? colorHex : colorHex.toHexString()),
  //   [colorHex]
  // );

  const hexString = useMemo(
    () =>
      colorHex && typeof colorHex.toHexString === "function"
        ? colorHex.toHexString()
        : colorHex,
    [colorHex]
  );

  useEffect(() => {
    form.resetFields();
  }, [form, updatetrigger]);

  useEffect(() => {
    form.setFieldsValue(departmentrecord);
    setColorHex(departmentrecord?.color);
  }, [departmentrecord, updatetrigger, formReset, form]);

  const handleColorChange = (color) => {
    setFormatHex(color);
  };

  const UpdateDepartment = (values) => {
    request
      .put(`${APIURLS.PUTDEPARTMENT}${departmentrecord?.departmentId}`, values)
      .then(function (response) {
        toast.info("Department Details Updated Successfully");
        dispatch(getDepartment());
        dispatch(getDepartmentinTable());
        FormExternalClosee();
      })
      .catch((error) => {});
  };

  const AddDepartment = (value) => {
    request
      .post(`${APIURLS.POSTDEPARTMENT}`, value)
      .then(function (response) {
        dispatch(getDepartmentinTable());
        dispatch(getDepartment());
        FormExternalCloses();
        form.resetFields();
        toast.success("Department Added Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFinish = (values) => {
    const newValue = {
      ...values,
      color: hexString,
    };
    if (departmentrecord) {
      UpdateDepartment(newValue);
    } else {
      AddDepartment(newValue);
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
        <Col span={24}>
          <CustomInput
            label={"Department"}
            placeholder={"Add Department"}
            name={"departmentName"}
            rules={[
              {
                required: true,
                message: "Please Enter Department !!!",
              },
            ]}
          />
          <CustomInput name={"departmentId"} display={"none"} />
        </Col>
        {/* <Col span={24}>
          <ColorPicker color={selectedColor} onChange={handleColorChange} />
        </Col> */}
        <Col span={24}>
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
        <Col></Col>
      </CustomRow>

      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {departmentrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClosee()}
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
export const AddShiftModal = ({
  FormExternalCloseee,
  FormExternalClosee,
  formReset,
  shiftrecord,
  updatetrigger,
  formname,
}) => {
  // ----- Define Form
  const [form] = useForm();

  const dispatch = useDispatch();
  const [intime, setInTime] = useState();
  const [outtime, setOutTime] = useState();

  useEffect(() => {
    form.resetFields();
  }, [form, updatetrigger]);

  useEffect(() => {
    setShifts();
  }, [shiftrecord, updatetrigger, form]);

  const setShifts = () => {
    const formattedInTime = shiftrecord?.inTime
      ? dayjs(shiftrecord?.inTime, "HH:mm:A")
      : null;
    const formattedOutTime = shiftrecord?.outTime
      ? dayjs(shiftrecord?.outTime, "HH:mm:A")
      : null;

    form.setFieldsValue({
      inTime: formattedInTime,
      outTime: formattedOutTime,
      shiftType: shiftrecord?.shiftType,
    });
  };
  const handleInTime = (time, timeString) => {
    setInTime(timeString);
  };

  const handleOutTime = (time, timeString) => {
    setOutTime(timeString);
  };

  const UpdateShift = (values) => {
    request
      .put(`${APIURLS.PUTSHIFT}${shiftrecord?.shiftId}`, values)
      .then(function (response) {
        toast.info("Shift Details Updated Successfully");
        dispatch(getShift());
        FormExternalClosee();
      })
      .catch((error) => console.log(error, "error"));
  };

  const AddShift = (value) => {
    request
      .post(`${APIURLS.POSTSHIFT}`, value)
      .then(function (response) {
        dispatch(getShift());
        FormExternalCloseee();
        form.resetFields();
        toast.success("Shift Details Added Successfully");
      })
      .catch((error) => {});
  };
  const onFinish = (values) => {
    const newval = {
      ...values,
      inTime: intime || shiftrecord?.inTime,
      outTime: outtime || shiftrecord?.outTime,
    };
    if (shiftrecord) {
      UpdateShift(newval);
    } else {
      AddShift(newval);
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
        <Col span={24} md={12}>
          <CustomInput
            label={"Shift Type"}
            placeholder={"Add Shift Type"}
            name={"shiftType"}
            rules={[
              {
                required: true,
                message: "Please Enter Shift Type !!!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTimePicker
            label={"In Time"}
            placeholder={"Enter In Time"}
            name={"inTime"}
            onChange={handleInTime}
            rules={[
              {
                required: true,
                message: "Please Enter In Time!!!",
              },
            ]}
          />
        </Col>

        <Col span={24} md={12}>
          <CustomTimePicker
            label={"Out Time"}
            placeholder={"Enter Out Time"}
            name={"outTime"}
            onChange={handleOutTime}
            rules={[
              {
                required: true,
                message: "Please Enter Out Time !!!",
              },
            ]}
          />
        </Col>
      </CustomRow>

      <Flex gap={"20px"} center={"true"} margin={"20px 0"}>
        {shiftrecord ? (
          <>
            <Button.Primary text={"Update"} htmlType={"submit"} />
            <Button.Danger
              text={"Cancel"}
              onClick={() => FormExternalClosee()}
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
