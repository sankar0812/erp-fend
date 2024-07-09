import React, { Fragment, useEffect, useState } from "react";
import { THEME } from "../../../../../theme";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlineBellAlert, HiOutlineBellSlash } from "react-icons/hi2";
import { FiEdit, FiPlus } from "react-icons/fi";
import { AddAwards } from "./AddAwards";
import { CustomModal } from "../../../../../components/CustomModal";
import Flex from "../../../../../components/Flex";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../../../utils/request";
import { Col, Form, Popconfirm, Tooltip } from "antd";
import {
  getAwards,
  getAwardsError,
  getAwardsStatus,
  selectAllAwards,
} from "../../EmployeeSlice";
import { TableIconHolder } from "../../../../../components/CommonStyled";
import { CommonLoading } from "../../../../../components/CommonLoading";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import {
  CustomPageFormTitle,
  CustomPageTitle,
} from "../../../../../components/CustomPageTitle";
import { CustomRow } from "../../../../../components/CustomRow";
import CustomInputSearch from "../../../../../components/Form/CustomInputSearch";
import Button from "../../../../../components/Form/CustomButton";
import { useNavigate } from "react-router-dom";
import { CustomDateRangePicker } from "../../../../../components/Form/CustomDateRangePicker";
import dayjs from "dayjs";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import { selectCurrentRoleName } from "../../../../Auth/authSlice";
import { SvgIcons } from "../../../../../Images";
import { ViewAwardsDetails } from "./ViewAwardsDetails";

