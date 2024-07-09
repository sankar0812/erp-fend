import React, { useEffect, useState } from "react";
import { selectCurrentRoleName } from "../../../../Auth/authSlice";
import { Col, Form, Layout, Tabs } from "antd";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import request, { base } from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import Flex from "../../../../../components/Flex";
import { CustomLableBack } from "../../../../../components/CustomLableBack";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { CustomDatePicker } from "../../../../../components/Form/CustomDatePicker";
import { CustomRow } from "../../../../../components/CustomRow";
import Button from "../../../../../components/Form/CustomButton";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";

const { Content } = Layout;
const { TabPane } = Tabs;

export const TraineeBasicSalary = () => {
  const RoleName = useSelector(selectCurrentRoleName);
  const isMobile = window.innerWidth <= 768;

  // ----- Define Form
  const [form] = Form.useForm();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [updatingDates, setUpdatingDates] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  //Tab
  const [tabPosition, setTabPosition] = useState("top");
  const [activeTab, setActiveTab] = useState("");

  const [initialTabName, setInitialTabName] = useState("Select Department ↓");
  const [initialTabData, setInitialTabData] = useState([]);
  const [showInitialTab, setShowInitialTab] = useState(true);

  //departments get
  const [departments, setDepartments] = useState([]);

  const [selectedUserName, setSelectedUserName] = useState("");

  useEffect(() => {
    form.setFieldsValue({ enteredBy: RoleName });
  }, [RoleName]);

  const [salaryData, setSalaryData] = useState([]);

  const onFinish = (values) => {
    if (salaryData.length > 0) {
      // const { enteredBy } = values;
      const formattedData = {
        enteredBy: RoleName,
        salaryTypeList: salaryData.map((item) => ({
          traineeId: item.traineeId,
          salaryAmount: item.salaryTypeList[0].salaryAmount,
          updatingDate: selectedDate,
        })),
      };

      AddSalary(formattedData);
    } else {
      toast.error("Failed: No salary data found");
    }
  };

  const onFinishFailed = () => {};

  useEffect(() => {
    GetDepartmentByRole();
  }, []);

  const GetDepartmentByRole = () => {
    const trainee = "Department";
    request
      .get(`${APIURLS.GETWITHOUTBASICSALARYTRAINEE}`, { params: { trainee } })
      .then(function (response) {
        setDepartments(response.data);
      })
      .catch(function (error) {});
  };

  const AddSalary = (values) => {
    request
      .post(`${APIURLS.POSTBASICSALARY}`, values)
      .then(function (response) {
        toast.success("Added Basic Salary");
        GetDepartmentByRole();
        form.resetFields();
        setSalaryData([]);
      })
      .catch(function (error) {
        console.log(error, "errorerror");
        toast.error(" Failed");
      });
  };

  // Update the local storage when the active tab changes
  useEffect(() => {
    if (activeTab) {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTabPosition("top");
        setInitialTabName("Select Department →");
      } else {
        setTabPosition("left");
        setInitialTabName("Select Department ↓");
      }
    };

    // Initial check when the component mounts
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const resetFormFields = () => {
    form.resetFields();
    setSalaryData([]); // Reset salary data when tab changes
    setSelectedUserName(""); // Reset selected user name
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    resetFormFields();

    // When changing tabs, set the initial tab name and empty data
    if (key === "Select Department ↓") {
      setInitialTabName("Select Department ↓");
      setSalaryData([]);
      setSelectedUserName("");
    } else {
      // Fetch data for the selected department and set the initial tab name as needed
      const selectedDepartment = departments.find(
        (department) => department.department_id === key
      );


      if (selectedDepartment && selectedDepartment.department_details) {
        const userDetails = selectedDepartment.department_details
          .filter((item) => item.user_name)
          .map((item) => ({
            departmentName: item.department_name,
            userName: item.user_name,
            // salaryTypeListId: 1,
            traineeId: item.trainee_id,
            profile: item.profile,
            salaryTypeList: [{ traineeId: item.trainee_id }],
          }));

        setSalaryData(userDetails);
        setSelectedUserName(userDetails);
      } else {
        setSalaryData([]);
        setSelectedUserName("");
      }
    }
    setShowInitialTab(false);
  };

  // useEffect(() => {
  //     // Load the active tab from local storage if available
  //     const storedTab = localStorage.getItem('activeTab');
  //     if (storedTab) {
  //         setActiveTab(storedTab);
  //         // Reset form fields when the tab changes
  //         form.resetFields();
  //     }
  // }, [form, setActiveTab]);

  const handleSalaryAmountChange = (index, value) => {
    setSalaryData((prevSalaryData) => {
      return prevSalaryData.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            salaryTypeList: item.salaryTypeList.map((subItem) => ({
              ...subItem,
              salaryAmount: value,
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
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: <p>Basic&nbsp;Salary</p>,
      dataIndex: "salaryTypeList",
      key: "salaryTypeList",
      render: (text, record, index) => {
        return (
          <CustomInputNumber
            style={{ minWidth: "100px" }}
            name={`salaryTypeList[${index}].salaryAmount`}
            value={salaryData[index]?.salaryTypeList?.[0]?.salaryAmount || ""}
            onChange={(value) => handleSalaryAmountChange(index, value)}
            onKeyPress={(e) => {
              if (!/^\d*\.?\d*$/.test(e.key) && e.key !== "Backspace") {
                e.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please Enter Basic Salary!",
              },
            ]}
          />
        );
      },
    },
    //   {
    //     title: (
    //         <p>Salary&nbsp;Date</p>
    //     ),
    //     dataIndex: 'updatingDate',
    //     key: 'updatingDate',
    //     render: (text, record, index) => {
    //         return (
    //             <>
    //                 <CustomDatePicker name={'updatingDate'} onChange={updateDate} rules={[
    //                     {
    //                         required: true,
    //                         message: "Please Enter Salary Date  !",
    //                     }

    //                 ]} />
    //             </>
    //         );
    //     },
    // },
  ];

  const handleDate = (e) => {
    setSelectedDate(e);
  };

  const updateDate = (e) => {
    setUpdatingDates(e);
  };

  const rowKey = (selectedUserName) => selectedUserName.traineeId;

  return (
    <Layout>
      <Content style={{ margin: "24px 16px", padding: 0 }}>
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
          initialValues={{ salaryDate: dayjs() }}
        >
          <Flex>
            <CustomLableBack />
            <CustomPageTitle Heading={"Trainee Basic Salary"} />
          </Flex>

          <CustomCardView>
            <CustomRow space={[24, 24]}>
              <Col span={24} md={12}>
                {/* <CustomDatePicker onChange={handleDate} name={'salaryDate'} label={'Salary Date'} /> */}
              </Col>
              {/* <Col span={24} md={6}>
                                  <CustomInput label={'Entered By'} name={'enteredBy'} disabled={'disabled'}
                                      rules={[
                                          {
                                              required: true,
                                              message: "Please EnteredBy  !",
                                          }
  
                                      ]}
                                  />
                                  <CustomInput name={'employeeId'} display={'none'} />
                              </Col> */}
              <Col span={24} md={6}>
                <CustomDatePicker
                  onChange={handleDate}
                  name={"salaryDate"}
                  label={"Fixing Date"}
                  disabled={"disabled"}
                  rules={[
                    {
                      required: true,
                      message: "Please Fixing Date !",
                    },
                  ]}
                />
              </Col>
              <Col
                span={24}
                md={6}
                style={{ marginTop: isMobile ? "10px" : "38px" }}
              >
                <Button.Primary
                  style={{ borderRadius: "6px" }}
                  text={"Submit"}
                  htmlType={"submit"}
                />
              </Col>
            </CustomRow>

            <Tabs
              tabPosition={tabPosition}
              onChange={(key) => handleTabChange(key)}
            >
              {showInitialTab && (
                <TabPane tab={initialTabName} key="initial">
                  <CustomStandardTable
                    data={initialTabData}
                    columns={columns}
                  />
                </TabPane>
              )}

              {departments.map((department) => (
                <TabPane
                  tab={department.department_name}
                  key={department.department_id}
                >
                  <CustomStandardTable
                    data={selectedUserName}
                    columns={columns}
                    rowKey={rowKey}
                  />
                </TabPane>
              ))}
            </Tabs>
          </CustomCardView>
        </Form>
      </Content>
    </Layout>
  );
};
