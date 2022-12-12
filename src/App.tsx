import VehicleMake from "./Components/VehicleMake";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Papa from "papaparse";
import VehicleModel from "./Components/VehicleModel";
import VehicleClass from "./Components/VehicleClass";
import "./App.css";

function App() {
  type CSVResponse = Array<any> | null;
  const initialState: CSVResponse = null;
  const [fetchedCSVData, setFetchedCSVData] =
    useState<CSVResponse>(initialState);

  const handleData = async () => {
    // Fetching CSV data if its not already there
    if (!fetchedCSVData) {
      const response = await fetchCsv();
      Papa.parse(response as string, {
        header: true,
        skipEmptyLines: true,
        complete: function (results: any) {
          setFetchedCSVData(results.data);
        },
      });
    }
  };

  useEffect(() => {
    // CSV DATA fetched first time
    handleData();
  }, []);
  return (
    <div className="d-flex flex-column gap-3  height-90">
      <VehicleMake csvResponseData={fetchedCSVData}></VehicleMake>
      <VehicleModel CSVResponseData={fetchedCSVData}></VehicleModel>
      <VehicleClass CSVResponseData={fetchedCSVData}></VehicleClass>
    </div>
  );
}

// to fetch the data from local CSV file
const fetchCsv = () => {
  return fetch("/data/data.csv").then((response) => {
    let reader = response?.body?.getReader();
    let decoder = new TextDecoder("utf-8");

    return reader?.read().then((result) => {
      return decoder.decode(result.value);
    });
  });
};

export default App;
