import React, { Fragment } from "react";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";

export const ViewAssigningAssets = ({ AssigningAssetsrecord }) => {
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
                <p>{AssigningAssetsrecord?.userName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Department Name</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{AssigningAssetsrecord?.departmentName}</p>
              </Col>

              <Col span={24} md={11} sm={11}>
                <p className="para">Date</p>
              </Col>
              <Col span={24} md={13} sm={13}>
                <p>{AssigningAssetsrecord?.assetsDate}</p>
              </Col>
            </CustomRow>
          </Col>

          <Col span={12} md={12}>
            <CustomRow space={[12, 12]}>
              <Col span={24} md={8} sm={8}>
                <p className="para">Assets List:</p>
              </Col>
              <Col span={12} md={16} sm={16}>
                {AssigningAssetsrecord?.assets.map((item) => {
                  return (
                    <CustomRow key={item.assetsListId} space={[12, 12]}>
                      <Col span={24} md={24} sm={24}>
                        <p className="para" style={{ paddingBottom: "5px" }}>
                          {`${item.brandName} (${item.accessoriesName}) (${item.count})`}
                        </p>
                      </Col>
                    </CustomRow>
                  );
                })}
              </Col>
            </CustomRow>
          </Col>
        </CustomRow>
      </CustomCardView>
    </Fragment>
  );
};
