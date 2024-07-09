import React, { useState } from 'react'
import { AddCandidateForm } from './AddCandidateForm';
import { CustomPageFormTitle } from '../../../../../components/CustomPageTitle';
import { CustomCardView } from '../../../../../components/CustomCardView';
import { CustomModal } from '../../../../../components/CustomModal';
import { CandidateTable } from './CandidateTable';

export const CandidateContainer = () => {
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
        FormCancelRest();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    const FormExternalClose = ()=>{
        handleOk()

    }

    // ===== Modal Functions End =====

    // -------  Form Reset Funtion

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const AddNewCandidate = () => {
        setModalTitle("Add Candidate");
        setModalContent(<AddCandidateForm FormExternalClose={FormExternalClose} formname={'AddCandidate'} handleOk={handleOk} formReset={formReset} />);
        showModal();
    };


    return (

        <CustomCardView style={{height: "auto"}}>

            <CustomPageFormTitle Heading={'View Candidate'} />
            
            <CandidateTable AddNewCandidate={AddNewCandidate}/>

            {/* <Flex gap={'20px'} center={"true"} margin={'10px 0'}>
                <Button.Primary text={'Add'} onClick={AddNewCompany} />
            </Flex> */}

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomCardView>


    )
}