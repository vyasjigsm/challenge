import React from "react";

interface Props {
  csvResponseData: any;
  first2VehicleData: any;
  dataList: any;
  other: any;
  heading: string;
  description: string;
  type: number;
}

const VehicleDetails: React.FC<Props> = ({
  csvResponseData,
  first2VehicleData,
  dataList,
  other,
  heading,
  description,
  type,
}) => {
  return (
    <div className="d-flex flex-1 flex-column">
      <div>
        <h2 className="fw-bold">{heading}</h2>
        <div className="fw-bold">{description}</div>
      </div>

      {type === 0 ? (
        <div className="d-flex flex-column gap-3 mt-2">
          <div>
            {csvResponseData &&
              first2VehicleData &&
              first2VehicleData.map((data: any, key: number) => {
                return (
                  <div
                    key={key}
                    className="d-flex w-full justify-content-between"
                  >
                    <div>{data?.label}</div>
                    <div className="fw-bold text-primary">
                      {((data?.value * 100) / csvResponseData.length).toFixed(
                        2
                      )}
                      %
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="d-flex justify-content-between text-muted fs-6">
            <div>Other({Object.keys(dataList).length - 2})</div>
            <div>
              {csvResponseData &&
                other &&
                ((other * 100) / csvResponseData.length).toFixed(2)}
              %
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-1 flex-column">
          <div className="mt-5">
            <div className="fs-1 fw-bold text-primary">
              {Object.keys(dataList).length}
            </div>
            <div className="fw-bold">unique values</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
