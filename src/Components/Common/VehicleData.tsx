import React, { useEffect, useState } from "react";

import { Progress } from "reactstrap";
import { DetailData } from "./DetailData";

interface Props {
  csvResponseData: any;
  first2VehicleData: any;
  unique: number;
}
export type dataTransparency = {
  label: string;
  color: string;
  value: number;
  valueInPercentage: number;
};

const VehicleData: React.FC<Props> = ({
  csvResponseData,
  first2VehicleData,
  unique,
}) => {
  const [valid, setValid] = useState([]);
  const [mismatched, setMismatched] = useState([]);
  const [missing, setMissing] = useState([]);

  const [validDataPercentage, setValidDataPercentage] = useState(0);
  const [mismatchedDataPercentage, setMismatchedDataPercentage] = useState(0);
  const [missingDataPercentage, setMissingDataPercentage] = useState(0);

  useEffect(() => {
    // valid , mismatched and missing data

    const missingData: any = [];
    const mismatchedData: any = [];
    const validData: any = [];

    // Finding CO2 Emissions(g/km) Data is valid
    csvResponseData?.forEach((data: any) => {
      if (data["CO2 Emissions(g/km)"] === undefined || null || "") {
        missingData.push(data);
      } else if (typeof data["CO2 Emissions(g/km)"] != "string") {
        mismatchedData.push(data);
      } else {
        validData.push(data["CO2 Emissions(g/km)"]);
      }
    });

    setValid(validData);
    setMismatched(mismatchedData);
    setMissing(missingData);

    // converting given value into percentage
    if (csvResponseData) {
      setValidDataPercentage((valid.length / csvResponseData.length) * 100);
      setMismatchedDataPercentage(
        (mismatched.length / csvResponseData.length) * 100
      );
      setMissingDataPercentage((missing.length / csvResponseData.length) * 100);
    }
    // Change the Percentage data when the value in dependies changed
  }, [
    csvResponseData,
    validDataPercentage,
    mismatchedDataPercentage,
    missingDataPercentage,
    valid.length,
    mismatched.length,
    missing.length,
  ]);

  const dataTransparency: dataTransparency[] = [
    {
      label: "Valid",
      color: "bg-success",
      value: valid.length,
      valueInPercentage: validDataPercentage,
    },
    {
      label: "Mismatched",
      color: "bg-warning",
      value: mismatched.length,
      valueInPercentage: mismatchedDataPercentage,
    },
    {
      label: "Missing",
      color: "bg-danger",
      value: missing.length,
      valueInPercentage: missingDataPercentage,
    },
  ];

  return (
    <>
      <Progress multi>
        <Progress
          bar
          color="success"
          striped
          animated
          value={validDataPercentage}
        />
        <Progress
          bar
          color="warning"
          striped
          animated
          value={mismatchedDataPercentage}
        />
        <Progress
          bar
          color="danger"
          striped
          animated
          value={missingDataPercentage}
        />
      </Progress>

      {dataTransparency.map((data: dataTransparency, key: number) => {
        return (
          <div key={key} className="d-flex flex-column mt-2 w-full">
            <DetailData {...data}></DetailData>
          </div>
        );
      })}

      <div className="d-flex flex-column mt-5">
        {/* Unique */}
        <div className="d-flex justify-content-between align-items-center w-full">
          <div className="d-flex align-items-center gap-1">
            <div>Unique</div>
            <div className="width-15 height-15 bg-success"></div>
          </div>

          {csvResponseData && (
            <div className="d-flex gap-3 w-25 justify-content-end">
              <div>{unique}</div>
              <div className="text-muted invisible w-25">dummy</div>
            </div>
          )}
        </div>

        {/* Most Common */}
        <div className="d-flex justify-content-between align-items-center w-full">
          <div className="d-flex align-items-center gap-1">
            <div>Most Common</div>
            <div className="width-15 height-15 bg-warning"></div>
          </div>

          {csvResponseData && first2VehicleData.length > 0 && (
            <div className="d-flex gap-3  w-25 justify-content-end">
              <div>{first2VehicleData[0]?.label}</div>
              <div className="text-muted w-25">
                {(
                  (first2VehicleData[0]?.value / csvResponseData.length) *
                  100
                ).toFixed(2)}
                %
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VehicleData;
