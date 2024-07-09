import React, { useState } from "react";
import { TaskAssignTable } from "./TaskAssignTable";
import { CustomModal } from "../../../../../components/CustomModal";
import { CustomPageFormTitle } from "../../../../../components/CustomPageTitle";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { TaskAssignForm } from "./TaskAssigningForm";

export const TaskAssignContainer = () => {
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
  
    const AddTaskAssign = () => {
        setModalTitle("Add Task Assigning");
        setModalContent(<TaskAssignForm FormExternalClose={FormExternalClose} formname={'AddTaskAssigning'} handleOk={handleOk} formReset={formReset} />);
        showModal();
    };
  return (
    <CustomCardView style={{height: "auto"}}>
      <CustomPageFormTitle Heading={"View Task Assigning"} />

      <TaskAssignTable AddTaskAssign={AddTaskAssign} />

      <CustomModal
        isVisible={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        width={800}
        modalTitle={modalTitle}
        modalContent={modalContent}
      />
    </CustomCardView>
  );
};