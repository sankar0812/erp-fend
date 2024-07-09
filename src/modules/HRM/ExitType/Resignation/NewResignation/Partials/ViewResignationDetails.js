import React, { Fragment } from "react";
import { CustomCardView } from "../../../../../../components/CustomCardView";
import { CustomRow } from "../../../../../../components/CustomRow";
import { Col } from "antd";
import { CustomTag } from "../../../../../../components/Form/CustomTag";

export const ViewResignationDetails = ({ resignationrecord }) => {
  console.log(resignationrecord,'called');
  return (
    <Fragment>
      <CustomCardView>
        <CustomRow space={[12, 12]}>
          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">Name</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{resignationrecord?.userName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Title</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{resignationrecord?.title}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Reason</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{resignationrecord?.reason}</p>
              </Col>
            </CustomRow>
          </Col>

          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">From Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{resignationrecord?.fromDate}</p>
              </Col>

              {/* <Col span={24} md={11} sm={11}>
                <p className="para">To Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{resignationrecord?.toDate}</p>
              </Col> */}

              <Col span={24} md={11} sm={11}>
                <p className="para">Type</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                {/* <p>{resignationrecord?.type}</p> */}
                {resignationrecord.type === "pending" && (
              <CustomTag
                bordered={"true"}
                color={"warning"}
                title={"Pending"}
              />
            )}

            {resignationrecord.type === "rejected" && (
              <CustomTag
                bordered={"true"}
                color={"error"}
                title={"cancelled"}
              />
            )}

            {resignationrecord.type === "approved" && (
              <CustomTag
                bordered={"true"}
                color={"success"}
                title={"Approval"}
              />
            )}
              </Col>
            </CustomRow>
          </Col>
        </CustomRow>
      </CustomCardView>
    </Fragment>
  );
};
