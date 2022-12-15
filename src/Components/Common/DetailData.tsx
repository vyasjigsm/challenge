import { dataTransparency } from "./VehicleData";
export const DetailData: React.FC<dataTransparency> = ({
  color,
  label,
  value,
  valueInPercentage,
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center w-full">
      <div className="d-flex align-items-center gap-1">
        <div>{label}</div>
        <div className={`width-15 height-15 ${color}`}></div>
      </div>

      <div className="d-flex gap-3 w-full w-25 justify-content-end">
        <div>{value}</div>
        <div className="text-muted w-25">{valueInPercentage}%</div>
      </div>
    </div>
  );
};
