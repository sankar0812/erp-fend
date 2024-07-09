import { Col, Form, Layout, Tabs } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import request, { base } from '../../../../../utils/request';
import { APIURLS } from '../../../../../utils/ApiUrls/Hrm';
import { toast } from 'react-toastify';
import { CustomInputNumber } from '../../../../../components/Form/CustomInputNumber';
import Flex from '../../../../../components/Flex';
import { CustomLableBack } from '../../../../../components/CustomLableBack';
import { CustomPageTitle } from '../../../../../components/CustomPageTitle';
import { CustomCardView } from '../../../../../components/CustomCardView';
import { CustomRow } from '../../../../../components/CustomRow';
import { CustomStandardTable } from '../../../../../components/Form/CustomStandardTable';
import Button from '../../../../../components/Form/CustomButton';
import { CustomDatePicker } from '../../../../../components/Form/CustomDatePicker';

const { Content } = Layout;
const { TabPane } = Tabs;

export const TraineePayroll = () => {
   // ----- Define Form
   const [form] = Form.useForm();
   const isMobile = window.innerWidth <= 768;
   const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));


   const [tabPosition, setTabPosition] = useState('top');
   const [activeTab, setActiveTab] = useState('');

   const [initialTabName, setInitialTabName] = useState('Select Department ↓');
   const [initialTabData, setInitialTabData] = useState([]);
   const [showInitialTab, setShowInitialTab] = useState(true);
   const [sampleData, setSampleData] = useState([])


   const [departments, setDepartments] = useState([]);

   const [selectedUserName, setSelectedUserName] = useState('');

   const dispatch = useDispatch()

  //  useEffect(() => {
  //      dispatch(getDepartment())
  //  }, [])

  //  const TabDepartment = useSelector(selectAllDepartment)

  //  useEffect(() => {
  //      setSelectedUserName(TabDepartment)
  //  }, [TabDepartment])

   const [salaryData, setSalaryData] = useState([]);

   const payrollAmountt = sampleData?.salaryType?.map((item) => {
       return { salaryAmount: item.salaryAmount }
   })

   const payment =payrollAmountt?.map((item, i) => {
       return item?.salaryAmount 
   })
   const onFinish = (values, key) => {
           const formattedData = {
               payrollDate: selectedDate,

               payrollTypeList: salaryData.map((item,index) => ({
                   traineeId: item.traineeId,
                  //  reason: item.payrollTypeList[0].reason,
                   deductions: item.payrollTypeList[0].deductions,
                   allowance: item.payrollTypeList[0].allowance,
                   netPay: item.payrollTypeList[0].salaryAmount,
                   payrollAmount: payment[index] 
               })
               ),
           };
           AddSalary(formattedData);
   };

   const onFinishFailed = () => {

   }

   const AddSalary = (values) => {
       request.post(`${APIURLS.POSTTRAINEEPAYROLL}`, values)
           .then(function (response) {
               toast.success("Trainee Payroll Added Successfully");
               form.resetFields();
               setSalaryData([]);
               setSelectedUserName('');
           })
           .catch(function (error) {
               console.log(error,'error');
               toast.error(error.response.data);
           });
   };


   useEffect(() => {
       GetDepartmentEmp();
   }, []);

   const GetDepartmentEmp = () => {
       const department = 'trainee';
       request
           .get(`${APIURLS.GETPAYROLLDEPARTMENT}`, { params: { department } })
           .then(function (response) {
               setDepartments(response.data)
           })
           .catch(function (error) {
           });
   };

   // useEffect(() => {
   //     const storedTab = localStorage.getItem('activeTab');
   //     if (storedTab) {
   //         setActiveTab(storedTab);
   //     }
   // }, []);

   // useEffect(() => {
   //     if (activeTab) {
   //         localStorage.setItem('activeTab', activeTab);
   //     }
   // }, [activeTab]);

   useEffect(() => {
       const handleResize = () => {
           if (window.innerWidth < 768) {
               setTabPosition('top');
           } else {
               setTabPosition('left');
           }
       };

       handleResize();

       window.addEventListener('resize', handleResize);

       return () => {
           window.removeEventListener('resize', handleResize);
       };
   }, []);

   const handleTabChange = (key) => {
       setActiveTab(key);
   };

   const resetFormFields = () => {
       form.resetFields();
       setSalaryData([]); // Reset salary data when tab changes
       setSelectedUserName(''); // Reset selected user name
   };

   const handleDepartmentSelection = (key) => {
       setActiveTab(key);
       resetFormFields()

       if (key === 'Select Department ↓') {
           setInitialTabName('Select Department ↓');
           setSalaryData([]);
           setSelectedUserName('');
       } else {
           const selectedDepartment = departments.find(department => department.departmentId === key);
           setSampleData(selectedDepartment)

           if (selectedDepartment && selectedDepartment.salaryType) {
               const userDetails = selectedDepartment.salaryType
                   .filter(item => item.traineeName)
                   .map(item => ({
                       traineeName: item.traineeName,
                       traineeId: item.traineeId,
                       salaryAmount: item.salaryAmount,
                       departmentName: item.departmentName,
                       payrollTypeList: [{ traineeId: item.traineeId, salaryAmount: item.salaryAmount }],
                       payrollAmount: item.salaryAmount,
                       profile: item.profile,
                       presentDays: item.presentDays,
                       totalDays: item.totalDays,
                   }));

               setSalaryData(userDetails);
               setSelectedUserName(userDetails);


           } else {
               setSalaryData([]);
               setSelectedUserName('');
           }
       };
       setShowInitialTab(true);
   };




   const calculateSalaryAmount = (baseSalary, deductions, allowance) => {
       const totalDeduction = deductions ? parseFloat(deductions) : 0;
       const totalAllowance = allowance ? parseFloat(allowance) : 0;
       return baseSalary - totalDeduction + totalAllowance;
   };

   const handleDeductionChange = (index, value) => {
       setSalaryData(prevSalaryData => {
           return prevSalaryData.map((item, i) => {
               if (i === index) {
                   const salaryAmount = calculateSalaryAmount(
                       item.salaryAmount,
                       value,
                       item.payrollTypeList[0].allowance
                   );

                   return {
                       ...item,
                       payrollTypeList: [
                           {
                               ...item.payrollTypeList[0],
                               salaryAmount: salaryAmount,
                               deductions: value,
                           },
                       ],
                   };
               }
               return item;
           });
       });
   };


   const handleAllowanceChange = (index, value) => {
       setSalaryData(prevSalaryData => {
           return prevSalaryData.map((item, i) => {
               if (i === index) {
                   const salaryAmount = calculateSalaryAmount(
                       item.salaryAmount,
                       item.payrollTypeList[0].deductions,
                       value
                   );

                   return {
                       ...item,
                       payrollTypeList: [
                           {
                               ...item.payrollTypeList[0],
                               salaryAmount: salaryAmount,
                               allowance: value,
                           },
                       ],
                   };
               }
               return item;
           });
       });
   };

   const handleReasonChange = (index, value) => {
       setSalaryData(prevSalaryData => {
           return prevSalaryData.map((item, i) => {
               if (i === index) {
                   return {
                       ...item,
                       payrollTypeList: item.payrollTypeList.map(subItem => ({
                           ...subItem,
                           reason: value,
                       })),
                   };
               }
               return item;
           });
       });
   };

   const columns = [
       {
           title: "SI No",
           render: (value, item, index) => index + 1,
       },
       {
           title: "Image",
           dataIndex: "profile",
           render: (profile) => {
             return (
               <img
                 src={`${base}${profile}`}
                 alt="Staff"
                 width="50"
                 height="50"
                 style={{ borderRadius: "50%", objectFit: "cover" }}
               />
             );
           },
         },
       {
           title: "Department Name",
           dataIndex: "departmentName",
           key: "departmentName",
       },
       {
           title: "User Name",
           dataIndex: "traineeName",
           key: "traineeName",
       },
       {
           title: "Total Days",
           dataIndex: "totalDays",
           key: "totalDays",
       },
       {
           title: "Present Days",
           dataIndex: "presentDays",
           key: "presentDays",

       },
       {
           title: "Salary Amount",
           dataIndex: "salaryAmount",
           key: "salaryAmount",
           render: (text, record, index) => {
               return (
                   <span>{salaryData[index]?.payrollTypeList[0]?.salaryAmount}</span>
               );
           },
       },
       {
           title: (
               <p>Deductions</p>
           ),
           dataIndex: 'deductions',
           key: 'deductions',
           render: (text, record, index) => {
               return (

                   <CustomInputNumber
                       style={{ minWidth: '100px' }}
                       onChange={(value) => handleDeductionChange(index, value)}
                       onKeyPress={(e) => {
                           if (!/^\d*\.?\d*$/.test(e.key) && e.key !== 'Backspace') {
                               e.preventDefault();
                           }
                       }}
                       rules={[
                           {
                               required: true,
                               message: "Please enter Deductions !",
                           }

                       ]}
                   />



               );
           },
       },
       {
           title: (
               <p>Allowance</p>
           ),
           dataIndex: 'allowance',
           key: 'allowance',
           render: (text, record, index) => {
               return (

                   <CustomInputNumber
                       style={{ minWidth: '100px' }}
                       onChange={(value) => handleAllowanceChange(index, value)}
                       onKeyPress={(e) => {
                           if (!/^\d*\.?\d*$/.test(e.key) && e.key !== 'Backspace') {
                               e.preventDefault();
                           }
                       }}

                       rules={[
                           {
                               required: true,
                               message: "Please enter Allowance !",
                           }

                       ]}

                   />
               );
           },
       },

       // {
       //     title: (
       //         <p>Reason</p>
       //     ),
       //     dataIndex: 'reason',
       //     key: 'reason',
       //     render: (text, record, index) => {
       //         return (

       //             <CustomTextArea
       //                 style={{ minWidth: '100px' }}
       //                 onChange={(e) => handleReasonChange(index, e.target.value)}
       //                 rules={[
       //                     {
       //                         required: true,
       //                         message: "Please enter Reason !",
       //                     }

       //                 ]}

       //             />
       //         );
       //     },
       // },

   ];

   const handleDate = (e) => {
       setSelectedDate(e)
   }

   const rowKey = (selectedUserName) => selectedUserName.traineeId;

   return (
       <Layout>
           <Content style={{ margin: '24px 16px', padding: 0 }}>
               <Form
                   form={form}
                   labelCol={{
                       span: 24,
                   }}
                   wrapperCol={{
                       span: 24,
                   }}
                   onFinish={onFinish}
                   onFinishFailed={onFinishFailed}
                   autoComplete="off"
                   initialValues={{payrollDate: dayjs()}}
               >
                   <Flex>
                       <CustomLableBack />
                       <CustomPageTitle Heading={"Trainee Payroll"} />
                   </Flex>
                   <CustomCardView>
                       <CustomRow space={[12, 12]}>
                           <Col span={24} md={12}>
                               {/* <CustomDatePicker onChange={handleDate} name={'salaryDate'} label={'Salary Date'} /> */}
                           </Col>
                           <Col span={24} md={6}>
                               <CustomDatePicker onChange={handleDate} name={'payrollDate'} disabled={'disabled'} label={'Date'}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Please enter date !",
                                       }

                                   ]}
                               />
                           </Col>
                           <Col span={24} md={6} style={{ marginTop: isMobile ? '10px' : '38px' }}>
                               {/* <CustomDatePicker onChange={handleDate} name={'salaryDate'} label={'Salary Date'} /> */}
                               {/* <Flex end> */}

                                   <Button.Primary
                                       style={{ borderRadius: "6px" }}
                                       // icon={<FiPlus style={{ fontSize: "20px" }} />}
                                       text={"Submit"} htmlType={'submit'}
                                   />
                               {/* </Flex> */}

                           </Col>
                       </CustomRow>


                       <Tabs tabPosition={tabPosition} onChange={(key) => handleDepartmentSelection(key)}>
                           {showInitialTab && (
                               <TabPane tab={initialTabName} key="Select Department ↓">
                                   <CustomStandardTable data={initialTabData} columns={columns} />
                               </TabPane>
                           )}

                           {departments.map(department => (
                               <TabPane tab={department.departmentName} key={department.departmentId}>
                                   <CustomStandardTable data={selectedUserName} columns={columns} rowKey={rowKey}/>
                               </TabPane>
                           ))}
                       </Tabs>

                   </CustomCardView>
               </Form>
           </Content>

       </Layout>
   );
}
