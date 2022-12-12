import React, { useEffect, useState } from "react";
import VehicleDetails from "./Common/VehicleDetails";
import VehicleData from "./Common/VehicleData";

interface Props {
  CSVResponseData: any;
}

const VehicleModel: React.FC<Props> = ({ CSVResponseData }) => {
  const [first2VehicleData, setFirst2VehicleData] = useState<any>([]);
  const [modelList, setModelList] = useState<any>({});

  useEffect(() => {
    // Arrange the data when the value in dependies changed

    // Vehicle Model List
    const modelListData: any = {};

    // Finding Total Models and their length
    CSVResponseData?.forEach((data: any) => {
      const previousValue = modelListData[data["Model"]];

      if (previousValue === undefined) {
        // adding key and value
        // If the value is not exist then create new value
        modelListData[data["Model"]] = 1;
      } else {
        // add the value [length]
        // If the value is exist then increase their length
        modelListData[data["Model"]] = previousValue + 1;
      }
    });

    setModelList(modelListData);

    // top2 data
    // Finding top2 Model's list

    if (Object.keys(modelListData).length > 0) {
      const top2: any = Object.entries(modelListData)
        .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
        .slice(0, 1)
        .map(([label, value]) => ({ label, value }));

      setFirst2VehicleData(top2);
    }
  }, [CSVResponseData]);

  return (
    <div className="d-flex text-start gap-4 border-bottom pb-2">
      <VehicleDetails
        csvResponseData={CSVResponseData}
        first2VehicleData={first2VehicleData}
        dataList={modelList}
        heading="Model"
        description="Vehicle Model"
        other=""
        type={1}
      />

      <div className="flex-2">
        <VehicleData
          csvResponseData={CSVResponseData}
          first2VehicleData={first2VehicleData}
          unique={Object.keys(modelList).length}
        />
      </div>
    </div>
  );
};

export default VehicleModel;
