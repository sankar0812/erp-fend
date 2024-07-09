import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const menuStyle = {
  width: '35px',
  height: '5px',
  backgroundColor: 'black',
  margin: '6px 0',
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 16,
  margin: `0 0 8px 0`,
  background: isDragging ? 'lightgreen' : 'grey',
  ...draggableStyle,
});

const DraggableItem = ({ item, index }) => (
  <Draggable key={item.id} draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <div>
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          <div style={{ float: 'right', marginTop: '-9px' }}>
            <div style={menuStyle} />
            <div style={menuStyle} />
            <div style={menuStyle} />
          </div>
          {item.content}{item.key}
        </div>
      </div>
    )}
  </Draggable>
);

export default DraggableItem;
