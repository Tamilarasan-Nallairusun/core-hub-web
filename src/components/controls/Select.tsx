"use client";

import clsx from "clsx";
import { useField } from "formik";
import { useEffect, useRef } from "react";

type SelectProps = {
  groupClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  label?: string;
  error?: string;
  options: { [key: string | number]: string | number }[];
  onChange?: (value: string) => void;
  idField?: string;
  textField?: string;
  name: string;
  focus?: boolean;
  value?:string | number
};

export default function Select({
  label,
  groupClassName = "mb-5",
  labelClassName,
  selectClassName,
  options,
  onChange,
  idField = "id",
  textField = "name",
  name,
  focus = false,
}: SelectProps) {
  const [field, meta, helpers] = useField(name);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (focus && selectRef.current) {
      selectRef.current.focus();
    }
  }, [focus]);

  return (
    <div className={clsx("tk-select-group", groupClassName)}>
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      
      <select
        ref={selectRef}
        id={name}
        {...field}
        onChange={(e) => {
          helpers.setValue(e.target.value);
          onChange?.(e.target.value);
        }}
        className={clsx(
          "p-2 border border-gray-300 rounded-lg bg-white text-gray-700 h-10",
          selectClassName,
          meta.touched && meta.error ? "border-red-500" : ""
        )}
      >
        {options.map((option) => (
          <option key={option[idField]} value={option[idField]}>
            {option[textField]}
          </option>
        ))}
      </select>

      {meta.touched && meta.error && <p className="text-red-500 text-xs mt-1">{meta.error}</p>}
    </div>
  );
}
