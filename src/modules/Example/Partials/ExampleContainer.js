import React, { useState } from 'react'
import { ExampleForm } from './ExampleForm'
import Flex from '../../../components/Flex'
import Button from '../../../components/Form/CustomButton'
import { CustomModal } from '../../../components/CustomModal'
import { CustomCardView } from '../../../components/CustomCardView'
import { ExampleTable } from './ExampleTable'
import { CustomPageFormTitle } from '../../../components/CustomPageTitle'

export const ExampleContainer = () => {

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
        FormCancelRest();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        FormCancelRest();
    };

    // ===== Modal Functions End =====

    // -------  Form Reset Funtion

    const FormCancelRest = () => {
        setFormReset(formReset + 1)
    }

    const AddNewCompany = () => {
        setModalTitle("Add Company");
        setModalContent(<ExampleForm formname={'AddForm'} handleOk={handleOk} formReset={formReset} />);
        showModal();
    };


    return (

        <CustomCardView>

            <CustomPageFormTitle Heading={'View Company'} />
            
            <ExampleTable AddNewCompany={AddNewCompany}/>

            {/* <Flex gap={'20px'} center={"true"} margin={'10px 0'}>
                <Button.Primary text={'Add'} onClick={AddNewCompany} />
            </Flex> */}

            <CustomModal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </CustomCardView>


    )
}
