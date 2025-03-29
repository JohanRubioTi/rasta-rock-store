import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const DraggableTable = ({ onDragEnd, children }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="products">
        {(provided) => (
          <tbody
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {children}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTable;
