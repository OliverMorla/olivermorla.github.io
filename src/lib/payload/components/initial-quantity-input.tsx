"use client";

import { FC, useEffect } from "react";
import { Payload } from "payload";
import { useField } from "@payloadcms/ui";

const InitialQuantityInput: FC<{ payload: Payload }> = ({
  payload,
  ...props
}) => {
  const { setValue, value } = useField<string>({});
  useEffect(() => {}, []);
  return (
    <>
      <style>
        {`
            input{
                padding: 12px 8px
            }
        `}
      </style>
      <input readOnly type="text" />
    </>
  );
};

export default InitialQuantityInput;
