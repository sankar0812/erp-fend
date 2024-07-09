import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

const DroppableList = ({ items, droppableId }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{
            // background: "lightgrey",
            padding: 8,
            width: 250,
            // borderRadius: "4px",
          }}
        >
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: "none",
                    padding: "16px",
                    margin: "0 0 8px 0",
                    backgroundColor: "white",
                    boxShadow:"0px 0px 1px",
                    borderRadius: "4px",
                    ...provided.draggableProps.style,
                  }}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableList;
