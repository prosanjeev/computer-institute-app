// components/FormFields.js
import React from "react";
import { Field } from "formik";
import { FormControl, FormLabel, Input, Select, FormErrorMessage } from "@chakra-ui/react";

const FormFields = ({ fields, setFieldValue, handleChange }) => {
  return fields.map((fieldConfig, index) => (
    <Field name={fieldConfig.name} key={index}>
      {({ field, meta }) => (
        <FormControl isInvalid={meta.error && meta.touched}>
          <FormLabel htmlFor={fieldConfig.name}>{fieldConfig.label}</FormLabel>
          {fieldConfig.type === "select" ? (
            <Select
              bgColor="black.5"
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (handleChange && fieldConfig.onChange) {
                  fieldConfig.onChange(e);
                }
              }}
              placeholder={` ${fieldConfig.label}`}
            >
              {fieldConfig.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          ) : (
            <>
              {fieldConfig.type === "file" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setFieldValue(fieldConfig.name, e.currentTarget.files[0]);
                    handleChange(e);
                  }}
                />
              ) : (
                <Input
                  bgColor="black.5"
                  type={fieldConfig.type}
                  {...field}
                />
              )}
            </>
          )}
          <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  ));
};

export default FormFields;
