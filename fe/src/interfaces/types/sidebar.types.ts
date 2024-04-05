import { ReactNode } from "react";

export type TsidebarItems = {
  title: string;
  icon: () => ReactNode;
  path: string;
};
