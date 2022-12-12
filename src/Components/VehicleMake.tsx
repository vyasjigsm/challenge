import React, { useEffect, useState } from "react";
import VehicleDetails from "./Common/VehicleDetails";

// components
import VehicleData from "./Common/VehicleData";

interface Props {
  csvResponseData: any;
}

const VehicleMake: React.FC<Props> = ({ csvResponseData }) => {
  const [first2VehicleData, setFirst2VehicleData] = useState<any>([]);
  const [other, setOther] = useState(0);
  const [companyList, setCompanyList] = useState<any>({});

  useEffect(() => {
    // Arrange the data when the value in dependies changed
    // Vehicle Company List
    const companyListData: any = {};

    // Finding Total Companies and their length
    csvResponseData?.forEach((data: any) => {
      const previousValue = companyListData[data["Make"]];

      if (previousValue === undefined) {
        // adding key and value
        // If the value is not exist then create new value
        companyListData[data["Make"]] = 1;
      } else {
        // add the value [length]
        // If the value is exist then increase their length
        companyListData[data["Make"]] = previousValue + 1;
      }
    });

    setCompanyList(companyListData);

    // Finding top2 Compnay's list

    if (Object.keys(companyListData).length > 0) {
      const top2: any = Object.entries(companyListData)
        .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
        .slice(0, 2)
        .map(([label, value]) => ({ label, value }));

      setFirst2VehicleData(top2);

      const otherData =
        csvResponseData.length - top2[0]?.value - top2[1]?.value;

      setOther(otherData);
    }
  }, [csvResponseData]);

  return (
    <div className="d-flex text-start gap-4 border-bottom pb-2">
      <VehicleDetails
        csvResponseData={csvResponseData}
        first2VehicleData={first2VehicleData}
        dataList={companyList}
        other={other}
        heading="Make"
        description="Company Name"
        type={0}
      />

      <div className="flex-2">
        <VehicleData
          csvResponseData={csvResponseData}
          first2VehicleData={first2VehicleData}
          unique={Object.keys(companyList).length}
        />
      </div>
    </div>
  );
};

export default VehicleMake;
