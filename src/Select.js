import React from "react";
import ReactSelect from "react-select";

export default function Select({ options, value, setValue }) {
  return (
    <ReactSelect
      value={options.find(({ value: v }) => v === value)}
      onChange={({ value }) => setValue(value)}
      options={options}
    />
  );
}
