import { Col,Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react'
import Button from '../../../../../components/Form/CustomButton';
import { CustomInput } from '../../../../../components/Form/CustomInput';
import { CustomRow } from '../../../../../components/CustomRow';
import { CustomInputNumber } from '../../../../../components/Form/CustomInputNumber';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import Flex from '../../../../../components/Flex';
import request from '../../../../../utils/request';
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm';
import { getSalary, getTraineeSalary } from '../../PayrollSlice';

export const UpdateBasicSalary = ({ updatebasicrecord, FormExternalClosee ,updatetrigger, updateTraineeBasicrecord}) => {

    const [form] = useForm();
    const dispatch = useDispatch()

    useEffect(() => {
        if (updatebasicrecord) {
            setBasicSalary()
        }
        else if (updateTraineeBasicrecord){
            setBasicSalary()
        }
    }, [updatebasicrecord,updatetrigger,updateTraineeBasicrecord])

    const setBasicSalary = () => {
        if (updatebasicrecord) {
            form.setFieldsValue(updatebasicrecord)  
        }
        else if (updateTraineeBasicrecord){
            form.setFieldsValue(updateTraineeBasicrecord)  
        }
    }

    const UpdateTheBasicSalary = (values) => {
        request
          .put(`${APIURLS.PUTBASICSALARY}${updatebasicrecord?.employeeId}`, values)
          .then(function (response) {
            toast.info("Basic Salary Updated Successfully");
            dispatch(getSalary());
            FormExternalClosee();
          })
          .catch((error) =>{});
      };

      const UpdateTraineeBasicSalary = (values) => {
        request
          .put(`${APIURLS.PUTTRAINEEBASICSALARY}${updateTraineeBasicrecord?.traineeId}`, values)
          .then(function (response) {
            toast.info("Trainee Basic Salary Updated Successfully");
            dispatch(getTraineeSalary());
            FormExternalClosee();
          })
          .catch((error) =>{
            console.log(error,'error');
          });
      };

    const onFinish = (value) => { 
        if (updatebasicrecord) {
            UpdateTheBasicSalary(value)
        }
        else if (updateTraineeBasicrecord) {
            UpdateTraineeBasicSalary(value)
        }
    };

    const onFinishFailed = (value) => { };

    return (
        <div>
            <Form
                wrapperCol={{ span: 24 }}
                labelCol={{ span: 24 }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <CustomRow space={[12, 12]}>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"departmentName"}
                            label={"Department Name"}
                            placeholder={"Enter Department Name"}
                            disabled={"true"}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInput
                            name={"userName"}
                            label={"Staff Name"}
                            placeholder={"Enter Staff Name"}
                            disabled={"true"}
                        />
                    </Col>

                    <Col span={24} md={12}>
                        <CustomInputNumber
                            name={"salaryAmount"}
                            label={"Basic Salary"}
                            placeholder={"Enter Basic Salary"}
                        />
                    </Col>



                </CustomRow>

                <Flex gap={"20px"} center={"true"} margin={"20px 0"}>

                    <Button.Primary text={"Update"} htmlType={"submit"} />
                    <Button.Danger
                        text={"Cancel"}
                        onClick={() => FormExternalClosee()}
                    />

                </Flex>
            </Form>

        </div>
    )
}
