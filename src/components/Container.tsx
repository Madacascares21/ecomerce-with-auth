import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface ContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactNode;
}

const Container = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div {...props} className={cn("mx-auto max-w-7xl px-2 py-4 ", className)}>
      {children}
    </div>
  );
};

export default Container;