export const Viewawardstable = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  // const base = 'http://192.168.29.66:8080'
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ----------  Form Reset UseState ---------
  const [formReset, setFormReset] = useState(0);

  const [dataSource, setDataSource] = useState([]);
  const [searchTexts, setSearchTexts] = useState([]); // Search bar
  const [dateRange, setDateRange] = useState([]); // Start Date filter

  const AllRewards = useSelector(selectAllAwards);
  const AwardError = useSelector(getAwardsError);
  const AwardSts = useSelector(getAwardsStatus);

  const navigate = useNavigate();

  const RoleName = useSelector(selectCurrentRoleName);

  useEffect(() => {
    dispatch(getAwards());
  }, []);

  useEffect(() => {
    setDataSource(AllRewards);
  }, [AllRewards]);

  // -------  Form Reset Funtion

  const FormExternalClose = () => {
    handleOk();
    dispatch(getAwards());
  };

  const FormCancelRest = () => {
    setFormReset(formReset + 1);
  };

  const handleSearchs = (value) => {
    setSearchTexts(value);
  };

  // ===== Modal Functions Start =====

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    FormCancelRest();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    FormCancelRest();
  };

  // ===== Modal Functions End =====

  const UpdateEmployeeAwards = (record) => {
    setTrigger(trigger + 1);
    setModalTitle("Update Employee Awards");
    setModalContent(
      <AddAwards
      triggerAwards={trigger}
        formname={"EmployeeAwardsUpdateForm"}
        FormExternalClose={FormExternalClose}
        formReset={formReset}
        record={record}
      />
    );
    showModal();
  };

  // const ViewEmployeeAwards = (record) => {
  //   setModalTitle("View Employee Awards");
  //   setModalContent(<ViewEmployeeAwardsData record={record} />);
  //   showModal();
  // };

  // const ViewPDF = (record) => {
  //   return (
  //     <Document>
  //       <Page>
  //         <Text>sikeee</Text>
  //         <Text>name : {record.record.firstName}</Text>
  //         {record.record.awardsPhotos?.map((imageObj) => (
  //           <Image key={imageObj.awardsPhotoId} src={`${base}${imageObj.url}`} />
  //         ))}
  //       </Page>
  //     </Document>
  //   )
  // }

  // const AwardsStatus = (record) => {

  //   if (record.status === false || record.status === true) {
  //     request
  //       .put(`awards/or/${record.awardsId}`)
  //       .then(function (response) {
  //         dispatch(getAwards());
  //         if (response.data === false) {
  //           toast.success('You Click In-Active');
  //         }
  //         else {
  //           toast.success('You Click Active');
  //         }
  //       })
  //       .catch(function (error) {
  //       });
  //   }

  //   else {
  //     toast.warn('InActive');
  //   }
  // }
  const handlenavigate = (record) => {
    navigate(`/AddAwards`);
  };

  const handleDateRangeChange = (values) => {
    setDateRange(values);
  };

  // Date Search filter fn ==============
  const handleDate = (values) => {
    // const formData = new FormData();
    // formData.append('startDate',dateRange?.start_date);
    // formData.append('endDate',dateRange?.end_date);
    const Datevalues = {
      startDate: dateRange?.start_date,
      endDate: dateRange?.end_date,
    };

    DateSearch(Datevalues);
  };

  const DateSearch = (values) => {
    request
      .post(`${APIURLS.POSTSEARCH}`, values)
      .then(function (response) {
        setDataSource(response.data);
        if (response.data.length) {
          toast.success("Date Filter Search");
        } else {
          toast.warn("No Data");
        }
      })
      .catch(function (error) {
        toast.error("Failed");
      });
  };

  const VieweAwardsDetails = (record) => {
    console.log(record);
    setModalTitle("View Awards Details");
    setModalContent(<ViewAwardsDetails viewAwardDetail={record} />);
    showModal();
  };

  const TableColumn = [
    {
      title: "SI No",
      render: (value, item, index) => index + 1,
    },
    // {
    //   title: 'Status',

    //   render: (record, i) => {

    //     return (
    //       <Fragment>
    //         {record.status === true ? (
    //           <CustomTag bordered={"true"} color={'processing'} title={'Active'} />
    //         ) : (<CustomTag bordered={"true"} color={'error'} title={'In - Active'} />)
    //         }
    //       </Fragment>
    //     );
    //   },
    // },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Employee Name",
      dataIndex: "userName",
      filteredValue: searchTexts ? [searchTexts] : null,
      onFilter: (value, record) => {
        return (
          String(record.userName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.userName).includes(value.toUpperCase())
        );
      },
    },

    {
      title: "Award Type",
      dataIndex: "awardsType",
    },
    // {
    //   title: 'Cash',
    //   dataIndex: 'cash',
    // },
    {
      title: "Action",
      render: (record, i) => {
        return (
          <Flex center={"true"} gap={"10px"}>
            <TableIconHolder
              color={THEME.green}
              size={"22px"}
              onClick={() => {
                VieweAwardsDetails(record);
              }}
            >
              <Tooltip placement="top" title={"view"}>
                <img src={SvgIcons.viewIcon} width={22} alt="view" />
              </Tooltip>
            </TableIconHolder>

            {(RoleName === "Admin" || RoleName === "Manager") && (
              <TableIconHolder
                color={THEME.blue}
                size={"22px"}
                onClick={() => {
                  UpdateEmployeeAwards(record);
                }}
              >
                <Tooltip placement="top" title={"edit"}>
                  <img src={SvgIcons.editIcon} alt="edit" />
                </Tooltip>
              </TableIconHolder>
            )}
          </Flex>
        );
      },
    },
  ];

  let content;
  if (AwardSts === "loading") {
    content = <CommonLoading />;
  } else if (AwardSts === "succeeded") {
    const rowKey = (dataSource) => dataSource.awardsId;
    content = (
      <CustomStandardTable
        columns={TableColumn}
        data={dataSource}
        rowKey={rowKey}
      />
    );
  } else if (AwardSts === "failed") {
    content = <h2>{AwardError}</h2>;
  }

  return (
    <Fragment>
      <CustomPageFormTitle Heading={"View Awards"} />
      <Flex gap={"15px"}>
        <CustomDateRangePicker
          onChange={handleDateRangeChange}
          name={"range"}
          value={dateRange}
          rules={[{ required: true, message: "Please Select the Date" }]}
        />
        <Button.Primary text={"Search"} onClick={() => handleDate()} />
      </Flex>
      {content}
      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={900}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
