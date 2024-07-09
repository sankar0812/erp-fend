import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasicSalaryForm from "./BasicSalaryForm";
import {  CustomPageTitle } from "../../../../components/CustomPageTitle";
import { CustomModal } from "../../../../components/CustomModal";
import { getSalary, selectAllSalary } from "../../PayrollSlice";
import { CustomStandardTable } from "../../../../components/Form/CustomStandardTable";
import request from "../../../../utils/request";
import { APIURLS } from "../../../../utils/ApiUrls";

export const BasicSalaryTable = ({ departmentId,selectedUserName,selectedDepartmentId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [dataSource, setDataSource] = useState([]);
    const [searchTexts, setSearchTexts] = useState([]);

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ----------  Form Reset UseState ---------
    const [formReset, setFormReset] = useState(0);

    // ===== Modal Functions Start =====

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        FormRest();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormRest();
    };

    useEffect(() => {
        dispatch(getSalary())

    }, [])


    const viewSalary = useSelector(selectAllSalary)

    // useEffect(() => {
    //     setDataSource(viewSalary)
    // }, [viewSalary])

    useEffect(() => {
        GetDepartmentByRole();
    }, []);

    const GetDepartmentByRole = () => {
        const department = 'Department';
        request
            .get(`${APIURLS.GETDEPARTMENTROLE}`, { params: { department } })
            .then(function (response) {
                setDataSource(response.data)
            })
            .catch(function (error) {
            });
    };

    


    // ===== Modal Functions End =====

    // const UpdateParty = (record) => {
    //     setTrigger(trigger + 1)
    //     setModelwith(800)
    //     setModalTitle("Update Party");
    //     // setModalContent(<AddPartyForm Partydata={record} Trigger={trigger} FormClose={handleOk} FornUpdate={FornUpdate} />);
    //     showModal();
    // };

    const FormRest = () => {
        setFormReset(formReset + 1);
    };



    // ========== Delete post ==========

    // const handleConfirm = (record) => {
    //     DeleteParty(record)
    // }

    // const DeleteParty = (record) => {
    //     request.delete(`${DEL_PARTY_URL}/${record?.id}/`)
    //         .then((response) => {
    //             dispatch(getParty())
    //             toast.info("Deleted Successfully")
    //         }).catch(error => {
    //             if (error.response.status === 400) {
    //                 toast.error("Something Went Wrong")
    //             } else {
    //                 toast.error("Failed")
    //             }
    //         });
    // };

    const handleSearchs = (value) => {
        setSearchTexts(value);
    };

    const columns = [
        {
            title: "SI No",
            render: (value, item, index) => index + 1,
        },
        {
            title: "Employee Name",
            dataIndex: "user_name",
        },
    ];

    // let content;

    // if (PartyStatus === 'loading') {
    //     content = <CommonLoading />
    // } else if (PartyStatus === 'succeeded') {
    //     const rowKey = (dataSource) => dataSource.id;
    //     content = <CustomTable columns={columns} data={dataSource} rowKey={rowKey} />
    // } else if (PartyStatus === 'failed') {
    //     content = <h2>{PartyError}</h2>
    // }

    const FormExternalClose = () => {
        handleOk();
    };

    const AddEmployeeQualification = () => {
        setModalTitle("Add Basic Salary");
        setModalContent(
            <BasicSalaryForm
                formname={"AddEmployeeProfileForm"}
                FormExternalClose={FormExternalClose}
                formReset={formReset}
            />
        );
        showModal();
    };

    const handleRowClick = (record) => {
        navigate('/viewemployeequalification')
    };

    return (
        <Fragment>
            <CustomPageTitle Heading={"Staff Basic Salary"} />
            <CustomStandardTable
                columns={columns}
                data={dataSource}
            />
            <CustomModal
                isVisible={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                width={800}
                modalTitle={modalTitle}
                modalContent={modalContent}
            />
        </Fragment>
    );
};
