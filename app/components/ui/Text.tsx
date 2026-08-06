import type { ReactNode } from "react";

type TextVariant =
  | "display"
  | "title"
  | "body"
  | "body-muted"
  | "caption"
  | "placeholder";

type TextProps = {
  variant: TextVariant;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  children: ReactNode;
  className?: string;
};

const styles: Record<TextVariant, string> = {
  display: "text-[26px] font-bold leading-tight tracking-tight text-black",
  title: "text-xl font-bold leading-snug tracking-tight text-black",
  body: "text-base font-medium leading-snug text-black",
  "body-muted": "text-sm font-normal leading-snug text-[#666666]",
  caption: "text-xs font-normal leading-snug text-[#666666]",
  placeholder: "text-base font-normal text-[#B0B0B0]",
};

const defaultTag: Record<TextVariant, TextProps["as"]> = {
  display: "h1",
  title: "h2",
  body: "p",
  "body-muted": "p",
  caption: "span",
  placeholder: "span",
};

export function Text({
  variant,
  as,
  children,
  className = "",
}: TextProps) {
  const Tag = as ?? defaultTag[variant] ?? "p";
  return (
    <Tag className={`${styles[variant]} ${className}`.trim()}>{children}</Tag>
  );
}
