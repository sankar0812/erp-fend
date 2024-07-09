import React, { useState } from "react";
import { getItems, move, reorder } from "./Partials/Data";
import DroppableList from "./Partials/DraggableList";
import { DragDropContext } from "react-beautiful-dnd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Checkbox } from "antd";
import { DragDropStyled } from "./style";
import CustomInputSearch from "../../../../components/Form/CustomInputSearch";

export const DragAndDrop = () => {
  const [state, setState] = useState({
    todo: getItems(3),
    pending: getItems(3, 5),
    onprogress: getItems(3, 10),
    // completed: getItems(3, 15),
    // hold: getItems(0, 20),
    // cancelled: getItems(0, 25),
  });

  const id2List = {
    droppable: "todo",
    droppable2: "pending",
    droppable3: "onprogress",
    // droppable4: "completed",
    // droppable5: "hold",
    // droppable6: "cancelled",
  };

  const getList = (id) => state[id2List[id]];

  console.log(state, "state");
  // const keysArray = [
  //   ...(typeof receivedState1 === "string"
  //     ? [receivedState1]
  //     : receivedState1),
  //   ...(typeof receivedState2 === "string"
  //     ? [receivedState2]
  //     : receivedState2),
  // ];

  const findRemainingStatesWithValues = (receivedState1, receivedState2) => {
    const keysArray = [receivedState1, receivedState2];

    const remainingKeys = Object.keys(id2List).filter(
      (key) => !keysArray.includes(key)
    );
  
    const remainingValues = remainingKeys.map((key) => id2List[key]);
  
    console.log(remainingKeys, 'remainingKeys');
    console.log(remainingValues, 'remainingValues');
  
    return { remainingKeys, remainingValues };
  };


  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log(result, "llll");
    if (!destination) {
      return;
    }
    if (source.droppableId === "droppable3") {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      setState((prevState) => ({
        ...prevState,
        [id2List[source.droppableId]]: items,
      }));
    } else {
      const sourceId = source.droppableId;
      const destinationId = destination.droppableId;

      const { otherStateKey, otherState } = findRemainingStatesWithValues(sourceId, destinationId);

      const otherstateObject = state[otherState];
      console.log(otherStateKey, otherState, otherstateObject, "Id 77777777");

      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination,
        otherStateKey,
        otherstateObject
      );
      console.log(result, "yyyyyyy");
      setState({
        items: result.droppable,
        selected: result.droppable2,
        thirdList: result.droppable3,
        // fourthList: result.droppable4,
        // fifthList: result.droppable5,
        // sixthList: result.droppable6,
      });
    }
  };

  const [selectedValues, setSelectedValues] = useState([]);

  const options = [
    { label: "Hold", value: "hold" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const handleCheckboxChange = (checkedValues) => {
    setSelectedValues(checkedValues);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "10px 0px",
        }}
      >
        <CustomInputSearch
          placeholder={"...Search"}
          style={{
            width: "30%",
            border: "1px solid lightgray",
            borderRadius: "2px ",
          }}
        />
        <Checkbox.Group
          style={{ padding: "10px 0px" }}
          options={options}
          value={selectedValues}
          onChange={handleCheckboxChange}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <DragDropStyled
          style={{ display: "flex", gap: "15px", overflow: "auto" }}
        >
          <div style={{ backgroundColor: "#F7F8F9", borderRadius: "4px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 10px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#89CFF3",
                  color: "#3081D0",
                }}
              >
                Todo
              </span>
              <div>
                <BsThreeDotsVertical />
              </div>
            </div>
            <DroppableList items={state.todo} droppableId="droppable" />
          </div>

          <div style={{ backgroundColor: "#F7F8F9", borderRadius: "4px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 10px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#FFEBD8",
                  color: "#FF8F8F",
                }}
              >
                Pending
              </span>
              <div>
                <BsThreeDotsVertical />
              </div>
            </div>
            <DroppableList items={state.pending} droppableId="droppable2" />
          </div>

          <div style={{ backgroundColor: "#F7F8F9", borderRadius: "4px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 10px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#FFE3BB",
                  color: "#F05941",
                }}
              >
                Onprogress
              </span>
              <div>
                <BsThreeDotsVertical />
              </div>
            </div>
            <DroppableList items={state.onprogress} droppableId="droppable3" />
          </div>

          {/* <div style={{ backgroundColor: "#F7F8F9", borderRadius: "4px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 10px",
              }}
            >
              <span
                style={{
                  backgroundColor: "#B0D9B1",
                  color: "#1A5D1A",
                }}
              >
                Completed
              </span>
              <div>
                <BsThreeDotsVertical />
              </div>
            </div>
            <DroppableList items={state.completed} droppableId="droppable4" />
          </div> */}

          {selectedValues.map((item, index) => {
            return (
              <div style={{ backgroundColor: "#F7F8F9", borderRadius: "4px" }}>
                {item === "hold" && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px 10px",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: "#B0D9B1",
                          color: "#1A5D1A",
                        }}
                      >
                        Hold
                      </span>
                      <div>
                        <BsThreeDotsVertical />
                      </div>
                    </div>
                    <DroppableList
                      items={state.hold}
                      droppableId="droppable5"
                    />
                  </div>
                )}
                {item === "cancelled" && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "10px 10px",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: "#B0D9B1",
                          color: "#1A5D1A",
                        }}
                      >
                        Cancelled
                      </span>
                      <div>
                        <BsThreeDotsVertical />
                      </div>
                    </div>
                    <DroppableList
                      items={state.cancelled}
                      droppableId="droppable6"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </DragDropStyled>
      </DragDropContext>
    </div>
  );
};
