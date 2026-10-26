/** components/ui/Container.jsx */
import React from "react";
import { cn } from "@utils/cn";

export default function Container({ children, className = "", as: Tag = "div" }) {
  return (
    <Tag
      className={cn(
        "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </Tag>
  );
}
