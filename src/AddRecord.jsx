import React, { useState } from "react";
import styles from "./App.module.css";

function AddRecord({ addRecord }) {
  const [new_record, setNewRecord] = useState({
    location: "",
    matchCount: "",
    timeTaken: "",
    miles: "",
    fuel: "",
    numberOfVehicles: "",
    registrationId: "",
  });
  const [new_field, setNewField] = useState({ key: "", value: "" });
  return (
    <div className={styles.add_record_body}>
      <p>
        {" "}
        (You are only needed to fill fields as per your choice.
        <b>Atleast 1 field is needed.</b>){" "}
      </p>
      {Object.keys(new_record).map((value) => {
        return (
          <span className={styles.input_row}>
            <label htmlFor={value}> {value + " : "} </label>
            <input
              name={value}
              value={new_record[value]}
              onChange={(e) => {
                setNewRecord({
                  ...new_record,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          </span>
        );
      })}
      <p style={{ color: "red" }}>
        {" "}
        (Add the key and value if you need to add a new field to your record,
        Keys should be alphabets only and "_" is allowed,
        <b>
          Please click add field button after filling the key and value.
        </b>){" "}
      </p>
      <span className={styles.input_row}>
        <input
          placeholder="Key"
          onChange={(e) => {
            setNewField({ ...new_field, key: e.target.value });
          }}
          value={new_field.key}
        />
        <input
          placeholder="Value"
          onChange={(e) => {
            setNewField({ ...new_field, value: e.target.value });
          }}
          value={new_field.value}
        />
      </span>
      <button
        onClick={(e) => {
          if (new_field.key.trim() === "" || new_field.value.trim() === "") {
            return;
          }
          setNewRecord({
            ...new_record,
            [new_field.key]: new_field.value.trim(),
          });
          setNewField({ key: "", value: "" });
        }}
      >
        {" "}
        Add Field{" "}
      </button>
      <br />
      <p></p>
      <button
        onClick={(e) => {
          e.preventDefault();
          addRecord(new_record, () => {
            setNewRecord({
              location: "",
              matchCount: "",
              timeTaken: "",
              miles: "",
              fuel: "",
              numberOfVehicles: "",
              registrationId: "",
            });
          });
        }}
      >
        {" "}
        Add Record{" "}
      </button>
    </div>
  );
}

export default AddRecord;
