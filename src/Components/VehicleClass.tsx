import React, { useEffect, useState } from "react";
import VehicleDetails from "./Common/VehicleDetails";

// components
import VehicleData from "./Common/VehicleData";

interface Props {
  CSVResponseData: any;
}

const VehicleClass: React.FC<Props> = ({ CSVResponseData }) => {
  const [first2VehicleData, setFirst2VehicleData] = useState<any>([]);
  const [other, setOther] = useState(0);
  const [vehicleClassList, setVehicleClassList] = useState<any>({});

  useEffect(() => {
    // Arrange the data when the value in dependies changed

    // Vehicle Class List
    const vehicleClassListData: any = {};

    // Finding Vehicle Class and their length
    CSVResponseData?.forEach((data: any) => {
      const previousValue = vehicleClassListData[data["Vehicle Class"]];

      if (previousValue === undefined) {
        // adding key and value
        // If the value is not exist then create new value
        vehicleClassListData[data["Vehicle Class"]] = 1;
      } else {
        // add the value [length]
        // If the value is exist then increase their length
        vehicleClassListData[data["Vehicle Class"]] = previousValue + 1;
      }
    });

    setVehicleClassList(vehicleClassListData);

    // top2 data
    // Finding Vehicle Class list

    if (Object.keys(vehicleClassListData).length > 0) {
      const top2: any = Object.entries(vehicleClassListData)
        .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
        .slice(0, 2)
        .map(([label, value]) => ({ label, value }));

      setFirst2VehicleData(top2);

      const otherData =
        CSVResponseData.length - top2[0]?.value - top2[1]?.value;

      setOther(otherData);
    }
  }, [CSVResponseData]);

  return (
    <div className="d-flex text-start gap-4 border-bottom pb-2">
      <VehicleDetails
        csvResponseData={CSVResponseData}
        first2VehicleData={first2VehicleData}
        dataList={vehicleClassList}
        other={other}
        heading={"Vehicle Class"}
        description={
          "Vehicle class depending on their utility, capacity and weight"
        }
        type={0}
      />

      <div className="flex-2">
        <VehicleData
          csvResponseData={CSVResponseData}
          first2VehicleData={first2VehicleData}
          unique={Object.keys(vehicleClassList).length}
        />
      </div>
    </div>
  );
};

export default VehicleClass;
