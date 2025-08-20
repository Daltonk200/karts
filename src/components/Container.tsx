"use client";

import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export default function Container({ children, className }: ContainerProps) {
  const baseClassName = "mx-auto max-w-[1500px] px-4 md:px-6";
  return (
    <div className={`${baseClassName} ${className ?? ""}`}>{children}</div>
  );
}
