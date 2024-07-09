import React from "react";
import { CustomCardView } from "../../../../components/CustomCardView";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Tabs } from "antd";
import { DragAndDrop } from "../DragAndDrop";
import { DDListTable } from "../DDListTable/DDListTable";

export const ProjectContainer = () => {
    const items = [
        {
            key: '1',
            icon:<AiOutlinePlusCircle/>,
            label: `Board`,
            children: <DragAndDrop/>,
        },
        {
            key: '2',
            label: `List`,
            children: <DDListTable/>,
        }
    ];
    const onChange = (key) => {
        console.log(key);
    };
  return (
    <div>
      <CustomCardView>
        <Tabs onChange={onChange} items={items} />
      </CustomCardView>
    </div>
  );
};
