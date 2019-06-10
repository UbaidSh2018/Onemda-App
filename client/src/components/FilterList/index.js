import React from 'react';
import Select from "react-select";


export function FilterList({ handleChange, options, isMulti = false }) {
  return (
    <Select
      options={options}
      onChange={
        // onChange returns an array { label, value } objects if isMulti but otherwise returns a single object
        (selection) => handleChange(
          isMulti
            ? selection.map(({ value }) => value)
            : selection.value
        )}
      isMulti={isMulti} />
  );

}

