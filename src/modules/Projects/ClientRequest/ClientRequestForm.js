import { Col, Form } from 'antd';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import request from '../../../utils/request';
import { toast } from 'react-toastify';
import { selectCurrentId, selectCurrentRole } from '../../Auth/authSlice';
import { CustomRow } from '../../../components/CustomRow';
import { CustomInput } from '../../../components/Form/CustomInput';
import { CustomDatePicker } from '../../../components/Form/CustomDatePicker';
import Flex from '../../../components/Flex';
import { CustomTextArea } from '../../../components/Form/CustomTextArea';
import Button from '../../../components/Form/CustomButton';
import { BiReset } from 'react-icons/bi';
import { getClientRequest, getProjecttype, selectProjectType } from '../../Client/ClientSlice';
import { APIURLS } from '../../../utils/ApiUrls/Hrm';
import { CustomInputNumber } from '../../../components/Form/CustomInputNumber';
import { CustomDropSelect } from '../../../components/Form/CustomDropSelect';
import AddProjectType from '../../Client/ProjectType/Partials/AddProjectType';
import { CustomModal } from '../../../components/CustomModal';

export const ClientRequestForm = ({ clientRecord, formname, FormExternalClose, formReset }) => {

  const [form] = Form.useForm();
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState("")
  const [modalContent, setModalContent] = useState(null)
  const [trigger, setTrigger] = useState(0)
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    form.resetFields()
  }, [formReset])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false);
  }


  const handleCancel = () => {
    setIsModalOpen(false);

  }

  const handleOnChange = (date) => {
    setSelectedDate(date);
  };

  const onReset = () => {
    form.resetFields()
  }

  const FormClose = () => {
    handleOk()
    dispatch(getProjecttype())
  }

  const handleProjectType = () => {
    setTrigger(trigger + 1)
    // setModalTitle("Add Project Type");
    setModalContent(
      <AddProjectType
        // formname={"AddProjectType"}
        Requiretrigger={trigger}
        FormCloseSecond={FormClose}
      />
    );
    showModal();
  };

  useEffect(() => {
    dispatch(getProjecttype())
  }, [])

  //=====================Client name===================================

  const ClientId = useSelector(selectCurrentId);
  const Role = useSelector(selectCurrentRole);  //  role type
  const Type = useSelector(selectProjectType)

  console.log(Type, 'vgsash');
  const ProjectTypes = Type?.map(item => (
    {
      label: item.projectType,
      value: item.projectTypeId,
    }
  ))
  console.log(ProjectTypes, 'ProjectTypes');
  const onFinish = (values) => {
    const record = { ...values, date: selectedDate, clientId: ClientId }
    console.log(record, 'ONFINISH');
    AddClientForm(record);
  };

  const AddClientForm = (values) => {
    request.post(`${APIURLS.CLIENTREQUESTADD}`, values)
      .then(function (response) {
        console.log(response.data, 'RESPONSE');
        if (response.status === 200) {
          toast.success("Submited Successfully")
          form.resetFields();
          FormExternalClose()
        }
      })
      .catch(function (error) {
        console.log(error, 'error');
        toast.error("Adding Failed");
      });
  }
  return (
    <Fragment>
      <Form
        form={form}
        name={formname}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={
          {
            date: dayjs(),

          }

        }
        onFinish={onFinish}
        autoComplete="off"
      >
        <CustomRow space={[12, 12]}>
          <Col span={24} md={12}>
            <CustomInput
              name={"projectName"}
              label={"Project Name"}
              placeholder={"Enter Project Name"}
              rules={[
                {
                  required: true,
                  message: "Please Enter Project Name!",
                },
              ]}
            />
          </Col>
          <Col span={24} md={12}>
            <CustomDatePicker label={'Date'}
              name={'date'} onChange={handleOnChange}
            />
          </Col>
          {
            Role == 'Manager' &&
            <>
              <Col span={24} md={12}>
                <CustomInputNumber
                  min={0}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Project Duration!",
                    },
                  ]}
                  placeholder={'Duration'} label={"Project Duration (Days)"} name={'duration'} />
              </Col>
              <Col span={24} md={12}>
                <CustomDropSelect
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Project Type!",
                    },
                  ]}
                  options={ProjectTypes || []} placeholder={'Type'} label={'Project Type'} name={'projectTypeId'} onButtonClick={handleProjectType} />
              </Col>
            </>
          }

          <Col span={24} md={12}>
            <CustomInput label={'Features'} placeholder={'Features'}
              name={'features'} />
          </Col>
          <Col span={24} md={12}>
            <CustomTextArea label={'Skill & Description'}
              name={'skillsAndDescription'} />
          </Col>

        </CustomRow>
        <Flex center={"true"} style={{ margin: '10px' }}>
          <Button.Success text={"Add"} htmlType={"submit"} />
          <Button.Danger
            text={"Reset"}
            icon={<BiReset style={{ marginRight: "5px" }} />}
            onClick={() => onReset()}
          />
        </Flex>

        {/* {loading ? <Spin /> :null} */}
      </Form>
      <CustomModal isVisible={isModalOpen} handleCancel={handleCancel} width={400} handleOk={handleOk} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
