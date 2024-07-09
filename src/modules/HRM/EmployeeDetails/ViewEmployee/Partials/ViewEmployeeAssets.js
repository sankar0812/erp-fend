import React, { Fragment, useEffect, useState } from "react";
import { CustomCardView } from "../../../../../components/CustomCardView";
import { CustomStandardTable } from "../../../../../components/Form/CustomStandardTable";
import { CustomRow } from "../../../../../components/CustomRow";
import { Col } from "antd";
import image from "../../../../../Images/bussiness.avif";
import { useParams } from "react-router-dom";
import request, { base } from "../../../../../utils/request";
import { APIURLS } from "../../../../../utils/ApiUrls/Hrm";

export const ViewEmployeeAssets = () => {
  const [dataSource, setDataSource] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    GetEmployeeAssets();
  }, []);

  const Assets = dataSource[0]?.assets

  const GetEmployeeAssets = () => {
    request
      .get(`${APIURLS.GETEMPLOYEEASSETS}${id}`)
      .then(function (response) {
        setDataSource(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <CustomRow space={[12, 12]}>
          {Assets?.map((item) => {
            return (
              <Col span={24} md={8} key={item?.assetsListId}>
              <CustomCardView style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <CustomRow space={[12, 12]}>
                  <Col span={24} md={14}>
                    <p style={{ lineHeight: "30px",color:"#fff",fontSize:"16px" }}>{item.accessoriesName}</p>
                    <p style={{ lineHeight: "30px",color:"#fff",fontSize:"16px" }}>{item.brandName}</p>
                    <p style={{ lineHeight: "30px",color:"#fff",fontSize:"16px" }}>{item.serialNumber}</p>
                  </Col>
                  <Col span={24} md={10}>
                    <p style={{ lineHeight: "30px",color:"#fff",fontSize:"16px" }}>Count : {item.count}</p>
                    <br />
                    <img src={`${base}${item?.image}`} alt="gsdgsd" width={50} height={50} />
                  </Col>
                </CustomRow>
              </CustomCardView>
        </Col>
            )
          })}
      </CustomRow>
    </Fragment>
  );
};
