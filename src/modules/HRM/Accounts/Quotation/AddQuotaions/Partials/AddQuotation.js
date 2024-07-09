import { Card, Col, Form } from "antd"
import React, { Fragment, useEffect, useState } from "react"
import dayjs from 'dayjs'
import request, { base } from "../../../../../../utils/request";
import { toast } from "react-toastify";
import Flex from "../../../../../../components/Flex";
import { CustomModal } from "../../../../../../components/CustomModal";
import { CustomRow } from "../../../../../../components/CustomRow";
import Button from "../../../../../../components/Form/CustomButton";
import { CustomInputNumber } from "../../../../../../components/Form/CustomInputNumber";
import { CustomStandardTable, } from "../../../../../../components/Form/CustomStandardTable";
import { CustomInput } from "../../../../../../components/Form/CustomInput";
import { HeaderQuotation } from "./HeaderQuotation";
import { getBusinessProfile, selectAllBusinessProfile } from "../../../../../BusinessProfile/BusinessSlice";
import { useDispatch, useSelector } from "react-redux";
import { APIURLS as CLIENTURL } from "../../../../../../utils/ApiUrls/Client";
import { styled } from "styled-components";
import { LuMinusCircle } from "react-icons/lu";
import { CustomTextArea } from "../../../../../../components/Form/CustomTextArea";
import { ViewPrint } from "./ViewPrint";
import { getClientQuotation } from "../../../../../Client/ClientSlice";

