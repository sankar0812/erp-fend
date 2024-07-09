import { ProjectCard } from "./ProjectCard";

// utils.js
export const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}`,
    // content: `item ${k + offset}`,
    content: <ProjectCard/>,
  }));

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  otherStateKey,
  otherstateObject
) => {
  // console.log(source, destination, droppableSource, droppableDestination,otherStateKey,otherstateObject,'ddddddd');
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  result[otherStateKey] = otherstateObject;
  return result;
};
