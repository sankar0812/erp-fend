import { Card, Col, Form } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { CustomInputNumber } from "../../../../../components/Form/CustomInputNumber";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomSwitch } from "../../../../../components/Form/CustomSwitch";
import Flex from "../../../../../components/Flex";
import request from "../../../../../utils/request";
import { CustomRow } from "../../../../../components/CustomRow";
import { HeaderInvoice } from "./HeaderInvoice";
import { FooterInvoice } from "./FooterInvoice";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import Button from "../../../../../components/Form/CustomButton";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";
import {
  getRequiremts,
  viewrequirements,
} from "../../../../Client/ClientSlice";
import { CustomSelect } from "../../../../../components/Form/CustomSelect";
import {
  getBusinessProfile,
  selectAllBusinessProfile,
} from "../../../../BusinessProfile/BusinessSlice";
import { ViewPrint, Viewprint } from "./ViewPrint";
import { CustomInput } from "../../../../../components/Form/CustomInput";

export const AddInvoice = ({
  setSale,
  invoiceRecord,
  ViewEditTrigger,
  FormExternalClosee,
}) => {
  // console.log(invoiceRecord,'invoiceRecord');

  const dispatch = useDispatch();

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

  const [trigger, setTrigger] = useState(0);
  const [payType, setPayType] = useState("Cash");
  const [clientData, setClientData] = useState({});

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // =====  Modal Functions Start ===

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
  const [roundDecimalValue, setRoundDecimalValue] = useState(null);
  const [balance, setBalance] = useState(false);
  const [checkedbalance, setCheckedbalance] = useState(false);

  // -----------------  Balance Checking ------------
  const [withDecimal, setWithDecimal] = useState(null);
  const [withOutDecimal, setWithOutDecimal] = useState(null);
  const [balanceChangeAmount, setBalanceChangeAmount] = useState(0);
  const [balanceChange, setBalanceChange] = useState(false);

  // ======  Selected Client Details ====
  useEffect(() => {
    form.setFieldsValue({ clientName: clientData?.clientId });
    form.setFieldsValue({ mobileNumber: clientData?.mobileNumber });
  }, [clientData]);
  console.log(clientData, "clientData");
  //========== project Name ==================//
  const AllprojectId = useSelector(viewrequirements);

  useEffect(() => {
    dispatch(getRequiremts());
  }, []);

  // -----------------------  RoundOff Checked Function ----------

  const RoundOffChecked = (value) => {
    setWithDecimal(proTabSecondaryData[0].sub_total - roundDecimalValue);
    setRound(value);
  };

  const TotalBalance = (value) => {
    setBalance(value);
    setWithDecimal(proTabSecondaryData[0].sub_total - roundDecimalValue);
    setWithOutDecimal(proTabSecondaryData[0].sub_total);
  };

  //====================== Project Name =========================//

  const projectNameOptions = projectData?.map((item) => ({
    label: item?.projectName,
    value: item?.projectId,
  }));

  // =========================  Other Functions End  =========================
  // ======  Product State Start =====
  const ProductInitialData = [
    {
      key: 0,
      description: "",
      projectName: "",
      projectId: "",
      quantity: "",
      invoiceListId: "",
      price: "",
      discountPercentage: "",
      discountAmount: "",
      gst: "",
      taxQuantityAmount: "",
      totalTaxAmount: "",
      amount: "",
    },
  ];

  const ProSecondaryData = [
    {
      taxAmount: "",
      totalQuantity: "",
      sub_total: "",
      amount: "",
      received: "",
      balanceAmount: "",
    },
  ];

  const ProFooterCalData = [
    {
      amount: "",
      received: "",
      balanceAmount: "",
    },
  ];
  const [proTableData, setProTableData] = useState(ProductInitialData);
  const [proTabSecondaryData, setProTabSecondaryData] =
    useState(ProSecondaryData);

  const HandleCheQueChage = (value) => {
    if (value === "Cheque" || value === "OnlineTransaction") {
      form.setFieldsValue({ recevied_status: false });

      const totalAmt = proTabSecondaryData[0].sub_total - roundDecimalValue;

      if (round) {
        form.setFieldsValue({ received: "0.00" });
        form.setFieldsValue({ balanceAmount: totalAmt });
        form.setFieldsValue({ amount: totalAmt });
      } else {
        form.setFieldsValue({ received: "0.00" });
        form.setFieldsValue({
          balanceAmount: proTabSecondaryData[0].sub_total,
        });
        form.setFieldsValue({ amount: proTabSecondaryData[0].sub_total });
      }
    }
  };

  useEffect(() => {
    proTableData.forEach((record) => {
      form.setFieldsValue({ [`projectName${record.key}`]: record.projectName });
      form.setFieldsValue({ [`projectId${record.key}`]: record.projectId });
      form.setFieldsValue({
        [`invoiceListId${record.key}`]: record.invoiceListId,
      });

      form.setFieldsValue({ [`quantity${record.key}`]: record.quantity });
      form.setFieldsValue({
        [`item_unit_name${record.key}`]: record.item_unit_name,
      });
      form.setFieldsValue({ [`price${record.key}`]: record.price });
      form.setFieldsValue({ [`mrp${record.key}`]: record.mrp });
      form.setFieldsValue({
        [`discountPercentage${record.key}`]: record.discountPercentage,
      });
      form.setFieldsValue({
        [`discountAmount${record.key}`]: record.discountAmount,
      });
      form.setFieldsValue({ [`gst${record.key}`]: record.gst });
      form.setFieldsValue({
        [`taxQuantityAmount${record.key}`]: record.taxQuantityAmount,
      });
      form.setFieldsValue({
        [`totalTaxAmount${record.key}`]: record.totalTaxAmount,
      });
      form.setFieldsValue({ [`amount${record.key}`]: record.amount });
    });

    form.setFieldsValue({
      [`roundOffAmount`]: proTabSecondaryData[0].roundOffAmount,
    });
    form.setFieldsValue({
      [`totalQuantity`]: proTabSecondaryData[0].totalQuantity,
    });
    form.setFieldsValue({ [`taxAmount`]: proTabSecondaryData[0].taxAmount });
    form.setFieldsValue({ [`sub_total`]: proTabSecondaryData[0].sub_total });
    form.setFieldsValue({ amount: proTabSecondaryData[0].sub_total });

    setWithOutDecimal(proTabSecondaryData[0].sub_total);
  }, [proTableData]);

  //=Company Id=================

  useEffect(() => {
    dispatch(getBusinessProfile());
  }, []);

  const profdetails = useSelector(selectAllBusinessProfile);

  useEffect(() => {
    form.setFieldsValue({ companyId: profdetails?.companyId });
  }, [profdetails]);

  // Balance checked during Edit

  useEffect(() => {
    if (invoiceRecord) {
      form.setFieldsValue(invoiceRecord);
      form.setFieldsValue({ clientId: invoiceRecord?.clientName });
      form.setFieldsValue({ clientName: invoiceRecord?.clientId });
      form.setFieldsValue({ mobileNumber: invoiceRecord?.phoneNumber1 });

      setBalanceChangeAmount(invoiceRecord.received);

      const fromdatee = new Date(invoiceRecord?.invoiceDate);
      const dateFormat = "YYYY-MM-DD";
      const FrmDateee = dayjs(fromdatee).format(dateFormat);

      form.setFieldsValue({
        invoiceDate: dayjs(FrmDateee),
      });
      form.setFieldsValue({ received: invoiceRecord?.received });

      // setProTabSecondaryData([{
      //   totalQuantity: invoiceRecord?.totalQuantity,
      //   taxAmount: invoiceRecord?.taxAmount,
      //   amount: invoiceRecord?.amount,
      //   // received: invoiceRecord?.received,
      //   balanceAmount: invoiceRecord?.balanceAmount,
      //   // sub_total: invoiceRecord?.sub_total,
      // }])
    }
  }, [invoiceRecord, ViewEditTrigger]);
  // ======  Product State End =====
  useEffect(() => {
    if (invoiceRecord?.invoiceList) {
      const tableData = invoiceRecord?.invoiceList.map((value, index) => ({
        ...value,
        key: index,
      }));
      // const newData = tableData.map(item => (
      //   {
      //     ...item,
      //     price: parseInt(item.price),
      //     amount: parseInt(item.amount),
      //     discountAmount: parseInt(item.discountAmount),
      //     discountPercentage: parseInt(item.discountPercentage),
      //     quantity: parseInt(item.quantity),
      //     totalTaxAmount: parseInt(item.totalTaxAmount),
      //     gst: parseInt(item.gst),
      //     taxQuantityAmount: parseInt(item.taxQuantityAmount),

      //   }
      // ))
      setProTableData(tableData);
      setProCount(tableData.length);
    }
  }, [invoiceRecord, ViewEditTrigger]);

  useEffect(() => {
    if (invoiceRecord?.gstType === "withoutTax") {
      setGstChecked(true);
      // form.setFieldsValue({ gstin: invoiceRecord?.gstin })
    } else {
      setGstChecked(false);
    }

    // setProTabSecondaryData([{
    //   amount: invoiceRecord?.amount,
    //   received: invoiceRecord?.received,
    //   sub_total: invoiceRecord?.sub_total,
    // }])
  }, [invoiceRecord, ViewEditTrigger]);

  // Roundoff during edit
  useEffect(
    (value) => {
      if (invoiceRecord?.roundOffAmount > 0) {
        setRound(true);
        form.setFieldsValue({ roundOffAmount: invoiceRecord?.roundOffAmount });
      } else {
        setRound(false);
      }
    },
    [invoiceRecord, ViewEditTrigger]
  );

  // --------------------- Round Off Checked  -----------------
  useEffect(() => {
    const totalAmt = proTabSecondaryData[0].sub_total - roundDecimalValue;

    if (round) {
      if (balance) {
        form.setFieldsValue({ roundOffAmount: roundDecimalValue });
        form.setFieldsValue({ amount: totalAmt });
        form.setFieldsValue({ balanceAmount: 0 });
        form.setFieldsValue({ received: totalAmt });
        setBalanceChangeAmount(totalAmt);
      } else {
        form.setFieldsValue({ roundOffAmount: roundDecimalValue });
        form.setFieldsValue({ amount: totalAmt });
        form.setFieldsValue({ balanceAmount: totalAmt });
        form.setFieldsValue({ received: 0 });
        setBalanceChangeAmount(0);
      }
    } else {
      if (balance) {
        form.setFieldsValue({ roundOffAmount: 0 });
        form.setFieldsValue({ amount: proTabSecondaryData[0].sub_total });
        form.setFieldsValue({ balanceAmount: 0 });
        form.setFieldsValue({ received: proTabSecondaryData[0].sub_total });
        setBalanceChangeAmount(proTabSecondaryData[0].sub_total);
      } else {
        form.setFieldsValue({ roundOffAmount: 0 });
        form.setFieldsValue({ amount: proTabSecondaryData[0].sub_total });
        form.setFieldsValue({
          balanceAmount: proTabSecondaryData[0].sub_total,
        });
        form.setFieldsValue({ received: 0 });
        setBalanceChangeAmount(0);
      }
    }
  }, [round, ViewEditTrigger]);

  // --------------------- Round Off Reverse Order -----------------

  useEffect(() => {
    const num = proTabSecondaryData[0].sub_total;
    const newInteger = parseInt(num);
    const newDecimal = (num - newInteger).toFixed(2).substr(1);
    setRoundDecimalValue(newDecimal);

    setWithDecimal(proTabSecondaryData[0].sub_total - newDecimal);
    const totalAmt = proTabSecondaryData[0].sub_total - newDecimal;

    if (round) {
      if (balance) {
        form.setFieldsValue({ roundOffAmount: newDecimal });
        form.setFieldsValue({ amount: totalAmt });
        form.setFieldsValue({ balanceAmount: 0 });
        form.setFieldsValue({ received: totalAmt });
        // setBalanceChangeAmount(totalAmt);
      } else {
        form.setFieldsValue({
          roundOffAmount: invoiceRecord
            ? invoiceRecord?.roundOffAmount
            : newDecimal,
        });
        form.setFieldsValue({
          amount: invoiceRecord ? invoiceRecord?.amount : totalAmt,
        });
        form.setFieldsValue({
          balanceAmount: invoiceRecord
            ? invoiceRecord?.balanceAmount
            : totalAmt,
        });
        form.setFieldsValue({ received: 0 || invoiceRecord?.received });
        // setBalanceChangeAmount(0);
      }
    } else {
      if (balance) {
        form.setFieldsValue({ roundOffAmount: 0 });
        form.setFieldsValue({ amount: proTabSecondaryData[0].sub_total });
        form.setFieldsValue({ balanceAmount: 0 });
        form.setFieldsValue({ received: proTabSecondaryData[0].sub_total });
        // setBalanceChangeAmount(proTabSecondaryData[0].sub_total);
      } else {
        form.setFieldsValue({
          roundOffAmount: 0 || invoiceRecord?.roundOffAmount,
        });
        form.setFieldsValue({
          amount: invoiceRecord
            ? invoiceRecord?.amount
            : proTabSecondaryData[0].sub_total,
        });
        form.setFieldsValue({
          balanceAmount: invoiceRecord
            ? invoiceRecord?.balanceAmount
            : proTabSecondaryData[0].sub_total,
        });

        form.setFieldsValue({ received: 0 || invoiceRecord?.received });
        // setBalanceChangeAmount(0);
      }
    }
  }, [proTableData, invoiceRecord, ViewEditTrigger]);
  // =================================================

  useEffect(() => {
    // const WithoutDecimal = proTabSecondaryData[0].amount - roundDecimalValue;
    // const totalAmt = proTabSecondaryData[0].amount;

    if (round) {
      if (balance) {
        form.setFieldsValue({ received: withDecimal });
        form.setFieldsValue({ balanceAmount: 0 });
        setBalanceChangeAmount(withDecimal);
      } else {
        form.setFieldsValue({ received: 0 });
        form.setFieldsValue({ balanceAmount: withDecimal });
        setBalanceChangeAmount(0);
      }
    } else {
      if (balance) {
        form.setFieldsValue({ received: withOutDecimal });
        form.setFieldsValue({ balanceAmount: 0 });
        setBalanceChangeAmount(withOutDecimal);
      } else {
        form.setFieldsValue({ received: 0 || invoiceRecord?.received });
        form.setFieldsValue({
          balanceAmount: withOutDecimal || invoiceRecord?.balanceAmount,
        });
        setBalanceChangeAmount(0);
      }
    }
  }, [balance, ViewEditTrigger]);

  useEffect(() => {
    let fizedAmount = 0;

    if (round) {
      fizedAmount = withDecimal;

      if (balance) {
        form.setFieldsValue({ received: withDecimal });
        form.setFieldsValue({ balanceAmount: 0 });
        setBalanceChange(false);
      } else {
        // ===
        let setAmt = balanceChangeAmount;
        let balSetAmt = withDecimal - setAmt;

        if (balSetAmt < 0) {
          setBalanceChange(true);
        } else {
          setBalanceChange(false);
        }
        form.setFieldsValue({ received: setAmt });
        form.setFieldsValue({ balanceAmount: balSetAmt });
      }
    } else {
      fizedAmount = withOutDecimal;
      if (balance) {
        form.setFieldsValue({ received: withOutDecimal });
        form.setFieldsValue({ balanceAmount: 0 });
        setBalanceChange(false);
      } else {
        // ===
        let setAmt = balanceChangeAmount;
        let balSetAmt = withOutDecimal - setAmt;

        if (balSetAmt < 0) {
          setBalanceChange(true);
        } else {
          setBalanceChange(false);
        }

        form.setFieldsValue({ received: setAmt });
        form.setFieldsValue({ balanceAmount: balSetAmt });
      }
    }
  }, [balanceChangeAmount, ViewEditTrigger]);
  console.log(balanceChangeAmount, "balanceChangeAmount");
  //=================================================

  const BalanceOnChange = (value) => {
    setBalanceChangeAmount(value);
  };

  useEffect(() => {
    HandleTableCal();
  }, [gstChecked]);

  // ===============  Table Data Start ==================

  // ----------- product add -----------

  const handleGSTSwitch = (e) => {
    //----------------------------  Switch For Product or Service
    setGstChecked(e);
  };

  // useEffect(() => {
  //   if (invoiceRecord?.received > 0) {
  //     setCheckedbalance(true)
  //     form.setFieldsValue({ received: invoiceRecord?.received })
  //     form.setFieldsValue({ paymentType: invoiceRecord?.paymentType })

  //   }
  //   else {
  //     setCheckedbalance(false)

  //   }

  // }, [invoiceRecord,ViewEditTrigger])

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
                  display: 'flex',
                  padding: '10px',
                  height: 'auto',
                  fontSize: '16px',
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
            <CustomSelect
              rules={[
                {
                  required: true,
                  message: "This is required field",
                },
              ]}
              disabled={invoiceRecord}
              minwidth={"230px"}
              name={`projectName${record.key}`}
              options={projectNameOptions || [{}]}
              onChange={(value) => handleChangeProject(value, record)}
            />
            <CustomInput name={`projectId${record.key}`} display={"none"} />
            {invoiceRecord && (
              <CustomInput
                name={`invoiceListId${record.key}`}
                display={"none"}
              />
            )}
          </>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text, record) => (
        <CustomInputNumber
          minwidth={"120px"}
          // precision={2}
          placed={"end"}
          min={1.0}
          name={`quantity${record.key}`}
          onChange={(value) => handleOnChangeQuantity(value, record)}
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <CustomInputNumber
          width={"140px"}
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
      title: "Discount",
      children: [
        {
          title: "%",
          dataIndex: "discountPercentage",
          key: "discountPercentage",
          render: (text, record) => (
            <CustomInputNumber
              precision={2}
              width={"100px"}
              placed={"end"}
              name={`discountPercentage${record.key}`}
              min={0.0}
              max={100.0}
              onChange={(value) => handleOnChangeDiscount(value, record)}
            />
          ),
        },
        {
          title: "Amount",
          dataIndex: "discountAmount",
          key: "discountAmount",
          render: (text, record) => (
            <CustomInputNumber
              precision={2}
              width={"120px"}
              placed={"end"}
              name={`discountAmount${record.key}`}
              disabled
            />
          ),
        },
      ],
    },
    gstChecked === false && {
      title: "Tax",
      children: [
        {
          title: "%",
          dataIndex: "gst",
          key: "gst",
          render: (text, record) => (
            <CustomInputNumber
              width={"100px"}
              placed={"end"}
              precision={2}
              rules={[
                {
                  required: true,
                  message: "This is a required field",
                },
              ]}
              name={`gst${record.key}`}
              min={0.0}
              max={100.0}
              onChange={(value) => handleOnChangeTax(value, record)}
            />
          ),
        },
        {
          title: "Amount",
          dataIndex: "taxQuantityAmount",
          key: "taxQuantityAmount",
          render: (text, record) => (
            <CustomInputNumber
              width={"120px"}
              precision={2}
              disabled
              placed={"end"}
              name={`taxQuantityAmount${record.key}`}
              rules={[
                {
                  required: true,
                  message: "This is a required field",
                },
              ]}
            />
          ),
        },
      ],
    },
    {
      title: <p>Sub&nbsp;Total</p>,
      dataIndex: "totalTaxAmount",
      key: "totalTaxAmount",
      render: (text, record) => (
        <CustomInputNumber
          precision={2}
          disabled
          minwidth={"120px"}
          placed={"end"}
          name={`totalTaxAmount${record.key}`}
        />
      ),
    },
    {
      title: <p>Total&nbsp;Amount</p>,
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <CustomInputNumber
          precision={2}
          disabled
          minwidth={"120px"}
          placed={"end"}
          name={`amount${record.key}`}
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
      description: "",
      projectId: "",
      projectName: "",
      invoiceListId: "",
      item_code: "",
      quantity: "",
      price: "",
      discountPercentage: "",
      discountAmount: "",
      gst: "",
      taxQuantityAmount: "",
      totalTaxAmount: "",
      amount: "",
    };
    setProTableData((pre) => {
      return [...pre, newData];
    });
    setProCount(proCount + 1);
    console.log("gggggg");
  };

  const onProductTabRowDelete = (key) => {
    // -----------------------  Delete Row Function
    if (proTableData.length > 1) {
      setProTableData((prevState) => {
        const newData = prevState.filter((item) => item.key !== key);

        // ------ Variables
        let totalQuantity = 0;
        let totalDiscount = 0;
        let totalTax = 0;
        let totalAmount = 0;

        newData.forEach((item) => {
          if (
            item.quantity !== "" ||
            item.discountAmount !== "" ||
            item.taxQuantityAmount !== "" ||
            item.amount !== ""
          ) {
            totalQuantity += parseFloat(item.quantity);
            totalDiscount += parseFloat(item.discountAmount);
            totalTax += parseFloat(item.taxQuantityAmount);
            totalAmount += parseFloat(item.amount);
          }
        });

        // update the amount value in the proTabSecondaryData array
        setProTabSecondaryData([
          {
            qty_total: totalQuantity.toFixed(2),
            discount_total: totalDiscount.toFixed(2),
            tax_total: totalTax.toFixed(2),
            totalTaxAmount: totalAmount.toFixed(2),
          },
        ]);

        return newData;
      });
    }
  };

  const CalculateTotal = (record) => {
    // ----------------- 1. Calculate TotalAmount
    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      // ------ Variables
      let TotalAllQuantity = 0;
      let TotalallTaxAmt = 0;
      let totalAmount = 0;

      newData.forEach((item) => {
        if (
          item.quantity !== "" ||
          item.discountAmount !== "" ||
          item.taxQuantityAmount !== "" ||
          item.amount !== ""
        ) {
          TotalAllQuantity += parseFloat(item.quantity);
          TotalallTaxAmt += parseFloat(item.taxQuantityAmount);
          totalAmount += parseFloat(item.amount);
        }
      });

      // update the amount value in the proTabSecondaryData array
      setProTabSecondaryData([
        {
          totalQuantity: TotalAllQuantity.toFixed(2),
          taxAmount: TotalallTaxAmt.toFixed(2),
          sub_total: totalAmount.toFixed(2),
        },
      ]);

      return newData;
    });
  };

  // ============  Products OnChange Functions  ==============

  const HandleProject = (value, record) => {
    //  OnCHANGE QTY

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
      if (SelectFindProject) {
        item.projectId = SelectFindProject?.projectId;
        item.invoiceListId = SelectFindProject?.invoiceListId;
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
        projectId: record.projectId,
      });

      HandleRowCal({
        ...item,
        projectId: record.projectId,
      });

      return newData;
    });
  };

  const HandleQty = (value, record) => {
    //  OnCHANGE QTY

    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      item.quantity = value;

      CalculateTotal({
        ...item,
        quantity: record.quantity,
      });

      HandleRowCal({
        ...item,
        quantity: record.quantity,
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

  const HandleDiscount = (value, record) => {
    //  ONCHANGE DISCOUNT
    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      let Dis_per = 0; // Dis - Percentage

      if (value <= 100) {
        // Less Than 100
        Dis_per = value;
      } else {
        // Greater Than 100
        Dis_per = 100;
      }

      CalculateTotal({
        ...item,
        discountPercentage: Dis_per,
      });

      HandleRowCal({
        ...item,
        discountPercentage: Dis_per,
      });

      item.discountPercentage = Dis_per;

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
        gst: Tax_per,
      });

      HandleRowCal({
        ...item,
        gst: Tax_per,
      });

      item.gst = Tax_per;

      return newData;
    });
  };

  // ===================  Whole Tax Row Calculation ============

  const HandleRowCal = (record) => {
    setProTableData((prevState) => {
      const newData = [...prevState];
      const index = newData.findIndex((item) => record.key === item.key);
      const item = newData[index];

      let totalTaxAmount = 0; // Sub - Total
      let amount = 0; // Grand - Total
      let taxQuantityAmount = 0; // Tax - Amount
      let discountAmount = 0; // Discount - Amount

      const price = record.price || 0;
      const quantity = record.quantity || 0;
      const Tax_per = record.gst || 0;
      const Dis_per = record.discountPercentage || 0;

      const OriginalAmount = calculateProductTableAmount(item); // Qty x Price

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
            taxQuantityAmount = TaxAmt;
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
            taxQuantityAmount = TaxQtyAmt;
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
            taxQuantityAmount = 0;
            totalTaxAmount = OriginalAmount;
            amount = ApplyDiscount;
          } // --------------  DisCount EQUAL TO ZERO ---
          else {
            discountAmount = 0;
            taxQuantityAmount = 0;
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
            taxQuantityAmount = taxAmt;
            totalTaxAmount = OriginalAmount;
            amount = ApplyTax;
          } // --------------  DisCount EQUAL TO ZERO ---
          else {
            // --- Tax Calculation
            const taxAmt = (OriginalAmount * Tax_per) / 100;
            const ApplyTax = OriginalAmount + taxAmt;

            discountAmount = 0;
            taxQuantityAmount = taxAmt;
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
            taxQuantityAmount = 0;
            totalTaxAmount = OriginalAmount;
            amount = ApplyDiscount;
          } // --------------  DisCount EQUAL TO ZERO ---
          else {
            discountAmount = 0;
            taxQuantityAmount = 0;
            totalTaxAmount = OriginalAmount;
            amount = OriginalAmount;
          }
        }
      }
      item.quantity = quantity;
      item.price = price;
      item.discountPercentage = Dis_per;
      item.discountAmount = discountAmount;
      item.gst = Tax_per;
      item.taxQuantityAmount = taxQuantityAmount;
      item.totalTaxAmount = amount;
      item.amount = amount;

      CalculateTotal({
        ...item,
        quantity: quantity,
        discountAmount: discountAmount,
        taxQuantityAmount: taxQuantityAmount,
        amount: totalTaxAmount,
      });

      return newData;
    });
  };

  // ===================  Whole Tax Table Calculation ============

  const HandleTableCal = () => {
    setProTableData((prevState) => {
      const newData = prevState.map((item) => {
        let totalTaxAmount = 0;
        let amount = 0;
        let taxQuantityAmount = 0;
        let discountAmount = 0;
        let gst = 0;

        const price = item.price || 0;
        const quantity = item.quantity || 0;
        const Tax_per = item.gst || 0;
        const Dis_per = item.discountPercentage || 0;

        const OriginalAmount = calculateProductTableAmount(item);

        if (gstChecked) {
          if (Tax_per !== 0) {
            if (Dis_per != 0) {
              // --- Discount Calculation
              let DisAmt = (OriginalAmount * Dis_per) / 100; // --> Discount Amt

              // --- Tax Calculation
              let TaxPlusHun = Tax_per + 100; // --> Tax + 100

              let TaxIncludePrice = OriginalAmount - DisAmt;

              let ExcludingAmt = TaxIncludePrice * (100 / TaxPlusHun); // -- > Excluding Amount

              const TaxAmt = TaxIncludePrice - ExcludingAmt;

              discountAmount = DisAmt;
              taxQuantityAmount = 0;
              gst = 0;
              totalTaxAmount = OriginalAmount;
              amount = TaxIncludePrice;
            } // --------------  DisCount EQUAL TO ZERO ---
            else {
              // --- Tax Calculation

              let TaxPlusHun = Tax_per + 100; // --> Tax + 100

              let ExcludingAmt = OriginalAmount * (100 / TaxPlusHun); // -- > Excluding Amount

              let TaxAmt = OriginalAmount - ExcludingAmt;
              let TaxQtyAmt = TaxAmt * quantity;

              discountAmount = 0;
              taxQuantityAmount = 0;
              totalTaxAmount = OriginalAmount;
              amount = OriginalAmount;
            }
          } else {
            if (Dis_per !== 0) {
              let DisMinus = (OriginalAmount * Dis_per) / 100;
              let ApplyDiscount = OriginalAmount - DisMinus;

              discountAmount = DisMinus;
              taxQuantityAmount = 0;
              totalTaxAmount = 0;
              amount = 0;
            } else {
              discountAmount = 0;
              taxQuantityAmount = 0;
              totalTaxAmount = OriginalAmount;
              amount = OriginalAmount;
            }
          }
        } else {
          if (Tax_per !== 0) {
            if (Dis_per !== 0) {
              let DisMinus = (OriginalAmount * Dis_per) / 100;
              let ApplyDiscount = OriginalAmount - DisMinus;

              let taxAmt = (ApplyDiscount * Tax_per) / 100;
              let ApplyTax = ApplyDiscount + taxAmt;

              discountAmount = DisMinus;
              taxQuantityAmount = taxAmt;
              totalTaxAmount = OriginalAmount;
              amount = ApplyTax;
            } else {
              let taxAmt = (OriginalAmount * Tax_per) / 100;
              let ApplyTax = OriginalAmount + taxAmt;

              discountAmount = 0;
              taxQuantityAmount = taxAmt;
              totalTaxAmount = OriginalAmount;
              amount = ApplyTax;
            }
          } else {
            if (Dis_per !== 0) {
              let DisMinus = (OriginalAmount * Dis_per) / 100;
              let ApplyDiscount = OriginalAmount - DisMinus;

              discountAmount = DisMinus;
              taxQuantityAmount = 0;
              totalTaxAmount = OriginalAmount;
              amount = ApplyDiscount;
            } else {
              discountAmount = 0;
              taxQuantityAmount = 0;
              totalTaxAmount = OriginalAmount;
              amount = OriginalAmount;
            }
          }
        }

        item.quantity = quantity;
        item.price = price;
        item.discountPercentage = Dis_per;
        item.discountAmount = discountAmount;
        item.gst = Tax_per;
        item.taxQuantityAmount = taxQuantityAmount;
        item.totalTaxAmount = totalTaxAmount;
        item.amount = amount;

        CalculateTotal({
          ...item,
          quantity: quantity,
          discountAmount: discountAmount,
          taxQuantityAmount: taxQuantityAmount,
          amount: totalTaxAmount,
        });

        return item;
      });

      return newData;
    });
  };

  // ---------------- 1.TotalQuantity ONCHANGE Function

  const handleChangeProject = (value, record) => {
    //  ----> QUANTITY ONCHANGE (PRODUCT TABLE)
    HandleProject(value, record);
  };

  const handleOnChangeQuantity = (value, record) => {
    //  ----> QUANTITY ONCHANGE (PRODUCT TABLE)
    HandleQty(value, record);
  };

  const handleOnChangePrice = (value, record) => {
    //  ----> PRICE ONCHANGE (PRODUCT TABLE)
    HandlePrice(value, record);
  };

  const handleOnChangeDiscount = (value, record) => {
    //  ----> DISCOUNT ONCHANGE (PRODUCT TABLE)
    HandleDiscount(value, record);
  };

  const handleOnChangeTax = (value, record) => {
    //  -----> TAX ONCHANGE (PRODUCT TABLE)
    HandleTax(value, record);
  };

  // -------------- Handle Total Row Amount  --------------
  const calculateProductTableAmount = (record) => {
    const quantity = parseFloat(record.quantity) || 0;
    const sale_amount = parseFloat(record.price) || 0;
    return quantity * sale_amount;
  };

  // ================== Product Table Functions End ==================

  //======================= Record Data Set Dynamic Table (For Using Purchase Edit)

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
      gstType: gstChecked ? "withoutTax" : "withTax",
      companyId: profdetails?.companyId,
    };

    let result = {
      clientId: record.clientName,
      companyId: record.companyId,
      mobileNumber: record.mobileNumber,
      invoiceDate: record.invoiceDate,
      amount: record.amount,
      gstType: record.gstType,
      paymentType: record.paymentType,
      totalQuantity: parseFloat(record.totalQuantity).toFixed(2),
      taxAmount: parseFloat(record.taxAmount).toFixed(2) || 0,
      amount: parseFloat(record.amount).toFixed(2) || 0,
      received: record.received
        ? parseFloat(record.received).toFixed(2)
        : parseFloat(0).toFixed(2),
      roundOffAmount: record.roundOffAmount
        ? parseFloat(record.roundOffAmount).toFixed(2)
        : parseFloat(0).toFixed(2),
      balanceAmount: record.balanceAmount
        ? parseFloat(record.balanceAmount).toFixed(2)
        : parseFloat(0).toFixed(2),

      invoiceList: Object.entries(record)
        .filter(([key]) => key.startsWith("projectId"))
        .map(([key, projectId]) => {
          const index = key.match(/\d+/)[0];
          const quantity = `quantity${index}`;
          const priceAmt = `price${index}`;
          const discountPercentageKey = `discountPercentage${index}`;
          const discountAmtKey = `discountAmount${index}`;
          const taxPercentageKey = `gst${index}`;
          const TaxAmt = `taxQuantityAmount${index}`;
          const SubTotalKey = `totalTaxAmount${index}`;
          const TableTotal = `amount${index}`;

          // const InvoiceListId =invoiceRecord?.invoiceList?.map((ite)=>({
          //   invoiceListId:ite?.invoiceListId
          // }))
          // console.log(InvoiceListId,'InvoiceListId');
          const InvoiceListIDkey = `invoiceListId${index}`;
          return {
            projectId,
            quantity: record[quantity],
            price: record[priceAmt] || 0,
            discountPercentage: !isNaN(
              parseFloat(record[discountPercentageKey])
            )
              ? parseFloat(record[discountPercentageKey]).toFixed(2)
              : 0,
            discountAmount: !isNaN(parseFloat(record[discountAmtKey]))
              ? parseFloat(record[discountAmtKey]).toFixed(2)
              : 0,
            gst: record[taxPercentageKey] || 0,
            taxQuantityAmount: !isNaN(parseFloat(record[TaxAmt]))
              ? parseFloat(record[TaxAmt]).toFixed(2)
              : 0,
            totalTaxAmount: !isNaN(parseFloat(record[SubTotalKey]))
              ? parseFloat(record[SubTotalKey]).toFixed(2)
              : 0,
            amount: !isNaN(parseFloat(record[TableTotal]))
              ? parseFloat(record[TableTotal]).toFixed(2)
              : 0,
            invoiceListId: record[InvoiceListIDkey] || null,
          };
        }),
    };
    if (invoiceRecord) {
      const EditOnlyOnce = { ...result, invoiceStatus: false };
      EditInvoice(EditOnlyOnce);
      console.log(EditOnlyOnce, "EditOnlyOnce");
    } else {
      AddInvoice(result);
      console.log(result, "record");
    }
  };

  //=======================Post Purchase =====================================

  const AddInvoice = (values) => {
    request
      .post(`${APIURLS.POSTINVOICE}`, values)
      .then(function (response) {
        if (response.status == 200) {
          toast.success("Invoice has been successfully billed");
          form.resetFields();
          form.setFieldsValue({ balanceAmount: null });
          setTrigger((trigger) => trigger + 1);
          setRound(false);
          handleClick(response.data);
          console.log(response.data, "eeeeee");
          setProTableData(ProductInitialData);
          setProTabSecondaryData(ProSecondaryData);
          setBalanceChangeAmount(0);
        }
      })

      .catch(function (error) {
        if (error && error.response.status === 400) {
          toast.error("This Project Already Exist");
        } else {
          toast.error("Updated Failed.");
        }
      });
  };
  //================ print==========================

  const handleClick = (record) => {
    console.log(record, "recordsaras");
    setModalWidth(400);
    setModalTitle("Invoice Print");
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
  console.log(invoiceRecord, "invoiceRecordddd");
  const EditInvoice = (values, id) => {
    request
      .put(`${APIURLS.PUTINVOICE}/${invoiceRecord?.invoiceId}`, values)
      .then(function (response) {
        toast.info("Successfully Bill Updated");
        FormExternalClosee();
        setBalanceChangeAmount(0);
      })
      .catch(function (error) {
        console.log(error, "errorinv");
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
        <CustomRow>
          {/* <Col lg={4} sm={12} span={24}>
            <Button type="primary" style={{
              fontSize: '1rem',
              height: 'auto',
              fontFamily: 'Poppins',
              fontWeight: 500,
              letterSpacing: '1px',
            }}
              htmlType="button"
              onClick={AddRow}>
              Add Row
            </Button>
          </Col> */}
        </CustomRow>
      </div>
    );
  };

  // ==================  Table  ==================
  const onRest = () => {
    if (invoiceRecord) {
      FormExternalClosee();
    } else {
      form.resetFields();
      setSelectedSale(!selectedSale);
      setTrigger((trigger) => trigger + 1);
      setProTableData(ProductInitialData);
      setProTabSecondaryData(ProSecondaryData);
    }
  };

  // useEffect(() => {
  //   form.resetFields()
  // }, [ViewEditTrigger])
  return (
    <Fragment>
      <Form
        name="purchase"
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
        <Flex aligncenter={"true"} centervertically={"true"}></Flex>
        <br />
        <HeaderInvoice
          gstChecked={gstChecked}
          trigger={trigger}
          setSale={setSale}
          setSelectedDate={setSelectedDate}
          invoiceRecord={invoiceRecord}
          setGetdata={setGetdata}
          selectedSale={selectedSale}
          setClientData={setClientData}
          setProjectData={setProjectData}
        />

        <Flex end={"true"} style={{ margin: "20px 0px" }}>
          <CustomSwitch
            leftLabel={"With GST"}
            rightLabel={"WithOut GST"}
            onChange={handleGSTSwitch}
            checked={gstChecked}
          />
        </Flex>

        <div style={{ margin: "20px 0" }}>
          <CustomStandardTable
            columns={columns.filter(Boolean)}
            data={proTableData}
            pagination={false}
          />

          <FooterComponent />
        </div>

        <div style={{ margin: "20px 0" }}>
          <FooterInvoice
            payType={payType}
            setPayType={setPayType}
            BalanceOnChange={BalanceOnChange}
            HandleCheQueChage={HandleCheQueChage}
            RoundOffChecked={RoundOffChecked}
            TotalBalance={TotalBalance}
            proTabSecondaryData={proTabSecondaryData}
            ProFooterCalData={ProFooterCalData}
            setRoundDecimalValue={setRoundDecimalValue}
            setRound={setRound}
            round={round}
            invoiceRecord={invoiceRecord}
            checkedbalance={checkedbalance}
          />
        </div>

        <Card>
          <Flex center={"true"} gap={"10px"}>
            {invoiceRecord ? (
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
