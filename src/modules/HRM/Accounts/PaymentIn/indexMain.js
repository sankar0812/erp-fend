import React from "react";
import { CustomTabs } from "../../../../components/CustomTabs";
import InvoicePayForm from "./InvoicePay/Partials/InvoicePayForm";
import MaintainInvoicePayForm from "./MaintainPay/Partials/MaintainInvoicePayForm";

const PayementIn = () => {
  const tabs = [

    {
      key: "1",
      label: "Invoice PaymentIn",
      children: <InvoicePayForm />
    },
    {
      key: "2",
      label: "Maintenance Invoice PayementIn",
      children: <MaintainInvoicePayForm />,
    },
  ];
  const onChangeTabs = () => { };
  return (
    <div>
      <CustomTabs tabs={tabs} defaultActiveKey={"1"} onChange={onChangeTabs} />
    </div>
  );
};

export default PayementIn;
