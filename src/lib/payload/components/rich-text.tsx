import { cn } from "@/utils/classNames";
import {
  type JSXConvertersFunction,
  RichText as RichTextParser,
} from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  
});

const RichText = ({
  className,
  data,
}: {
  className?: string;
  data: SerializedEditorState;
}) => {
  return (
    <RichTextParser
      className={cn(className, "prose dark:prose-invert")}
      converters={converters}
      data={data}
    />
  );
};

export default RichText;
