// import React, { useEffect, useState } from 'react'
// import { Col, Form } from 'antd'
// import { CustomInput } from '../../../components/Form/CustomInput'
// import { CustomRow } from '../../../components/CustomRow'
// import Flex from '../../../components/Flex'
// import Button from '../../../components/Form/CustomButton'
// import { CustomPageFormSubTitle } from '../../../components/CustomPageTitle'
// import { CustomInputNumber } from '../../../components/Form/CustomInputNumber'
// import { CustomTextArea } from '../../../components/Form/CustomTextArea'
// import { CustomSelect } from '../../../components/Form/CustomSelect'
// import { SampleSmallForm } from './SampleSmallForm'
// import { CustomAddSelect } from '../../../components/Form/CustomAddSelect'
// import { CustomModal } from '../../../components/CustomModal'
// import { CustomTimePicker } from '../../../components/Form/CustomTimePicker'
// import { CustomUpload } from '../../../components/Form/CustomUpload'

// export const ExampleForm = ({ FormExternalClose, formReset, formname }) => {

//   // ======  Modal Open ========
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // ======  Modal Title and Content ========
//   const [modalTitle, setModalTitle] = useState("");
//   const [modalContent, setModalContent] = useState(null);

//   // =======  Get Selected Time =======
//   const [inTime, setInTime] = useState(null)

//   const [form] = Form.useForm();      // ----- Define Form

//   useEffect(() => {
//     form.resetFields();
//   }, [formReset])

//   const categoryOption = [
//     {
//       label: '1st Item',
//       value: '1st item'
//     },
//     {
//       label: '2nd Item',
//       value: '2nd item'
//     }
//   ]

//   // ===== Modal Functions Start =====

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   // ===== Modal Functions End =====

//   const handleButtonClick = () => {
//     setModalTitle("Add Category");
//     setModalContent(<SampleSmallForm />);
//     showModal();
//   };

//   const onReset = () => {
//     form.resetFields();
//   };

//   const inTimeChange = (time) => {
//     setInTime(time);
//   }

//   const ChangeProductId = (e) => {
//     console.log(e, 'wwwwwwwwww')
//   }

//   const onFinish = (values) => {
//     console.log('Success:', values);
//     const NewValue = { ...values, Time: inTime }

//     console.log('NewValue:', NewValue);
//     FormExternalClose();
//     form.resetFields();
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

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
//           <CustomInput label={'User Name'} name={'name'} />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomInput label={'User Name'} name={'email'} type={'email'} />
//         </Col>

//         <Col span={24}>
//           <CustomPageFormSubTitle Heading={'Customer Details'} />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomInputNumber label={'Phone Number'} name={'phonenumber'} precision={2} />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomTextArea label={'Address'} name={'address'} />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomUpload label={'Upload'} name={'upload'} listType='picture-card' maxCount={3} accept='.png,.jpeg,.jpg' rules={[
//             {
//               required: true,
//               message: 'Please Select Image'
//             }
//           ]} />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomTimePicker label={'Upload'} name={'Time'} onChange={inTimeChange} rules={[
//             {
//               required: true,
//               message: 'Please Select Time'
//             }
//           ]} />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomAddSelect label={'Product Category'} name={'categoryid'}
//             showSearch={true}
//             onButtonClick={handleButtonClick}
//             onChange={ChangeProductId}
//             options={categoryOption}
//             rules={[
//               {
//                 required: true,
//                 message: 'Please enter details!',
//               },
//             ]} />
//         </Col>

//         <Col span={24} md={12}>
//           <CustomSelect
//             options={categoryOption}
//             label={'Product Category'}
//             name={'category'}
//             rules={[
//               {
//                 required: true,
//                 message: 'Please enter details!',
//               },
//             ]} onChange={ChangeProductId} />
//         </Col>

//       </CustomRow>

//       <Flex gap={'20px'} center={"true"} margin={'20px 0'}>
//         <Button.Success text={'Submit'} htmlType={'submit'} />
//         <Button.Danger text={'cancel'} onClick={() => onReset()} />
//       </Flex>

//       <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
//     </Form>
//   )
// }


import { InputNumber, Radio, Select } from 'antd';
import { useState } from 'react';
const { Option } = Select;

export const ExampleForm = () => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
  };

  const selectAfter = (
    <Select
      defaultValue="year"
      style={{
        width: 100,
      }}
    >
      <Option value="Year">Year</Option>
    </Select>
  );

  return (
    <div>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>Fresher</Radio>
        <Radio value={2}>Experience minimum one year</Radio>
      </Radio.Group>

      {value === 2 ? 
      <InputNumber addonAfter={selectAfter} defaultValue={1} /> : null}
    </div>
  );
};
