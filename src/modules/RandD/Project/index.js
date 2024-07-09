import React from "react";
import { ProjectContainer } from "./Partials/ProjectContainer";
import { CustomPageTitle } from "../../../components/CustomPageTitle";

export const Project = () => {
  return (
    <div>
      <CustomPageTitle Heading={"Projects"} />
      <ProjectContainer />
    </div>
  );
};
