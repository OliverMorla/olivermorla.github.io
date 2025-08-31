"use client";

import { Payload } from "payload";
import { useField } from "@payloadcms/ui";
import { RefreshCcw } from "lucide-react";
import React, { ChangeEvent, InputHTMLAttributes } from "react";

const NameInput: React.FC<
  { payload: Payload } & InputHTMLAttributes<HTMLInputElement>
> = ({ payload, ...props }) => {
  const { setValue, value } = useField<string>({});

  const handleClick = () => {
    // Get elements from dom
    const titleField = document.getElementsByName(
      "title"
    )[0] as HTMLInputElement;
    const labelField = document.getElementsByName(
      "label"
    )[0] as HTMLInputElement;
    const nameField = document.getElementsByName("name")[0] as HTMLInputElement;

    let name = "";

    if (titleField?.value) {
      // Format name value to slug using regex
      name = titleField.value
        .toLowerCase() // Convert to lowercase
        .replace(/ /g, "-") // Replace spaces with hyphens
        .replace(/[^\w-]+/g, "") // Remove special characters
        .trim(); // Remove whitespaces
    } else if (labelField?.value) {
      name = labelField.value
        .toLowerCase() // Convert to lowercase
        .replace(/ /g, "-") // Replace spaces with hyphens
        .replace(/[^\w-]+/g, "") // Remove special characters
        .trim(); // Remove whitespaces
    }

    // Reassign slug value
    nameField.value = name;

    // Set value
    setValue(name);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div
      style={{
        gap: "6px",
        display: "flex",
        flexDirection: "column",
        marginBottom: "12px",
      }}
    >
      <label htmlFor="name">Name</label>
      <div style={{ width: "100%", display: "flex", gap: "12px" }}>
        <input
          name="name"
          type="text"
          defaultValue={value}
          onChange={handleOnChange}
          style={{
            width: "100%",
            height: "40px",
            fontSize: "13px",
            padding: "0 12px",
            backgroundColor: "#1f1f1f",
          }}
        />
        <button
          onClick={handleClick}
          type="button"
          style={{ cursor: "pointer" }}
        >
          <RefreshCcw
            style={{
              padding: "4px",
            }}
          />
        </button>
      </div>
      <p style={{ fontSize: "12px", color: "gray" }}>
        This has to be unique. It will be used to identify the field in the
        database.
      </p>
    </div>
  );
};

export default NameInput;
