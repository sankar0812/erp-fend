import { Col } from "antd";
import React, { Fragment } from "react";
import { CustomRow } from "../../../../../components/CustomRow";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { base } from "../../../../../utils/request";

export const ViewEmpExit = ({ ViewEmpRecord }) => {
  console.log(ViewEmpRecord,'ViewEmpRecord');
  return (
    <Fragment>
      <CustomCardView>
        <CustomRow space={[12, 12]}>
          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">Profile</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <img
                  src={`${base}${ViewEmpRecord?.profile}`}
                  alt="Staff"
                  width="50"
                  height="50"
                  style={{ borderRadius: "50%", objectFit:"cover" }}
                />
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Employee Name</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{ViewEmpRecord?.userName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">User Id</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{ViewEmpRecord?.userId}</p>
              </Col>
            </CustomRow>
          </Col>

          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={11} sm={11}>
                <p className="para">Department Name</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{ViewEmpRecord?.departmentName}</p>
              </Col>
              <Col span={24} md={11} sm={11}>
                <p className="para">Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{ViewEmpRecord?.date}</p>
              </Col>
              <Col span={24} md={11} sm={11}>
                <p className="para">Description</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{ViewEmpRecord?.description}</p>
              </Col>
              {/* <Col span={24} md={8} sm={8}>
                <p className="para">Assets List:</p>
              </Col> */}
              {/* <Col span={12} md={16} sm={16}>
                {ViewEmpRecord?.assets.map((item) => {
                  return (
                    <CustomRow space={[12, 12]}>
                      <Col span={24} md={24} sm={24}>
                        <p className="para" style={{paddingBottom:"5px"}}>
                          {`${item.brandName} (${item.accessoriesName}) (${item.count})`}
                        </p>
                      </Col>
                    </CustomRow>
                  );
                })}
              </Col> */}
            </CustomRow>
          </Col>
        </CustomRow>
      </CustomCardView>
    </Fragment>
  );
};
