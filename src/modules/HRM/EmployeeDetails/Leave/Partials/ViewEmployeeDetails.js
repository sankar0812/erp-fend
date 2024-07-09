import React, { Fragment } from "react";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import { CustomTag } from "../../../../../components/Form/CustomTag";

export const ViewEmployeeDetails = ({ leaverecord }) => {
  return (
    <Fragment>
      <CustomCardView>
        <CustomRow space={[12, 12]}>
          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">Employee Name</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{leaverecord?.userName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Department Name</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{leaverecord?.departmentName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Role Name</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{leaverecord?.roleName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">From Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{leaverecord?.date}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">To Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{leaverecord?.toDate}</p>
              </Col>
            </CustomRow>
          </Col>

          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">Status</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                {leaverecord?.leavetype === "rejected" && (
                  <CustomTag color={"error"} title={"Cancelled"} />
                )}

                {leaverecord?.leavetype === "pending" && (
                  <CustomTag color={"processing"} title={"Pending"} />
                )}

                {leaverecord?.leavetype === "approved" && (
                  <CustomTag color={"success"} title={"Approval"} />
                )}
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Reason</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{leaverecord?.reason}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Description</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{leaverecord?.reasonDescription}</p>
              </Col>

              {leaverecord?.leavetype === "rejected" && (
                <Col span={24} md={11} sm={11}>
                  <p className="para">Cancel Reason</p>
                </Col>
              )}

              {leaverecord?.leavetype === "rejected" && (
                <Col span={24} md={13} sm={13}>
                  <p>{leaverecord?.cancellationReason}</p>
                </Col>
              )}
            </CustomRow>
          </Col>
        </CustomRow>
      </CustomCardView>
    </Fragment>
  );
};
