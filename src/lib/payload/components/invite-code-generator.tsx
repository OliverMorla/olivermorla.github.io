"use client";
import { useField } from "@payloadcms/ui";
import { useCallback, useState } from "react";
import { TextFieldClientComponent } from "payload";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

// import "./styles/tailwind.css";

const InviteCodeGenerator: TextFieldClientComponent = ({ path }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { setValue, value } = useField<string>({
    path,
  });

  const handleGenerate = useCallback(() => {
    const array = new Uint8Array(32 / 2);

    window.crypto.getRandomValues(array);

    const code = Array.from(array, (i) => i.toString(16).padStart(2, "0")).join(
      ""
    );

    setValue(code);
  }, [setValue]);

  const handleCopy = useCallback(() => {
    try {
      navigator.clipboard.writeText(value);

      setIsCopied(true);
    } catch (error) {
      console.error(`Failed to copy to clipboard: ${error}`);
    } finally {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  }, [value]);

  return (
    <div className="flex gap-2 items-end mb-4">
      <Input
        readOnly
        type="text"
        name={path}
        label="Invite Code"
        defaultValue={value}
        parentClassName="w-full"
        labelClassName="font-normal"
        placeholder="Click the button to generate a code"
      />
      <Button type="button" onClick={handleGenerate}>
        Generate
      </Button>
      <Button type="button" onClick={handleCopy} disabled={isCopied}>
        {isCopied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
};

export default InviteCodeGenerator;
