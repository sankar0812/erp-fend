import { APIURLS } from "./ApiUrls/Hrm";
import request from "./request";
import { getCandidate } from "../modules/HRM/Recruitments/RecruitmentSlice";
import {store} from '../store'
import { logDOM } from "@testing-library/react";

export const PatchHooks = async (values, id, ) => {
  try {
    const response = await request.patch(
      `${APIURLS.PATCHCANDIDATE}${id}`,
      values
    );
    store.dispatch(getCandidate());
    return response;
  } catch (error) {
    console.error(error, "check");
    throw error;
  }
};