import { Card, Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { CustomInputNumber } from "../../../../../../components/Form/CustomInputNumber";
import { CustomModal } from "../../../../../../components/CustomModal";
import Flex from "../../../../../../components/Flex";
import request from "../../../../../../utils/request";
import { CustomRow } from "../../../../../../components/CustomRow";
import { CustomStandardTable } from "../../../../../../components/Form/CustomStandardTable";
import Button from "../../../../../../components/Form/CustomButton";
import { APIURLS } from "../../../../../../utils/ApiUrls/Hrm";
import { CustomSelect } from "../../../../../../components/Form/CustomSelect";
import {
  getBusinessProfile,
  selectAllBusinessProfile,
} from "../../../../../BusinessProfile/BusinessSlice";
import { CustomTextArea } from "../../../../../../components/Form/CustomTextArea";
import { HeaderForm } from "./HeaderForm";
import { CustomDropSelect } from "../../../../../../components/Form/CustomDropSelect";
import AddTermsForm from "../../Terms&Conditions/Partials/AddTermsForm";
import { getMaintianTerms, getTerms } from "../../../Invoice/invoiceSlice";
import { CustomPageTitle } from "../../../../../../components/CustomPageTitle";
import { CustomInput } from "../../../../../../components/Form/CustomInput";
import { ViewPrint } from "./ViewPrint";
import Item from "antd/es/list/Item";

export const AddMaintainInvoice = ({
  setSale,
  mainRecord,
  ViewEditTrigger,
  FormExternalClosee,
}) => {
  const dispatch = useDispatch();

  const [check, setCheck] = useState([]);
  console.log(check, "check");

  const [proCount, setProCount] = useState(1); //  -->  Product Count

  const [invoiceNumber, setInvoiceNumber] = useState({}); //  -->  Invoice Number
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  ); //  -->  Invoice Date

  const [gstChecked, setGstChecked] = useState(false); //  -->  GST Checked
  const [modalWidth, setModalWidth] = useState(0);

  const [getdata, setGetdata] = useState([]); // --> Product Data
  const [selectedSale, setSelectedSale] = useState({}); // --> User Selected Data
  const [projectData, setProjectData] = useState([]); //  Use project Name get based on client Id
  console.log(projectData, "projectData");
  const [projUnderInv, setProjUnderInv] = useState([]);

  const [trigger, setTrigger] = useState(0);
  const [payType, setPayType] = useState("Cash");
  const [clientData, setClientData] = useState({});

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // =====  Modal Functions Start ===

  console.log(projUnderInv, "projUnderInv");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // =====  Modal Functions End ===

  const [form] = Form.useForm(); //  --> Form Ref

  const [round, setRound] = useState(false);

  const [balanceChangeAmount, setBalanceChangeAmount] = useState(0);
  const [balanceChange, setBalanceChange] = useState(false);

  // ======  Selected Client Details ====
  useEffect(() => {
    form.setFieldsValue({ mobileNumber: clientData?.phoneNumber1 });
  }, [clientData, ViewEditTrigger]);

  // ======  Product State Start =====
  const ProductInitialData = [
    {
      key: 0,
      description: "",
      projectName: "",
      projectId: "",
      price: "",
      subTotal: "",
    },
  ];

  const ProSecondaryData = [
    {
      total: "",
    },
  ];

  const ProFooterCalData = [
    {
      total: "",
    },
  ];
  const [proTableData, setProTableData] = useState(ProductInitialData);
  const [proTabSecondaryData, setProTabSecondaryData] =
    useState(ProSecondaryData);

  // ======  Product State End =====

  useEffect(() => {
    proTableData.forEach((record) => {
      if (mainRecord) {
        form.setFieldsValue({
          [`projectName${record.key}`]: record?.projectName,
        });
        form.setFieldsValue({
          [`projectId${record.key}`]: record?.projectId,
        });
      } else {
        form.setFieldsValue({
          [`projectName${record.key}`]: projUnderInv?.projectName,
        });
        form.setFieldsValue({
          [`projectId${record.key}`]: projUnderInv?.projectId,
        });
      }
      form.setFieldsValue({ [`description${record.key}`]: record.description });
      form.setFieldsValue({ [`price${record.key}`]: record.price });
      form.setFieldsValue({ [`tax${record.key}`]: record.tax });
      form.setFieldsValue({ [`taxAmount${record.key}`]: record.taxAmount });
      form.setFieldsValue({ [`subTotal${record.key}`]: record.subTotal });
    });

    form.setFieldsValue({ total: proTabSecondaryData[0].total });
  }, [proTableData, projUnderInv]);

  //=Company Id=================

  useEffect(() => {
    dispatch(getBusinessProfile());
  }, [ViewEditTrigger]);

  const profdetails = useSelector(selectAllBusinessProfile);

  useEffect(() => {
    form.setFieldsValue({ companyId: profdetails?.companyId });
  }, [profdetails]);

  // ===============  Table Data Start ==================

  //====================== Project Name =========================//
  const [project, setProject] = useState([]);
  const [tirggers, setTirggers] = useState(0);

  useEffect(() => {
    setProject(projectData);
  }, [projectData, tirggers]);

  const projectNameOptions = project?.map((item) => ({
    label: item.projectName,
    value: item.projectId,
  }));

  //============ Terms ===================

  const AllTerms = useSelector(getMaintianTerms);
  const [changeTerms, setChangeTerms] = useState(false);

  useEffect(() => {
    dispatch(getTerms());
  }, []);

  const TermsOptions = AllTerms?.map((item) => ({
    label: item.title,
    value: item.maintenanceTermsId,
  }));

  const handleChange = (value) => {
    const FindtErmsId = AllTerms?.find(
      (item) => item.maintenanceTermsId == value
    );
    form.setFieldsValue({
      maintenanceTermsId: FindtErmsId?.maintenanceTermsId,
      terms: FindtErmsId?.terms,
      title: FindtErmsId?.title,
    });
    setChangeTerms(FindtErmsId?.title);
  };
  const handlegetTerms = () => {
    dispatch(getTerms());
    handleOk();
  };
  const handletermsClick = (record) => {
    setModalWidth(400);
    setModalTitle("Maintenance Terms");
    setModalContent(<AddTermsForm handlegetTerms={handlegetTerms} />);
    showModal();
  };

  useEffect(
    (value) => {
      if (mainRecord) {
        form.setFieldsValue(mainRecord);

        const fromdatee = new Date(mainRecord?.invoiceDate);
        const dateFormat = "YYYY-MM-DD";
        const FrmDateee = dayjs(fromdatee).format(dateFormat);

        form.setFieldsValue({
          invoiceDate: dayjs(FrmDateee),
        });

        setProTabSecondaryData([
          {
            total: mainRecord?.total,
          },
        ]);

        if (mainRecord?.terms) {
          form.setFieldsValue({ terms: mainRecord?.terms });
          setChangeTerms(mainRecord?.title); // <<<<<<<<<<<<<<<<<set value from terms for description label
        }
      }
    },
    [mainRecord, ViewEditTrigger]
  );

  useEffect(() => {
    if (mainRecord?.maintenanceList) {
      const tableData = mainRecord?.maintenanceList.map((value, index) => ({
        ...value,
        key: index,
      }));

      setProTableData(tableData);
      setProCount(tableData.length);
    }
  }, [mainRecord, ViewEditTrigger]);

  // ============ Table  columns

  const columns = [
    {
      title: "#",
      render: (text, record, index) => {
        return (
          <Flex
            aligncenter={"true"}
            gap={"20px"}
            style={{ alignItems: "center" }}
          >
            <h4>{index + 1}</h4>
            {/* <Button
              style={{
                display: "flex",
                padding: "10px",
                height: "auto",
                fontSize: "16px",
              }}
              htmlType="button"
              danger
              onClick={() => onProductTabRowDelete(record.key)}
            >
              <DeleteOutlined />
            </Button> */}
          </Flex>
        );
      },
    },
    {
      title: <p>Project&nbsp;Name</p>,
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return (
          <>
            <CustomInput
              rules={[
                {
                  required: true,
                  message: "This is required field",
                },
              ]}
              minwidth={"230px"}
              name={`projectName${record.key}`}
              // options={projectNameOptions}
              // disabled={mainRecord}
              disabled={"true"}
              onChange={(value) => handleChangeProject(value, record)}
            />
            <CustomInput name={`projectId${record.key}`} display={"none"} />
          </>
        );
      },
    },
    {
      title: <p>Description</p>,
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <CustomTextArea
          minwidth={"100px"}
          style={{ textAlign: "center" }}
          name={`description${record.key}`}
          onChange={(value) => handleOnChangeDescription(value, record)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <CustomInputNumber
          minwidth={"120px"}
          style={{ textAlign: "center" }}
          name={`price${record.key}`}
          precision={2}
          rules={[
            {
              required: true,
              message: "This is a required field",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (parseFloat(value) <= 0) {
                  return Promise.reject("Price must be greater than 1");
                }
                return Promise.resolve();
              },
            }),
          ]}
          onChange={(value) => handleOnChangePrice(value, record)}
        />
      ),
    },
    {
      title: "Tax",
      children: [
        {
          title: "%",
          dataIndex: "tax",
          key: "tax",
          render: (text, record) => (
            <CustomInputNumber
              minWidth={"120px"}
              placed={"end"}
              precision={2}
              name={`tax${record.key}`}
              min={0.0}
              max={100.0}
              onChange={(value) => handleOnChangeTax(value, record)}
            />
          ),
        },
        {
          title: "Amount",
          dataIndex: "taxAmount",
          key: "taxAmount",
          render: (text, record) => (
            <CustomInputNumber
              minWidth={"120px"}
              precision={2}
              disabled
              placed={"end"}
              name={`taxAmount${record.key}`}
            />
          ),
        },
      ],
    },
    {
      title: <p>Sub&nbsp;Total</p>,
      dataIndex: "subTotal",
      key: "subTotal",
      render: (text, record) => (
        <CustomInputNumber
          precision={2}
          disabled
          minwidth={"120px"}
          placed={"end"}
          name={`subTotal${record.key}`}
        />
      ),
    },
  ];

  // ===============  Table Data End ==================

  // ================== Product Table Functions Start ==================

  const AddRow = () => {
    // ----------------- Add Row Function
    const newData = {
      key: proCount,
      projectId: "",
      price: "",
      subTotal: "",
      description: "",
    };
    setProTableData((pre) => {
      return [...pre, newData];
    });
    setProCount(proCount + 1);
  };

  const onProductTabRowDelete = (key) => {
    // -----------------------  Delete Row Function
    if (proTableData.length > 1) {
      setProTableData((prevState) => {
        const newData = prevState.filter((item) => item.key !== key);

        let totalAmount = 0;

        newData.forEach((item) => {
          if (item.subTotal !== "") {
            totalAmount += parseFloat(item.subTotal);
          }
        });

        // update the amount value in the proTabSecondaryData array
        setProTabSecondaryData([
          {
            Total: totalAmount.toFixed(2),
          },
        ]);

        return newData;
      });
    }
  };
  const [data, setData] = useState({});
  const CalculateTotal = (record) => {
    console.log(record, "recordrecordrecord");
    // ----------------- 1. Calculate TotalAmount
    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      setData(newData?.projectId);
      let totalAmount = 0;

      newData.forEach((item) => {
        if (item.subTotal !== "") {
          totalAmount += parseFloat(item.subTotal);
        }
      });

      // update the amount value in the proTabSecondaryData array
      setProTabSecondaryData([
        {
          total: totalAmount.toFixed(2),
        },
      ]);

      return newData;
    });
  };
  // ===================  Whole Tax Row Calculation ============
  // -------------- Handle Total Row Amount  --------------
  const calculateProductTableAmount = (record) => {
    const quantity = parseFloat(record.quantity) || 0;
    const sale_amount = parseFloat(record.price) || 0;
    return quantity * sale_amount;
  };

  const HandleRowCal = (record) => {
    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      let totalTaxAmount = 0; // Sub - Total
      let amount = 0; // Grand - Total
      let taxAmount = 0; // Tax - Amount
      let discountAmount = 0; // Discount - Amount
      const PriceAmt = record.price || 0;
      const price = record.price || 0;
      const quantity = record.quantity || 0;
      const Tax_per = record.tax || 0;
      const Dis_per = record.discountPercentage || 0;

      const OriginalAmount = PriceAmt; // Qty x Price

      if (gstChecked) {
        //  GST CHECKED
        // --------------  TAX PERCENTAGE NOT EQUAL TO ZERO ---
        if (Tax_per != 0) {
          // --------------  DisCount NOT EQUAL TO ZERO ---
          if (Dis_per != 0) {
            // --- Discount Calculation
            let DisAmt = (OriginalAmount * Dis_per) / 100; // --> Discount Amt

            // --- Tax Calculation
            let TaxPlusHun = Tax_per + 100; // --> Tax + 100

            let TaxIncludePrice = OriginalAmount - DisAmt;

            let ExcludingAmt = TaxIncludePrice * (100 / TaxPlusHun); // -- > Excluding Amount

            const TaxAmt = TaxIncludePrice - ExcludingAmt;

            discountAmount = DisAmt;
            taxAmount = TaxAmt;
            totalTaxAmount = ExcludingAmt;
            amount = TaxIncludePrice;
          } // --------------  DisCount EQUAL TO ZERO ---
          else {
            // --- Tax Calculation

            let TaxPlusHun = Tax_per + 100; // --> Tax + 100

            let ExcludingAmt = OriginalAmount * (100 / TaxPlusHun); // -- > Excluding Amount

            let TaxAmt = OriginalAmount - ExcludingAmt;
            let TaxQtyAmt = TaxAmt * quantity;

            discountAmount = 0;
            taxAmount = TaxQtyAmt;
            totalTaxAmount = ExcludingAmt;
            amount = OriginalAmount;
          }
        } // --------------  TAX PERCENTAGE EQUAL TO ZERO ---
        else {
          // --------------  DisCount NOT EQUAL TO ZERO ---
          if (Dis_per != 0) {
            // --- Discount Calculation
            const DisMinus = (OriginalAmount * Dis_per) / 100;
            const ApplyDiscount = OriginalAmount - DisMinus;

            discountAmount = DisMinus;
            taxAmount = 0;
            totalTaxAmount = OriginalAmount;
            amount = ApplyDiscount;
          } // --------------  DisCount EQUAL TO ZERO ---
          else {
            discountAmount = 0;
            taxAmount = 0;
            totalTaxAmount = OriginalAmount;
            amount = OriginalAmount;
          }
        }
      } // --------------  TAX PERCENTAGE NOT EQUAL TO ZERO ---
      else {
        // --------------  TAX PERCENTAGE NOT EQUAL TO ZERO ---
        if (Tax_per != 0) {
          // --------------  DisCount NOT EQUAL TO ZERO ---
          if (Dis_per != 0) {
            // --- Discount Calculation
            const DisMinus = (OriginalAmount * Dis_per) / 100;
            const ApplyDiscount = OriginalAmount - DisMinus;

            // --- Tax Calculation
            const taxAmt = (ApplyDiscount * Tax_per) / 100;
            const ApplyTax = ApplyDiscount + taxAmt;

            discountAmount = DisMinus;
            taxAmount = taxAmt;
            totalTaxAmount = OriginalAmount;
            amount = ApplyTax;
          } // --------------  DisCount EQUAL TO ZERO ---
          else {
            // --- Tax Calculation
            const taxAmt = (OriginalAmount * Tax_per) / 100;
            const ApplyTax = OriginalAmount + taxAmt;

            discountAmount = 0;
            taxAmount = taxAmt;
            totalTaxAmount = OriginalAmount;
            amount = ApplyTax;
          }
        } // --------------  TAX PERCENTAGE EQUAL TO ZERO ---
        else {
          // --------------  DisCount NOT EQUAL TO ZERO ---
          if (Dis_per != 0) {
            // --- Discount Calculation
            const DisMinus = (OriginalAmount * Dis_per) / 100;
            const ApplyDiscount = OriginalAmount - DisMinus;

            discountAmount = DisMinus;
            taxAmount = 0;
            totalTaxAmount = OriginalAmount;
            amount = ApplyDiscount;
          } // --------------  DisCount EQUAL TO ZERO ---
          else {
            discountAmount = 0;
            taxAmount = 0;
            totalTaxAmount = OriginalAmount;
            amount = OriginalAmount;
          }
        }
      }
      item.quantity = quantity;
      item.price = price;
      item.discountPercentage = Dis_per;
      item.discountAmount = discountAmount;
      item.tax = Tax_per;
      item.taxAmount = taxAmount;
      item.totalTaxAmount = amount;
      item.subTotal = amount;

      CalculateTotal({
        ...item,
        quantity: quantity,
        discountAmount: discountAmount,
        taxAmount: taxAmount,
        amount: totalTaxAmount,
      });

      return newData;
    });
  };
  // ============  Products OnChange Functions  ==============

  const HandleProject = (value, record) => {
    //  OnCHANGE project

    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];
      let defaultQtyValue = 1;

      if (value) {
        item.quantity = defaultQtyValue;
      }
      const SelectFindProject = projectData?.find(
        (item) => item.projectId === value
      );
      console.log(SelectFindProject, "SelectFindProject");
      if (SelectFindProject) {
        item.projectId = SelectFindProject.projectId;
      }

      const isItemAlreadyAdded = newData.some(
        (item, i) => i !== index && item.projectId === value
      );
      if (isItemAlreadyAdded) {
        item.projectId = "";
        item.quantity = "";
        toast.warn("Project already added in the table.");
        return newData;
      }

      item.projectName = value;

      CalculateTotal({
        ...item,
        projectName: record.projectName,
      });

      return newData;
    });
  };

  const HandlePrice = (value, record) => {
    //  OnCHANGE PRICE
    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      item.price = value || 0;

      CalculateTotal({
        ...item,
        price: item.price,
      });

      HandleRowCal({
        ...item,
        price: item.price,
      });

      return newData;
    });
  };

  const HandleDescript = (value, record) => {
    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      item.description = value;
      return newData;
    });
  };
  const HandleTax = (value, record) => {
    // ONCHANGE TAX
    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      let Tax_per = 0; // Tax - Percentage

      if (value <= 100) {
        // Less Than 100
        Tax_per = value;
      } else {
        // Greater Than 100
        Tax_per = 100;
      }

      CalculateTotal({
        ...item,
        tax: Tax_per,
      });

      HandleRowCal({
        ...item,
        tax: Tax_per,
      });

      item.tax = Tax_per;

      return newData;
    });
  };
  // ---------------- 1.TotalQuantity ONCHANGE Function

  const handleChangeProject = (value, record) => {
    //  ----> QUANTITY ONCHANGE (PRODUCT TABLE)
    HandleProject(value, record);
  };

  const handleOnChangePrice = (value, record) => {
    HandlePrice(value, record);
  };
  const handleOnChangeTax = (value, record) => {
    //  -----> TAX ONCHANGE (PRODUCT TABLE)
    HandleTax(value, record);
  };
  const handleOnChangeDescription = (value, record) => {
    HandleDescript(value.target.value, record);
  };

  // ====================  On Finish Function ============

  const onFinish = (values) => {
    const record = {
      ...values,
      invoiceDate:
        values?.invoiceDate === null
          ? ""
          : dayjs(selectedDate).format("YYYY-MM-DD")
          ? dayjs(values?.invoiceDate).format("YYYY-MM-DD")
          : dayjs(values?.invoiceDate).format("YYYY-MM-DD"),
      companyId: profdetails?.companyId,
    };

    let result = {
      clientId: record.clientId,
      companyId: record.companyId,
      mobileNumber: record.mobileNumber,
      invoiceDate: record.invoiceDate,
      invoiceNo: record.invoiceNo,
      total: parseFloat(record.total).toFixed(2),
      maintenanceTermsId: record.maintenanceTermsId,
      title: record.title,
      terms: record.terms,
      maintenanceList: Object.entries(record)
        .filter(([key]) => key.startsWith("projectId"))
        .map(([key, projectId]) => {
          const index = key.match(/\d+/)[0];
          const priceAmt = `price${index}`;
          const descriptKey = `description${index}`;
          const taxPerKey = `tax${index}`;
          const taxAmtKey = `taxAmount${index}`;
          const SubTotalKey = `subTotal${index}`;

          return {
            projectId,
            price: record[priceAmt] || 0,
            description: record[descriptKey],
            tax: record[taxPerKey] || 0,
            taxAmount: record[taxAmtKey] || 0,
            subTotal: !isNaN(parseFloat(record[SubTotalKey]))
              ? parseFloat(record[SubTotalKey]).toFixed(2)
              : 0,
          };
        }),
    };
    if (mainRecord) {
      const EditOnlyOnce = { ...result, status: false };
      EditInvoice(EditOnlyOnce);
    } else {
      AddMaintainance(result);
      console.log(result, "result");
    }
  };

  //=======================Post Purchase =====================================

  const AddMaintainance = (values) => {
    request
      .post(`${APIURLS.POSTMAINTAIN}`, values)
      .then(function (response) {
        setCheck(response);
        if (response.status == 200) {
          toast.success("Successfully Submited");
          form.resetFields();
          setTrigger((trigger) => trigger + 1);
          setRound(false);
          // handleClick(response.data);
          setProTableData(ProductInitialData);
          setProTabSecondaryData(ProSecondaryData);
          setBalanceChangeAmount(0);
        }
      })

      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          toast.error(error);
        } else {
          toast.error("Failed");
        }
      });
  };
  //================ print==========================

  const handleClick = (record) => {
    // console.log(record,'record');
    setModalWidth(400);
    setModalTitle("Maintenance Invoice Print");
    setModalContent(<PrintModal record={record} />);
    showModal();
  };

  const PrintModal = (record) => {
    return (
      <div>
        <h1 style={{ fontSize: "1.2rem" }}>Are you Sure You Want to Print ?</h1>
        <br />
        <Flex gap={"20px"} w_100={"true"} center={"true"} verticallyCenter>
          <Button.Success text={"Print"} onClick={() => printOk(record)} />
          <Button.Danger text={"Cancel"} onClick={handleOk} />
        </Flex>
      </div>
    );
  };

  const printOk = async ({ record }) => {
    setModalWidth(800);
    setModalContent(<ViewPrint record={record} />);
  };

  //=======================Edit Purchase =====================================

  const EditInvoice = (values, id) => {
    request
      .put(`${APIURLS.PUTMAINTAIN}/${mainRecord?.maintenanceInvoiceId}`, values)
      .then(function (response) {
        toast.info("Successfully Bill Updated");
        FormExternalClosee();
        // setBalanceChangeAmount(0)
      })
      .catch(function (error) {
        console.log(error, "greater");
        if (error && error.response.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Updated Failed.");
        }
      });
  };
  //===========================================================

  const onFinishFailed = (errorInfo) => {
    toast.warn("Please Fill the Details!");
  };

  // ==============  Add Row Component  ================

  const FooterComponent = () => {
    return (
      <div style={{ background: "var(--light-color)", padding: "20px" }}>
        {/* <CustomRow>
          <Col lg={4} sm={12} span={24}>
            <Button
              type="primary"
              style={{
                fontSize: "1rem",
                height: "auto",
                fontFamily: "Poppins",
                fontWeight: 500,
                letterSpacing: "1px",
              }}
              htmlType="button"
              onClick={AddRow}
            >
              Add Row
            </Button>
          </Col>
        </CustomRow> */}
      </div>
    );
  };

  // ==================  Table  ==================
  const onRest = () => {
    form.resetFields();
    setSelectedSale(!selectedSale);
    setTrigger((trigger) => trigger + 1);
    setProTableData(ProductInitialData);
    setProTabSecondaryData(ProSecondaryData);

    if (mainRecord) {
      FormExternalClosee();
    }
  };

  return (
    <Fragment>
      <Form
        name="AddMaintnance"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        form={form}
        initialValues={{
          invoiceDate: dayjs(),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Flex aligncenter={"true"} centervertically={"true"}>
          {mainRecord ? null : (
            <CustomPageTitle Heading={"Add Maintenance Invoice"} />
          )}
        </Flex>
        <br />
        <HeaderForm
          gstChecked={gstChecked}
          trigger={trigger}
          setSale={setSale}
          setSelectedDate={setSelectedDate}
          mainRecord={mainRecord}
          setGetdata={setGetdata}
          selectedSale={selectedSale}
          setClientData={setClientData}
          setProjectData={setProjectData}
          setProjUnderInv={setProjUnderInv}
          setTirggers={setTirggers}
          tirggers={tirggers}
          form={form}
          setProTableData={setProTableData}
          data={data}
        />
        <CustomStandardTable
          columns={columns.filter(Boolean)}
          data={proTableData}
          pagination={false}
        />
        <FooterComponent />
        <Card>
          <CustomRow>
            <Col span={24} md={8}>
              <CustomDropSelect
                label={"Terms"}
                name={"maintenanceTermsId"}
                options={TermsOptions}
                buttonLabel={"Add Terms Name"}
                onButtonClick={handletermsClick}
                width={"250px"}
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    message: "Please Fill Details!",
                  },
                ]}
              />
              <CustomInput name={"title"} display={"none"} />
            </Col>
            <Col span={24} md={8}></Col>
            <Col span={24} md={8}>
              <CustomInputNumber name={"total"} label={"Total"} disabled />
            </Col>
            <br />
            <Col span={24} md={8}>
              {changeTerms && (
                <CustomTextArea label={changeTerms} name={"terms"} />
              )}
            </Col>
          </CustomRow>
        </Card>
        <Card>
          <Flex center={"true"} gap={"10px"}>
            {mainRecord ? (
              <>
                <Button.Primary
                  text={"Update"}
                  htmlType="submit"
                  disabled={balanceChange}
                />
                <Button.Danger text={"Cancel"} onClick={onRest} />
              </>
            ) : (
              <>
                <Button.Success
                  text={"Submit"}
                  htmlType="submit"
                  disabled={balanceChange}
                />
                <Button.Danger text={"Reset"} onClick={onRest} />
              </>
            )}
          </Flex>
        </Card>
      </Form>

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={modalWidth}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </Fragment>
  );
};