export const AddQuotation = ({ setSale, quotationrecord, quotationTrigger, handleViewQuotation, quotrecord ,quottrigger ,FormExternalClose}) => {


    const [proCount, setProCount] = useState(1);  //  -->  Product Count
    const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));  //  -->  Invoice Date

    const [form] = Form.useForm();  //  --> Form Ref
    const dispatch = useDispatch()

    const [getdata, setGetdata] = useState([]) // --> Product Data
    const [selectedSale, setSelectedSale] = useState({})  // --> User Selected Data
    const [trigger, setTrigger] = useState(0);
    const [imageUrl, setImageUrl] = useState([])  // -------> Use image upload
    const [ImageInitialValue, setImageInitialValue] = useState([]);
    const [ImageInitialValues, setImageInitialValues] = useState([]);


    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalWidth, setModalWidth] = useState(0)  // --> Modal Width

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



    // =========================  Other Functions End  =========================

    // ======  Product State Start =====

    const ProductInitialData = [
        {
            key: 0,
            description: '',
            projectName: '',
            rate: '',
            quantity: '',
            amount: '',
            termsAndCondition: '',
            additionalNotes: '',
            projectId : '',
        }
    ]

    const ProSecondaryData = [
        {
            sub_total: '',
            amount:'',

        },
    ];

    const ProFooterCalData = [
        {
            amount: '',

        },
    ];


    const [proTableData, setProTableData] = useState(ProductInitialData);
    const [proTabSecondaryData, setProTabSecondaryData] = useState(ProSecondaryData);
    const [ProTabFooterData, setProTabFooterData] = useState(ProFooterCalData);

    // ======  Product State End =====

   

    // useEffect(() => {
    //     if (quotationrecord) {
    //         form.setFieldsValue({ amount: quotationrecord?.amount })
    //     }
    // }, [quotationrecord])

    useEffect(() => {
        proTableData.forEach(record => {
            form.setFieldsValue({ [`projectName${record.key}`]: record.projectName });
            form.setFieldsValue({ [`projectId${record.key}`]: record.projectId });
            form.setFieldsValue({ [`quantity${record.key}`]: record.quantity });
            form.setFieldsValue({ [`rate${record.key}`]: record.rate });
            form.setFieldsValue({ [`amount${record.key}`]: record.amount });
            form.setFieldsValue({ [`description${record.key}`]: record.description });
            form.setFieldsValue({ [`termsAndCondition${record.key}`]: record.termsAndCondition });
            form.setFieldsValue({ [`additionalNotes${record.key}`]: record.additionalNotes });
            form.setFieldsValue({ [`quotationListId${record.key}`]: record.quotationListId });
        });
        form.setFieldsValue({ [`sub_total`]: proTabSecondaryData[0].sub_total });

        // if(quotrecord){
             
        //         form.setFieldsValue({   amount: quotrecord?.totalAmount,})
        // }
        // else if(proTabSecondaryData){
            form.setFieldsValue({ [`amount`]: proTabSecondaryData[0].sub_total });

        // }
    }, [proTableData])

    useEffect(() => {
        if (quotrecord) {
            form.setFieldsValue({
                clientName: quotrecord?.clientName,
                clientId : quotrecord?.clientId,
                address : quotrecord?.address,
                projectType: quotrecord?.projectType,
                // quotationListId: quotrecord?.quotationList[0]?.quotationListId,
                mobileNumber: quotrecord?.mobileNumber,
                projectStatus: quotrecord?.projectStatus,
                sub_total: quotrecord?.totalAmount,
                amount: quotrecord?.totalAmount,

                // totalAmount : 
                // quantity: quotrecord?.quotationList[0]?.quantity,
            })
            setProTabSecondaryData([{
                sub_total: quotrecord?.totalAmount,
                // sub_total: invoiceRecord?.sub_total,
              }])
            // form.setFieldsValue({ amount: quotationrecord?.totalAmount })
        }
    }, [quotrecord ,quottrigger ])


    // useEffect(() => {
    //     form.setFieldsValue({ amount: proTabSecondaryData?.TotalAmount })
    // }, [proTabSecondaryData,])


    // useEffect(() => {
    //     if (quotationrecord) {
    //         form.setFieldsValue(quotationrecord)

    //         const dates = new Date(quotationrecord?.date)
    //         const dateFormat = 'YYYY-MM-DD';
    //         const FrmDateee = dayjs(dates).format(dateFormat);

    //         form.setFieldsValue({
    //             date: dayjs(FrmDateee),
    //             // amount: quotationrecord?.amount

    //         })

    //         setProTabSecondaryData([{
    //             sub_total: quotationrecord?.amount,

    //         }])

    //         form.setFieldsValue({ amount: quotationrecord?.amount })

    //     }

    // }, [quotationrecord, quotationTrigger])

    useEffect(() => {
        dispatch(getBusinessProfile())
    }, [quotationTrigger])

    const profdetails = useSelector(selectAllBusinessProfile)

    useEffect(() => {
        form.setFieldsValue({ companyId: profdetails?.companyId })
    }, [profdetails])


    // ===============  Table Data Start ==================

    // ============  ProductColumns

    const Columns = [
        {
            title: '#',
            render: (text, record, index) => {
                return (
                    (
                        <Flex aligncenter={"true"} gap={'20px'} style={{ alignItems: 'center' }}>
                            <h4>{index + 1}</h4>
                            <Button
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
                                <LuMinusCircle />

                            </Button>
                        </Flex>
                    )
                );
            },
        },
        {
            title: (
                <p>Item&nbsp;Name</p>
            ),
            dataIndex: 'projectName',
            key: 'projectName',
            render: (text, record, index) => {
                return (
                    <>
                        <CustomInput
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required field',
                                },
                            ]}
                            minwidth={'100px'}
                            showSearch
                            disabled={'true'}
                            name={`projectName${record.key}`}
                            // options={setValue}
                            onChange={(value) => handleOnChangeProduct(value, record)}
                        />
                        <CustomInput  name={`projectId${record.key}`} display={'none'} />
                        <CustomInput name={`quotationListId${record.key}`} display={'none'}/>
                    </>
                );
            },
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            render: (text, record) => (
                <CustomInputNumber
                minwidth={'100px'}
                    precision={2}
                    placed={'end'}
                    name={`quantity${record.key}`}
                    onChange={(value) => handleOnChangeQuantity(value, record)}
                    rules={[
                        {
                            required: true,
                            message: 'Please Fill Details!',
                        },
                    ]}
                />
            )
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
            render: (text, record) => (
                <CustomInputNumber
                minwidth={'100px'}
                    style={{ textAlign: 'center' }}
                    name={`rate${record.key}`}
                    precision={2}
                    rules={[
                        {
                            required: true,
                            message: 'This is a required field',
                        },
                        // ({ getFieldValue }) => ({
                        //   validator(_, value) {
                        //     if (parseFloat(value) <= 0) {
                        //       return Promise.reject('Price must be greater than 1');
                        //     }
                        //     return Promise.resolve();
                        //   },
                        // }),
                    ]}
                    onChange={(value) => handleOnChangePrice(value, record)}
                />
            )
        },
        {
            title: (
                <p>Amount</p>
            ),
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => (
                <CustomInputNumber precision={2}
                    disabled
                    minwidth={'100px'}
                    placed={'end'}
                    name={`amount${record.key}`}
                    rules={[
                        {
                            required: true,
                            message: 'Please Fill Details!',
                        },
                    ]}
                />
            )
        },
        {
            title: (
                <p>Description</p>
            ),
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => (
                <CustomTextArea
                minwidth={'100px'}
                    style={{ textAlign: 'center' }}
                    name={`description${record.key}`}
                    onChange={(value) => handleOnChangeDescription(value, record)}

                />
            )
        },
        {
            title: (
                <p>Terms & Condtions</p>
            ),
            dataIndex: 'termsAndCondition',
            key: 'termsAndCondition',
            render: (text, record) => (
                <CustomTextArea
                minwidth={'100px'}
                    style={{ textAlign: 'center' }}
                    name={`termsAndCondition${record.key}`}
                    onChange={(value) => handleOnChangeTerms(value, record)}
                    rules={[
                        {
                            required: true,
                            message: 'Please Fill Details!',
                        },
                    ]}
                />
            )
        },
        {
            title: (
                <p>Notes</p>
            ),
            dataIndex: 'additionalNotes',
            key: 'additionalNotes',
            render: (text, record) => (
                <CustomTextArea
                minwidth={'100px'}
                    style={{ textAlign: 'center' }}
                    name={`additionalNotes${record.key}`}
                    onChange={(value) => handleOnChangeNotes(value, record)}
                    rules={[
                        {
                            required: true,
                            message: 'Please Fill Details!',
                        },
                    ]}
                />
            )
        },
    ]

    // ===============  Table Data End ==================


    // ================== Product Table Functions Start ==================

    const AddRow = () => { // ----------------- Add Row Function
        const newData = {
            key: proCount,
            description: '',
            projectName: '',
            quantity: '',
            rate: '',
            amount: '',
            termsAndCondition: '',
            additionalNotes: '',


        };
        setProTableData(pre => {
            return [...pre, newData]
        })
        setProCount(proCount + 1);
    }

    const onProductTabRowDelete = (key) => {  // -----------------------  Delete Row Function
        if (proTableData.length > 1) {
            setProTableData(prevState => {
                const newData = prevState.filter(item => item.key !== key);

                // ------ Variables 
                let totalQuantity = 0;
                let totalDiscount = 0;
                let totalTax = 0;
                let totalAmount = 0;

                newData.forEach(item => {
                    if (item.quantity !== '' || item.sale_discount !== '' || item.tax_cal_amt !== '' || item.item_cal_total_amt !== '') {
                        totalQuantity += parseFloat(item.quantity);
                        totalDiscount += parseFloat(item.sale_discount);
                        totalTax += parseFloat(item.tax_cal_amt);
                        totalAmount += parseFloat(item.item_cal_total_amt);
                    }
                });

                // update the grand_total value in the tableSecondaryData array
                setProTabSecondaryData([{
                    qty_total: totalQuantity.toFixed(2),
                    discount_total: totalDiscount.toFixed(2),
                    tax_total: totalTax.toFixed(2),
                    table_total: totalAmount.toFixed(2),
                }]);

                return newData;
            });
        } else {
        }
    };

    const CalculateTotal = (record) => {  // ----------------- 1. Calculate TotalAmount 
        setProTableData(prevState => {
            const newData = [...prevState];
            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            // ------ Variables 
            let totalAmount = 0;

            newData.forEach(item => {
                if (item.quantity !== '' || item.sale_discount !== '' || item.tax_cal_amt !== '' || item.item_cal_total_amt !== '') {
                    totalAmount += parseFloat(item.amount);
                }
            });

            // update the grand_total value in the tableSecondaryData array
            setProTabSecondaryData([{
                sub_total: totalAmount.toFixed(2),
            }]);

            return newData;
        });
    };

    // ============  Products OnChange Functions  ==============

    const HandleQty = (value, record) => {  //  OnCHANGE QTY
        setProTableData(prevState => {
            const newData = [...prevState];
            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            let QTY = value || 0;

            item.quantity = QTY;

            CalculateTotal({
                ...item,
                quantity: QTY,
            });

            HandleRowCal({
                ...item,
                quantity: QTY,
            })

            return newData;
        });
    };

    const HandlePrice = (value, record) => {  //  OnCHANGE PRICE
        setProTableData(prevState => {
            const newData = [...prevState];
            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            item.rate = value || 0;

            CalculateTotal({
                ...item,
                rate: item.rate,
            })

            HandleRowCal({
                ...item,
                rate: item.rate,
            })

            return newData;
        });
    }
    const HandleDescript = (value, record) => {
        setProTableData(prevState => {
            const newData = [...prevState];
            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            item.description = value;
            return newData;
        });
    };
    const HandleTerms = (value, record) => {
        setProTableData(prevState => {
            const newData = [...prevState];
            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            item.termsAndCondition = value;
            return newData;
        });
    };
    const HandleNotes = (value, record) => {
        setProTableData(prevState => {
            const newData = [...prevState];
            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            item.additionalNotes = value;
            return newData;
        });
    };


    // ========== product =============

    const HandleProduct = (value, record) => {   // ONCHANGE PRODUCT 
        setProTableData(prevState => {
            const newData = [...prevState];
            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            item.projectName = value;
            return newData;
        });
    };

    const HandleRowCal = (record) => {
        setProTableData(prevState => {
            const newData = [...prevState];
            const index = newData.findIndex(item => record.key === item.key);
            const item = newData[index];

            let sub_total = 0; // Sub - Total


            const price = record.rate || 0;
            const quantity = record.quantity || 0;

            const OriginalAmount = calculateProductTableAmount(item); // Qty x Price

            item.quantity = quantity;
            item.rate = price;
            item.sub_total = sub_total;
            item.amount = OriginalAmount;

            CalculateTotal({
                ...item,
                quantity: quantity,
                amount: OriginalAmount,
            })

            return newData;
        })
    }


    // ===================  Whole Tax Table Calculation ============


    // ---------------- 1.TotalQuantity ONCHANGE Function

    const handleOnChangeQuantity = (value, record) => {  //  ----> QUANTITY ONCHANGE (PRODUCT TABLE)
        HandleQty(value, record);  //  1227
    };

    const handleOnChangePrice = (value, record) => {   //  ----> PRICE ONCHANGE (PRODUCT TABLE)
        HandlePrice(value, record) //  1258
    }

    const handleOnChangeProduct = (value, record) => {  //  -----> PRODUCT ONCHANGE (PRODUCT TABLE)
        HandleProduct(value.target.value, record)
    }

    const handleOnChangeDescription = (value, record) => {
        HandleDescript(value.target.value, record)
    }
    const handleOnChangeTerms = (value, record) => {
        HandleTerms(value.target.value, record)
    }
    const handleOnChangeNotes = (value, record) => {
        HandleNotes(value.target.value, record)
    }


    // -------------- Handle Total Row Amount  --------------
    const calculateProductTableAmount = (record) => {
        const quantity = parseFloat(record.quantity) || 0;
        const sale_amount = parseFloat(record.rate) || 0;
        return quantity * sale_amount
    }

    // ================== Product Table Functions End ==================

    // ====================  On Finish Function ============

    const onFinish = (values) => {
        const record = {
            ...values, date: selectedDate,
        };
        let result = {
            clientId: record.clientId,
            companyId: record.companyId,
            projectType: record.projectType,
            totalAmount : record.amount,
            projectStatus : record.projectStatus,

            quotationList: Object.entries(record)
                .filter(([key]) => key.startsWith('projectId'))
                .map(([key, projectId]) => {
                    const index = key.match(/\d+/)[0];
                    const Quantity = `quantity${index}`;
                    const Rate = `rate${index}`;
                    const TotalAmount = `amount${index}`;
                    const Description = `description${index}`;
                    const AdditionalNotes = `additionalNotes${index}`;
                    const TermConditions = `termsAndCondition${index}`;
                    const ProjectID = `projectId${index}`;
                    const projectName = `projectName${index}`;
                    const quotationList = `quotationListId${index}`;

                    return {
                        projectId,
                        quantity: record[Quantity],
                        rate: record[Rate] || 0,
                        description: record[Description],
                        amount: record[TotalAmount],
                        additionalNotes: record[AdditionalNotes],
                        termsAndCondition: record[TermConditions],
                        projectId: record[ProjectID],
                        projectName: record[projectName],
                        quotationListId : record[quotationList],

                    };
                }),

            // termsList: Object.entries(record)
            //     .filter(([key]) => key.startsWith('termsAndCondition'))
            //     .map(([key, termsAndCondition]) => {
            //         const index = key.match(/\d+/)[0];
            //         const AdditionalNotes = `additionalNotes${index}`;

            //         return {
            //             termsAndCondition,
            //             additionalNotes: record[AdditionalNotes],

            //         };
            //     }),
        };


        // if (quotationrecord) {
        //     UpdateQuotation(result)
        // }
        // else {
        QuotationPost(result);

        // }

    };

    const QuotationPost = (values) => {

        request.put(`${CLIENTURL.PUT_CLIENT_QUOTATION}${quotrecord?.quotationId}`, values)
            .then(function (response) {
                if (response.status == 200) {
                    toast.info("Successfully Updated Client's Quotation")

                    setTrigger((trigger) => trigger + 1);
                    dispatch(getClientQuotation())
                    FormExternalClose()
                    //   handleClick(response.data.id)
                    if (handleViewQuotation) {
                        handleViewQuotation()
                    }
                    setProTableData(ProductInitialData);
                    setProTabSecondaryData(ProSecondaryData);
                }

            })
            .catch(function (error) {
                console.log(error, 'errorerror');
                toast.error('Failed')

            });
    }

    //================ print==========================

    const handleClick = (record) => {
        setModalWidth(400)
        setModalTitle("Invoice Print");
        setModalContent(<PrintModal record={record} />);
        showModal();
    }

    const PrintModal = (record) => {
        return (
            <div>

                <h1 style={{ fontSize: '1.2rem' }}>Are you Sure You Want to Print ?</h1>
                <br />
                <Flex gap={'20px'} w_100={"true"} center={"true"} verticallyCenter>
                    <Button.Success text={'Print'} onClick={() => printOk(record)} />
                    <Button.Danger text={'Cancel'} onClick={handleOk} />
                </Flex>
            </div>
        )

    }

    const printOk = async (record) => {
        setModalWidth(800)
        setModalContent(<ViewPrint record={record} />);
        showModal();

    };


    const onFinishFailed = (errorInfo) => {
        toast.warn('Please Fill the Details!')
    };


    // ==============  Add Row Component  ================

    //     const AddBtn = styled(Button)`
    //   .ant-btn-primary
    //         color: #707070 !important;
    //     box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1)!important;


    //     `;

    const FooterComponent = () => {
        return (
            <div style={{ background: 'var(--light-color)', padding: '10px' }}>
                <CustomRow>
                    {/* <Col lg={4} sm={12} span={24}>
                        <Button type="primary" style={{
                        }}
                            htmlType="button"
                            onClick={AddRow} >
                            Add Row
                        </Button>
                    </Col> */}
                </CustomRow>
            </div >
        )
    }

    // ==================  Table  ==================
    const onRest = () => {
        form.resetFields();
        form.setFieldsValue({ companyId: profdetails?.companyId })
        setSelectedSale(!selectedSale)
        setTrigger((trigger) => trigger + 1);
        setProTableData(ProductInitialData);
        setProTabSecondaryData(ProSecondaryData);
    }
    const oncancel = () => {
        handleViewQuotation()
    }


    useEffect(() => {
        if (quotrecord?.quotationList) {
            const tableData = quotrecord?.quotationList?.map((value, index) => ({
                ...value,
                key: index
            }));

            setProTableData(tableData);
            setProCount(tableData.length);
        }

    }, [quotrecord, quottrigger]);

    return (
        <Fragment>
            <Form name="quotation"
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}
                form={form}
                initialValues={
                    {
                        date: dayjs(),
                    }
                }
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                <br />
                <HeaderQuotation trigger={trigger} setSale={setSale} setSelectedDate={setSelectedDate}
                    setGetdata={setGetdata} selectedSale={selectedSale} setSelectedSale={setSelectedSale} />

                <CustomStandardTable columns={Columns.filter(Boolean)} data={proTableData} />
                <FooterComponent />

                <Card>
                    <Flex right={'true'} >
                        <CustomInput name={'sub_total'} display={'none'} />
                        {/* <CustomUpload onChange={handleChange} form={form} initialValue={ImageInitialValue} label={'Variation Image (Multi Select)'}
                            name={'url'} listType='picture-card' accept='.png,.jpeg,.jpg' maxCount={1}
                        /> */}
                        <CustomInput name={'amount'} label={'Total Amount'} disabled />
                    </Flex>
                </Card>


                <Card>
                    <Flex center={"true"} gap={'10px'}>
                        {quotationrecord ? <><Button.Primary text={'Update'} htmlType="submit" />
                            <Button.Danger text={'Cancel'} onClick={oncancel} /></>
                            :
                            <><Button.Primary text={'Submit'} htmlType="submit" />
                                <Button.Danger text={'Reset'} onClick={onRest} /></>
                        }

                    </Flex>
                </Card>
            </Form>

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={modalWidth} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}