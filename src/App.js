import React, { useState } from "react";
import AddRecord from "./AddRecord";
import styles from "./App.module.css";
import { CSVLink, CSVDownload } from "react-csv";

function App() {
  const [records, setRecords] = useState([
    {
      location: "sdf",
      matchCount: "sdf",
      timeTaken: "sdf",
      miles: "sdf",
      fuel: "sdf",
      numberOfVehicles: "sdf",
      registrationId: "sdf",
    },
  ]);

  const addRecord = (new_record, callback = null) => {
    let flag = false;
    Object.keys(new_record).map((value) => {
      if (new_record[value].trim() !== "") {
        flag = true;
      }
      return true;
    });
    if (!flag) {
      return;
    }
    setRecords([...records, new_record]);
    if (callback) {
      callback();
    }
  };

  const getFields = (records) => {
    let result = [];
    for (let i = 0; i < records.length; i++) {
      const keys = Object.keys(records[i]);
      result = [...new Set([...keys, ...result])];
    }
    return result;
  };

  const getUniformData = (records) => {
    let fields = getFields(records);
    const result = records.map((record) => {
      fields.map((val) => {
        if (!record[val]) {
          record[val] = "";
        }
      });
      return record;
    });
    return result;
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.data_box}>
        <table>
          <tr>
            {getFields(records).map((value) => {
              return <th> {value} </th>;
            })}
          </tr>
          {records.map((record) => {
            return (
              <tr>
                {getFields(records).map((value) => {
                  return <td> {record[value]} </td>;
                })}
              </tr>
            );
          })}
        </table>
      </div>
      <CSVLink data={getUniformData(records)}>Download CSV</CSVLink>
      <AddRecord addRecord={addRecord} />
    </div>
  );
}

export default App;
