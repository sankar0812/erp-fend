import React, { useEffect, useMemo } from "react";
import { CustomPageTitle } from "../../../../../components/CustomPageTitle";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { AddResignationForm } from "./Partials/AddResignationForm";
import {ViewNewResignation} from "./Partials/ViewResignation"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getResignation, selectAllResignation } from "../ResignationSlice";
import { selectCurrentId } from "../../../../Auth/authSlice";

export const NewResignation = () => {

  const Employeeid = useSelector(selectCurrentId);

  const Resignation = useSelector(selectAllResignation);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResignation());
  }, []);

  const ResignationFindId = useMemo(
    () => Resignation?.filter((item) => item?.employeeId == Employeeid),
    [Resignation, Employeeid]
    );
  return (
    <div>
      {ResignationFindId?.length < 1 && (
        <div>
          <CustomPageTitle Heading={"Add Resignation"} />
          <CustomCardView width={"700px"}>
            <AddResignationForm />
          </CustomCardView>
        </div>
      )}
      <ViewNewResignation />
    </div>
  );
};
