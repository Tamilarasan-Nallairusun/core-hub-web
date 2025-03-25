"use client";

import clsx from "clsx";
import { useField } from "formik";
import { useEffect, useRef, useState } from "react";

type InputProps = {
  groupClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  label?: string;
  focus?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ label, focus = false, groupClassName, labelClassName, inputClassName, ...props }: InputProps) {
  const [field, meta] = useField(props.name as string);
  const inputRef = useRef<HTMLInputElement>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    if (!props.id) {
      setClientId(crypto.randomUUID());
    }
  }, [props.id]);

  useEffect(() => {
    if (focus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  const finalId = props.id ?? clientId;

  return (
    <div className={clsx("tk-input-group", groupClassName)}>
      {label && finalId && (
        <label htmlFor={finalId} className={clsx("block mb-2 text-sm font-medium text-gray-900 dark:text-white", labelClassName)}>
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        id={finalId ?? undefined}
        className={clsx(
          "bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          inputClassName,
          meta.touched && meta.error ? "border-red-500" : ""
        )}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && <p className="text-red-500 text-xs mt-1">{meta.error}</p>}
    </div>
  );
}
