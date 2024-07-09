// import { Col, Form } from "antd";
// import React, { useEffect, useState } from "react";
// import { CustomRow } from "../../../../../components/CustomRow";
// import Button from "../../../../../components/Form/CustomButton";
// import Flex from "../../../../../components/Flex";
// import { CustomInput } from "../../../../../components/Form/CustomInput";
// import request from "../../../../../utils/request";
// import { toast } from "react-toastify";
// import { BiReset } from "react-icons/bi";
// import dayjs from "dayjs";
// import { useDispatch } from "react-redux";
// import { getBankDetail } from "../../EmployeeSlice";
// import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";

// export const AddBankDetails = ({
//   formname,
//   FormExternalClose,
//   id,
//   bankDetail,
//   GetBankDetails,
//   trigger
// }) => {
//   const [form] = Form.useForm();
//   const [selectedDate, setSelectedDate] = useState(
//     dayjs().format("YYYY-MM-DD")
//   );

//   useEffect(() => {
//     if (bankDetail) {
//       console.log(bankDetail,'bankDetail');
//       form.setFieldsValue(bankDetail);
//     }
//   }, [bankDetail,trigger]);

//   // const dispatch = useDispatch();

//   // useEffect(() => {
//   //   dispatch(getBankDetail());
//   // }, []);

//   const onFinish = (values) => {
    
//     request
//       .put(`${APIURLS.PUTBANKDETAIL}${id}/`, values)
//       .then((response) => {
//         console.log("Posting data to axios", response.data);
//         toast.success("Employee Bank Details Update Successfully !");
//         GetBankDetails();
//         FormExternalClose();
//       })
//       .catch((error) => {
//         console.log(error, "Getting Error");
//       });
//   };

//   const onFinishFailed = (errorInfo) => {
//     toast.error("Added Failed");
//   };

//   const onReset = () => {
//     form.resetFields();
//   };

//   const handleDate = (date) => {
//     setSelectedDate(date);
//   };

//   const EmployeeeName = [
//     {
//       label: "rol",
//       value: "ex",
//     },
//   ];



//   return (
//     <Form
//       form={form}
//       name={formname}
//       labelCol={{
//         span: 24,
//       }}
//       wrapperCol={{
//         span: 24,
//       }}
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <CustomRow space={[12, 12]}>

//         <Col span={24} md={12}>
//           <CustomInput
//             name={"bankName"}
//             label={"Bank Name"}
//             placeholder={"Enter Bank Name"}
//           />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomInput
//             name={"branchName"}
//             label={"Branch Name"}
//             placeholder={"Enter Branch Name"}
//           />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomInput
//             name={"accountNumber"}
//             label={"Account Number"}
//             placeholder={"Enter Account Number"}
//           />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomInput
//             name={"ifseCode"}
//             label={"IFSC Code"}
//             placeholder={"Enter IFSC Code"}
//           />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomInput
//             name={"holderName"}
//             label={"Holder Name"}
//             placeholder={"Enter Holder Name"}
//           />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomInput
//             label={"Pan Number"}
//             name={"panNumber"}
//             placeholder={"Pan Number"}
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter Pan Number !",
//               },
//             ]}
//           />
//         </Col>
//       </CustomRow>

//       <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
//         <Button.Primary text={"Save"} htmlType={"submit"} />
//         <Button.Danger
//           text={"Reset"}
//           icon={<BiReset style={{ marginRight: "5px" }} />}
//           onClick={() => onReset()}
//         />
//       </Flex>
//     </Form>
//   );
// };


import { Col, Form } from "antd";
import React, { useEffect, useState } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import Button from "../../../../../components/Form/CustomButton";
import Flex from "../../../../../components/Flex";
import { CustomInput } from "../../../../../components/Form/CustomInput";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import { BiReset } from "react-icons/bi";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { getBankDetail } from "../../EmployeeSlice";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
export const AddBankDetails = ({
  formname,
  FormExternalClose,
  id,
  formReset,
  bankDetail,
  GetBankDetails,
  trigger
}) => {
  console.log(bankDetail,'bankDetail');
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   dispatch(getBankDetail());
  // }, []);


  const onFinish = (values) => {
    request
      .put(`${APIURLS.PUTBANKDETAIL}${bankDetail?.bankId}/`, values)
      .then((response) => {
        toast.success("Employee Bank Details Update Successfully !");
        GetBankDetails();
        FormExternalClose();
      })
      .catch((error) => {
        if (error.response.status && error.response.status === 400) {
          toast.error(error.response?.data)
        }
        else{
          toast.error('Failed')
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    toast.error("Added Failed");
  };

  useEffect(() => {
    if (bankDetail) {
      form.setFieldsValue(bankDetail);
    }
  }, [bankDetail,formReset]);

  const onReset = () => {
    form.resetFields();
  };
  

  return (
    <Form
      form={form}
      name={formname}
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
      <CustomRow space={[12, 12]}>
        <Col span={24} md={12}>
          <CustomInput
            name={"bankName"}
            label={"Bank Name"}
            placeholder={"Enter Bank Name"}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInput
            name={"branchName"}
            label={"Branch Name"}
            placeholder={"Enter Branch Name"}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInputNumber
            name={"accountNumber"}
            label={"Account Number"}
            placeholder={"Enter Account Number"}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInput
            name={"ifseCode"}
            label={"IFSC Code"}
            placeholder={"Enter IFSC Code"}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInput
            name={"holderName"}
            label={"Holder Name"}
            placeholder={"Enter Holder Name"}
          />
        </Col>
        <Col span={24} md={12}>
          <CustomInput
            label={"Pan Number"}
            name={"panNumber"}
            placeholder={"Pan Number"}
            rules={[
              {
                required: true,
                message: "Please enter Pan Number !",
              },
            ]}
          />
        </Col>
      </CustomRow>
      <Flex center={"true"} gap={"20px"} margin={"20px 0px"}>
        <Button.Primary text={"Save"} htmlType={"submit"} />
        <Button.Danger
          text={"Reset"}
          icon={<BiReset style={{ marginRight: "5px" }} />}
          onClick={() => onReset()}
        />
      </Flex>
    </Form>
  );
};
