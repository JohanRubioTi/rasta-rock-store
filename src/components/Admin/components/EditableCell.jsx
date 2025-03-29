import React from 'react';

const EditableCell = ({
  isEditing,
  value,
  onChange,
  fieldName,
  className,
  inputType = 'text'
}) => {
  return isEditing ? (
    <input
      type={inputType}
      value={value}
      onChange={(e) => onChange(fieldName, e.target.value)}
      className={`${className} p-1 border rounded`}
    />
  ) : (
    <span className={className}>{value}</span>
  );
};

export default EditableCell;
