// DataContext.tsx
import React, { createContext, useContext, useState } from "react";

export type ServiceEvent = {
  SERVICE_EVENT_CD: string;
  SERVICE_EVENT_DESC: string;
  SERVICE_EVENT_DESC_NEP: string | null;
  DISABLED: string;
  ENTERED_BY: string;
  ENTERED_DT: string;
  SERVICE_EVENT_TYPE: string;
  IS_AUTO_SALARY_ADJUST: string;
  LAST_UPDATED_BY: string | null;
  LAST_UPDATED_ON: string | null;
};

type Obj = {
  serviceToEdit: ServiceEvent | null;
  editID: string;
  isEdit: boolean;
  setServiceToEdit: React.Dispatch<React.SetStateAction<ServiceEvent | null>>;
  setEditID: React.Dispatch<React.SetStateAction<string>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const valueContext = createContext<Obj | null>(null);

export const DataContextProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [serviceToEdit, setServiceToEdit] = useState<ServiceEvent | null>(null);
  const [editID, setEditID] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const value = {
    serviceToEdit,
    editID,
    isEdit,
    setServiceToEdit,
    setEditID,
    setIsEdit,
  };

  return (
    <valueContext.Provider value={value}>{children}</valueContext.Provider>
  );
};

export const useCustomContext = () => {
  const customContext = useContext(valueContext);
  if (customContext === null) {
    throw new Error(
      "useCustomContext must be used within a DataContextProvider"
    );
  }
  return customContext;
};
