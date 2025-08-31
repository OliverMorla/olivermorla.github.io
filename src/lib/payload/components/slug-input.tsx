"use client";

import { Payload } from "payload";
import { useField } from "@payloadcms/ui";
import { RefreshCcw } from "lucide-react";
import React, { ChangeEvent, InputHTMLAttributes } from "react";

const SlugInput: React.FC<
  { payload: Payload } & InputHTMLAttributes<HTMLInputElement>
> = ({ payload, ...props }) => {
  const { setValue, value } = useField<string>({});

  const handleClick = () => {
    // Get elements from dom
    const nameField = document.getElementsByName("name")[0] as HTMLInputElement;
    const titleField = document.getElementsByName(
      "title"
    )[0] as HTMLInputElement;
    const slugField = document.getElementsByName("slug")[0] as HTMLInputElement;

    let slug = "";

    if (nameField?.value) {
      // Format name value to slug using regex
      slug = nameField.value
        .toLowerCase() // Convert to lowercase
        .replace(/ /g, "-") // Replace spaces with hyphens
        .replace(/[^\w-]+/g, "") // Remove special characters
        .trim(); // Remove whitespaces
    } else if (titleField?.value) {
      slug = titleField.value
        .toLowerCase() // Convert to lowercase
        .replace(/ /g, "-") // Replace spaces with hyphens
        .replace(/[^\w-]+/g, "") // Remove special characters
        .trim(); // Remove whitespaces
    }

    // Reassign slug value
    slugField.value = slug;

    // Set value
    setValue(slug);
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
      <label htmlFor="slug">Slug</label>
      <div style={{ width: "100%", display: "flex", gap: "12px" }}>
        <input
          name="slug"
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
        Once you right the name of the product, click the button at the end to
        geneerate the slug
      </p>
    </div>
  );
};

export default SlugInput;
